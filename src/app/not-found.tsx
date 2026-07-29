import Link from "next/link";
import { Plane } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="relative">
        <svg className="h-40 w-64 text-sand/20" viewBox="0 0 200 120" aria-hidden="true">
          <path
            d="M10,90 C50,70 80,95 110,60 C130,35 150,50 190,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 7"
            strokeLinecap="round"
          />
        </svg>
        <Plane className="absolute right-0 top-2 h-10 w-10 rotate-12 text-ember animate-float-slow" aria-hidden="true" />
      </div>
      <p className="stamp mt-6">Flight 404</p>
      <h1 className="h-display mt-4 text-4xl font-bold sm:text-5xl">
        Looks like this journey took an unexpected turn.
      </h1>
      <p className="mt-4 max-w-md text-cream/60">
        The page you&apos;re looking for has wandered off the flight path. Let&apos;s get you
        back somewhere familiar.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Return to the Homepage
      </Link>
    </div>
  );
}
