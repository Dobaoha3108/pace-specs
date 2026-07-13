# Change Log

## 2026-07-13 — Budget Overview Card Redesign + Daily Budget Overspend Confirmation

### Nguồn gốc

Merge từ `docs/03_DELTA_SPEC.md` — DELTA-001 và DELTA-002, sau khi được xác nhận.

### Spec thay đổi

- `specs/17_UI_LAYOUT.md` — mục "Budget Overview Card": đổi từ layout 1 khối + 2 progress bar sang khối chính "Còn được tiêu trong tháng" + 3 ô info ("Hôm nay nên tiêu", "Dự kiến hết", "Tốc độ chi tiêu") + công thức tính.
- `feature-specs/22_DASHBOARD.md` — Section 2 "Budget Summary": bổ sung định nghĩa chính thức cho "Budget Status" (trước đó chỉ được nhắc tên, chưa định nghĩa).
- `specs/12_BUSINESS_RULES.md` — thêm rule `EXP-007: Daily Budget Overspend Confirmation`.
- `feature-specs/23_EXPENSE.md` — Create Expense Flow và Edit Expense Flow: thêm bước kiểm tra Daily Budget Overspend trước khi lưu Expense.

### Code thay đổi

- `src/lib/finance/amount.ts` — thêm `getTotalDaysInMonth`, `getElapsedDaysInMonth`.
- `src/features/dashboard/types.ts` — thêm field `spendingPaceDelta`, `projectedDaysLeft` vào `DashboardViewModel`.
- `src/features/dashboard/lib/dashboard-view-model.ts` — tính `spendingPaceDelta` và `projectedDaysLeft` theo công thức trong `specs/17_UI_LAYOUT.md`.
- `src/components/finance/budget-summary-card.tsx` — redesign layout theo 3 ô info, bỏ progress bar phụ của Remaining Daily Budget.
- `src/features/dashboard/components/dashboard-screen.tsx` — truyền props mới, thêm helper format hiển thị.
- `src/features/finance/lib/finance-service.ts` — thêm `getTodaysExpenseTotal`, `checkDailyBudgetOverspend` phục vụ rule EXP-007.
- `src/features/expense/components/expense-screen.tsx` — thêm Confirmation Dialog cảnh báo vượt Remaining Daily Budget trước khi lưu Expense (không chặn lưu).

### Không thay đổi

- `specs/11_DATA_MODEL.md` — không thêm field lưu trữ mới; `spendingPaceDelta` và `projectedDaysLeft` là derived data, tính runtime.
- Không đổi field name hiện có trong `pace_mvp_state`.
- Không thêm route hoặc Bottom Navigation item mới.
