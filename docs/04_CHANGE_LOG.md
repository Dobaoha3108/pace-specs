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

## 2026-07-13 (2) — Ô "Hôm nay nên tiêu" hiển thị dạng phân số (còn lại/tổng)

### Lý do

User phản hồi sau khi test bản deploy: muốn ô "Hôm nay nên tiêu" thể hiện rõ số tiền còn lại trong ngày trên tổng số được phép tiêu hôm nay (ví dụ 20.000đ / 50.000đ), thay vì chỉ hiện 1 con số duy nhất.

### Spec thay đổi

- `specs/17_UI_LAYOUT.md` — mục "Budget Overview Card": Ô 1 đổi từ hiển thị 1 con số (Remaining Daily Budget) sang dạng phân số "còn lại / baseline cố định trong ngày". Bổ sung công thức tính baseline và số còn lại.
- `specs/12_BUSINESS_RULES.md` — rule `EXP-007`: đổi ngưỡng cảnh báo từ "Remaining Daily Budget hiện tại" sang "Số tiền được tiêu hôm nay" (baseline mới), để khớp với số hiển thị trên Dashboard.

### Code thay đổi

- `src/features/finance/lib/finance-service.ts` — thêm `getTodayBudgetBreakdown()` làm nguồn tính toán chung duy nhất cho baseline/số còn lại hôm nay; `checkDailyBudgetOverspend()` dùng lại hàm này thay vì `budget.remainingDailyBudget`.
- `src/features/dashboard/lib/dashboard-view-model.ts` — dùng `getTodayBudgetBreakdown()` thay vì tự tính, đảm bảo Dashboard và pop-up cảnh báo luôn khớp số.
- `src/features/dashboard/types.ts` — thêm `todayBudgetBaseline`, `todayRemainingBudget`.
- `src/components/finance/budget-summary-card.tsx` — Ô "Hôm nay nên tiêu" hiển thị 2 dòng: số còn lại (đậm) + "/ baseline" (nhỏ, phụ).
- `src/features/dashboard/components/dashboard-screen.tsx` — truyền `todayBudget`, `todayRemaining` thay cho `remainingDailyBudget`.

### Không thay đổi

- Field `remainingDailyBudget` trong Data Model/Local Storage giữ nguyên, vẫn dùng cho Budget Streak (STR rules) như trước — không đổi hành vi Budget Streak.

## 2026-07-13 (3) — Đổi nội dung pop-up cảnh báo vượt ngân sách

### Lý do

User phản hồi: pop-up nên nói rõ tác động lên ngân sách trung bình mỗi ngày (giảm từ bao nhiêu xuống bao nhiêu) thay vì chỉ nói "vượt bao nhiêu tiền hôm nay".

### Spec thay đổi

- `specs/12_BUSINESS_RULES.md` — rule `EXP-007`: đổi nội dung Confirmation Dialog thành "Nếu bạn chi tiêu khoản này, ngân sách trung bình mỗi ngày sẽ giảm từ [X] xuống [Y]". Điều kiện kích hoạt pop-up (so với "Số tiền được tiêu hôm nay") giữ nguyên, chỉ đổi nội dung hiển thị.

### Code thay đổi

- `src/features/finance/lib/finance-service.ts` — `checkDailyBudgetOverspend()` trả về `currentDailyAverage` và `newDailyAverage` (Remaining Budget / số ngày còn lại, trước và sau khoản chi) thay vì `overBy`. Hỗ trợ thêm `previousAmount` để tính đúng khi sửa (Edit) một Expense đã có.
- `src/features/expense/components/expense-screen.tsx` — cập nhật state `pendingOverspend` và nội dung dialog theo format mới.

## 2026-07-13 (4) — Bỏ ô "Tốc độ chi tiêu" khỏi Dashboard

### Lý do

User phản hồi sau khi test: thấy ô "Tốc độ chi tiêu" không cần thiết, muốn bỏ đi.

### Spec thay đổi

