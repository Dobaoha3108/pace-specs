import { cn } from "@/lib/cn";

type OnboardingProgressProps = {
  currentStep: number;
  totalSteps?: number;
};

export function OnboardingProgress({
  currentStep,
  totalSteps = 4,
}: OnboardingProgressProps) {
  return (
    <div aria-label={`Step ${currentStep} of ${totalSteps}`} className="flex gap-sm">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;

        return (
          <span
            className={cn(
              "h-2 flex-1 rounded-full bg-pace-border transition duration-card",
              step <= currentStep && "bg-pace-primary",
            )}
            key={step}
          />
        );
      })}
    </div>
  );
}
