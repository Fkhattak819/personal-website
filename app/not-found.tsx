import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page pb-24 pt-5 md:pb-40 md:pt-6">
      <p className="label">Error</p>
      <h1 className="display mt-14 text-[min(34vw,26rem)] md:mt-20">404</h1>
      <div className="mt-8 border-t border-ink pt-5">
        <p className="text-2xl font-medium tracking-[-0.02em]">This page doesn&rsquo;t exist.</p>
        <Link href="/" className="btn btn-accent mt-6">
          Back home <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