- `specs/17_UI_LAYOUT.md` — mục "Budget Overview Card": Info Row đổi từ 3 ô còn 2 ô (chỉ còn "Hôm nay nên tiêu" và "Dự kiến hết"). Bỏ công thức Tốc độ chi tiêu.
- `feature-specs/22_DASHBOARD.md` — bỏ "Budget Status" khỏi danh sách hiển thị của Budget Summary (3 chỗ).

### Code thay đổi

- `src/features/dashboard/lib/dashboard-view-model.ts` — bỏ tính `spendingPaceDelta` (và các biến trung gian chỉ phục vụ nó: `totalDaysInCycle`, `plannedSpendingToDate`), giữ nguyên phần tính `projectedDaysLeft`.
- `src/features/dashboard/types.ts` — bỏ field `spendingPaceDelta`.
- `src/components/finance/budget-summary-card.tsx` — bỏ ô "Tốc độ chi tiêu", đổi grid từ 3 cột sang 2 cột.
- `src/features/dashboard/components/dashboard-screen.tsx` — bỏ props `spendingPaceDelta`/`spendingPaceLabel` và helper `formatSpendingPace`.

### Không thay đổi

- Rule `EXP-007` (pop-up cảnh báo vượt ngân sách hôm nay) không liên quan tới Tốc độ chi tiêu, giữ nguyên không đổi.

## 2026-07-13 (5) — [PROPOSAL] Onboarding: Budget Reset Day do User tự chọn, không còn mặc định theo ngày hoàn thành Onboarding

### Trạng thái

`Proposed` — chờ Dương xác nhận Open Questions ở `docs/03_DELTA_SPEC.md` (DELTA-003) trước khi merge vào spec chính thức và sửa code. Chưa có thay đổi code nào ở mục này.

### Lý do

Hiện tại `budgetResetDay` được System tự gán bằng ngày User hoàn thành Onboarding (`new Date().getDate()`), User không được hỏi và không thể chọn ngày này. Yêu cầu mới: User phải tự nhập/chọn Budget Reset Day (ngày nhận Income hàng tháng) qua UI chọn lịch, khớp với thiết kế gốc ở `specs/13_BUSINESS WORKFLOW.md` và field `payday` ở `specs/10_DOMAIN_MODEL.md`.

### Spec thay đổi (Draft, chờ Approved)

- `feature-specs/21_ONBOARDING.md` — Version 1.1 → 1.2 (Status: Draft). Thêm Bước 0 “Chọn Budget Reset Day” bắt buộc trước khi xác định Scenario A/B; Scenario A/B giờ xác định bằng so sánh ngày hôm nay với Budget Reset Day vừa chọn (thay vì “ngày 1 đầu tháng dương lịch”). Cập nhật Screen Content, User Actions, System Response, Navigation, Display Rules, Validation, AC-003/004/008 và thêm AC-004a, AC-008b.
- `specs/11_DATA_MODEL.md` — field `budgetResetDay`: bỏ mô tả “mặc định bằng ngày hoàn thành Onboarding”, ghi rõ đây là input bắt buộc từ User, thêm rule tháng thiếu ngày (dùng ngày cuối tháng).
- `docs/03_DELTA_SPEC.md` — thêm DELTA-003 (chi tiết flow, validation, open questions).

### Code thay đổi

Chưa có — sẽ thực hiện sau khi Open Questions được xác nhận (dự kiến: `src/features/onboarding/components/onboarding-screen.tsx`, `src/features/onboarding/types.ts`, thêm component chọn lịch mới).

### Chưa thống nhất (xem DELTA-003 để xác nhận)

1. Thứ tự hỏi Budget Reset Day trong Step 2 (trước hay sau Income/Fixed Expenses).
2. Có cần đổi công thức “số ngày còn lại trong chu kỳ” ở Dashboard/Expense (EXP-007, ô “Dự kiến hết”) sang tính theo Budget Reset Day thay vì hết tháng dương lịch hay không — nếu có sẽ cần DELTA-004 riêng.
3. Rule tháng thiếu ngày (chọn 31 → dùng ngày cuối tháng) có đúng ý muốn không.
