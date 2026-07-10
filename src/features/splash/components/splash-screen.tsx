"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import { MobileFrame } from "@/components/app/mobile-frame";

type SplashScreenProps = {
  hasError?: boolean;
  onRetry?: () => void;
};

export function SplashScreen({ hasError = false, onRetry }: SplashScreenProps) {
  return (
    <MobileFrame>
      <div className="flex h-full flex-col items-center justify-center bg-pace-background px-md text-center">
        <Image
          alt="PACE"
          className="mb-lg"
          height={84}
          priority
          src="/assets/logos/app_icon.png"
          width={84}
        />
        <Image
          alt="PACE"
          className="mb-md"
          height={48}
          priority
          src="/assets/logos/wordmark.png"
          width={160}
        />
        <h1 className="text-h1">PACE</h1>
        {hasError ? (
          <div className="mt-lg w-full">
            <p className="mb-md text-body text-pace-danger">
              Không thể khởi tạo ứng dụng.
            </p>
            <Button onClick={onRetry}>Retry</Button>
          </div>
        ) : (
          <LoadingState
            className="mt-lg bg-transparent shadow-none"
            label="Initializing PACE"
          />
        )}
      </div>
    </MobileFrame>
  );
}
