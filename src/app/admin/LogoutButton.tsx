"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      className="cursor-pointer rounded-full border border-white/15 px-4 py-2 text-sm text-cream/80 transition-colors hover:bg-white/[0.06] hover:text-cream"
    >
      Log out
    </button>
  );
}
