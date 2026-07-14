"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Clock3, Send } from "lucide-react";

import { AppHeader } from "@/components/app/app-header";
import { BottomNav } from "@/components/app/bottom-nav";
import { MobileFrame } from "@/components/app/mobile-frame";
import { ChatBubble } from "@/components/ai/chat-bubble";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getPigPigResponse,
  listChatHistory,
  loadPigPigContext,
  pigPigAssetPath,
  pigPigThinkingAssetPath,
  saveChatTurn,
  suggestedQuestions,
} from "@/features/pig-pig/lib/pig-pig-service";
import type { DashboardNavigationTarget } from "@/features/dashboard/types";
import type { ChatHistory } from "@/types/finance";

type PigPigMode = "chat" | "history";

type PigPigScreenProps = {
  mode: PigPigMode;
  onBack: () => void;
  onNavigate: (target: DashboardNavigationTarget, id?: string) => void;
};

type ChatMessage = {
  id: string;
  sender: "user" | "pig-pig";
  message: string;
  createdAt: string;
  isLoading?: boolean;
};

const welcomeMessage =
  "Xin chào! Mình là Pig Pig - trợ lý tài chính của PACE. Mình sẽ giúp bạn hiểu tình hình tài chính và đưa ra gợi ý để chi tiêu thông minh hơn.";

export function PigPigScreen({ mode, onBack, onNavigate }: PigPigScreenProps) {
  const context = loadPigPigContext();
  const [, setRefreshKey] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState<string | undefined>();
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      sender: "pig-pig",
      message: welcomeMessage,
      createdAt: new Date().toISOString(),
    },
  ]);

  const history = useMemo(
    () => (context ? listChatHistory(context.user.id) : []),
    [context],
  );

  function refresh() {
    setRefreshKey((value) => value + 1);
  }

  function sendMessage(message: string) {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setInputError("Không được gửi tin nhắn để trống.");
      return;
    }

    if (!context) {
      return;
    }

    const now = new Date().toISOString();
    const userMessage: ChatMessage = {
      id: `user-${now}`,
      sender: "user",
      message: trimmedMessage,
      createdAt: now,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      {
        id: `thinking-${now}`,
        sender: "pig-pig",
        message: "",
        createdAt: now,
        isLoading: true,
      },
    ]);

    setInputValue("");
    setInputError(undefined);
    setIsThinking(true);

    window.setTimeout(() => {
      const response = getPigPigResponse(trimmedMessage, context);
      const responseTime = new Date().toISOString();

      saveChatTurn(context.user.id, trimmedMessage, response);

      setMessages((currentMessages) => [
        ...currentMessages.filter((item) => !item.isLoading),
        {
          id: `pig-pig-${responseTime}`,
          sender: "pig-pig",
          message: response,
          createdAt: responseTime,
        },
      ]);

      setIsThinking(false);
      refresh();
    }, 650);
  }

  if (!context) {
    return (
      <MobileFrame>
        <div className="flex h-full flex-col bg-pace-background">
          <AppHeader onBack={onBack} showBackButton title="Pig Pig Chat" />

          <div className="flex flex-1 items-center px-md pb-[104px]">
            <EmptyState
              description="Please finish onboarding before chatting with Pig Pig."
              title="No Financial Data"
            />
          </div>

          <BottomNav activeItem="pig-pig" onNavigate={onNavigate} />
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="flex h-full flex-col bg-pace-background">
        <AppHeader
          onBack={onBack}
          showBackButton
          title={mode === "history" ? "Chat History" : "Pig Pig Chat"}
        />

        {mode === "history" ? (
          <PigPigHistory
            history={history}
            onBackToChat={() => onNavigate("pig-pig")}
          />
        ) : (
          <PigPigChat
            inputError={inputError}
            inputValue={inputValue}
            isThinking={isThinking}
            messages={messages}
            onHistory={() => onNavigate("pig-pig-history")}
            onInputChange={(value) => {
              setInputValue(value);
              setInputError(undefined);
            }}
            onSend={() => sendMessage(inputValue)}
            onSuggestion={sendMessage}
          />
        )}

        <BottomNav activeItem="pig-pig" onNavigate={onNavigate} />
      </div>
    </MobileFrame>
  );
}

function PigPigChat({
  inputError,
  inputValue,
  isThinking,
  messages,
  onHistory,
  onInputChange,
  onSend,
  onSuggestion,
}: {
  inputError?: string;
  inputValue: string;
  isThinking: boolean;
  messages: ChatMessage[];
  onHistory: () => void;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onSuggestion: (question: string) => void;
}) {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-md pb-[188px] pt-md">
        <div className="space-y-lg">
          <PigPigHero onHistory={onHistory} />

          <div className="space-y-md">
            {messages.map((message) => (
              <ChatBubble
                isLoading={message.isLoading}
                key={message.id}
                message={message.message}
                sender={message.sender}
                timestamp={formatTime(message.createdAt)}
              />
            ))}
          </div>

          <SuggestionChips disabled={isThinking} onSelect={onSuggestion} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[84px] border-t border-pace-border bg-pace-surface px-md py-sm">
        <div className="flex items-start gap-sm">
          <div className="min-w-0 flex-1">
            <div
              className={`flex h-14 items-center rounded-input bg-pace-background px-md ring-1 ring-transparent transition duration-micro focus-within:bg-pace-surface focus-within:ring-pace-primary ${
                inputError
                  ? "ring-pace-danger focus-within:ring-pace-danger"
                  : ""
              }`}
            >
              <input
                aria-invalid={Boolean(inputError)}
                aria-label="Nhập tin nhắn cho Pig Pig"
                className="min-w-0 flex-1 bg-transparent text-body text-pace-text-primary outline-none placeholder:text-pace-text-secondary"
                onChange={(event) => onInputChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    onSend();
                  }
                }}
                placeholder="Hỏi Pig Pig về tài chính của bạn..."
                value={inputValue}
              />
            </div>

            {inputError ? (
              <p className="mt-xs text-caption text-pace-danger">
                {inputError}
              </p>
            ) : null}
          </div>

          <button
            aria-label="Send message"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-button bg-pace-primary text-white shadow-floating disabled:opacity-50"
            disabled={isThinking}
            onClick={onSend}
            type="button"
          >
            <Send aria-hidden className="size-5" />
          </button>
        </div>
      </div>
    </>
  );
}

