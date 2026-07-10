import {
  getCurrentBudget,
  getCurrentUser,
  listUserExpenses,
  listUserSavingGoals,
} from "@/features/finance/lib/finance-service";
import {
  ensureRewardSeedData,
  getRewardWallet,
} from "@/features/reward/lib/reward-service";
import { formatVnd } from "@/lib/finance/amount";
import { createId } from "@/lib/id";
import { paceLocalDataSource } from "@/lib/storage/pace-storage";
import type { Budget, ChatHistory, Expense, PigCoinWallet, SavingGoal, User } from "@/types/finance";

export type PigPigContext = {
  user: User;
  budget?: Budget;
  expenses: Expense[];
  savingGoals: SavingGoal[];
  wallet?: PigCoinWallet;
};

export type SuggestedQuestion = {
  id: string;
  text: string;
};

export const pigPigAssetPath = "/assets/pig-pig/pig_headset.png";
export const pigPigThinkingAssetPath = "/assets/pig-pig/pig_thinking.png";

export const suggestedQuestions: SuggestedQuestion[] = [
  { id: "remaining-budget", text: "Mình còn bao nhiêu tiền để tiêu?" },
  { id: "weekly-spending", text: "Tuần này mình đã chi bao nhiêu?" },
  { id: "budget-status", text: "Mình có đang vượt ngân sách không?" },
  { id: "saving-goal-status", text: "Saving Goal của mình thế nào?" },
  { id: "pig-coin", text: "Pig Coin dùng để làm gì?" },
  { id: "save-more", text: "Làm sao để tiết kiệm hơn?" },
  { id: "budget-formula", text: "Budget của mình được tính như thế nào?" },
  { id: "planned-expense", text: "Expense Planned là gì?" },
  { id: "completed-expense", text: "Expense Completed là gì?" },
  { id: "remaining-daily", text: "Remaining Daily Budget là gì?" },
  { id: "fixed-expense", text: "Fixed Expense là gì?" },
  { id: "saving-goal-meaning", text: "Saving Goal là gì?" },
  { id: "deposit-saving", text: "Deposit vào Saving Goal ảnh hưởng gì?" },
  { id: "withdraw-saving", text: "Withdraw Saving Goal hoạt động thế nào?" },
  { id: "reward", text: "Reward Marketplace dùng để làm gì?" },
  { id: "not-enough-budget", text: "Nếu hết Remaining Budget thì sao?" },
  { id: "expense-history", text: "Mình xem lịch sử chi tiêu ở đâu?" },
  { id: "report", text: "Report giúp mình hiểu gì?" },
  { id: "budget-streak", text: "Budget Streak là gì?" },
  { id: "pig-coin-missing", text: "Tại sao mình chưa nhận được Pig Coin?" },
];

export function loadPigPigContext(): PigPigContext | undefined {
  const user = getCurrentUser();

  if (!user) {
    return undefined;
  }

  ensureRewardSeedData(user.id);

  return {
    user,
    budget: getCurrentBudget(user.id),
    expenses: listUserExpenses(user.id),
    savingGoals: listUserSavingGoals(user.id),
    wallet: getRewardWallet(user.id),
  };
}

