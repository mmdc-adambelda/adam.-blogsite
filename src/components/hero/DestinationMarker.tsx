"use client";

import { useRef } from "react";
import Link from "next/link";
import { Html } from "@react-three/drei";
import type * as THREE from "three";
import type { HeroDestination } from "./destinationData";

interface DestinationMarkerProps {
  destination: HeroDestination;
  position: THREE.Vector3;
  occluders: React.RefObject<THREE.Object3D>[];
  reduce: boolean;
  color: string;
  onSelect: (id: string) => void;
}

/**
 * Renders as a normal DOM node projected onto the marker's 3D position (via drei's Html),
 * so hover/focus/click and the larger tap target are just CSS + real anchor/button semantics —
 * no raycasting needed for interaction, only for occlusion (hiding markers on the globe's far side).
 */
export default function DestinationMarker({
  destination,
  position,
  occluders,
  reduce,
  color,
  onSelect,
}: DestinationMarkerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const dot = (
    <span
      className="pointer-events-none block h-2.5 w-2.5 rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 6px 2px ${color}99, 0 0 14px 4px ${color}4d`,
      }}
    />
  );

  const content = (
    <div
      ref={wrapperRef}
      className="group relative flex -translate-x-1/2 -translate-y-1/2 items-center justify-center p-3"
      style={{ touchAction: "none" }}
    >
      {!reduce && (
        <span
          aria-hidden="true"
          className="absolute h-2.5 w-2.5 animate-pulse-pin rounded-full"
          style={{ backgroundColor: `${color}66` }}
        />
      )}
      {dot}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-night/90 px-2 py-1 text-[11px] font-medium text-cream opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {destination.name}
        {destination.isOrigin ? " · Home base" : ""}
      </span>
    </div>
  );

  return (
    <Html position={position} occlude={occluders} zIndexRange={[10, 0]} center distanceFactor={8}>
      {destination.href ? (
        <Link
          href={destination.href}
          onClick={() => onSelect(destination.id)}
          aria-label={`${destination.name} — view travel story`}
          className="block cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {content}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => onSelect(destination.id)}
          aria-label={`${destination.name} — visited destination`}
          className="block cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {content}
        </button>
      )}
    </Html>
  );
}