function PigPigHero({ onHistory }: { onHistory: () => void }) {
  return (
    <Card>
      <div className="flex items-center gap-md">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-pace-secondary">
          <Image
            alt="Pig Pig"
            className="object-cover"
            fill
            sizes="64px"
            src={pigPigAssetPath}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-caption text-pace-text-secondary">
            Rule-based Mock AI
          </p>
          <h1 className="text-title">Pig Pig</h1>
        </div>

        <button
          aria-label="View chat history"
          className="flex size-11 shrink-0 items-center justify-center rounded-button bg-pace-background text-pace-primary"
          onClick={onHistory}
          type="button"
        >
          <Clock3 aria-hidden className="size-5" />
        </button>
      </div>
    </Card>
  );
}

function SuggestionChips({
  disabled,
  onSelect,
}: {
  disabled: boolean;
  onSelect: (question: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleQuestions = suggestedQuestions.slice(0, isExpanded ? 20 : 3);

  return (
    <section className="space-y-md">
      <h2 className="text-subtitle">Suggested Questions</h2>

      <div className="flex flex-wrap gap-sm">
        {visibleQuestions.map((question) => (
          <button
            className="rounded-full bg-pace-surface px-md py-sm text-caption text-pace-primary shadow-card disabled:opacity-50"
            disabled={disabled}
            key={question.id}
            onClick={() => onSelect(question.text)}
            type="button"
          >
            {question.text}
          </button>
        ))}
      </div>

      {suggestedQuestions.length > 3 ? (
        <button
          aria-expanded={isExpanded}
          className="w-full text-center text-caption font-semibold text-pace-primary"
          onClick={() => setIsExpanded((current) => !current)}
          type="button"
        >
          {isExpanded ? "View less" : "View all"}
        </button>
      ) : null}
    </section>
  );
}

function PigPigHistory({
  history,
  onBackToChat,
}: {
  history: ChatHistory[];
  onBackToChat: () => void;
}) {
  const groupedHistory = groupHistory(history);

  return (
    <div className="flex-1 overflow-y-auto px-md pb-[104px] pt-md">
      {history.length === 0 ? (
        <EmptyState
          actionLabel="Chat với Pig Pig"
          description="Bạn chưa có cuộc trò chuyện nào."
          onAction={onBackToChat}
          title="Chat History Empty"
        />
      ) : (
        <div className="space-y-lg">
          <Card>
            <div className="flex items-center gap-md">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-pace-secondary">
                <Image
                  alt="Pig Pig thinking"
                  className="object-cover"
                  fill
                  sizes="56px"
                  src={pigPigThinkingAssetPath}
                />
              </div>

              <div>
                <p className="text-caption text-pace-text-secondary">
                  Local history
                </p>
                <h1 className="text-title">{history.length} chat turns</h1>
              </div>
            </div>
          </Card>

          {groupedHistory.map((group) => (
            <section className="space-y-md" key={group.label}>
              <h2 className="text-subtitle">{group.label}</h2>

              {group.items.map((item) => (
                <Card key={item.id}>
                  <p className="text-caption text-pace-text-secondary">
                    {formatDateTime(item.createdAt)}
                  </p>
                  <p className="mt-sm text-body font-semibold">
                    {item.userMessage}
                  </p>
                  <p className="mt-xs text-body text-pace-text-secondary">
                    {item.aiResponse}
                  </p>
                </Card>
              ))}
            </section>
          ))}

          <Button onClick={onBackToChat} variant="secondary">
            Chat với Pig Pig
          </Button>
        </div>
      )}
    </div>
  );
}

function groupHistory(history: ChatHistory[]) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const groups = [
    { label: "Hôm nay", items: [] as ChatHistory[] },
    { label: "Hôm qua", items: [] as ChatHistory[] },
    { label: "Các ngày trước", items: [] as ChatHistory[] },
  ];

  history.forEach((item) => {
    const itemDate = new Date(item.createdAt);

    if (isSameDate(itemDate, today)) {
      groups[0].items.push(item);
      return;
    }

    if (isSameDate(itemDate, yesterday)) {
      groups[1].items.push(item);
      return;
    }

    groups[2].items.push(item);
  });

  return groups.filter((group) => group.items.length > 0);
}

function isSameDate(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function formatTime(dateValue: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

function formatDateTime(dateValue: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(dateValue));
}