export function getPigPigResponse(question: string, context: PigPigContext) {
  const normalizedQuestion = normalizeQuestion(question);
  const matchedQuestion = suggestedQuestions.find((suggestion) =>
    isQuestionMatch(normalizedQuestion, suggestion.text),
  );

  switch (matchedQuestion?.id) {
    case "remaining-budget":
      return context.budget
        ? `Bạn còn ${formatVnd(context.budget.remainingBudget)} trong Remaining Budget. Mỗi ngày bạn nên giữ mức chi quanh ${formatVnd(context.budget.remainingDailyBudget)}.`
        : "Mình chưa tìm thấy Budget hiện tại. Bạn hãy hoàn thành onboarding trước nhé.";
    case "weekly-spending":
      return `Tuần này bạn đã chi ${formatVnd(getWeeklyCompletedSpending(context.expenses))} từ các khoản Expense Completed.`;
    case "budget-status":
      return context.budget && context.budget.remainingDailyBudget > 0
        ? "Bạn vẫn đang trong vùng ổn: Remaining Daily Budget còn dương. Hãy cố giữ nhịp chi tiêu như hiện tại nhé."
        : "Bạn đang cần chậm lại một chút vì Remaining Daily Budget đã về 0 hoặc thấp hơn.";
    case "saving-goal-status":
      return getSavingGoalSummary(context.savingGoals);
    case "pig-coin":
      return `Pig Coin được dùng để đổi Voucher trong Reward Marketplace. Hiện bạn có ${context.wallet?.balance ?? 0} Pig Coins.`;
    case "save-more":
      return "Hãy bắt đầu bằng việc đặt Saving Goal, ghi Expense đều đặn, và cố gắng không vượt Remaining Daily Budget mỗi ngày.";
    case "budget-formula":
      return "Monthly Budget được tính bằng Monthly Income trừ Fixed Expense.";
    case "planned-expense":
      return "Expense Planned là khoản chi bạn dự định thực hiện trong tương lai. Nó giúp bạn lên kế hoạch nhưng chưa làm giảm Remaining Budget.";
    case "completed-expense":
      return "Expense Completed là khoản chi đã thực sự phát sinh. Khi Completed, nó sẽ làm giảm Remaining Budget và Remaining Daily Budget.";
    case "remaining-daily":
      return "Remaining Daily Budget là số tiền PACE gợi ý bạn nên chi mỗi ngày trong phần còn lại của tháng.";
    case "fixed-expense":
      return "Fixed Expense là các chi phí cố định hằng tháng như tiền nhà, học phí, internet hoặc hóa đơn định kỳ.";
    case "saving-goal-meaning":
      return "Saving Goal giúp bạn dành riêng một khoản tiền để đạt mục tiêu tài chính trong tương lai.";
    case "deposit-saving":
      return "Khi bạn Deposit vào Saving Goal, Current Amount của goal tăng lên và Remaining Budget giảm tương ứng.";
    case "withdraw-saving":
      return "Flexible Goal cho phép Withdraw ngay. Commitment Goal cần tạo yêu cầu và chờ 2 giờ trước khi hệ thống xử lý.";
    case "reward":
      return "Reward Marketplace là nơi bạn dùng Pig Coin để đổi voucher demo trong MVP.";
    case "not-enough-budget":
      return "Nếu Remaining Budget về 0, bạn nên hạn chế thêm Expense Completed và xem lại các khoản Planned trong Expense History.";
    case "expense-history":
      return "Bạn có thể xem toàn bộ lịch sử chi tiêu ở Report hoặc Expense History, rồi mở từng Expense để xem chi tiết.";
    case "report":
      return "Report giúp bạn xem tổng chi tiêu, phân bổ theo category, lịch sử giao dịch gần nhất và mức dùng budget theo tuần hoặc tháng.";
    case "budget-streak":
      return "Budget Streak là số ngày liên tiếp bạn chi tiêu đúng kế hoạch. Đây là một phần gamification của PACE.";
    case "pig-coin-missing":
      return "Pig Coin thường được thưởng khi bạn đạt điều kiện Budget Streak. Trong demo, ví Pig Coin được cấp sẵn để bạn thử Reward Marketplace.";
    default:
      return "Xin lỗi, mình vẫn đang trong giai đoạn học hỏi. Hiện tại mình chỉ có thể hỗ trợ một số câu hỏi tài chính trong phiên bản demo.";
  }
}

export function saveChatTurn(
  userId: string,
  userMessage: string,
  aiResponse: string,
): ChatHistory {
  const chatHistory: ChatHistory = {
    id: createId(),
    userId,
    userMessage,
    aiResponse,
    createdAt: new Date().toISOString(),
  };

  paceLocalDataSource.chatHistories.upsert(chatHistory);
  return chatHistory;
}

export function listChatHistory(userId: string) {
  return paceLocalDataSource
    .chatHistories
    .list()
    .filter((history) => history.userId === userId)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

function isQuestionMatch(normalizedQuestion: string, sampleQuestion: string) {
  const normalizedSample = normalizeQuestion(sampleQuestion);
  const sampleWords = normalizedSample
    .split(" ")
    .filter((word) => word.length >= 3);
  const matchedWords = sampleWords.filter((word) =>
    normalizedQuestion.includes(word),
  );

  return (
    normalizedQuestion === normalizedSample ||
    normalizedQuestion.includes(normalizedSample) ||
    matchedWords.length >= Math.min(3, sampleWords.length)
  );
}

function normalizeQuestion(question: string) {
  return question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{Letter}\p{Number}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getWeeklyCompletedSpending(expenses: Expense[]) {
  const now = new Date();
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  return expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.completedDate ?? expense.plannedDate);

      return expense.status === "Completed" && expenseDate >= startOfWeek;
    })
    .reduce((total, expense) => total + expense.amount, 0);
}

function getSavingGoalSummary(savingGoals: SavingGoal[]) {
  const activeGoals = savingGoals.filter((goal) => goal.status === "Active");

  if (activeGoals.length === 0) {
    return "Bạn chưa có Saving Goal Active. Tạo một mục tiêu nhỏ sẽ giúp việc tiết kiệm dễ bắt đầu hơn.";
  }

  return activeGoals
    .map((goal) => {
      const progress =
        goal.targetAmount > 0
          ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
          : 0;

      return `${goal.name}: ${formatVnd(goal.currentAmount)} / ${formatVnd(goal.targetAmount)} (${progress}%).`;
    })
    .join(" ");
}
