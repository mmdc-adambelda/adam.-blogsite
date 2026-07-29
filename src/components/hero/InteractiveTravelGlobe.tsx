"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import {
  heroDestinations,
  GLOBE_ORIGIN_ID,
  INITIAL_VIEW,
  globeConfig,
} from "./destinationData";
import { latLngToVector3, buildLandDotPositions, buildArcCurve, hasWebGLSupport } from "./globeUtils";
import DestinationMarker from "./DestinationMarker";
import GlobeFallback from "./GlobeFallback";

const { radius, cameraDistance, colors } = globeConfig;

interface InteractionState {
  rotationY: number;
  dragging: boolean;
  lastPointerX: number;
  idleSeconds: number;
  pointerNX: number;
  pointerNY: number;
  smoothTiltX: number;
  smoothTiltY: number;
}

// Matches react-use-measure's loosely-typed `ResizeObserverCallback` (entries/observer as `any`).
type RoCallback = (entries: any[], observer: any) => void;

/**
 * react-use-measure (which powers the Canvas's auto-sizing) already re-measures on window
 * resize on its own — the one gap is the guaranteed *initial* callback the ResizeObserver
 * spec promises on `observe()`, which some hosts don't reliably deliver. This polyfill
 * delegates to the native ResizeObserver when available, and additionally forces one
 * immediate measurement right after subscribing so the canvas is never stuck at the
 * browser's 300x150 default.
 */
class GuaranteedResizeObserver {
  private native?: ResizeObserver;
  constructor(private callback: RoCallback) {
    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      this.native = new window.ResizeObserver(callback as ResizeObserverCallback);
    }
  }
  observe(target: Element) {
    this.native?.observe(target);
    requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      this.callback([{ target, contentRect: rect }], this);
    });
  }
  unobserve(target: Element) {
    this.native?.unobserve(target);
  }
  disconnect() {
    this.native?.disconnect();
  }
  static toString() {
    return "function ResizeObserver() { [guaranteed-fire polyfill] }";
  }
}

function createDotTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.55, "rgba(255,255,255,0.45)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function CameraRig({ position }: { position: THREE.Vector3 }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.copy(position);
    camera.lookAt(0, 0, 0);
  }, [camera, position]);
  return null;
}

/** Fresnel-style rim glow — cheap view-space approximation, no extra render passes. */
function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { glowColor: { value: new THREE.Color(colors.atmosphere) } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
            gl_FragColor = vec4(glowColor, clamp(intensity, 0.0, 1.0) * 0.85);
          }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    []
  );
  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh scale={1.12}>
      <sphereGeometry args={[radius, 48, 48]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function LandDots({ segments }: { segments: number }) {
  const texture = useMemo(() => createDotTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = buildLandDotPositions(radius + 0.012, segments);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [segments]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={colors.land}
        size={0.028}
        map={texture}
        transparent
        alphaTest={0.02}
        depthWrite={false}
        sizeAttenuation
        opacity={0.85}
      />
    </points>
  );
}

interface ArcData {
  id: string;
  points: THREE.Vector3[];
  curve: THREE.QuadraticBezierCurve3;
  phase: number;
}

function TravelArcs({ arcs, reduce }: { arcs: ArcData[]; reduce: boolean }) {
  const dotRefs = useRef<Array<THREE.Mesh | null>>([]);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (reduce) return;
    elapsed.current += delta;
    arcs.forEach((arc, i) => {
      const dot = dotRefs.current[i];
      if (!dot) return;
      const t = (elapsed.current * 0.18 + arc.phase) % 1;
      const point = arc.curve.getPointAt(t);
      dot.position.copy(point);
      const fade = Math.sin(t * Math.PI); // fade in/out at the arc's endpoints
      const mat = dot.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + fade * 0.85;
    });
  });

  return (
    <>
      {arcs.map((arc) => (
        <Line
          key={arc.id}
          points={arc.points}
          color={colors.arc}
          lineWidth={1}
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      ))}
      {!reduce &&
        arcs.map((arc, i) => (
          <mesh key={`${arc.id}-dot`} ref={(el) => { dotRefs.current[i] = el; }}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshBasicMaterial color={colors.arc} transparent opacity={0.9} toneMapped={false} />
          </mesh>
        ))}
    </>
  );
}

interface GlobeSceneProps {
  reduce: boolean;
  isMobile: boolean;
  interaction: React.MutableRefObject<InteractionState>;
  onSelect: (id: string) => void;
}

