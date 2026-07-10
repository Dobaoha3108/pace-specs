import type { PropsWithChildren } from "react";

export function MobileFrame({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EAF1FF] p-md">
      <div className="relative h-[844px] w-full max-w-[390px] overflow-hidden rounded-[32px] bg-pace-surface shadow-dialog">
        {children}
      </div>
    </main>
  );
}
