import { cn } from "@/lib/cn";

type ChatBubbleProps = {
  sender: "user" | "pig-pig";
  message: string;
  timestamp?: string;
  isLoading?: boolean;
};

export function ChatBubble({
  isLoading = false,
  message,
  sender,
  timestamp,
}: ChatBubbleProps) {
  const isUser = sender === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[78%] rounded-bubble px-md py-sm",
          isUser
            ? "rounded-br-button bg-pace-primary text-white"
            : "rounded-bl-button bg-pace-surface text-pace-text-primary shadow-card",
        )}
      >
        {isLoading ? (
          <span className="flex gap-xs" aria-label="Pig Pig is typing">
            <span className="size-2 animate-pulse rounded-full bg-current" />
            <span className="size-2 animate-pulse rounded-full bg-current delay-100" />
            <span className="size-2 animate-pulse rounded-full bg-current delay-200" />
          </span>
        ) : (
          <p className="text-body">{message}</p>
        )}
        {timestamp ? (
          <p
            className={cn(
              "mt-xs text-caption",
              isUser ? "text-white/80" : "text-pace-text-secondary",
            )}
          >
            {timestamp}
          </p>
        ) : null}
      </div>
    </div>
  );
}