function GlobeScene({ reduce, isMobile, interaction, onSelect }: GlobeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const globeMeshRef = useRef<THREE.Mesh>(null);

  const markerPositions = useMemo(
    () => heroDestinations.map((d) => latLngToVector3(d.latitude, d.longitude, radius + globeConfig.markerRadiusOffset)),
    []
  );

  const arcs: ArcData[] = useMemo(() => {
    const origin = heroDestinations.find((d) => d.id === GLOBE_ORIGIN_ID);
    if (!origin) return [];
    const originVec = latLngToVector3(origin.latitude, origin.longitude, radius);
    return heroDestinations
      .filter((d) => d.id !== GLOBE_ORIGIN_ID)
      .map((d, i) => {
        const endVec = latLngToVector3(d.latitude, d.longitude, radius);
        const curve = buildArcCurve(originVec, endVec, radius);
        return { id: d.id, curve, points: curve.getPoints(48), phase: i / 7 };
      });
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const s = interaction.current;

    if (!s.dragging) {
      s.idleSeconds += delta;
      if (!reduce && s.idleSeconds > globeConfig.idleResumeSeconds) {
        s.rotationY += delta * globeConfig.autoRotateSpeed;
      }
    }

    const targetTiltX = reduce ? 0 : s.pointerNY * globeConfig.maxParallaxTilt * 0.4;
    const targetTiltY = reduce ? 0 : s.pointerNX * globeConfig.maxParallaxTilt * 0.25;
    s.smoothTiltX = THREE.MathUtils.lerp(s.smoothTiltX, targetTiltX, 0.05);
    s.smoothTiltY = THREE.MathUtils.lerp(s.smoothTiltY, targetTiltY, 0.05);

    group.rotation.y = s.rotationY + s.smoothTiltY;
    group.rotation.x = s.smoothTiltX;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={globeMeshRef}>
        <sphereGeometry args={[radius, isMobile ? 32 : 48, isMobile ? 32 : 48]} />
        <meshStandardMaterial
          color={colors.oceanBase}
          emissive={colors.oceanDeep}
          emissiveIntensity={0.4}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>
      <LandDots segments={isMobile ? 5 : 4} />
      <Atmosphere />
      <TravelArcs arcs={arcs} reduce={reduce} />
      {heroDestinations.map((d, i) => (
        <DestinationMarker
          key={d.id}
          destination={d}
          position={markerPositions[i]}
          occluders={[globeMeshRef]}
          reduce={reduce}
          color={d.isOrigin ? colors.markerOrigin : colors.marker}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

/**
 * Client-only interactive globe: drag/touch rotation, cursor parallax, animated travel
 * arcs, and destination markers. Rendering is entirely paused (via `frameloop`) when the
 * hero scrolls out of view or the browser tab is hidden, and all geometries/materials/
 * textures created here are disposed on unmount.
 */
export default function InteractiveTravelGlobe() {
  const reducedMotionPref = useReducedMotion();
  const reduce = reducedMotionPref ?? false;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [webglOk] = useState(() => hasWebGLSupport());
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [isMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);

  const interaction = useRef<InteractionState>({
    rotationY: 0,
    dragging: false,
    lastPointerX: 0,
    idleSeconds: globeConfig.idleResumeSeconds + 1,
    pointerNX: 0,
    pointerNY: 0,
    smoothTiltX: 0,
    smoothTiltY: 0,
  });

  const cameraPosition = useMemo(
    () => latLngToVector3(INITIAL_VIEW.latitude, INITIAL_VIEW.longitude, cameraDistance),
    []
  );

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Mouse drag-to-rotate + cursor parallax (desktop). Touch is handled separately below
  // so vertical page scrolling is never hijacked.
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    interaction.current.dragging = true;
    interaction.current.lastPointerX = e.clientX;
    if (wrapperRef.current) wrapperRef.current.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (rect) {
      interaction.current.pointerNX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      interaction.current.pointerNY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }
    if (e.pointerType !== "mouse" || !interaction.current.dragging) return;
    const dx = e.clientX - interaction.current.lastPointerX;
    interaction.current.lastPointerX = e.clientX;
    interaction.current.rotationY += dx * globeConfig.dragSensitivity;
    interaction.current.idleSeconds = 0;
  }, []);

  const stopDragging = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    interaction.current.dragging = false;
    if (wrapperRef.current) wrapperRef.current.style.cursor = "grab";
  }, []);

  const onPointerLeave = useCallback((e: React.PointerEvent) => {
    stopDragging(e);
    interaction.current.pointerNX = 0;
    interaction.current.pointerNY = 0;
  }, [stopDragging]);

  // Touch: only claim the gesture as globe rotation once a horizontal-dominant drag
  // past the threshold is detected — anything more vertical is left alone so normal
  // page scrolling keeps working.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let decided = false;
    let isRotationGesture = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
      decided = false;
      isRotationGesture = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking || e.touches.length !== 1) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = x - startX;
      const dy = y - startY;

      if (!decided) {
        if (Math.abs(dx) > globeConfig.touchDragThreshold || Math.abs(dy) > globeConfig.touchDragThreshold) {
          decided = true;
          isRotationGesture = Math.abs(dx) > Math.abs(dy);
        }
      }

      if (decided && isRotationGesture) {
        e.preventDefault();
        interaction.current.rotationY += dx * globeConfig.dragSensitivity * 1.15;
        interaction.current.idleSeconds = 0;
        startX = x;
        startY = y;
      }
    };

    const onTouchEnd = () => {
      tracking = false;
      decided = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  const handleSelect = useCallback((_id: string) => {
    // Reserved for a future "focus camera on selection" — navigation itself is a normal
    // Next.js Link/button (see DestinationMarker), so no extra wiring is required here.
  }, []);

  if (!webglOk) {
    return <GlobeFallback />;
  }

  return (
    <div
      ref={wrapperRef}
      className={`h-full w-full transition-opacity ease-out ${
        mounted || reduce ? "opacity-100 duration-700" : "opacity-0 duration-0"
      }`}
      style={{ cursor: "grab", touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={onPointerLeave}
      role="img"
      aria-label="Interactive 3D globe highlighting the Philippines, Macau, Hong Kong, Vietnam, South Korea, Japan, Taiwan, and Abu Dhabi"
    >
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        camera={{ fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={inView && tabVisible ? "always" : "never"}
        resize={{ polyfill: GuaranteedResizeObserver }}
      >
        <CameraRig position={cameraPosition} />
        <ambientLight intensity={0.6} color="#fff4e0" />
        <directionalLight position={[3, 2.4, 4]} intensity={1.15} color="#fbe3b0" />
        {!isMobile && <Stars radius={40} depth={20} count={900} factor={2} fade speed={reduce ? 0 : 0.3} />}
        <GlobeScene reduce={reduce} isMobile={isMobile} interaction={interaction} onSelect={handleSelect} />
      </Canvas>
    </div>
  );
}
