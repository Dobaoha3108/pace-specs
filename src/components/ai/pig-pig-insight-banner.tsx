import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { PigPigInsightType } from "@/types/finance";

type PigPigInsightBannerProps = {
  title: string;
  content: string;
  insightType: PigPigInsightType;
  pigImageSrc?: string;
  onChat?: () => void;
};

export function PigPigInsightBanner({
  content,
  insightType,
  onChat,
  pigImageSrc = "/assets/pig-pig/pig_happy.png",
  title,
}: PigPigInsightBannerProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden",
        insightType === "Warning" && "ring-1 ring-pace-warning",
        insightType === "Achievement" && "bg-pace-secondary/70",
      )}
    >
      <div className="flex items-center gap-md">
        <Image
          alt="Pig Pig"
          className="shrink-0"
          height={84}
          src={pigImageSrc}
          width={84}
        />
        <div className="min-w-0 flex-1">
          <p className="text-caption text-pace-text-secondary">{insightType}</p>
          <h2 className="text-title">{title}</h2>
          <p className="mt-xs text-body text-pace-text-secondary">{content}</p>
        </div>
      </div>
      {onChat ? (
        <Button className="mt-md" onClick={onChat} variant="secondary">
          Chat with Pig Pig
        </Button>
      ) : null}
    </Card>
  );
}
