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

## 2026-07-13 (5) — Bug fix: Reward dùng icon/logo mặc định thay vì asset thật

### Phân loại

Bug implementation (không phải requirement mới) — asset đã có sẵn trong `assets/icons/pig_coin.png` và `assets/voucher/Logo *.png`, nhưng code chưa nối vào.

### Code thay đổi

- `src/features/reward/lib/reward-service.ts` — bổ sung field `brandLogo` (trỏ tới đúng file trong `public/assets/voucher/`) cho cả 5 voucher mock: Highlands Coffee, CGV, Circle K, Mixue, ShopeeFood. Field `brandLogo` đã tồn tại sẵn trong type `Voucher` (`src/types/finance.ts`), chỉ là mock data chưa điền.
- `src/features/reward/components/reward-screen.tsx` — Pig Coin Balance card: thay icon `Coins` (lucide-react, mặc định) bằng ảnh `/assets/icons/pig_coin.png` thật.

### Không thay đổi

- `src/components/reward/voucher-card.tsx` giữ nguyên fallback icon `Gift` khi `brandLogo` không có — đây là cơ chế dự phòng hợp lý, không phải lỗi.

## 2026-07-13 (6) — Onboarding: Budget Reset Day do User tự chọn, không còn mặc định theo ngày hoàn thành Onboarding

### Trạng thái

`Merged`. Nguồn gốc: `docs/03_DELTA_SPEC.md` — DELTA-003. (Thay thế entry PROPOSAL cùng nội dung trước đó — đã chốt xong Open Question và merge vào spec + code.)

### Lý do

Trước đó `budgetResetDay` được System tự gán bằng ngày User hoàn thành Onboarding (`new Date().getDate()`), User không được hỏi và không thể chọn ngày này. Yêu cầu mới: User phải tự nhập/chọn Budget Reset Day (ngày nhận Income hàng tháng) qua UI chọn lịch, khớp với thiết kế gốc ở `specs/13_BUSINESS WORKFLOW.md` và field `payday` ở `specs/10_DOMAIN_MODEL.md`.

### Spec thay đổi

- `feature-specs/21_ONBOARDING.md` — Version 1.1 → 1.2 (Status: Final). Thêm Bước 2.0 "Chọn Budget Reset Day" bắt buộc, hiển thị đầu tiên trong Financial Setup, trước khi xác định Scenario A/B; Scenario A/B giờ xác định bằng so sánh ngày hôm nay với Budget Reset Day vừa chọn (thay vì "ngày 1 đầu tháng dương lịch"). Cập nhật Screen Content, User Actions, System Response, Navigation, Display Rules, Validation, AC-003/004/008, thêm AC-004a, AC-008b. Thêm `CMP-016 Day Picker Grid` vào Used Components.
- `specs/11_DATA_MODEL.md` — field `budgetResetDay`: bỏ mô tả "mặc định bằng ngày hoàn thành Onboarding", ghi rõ là input bắt buộc từ User, thêm rule tháng thiếu ngày (dùng ngày cuối tháng).
- `specs/16_COMPONENT_LIBRARY` — thêm `CMP-016 Day Picker Grid` (lưới chọn ngày 1–31, dùng cho Onboarding và Budget Settings).
- `docs/03_DELTA_SPEC.md` — DELTA-003 chuyển sang `Merged`, ghi lại quyết định cho từng Open Question cũ. Tạo `DELTA-004` (`Proposed`, chưa merge) để theo dõi riêng phần "đổi mốc tính số ngày còn lại trong chu kỳ ở Dashboard/Expense theo Budget Reset Day" — nằm ngoài phạm vi Onboarding, không block việc merge DELTA-003.

### Code thay đổi

- `src/features/onboarding/types.ts` — thêm field `budgetResetDay: number` vào `FinancialSetupData`.
- `src/features/onboarding/components/onboarding-screen.tsx` — thêm Bước 2.0 (Day Picker Grid chọn 1–31, bắt buộc); thêm logic xác định Scenario A/B bằng cách so sánh ngày hôm nay với `budgetResetDay` vừa chọn; tách UI Financial Setup thành 2 nhánh theo Scenario (Scenario A: Monthly Income + Fixed Expenses; Scenario B: Remaining Budget); bỏ `const budgetResetDay = new Date().getDate();`, dùng giá trị User chọn khi tạo Budget.
- `src/lib/finance/amount.ts` — thêm `resolveBudgetResetDayForMonth()` (áp dụng rule "tháng thiếu ngày → dùng ngày cuối tháng") và `isBudgetResetDay()` / `getNextBudgetResetDate()` phục vụ xác định Scenario.
- `src/lib/validation/business-rules.ts` — `assertBudgetIsValid()`: chỉ bắt buộc `monthlyBudget = monthlyIncome - fixedExpenses` khi `monthlyIncome > 0` (Scenario A); với Scenario B (`monthlyIncome === 0`), chỉ yêu cầu `monthlyBudget > 0`.

### Không thay đổi

- `specs/12_BUSINESS_RULES.md`, `feature-specs/22_DASHBOARD.md`, `feature-specs/23_EXPENSE.md` — công thức "số ngày còn lại trong chu kỳ" vẫn tính theo hết tháng dương lịch, chưa đổi theo Budget Reset Day. Theo dõi ở DELTA-004 (Proposed).
- Cấu trúc 4 bước chính của Onboarding (`OnboardingStep`) không đổi — Day Picker là bước con trong "Financial Setup", không phải bước mới ở cấp cao nhất.

## 2026-07-13 (7) — Cập nhật quy trình làm việc: không cần chờ duyệt spec trước khi merge

### Lý do

Dương yêu cầu: từ nay khi có requirement mới, AI viết spec chính xác và merge thẳng vào spec chính thức trước khi sửa code, không cần gửi bản nháp chờ duyệt trước — để tiết kiệm thời gian, tránh phải trao đổi qua lại nhiều lần cho cùng một yêu cầu.

### Spec thay đổi

- `docs/00_TECH_RULES.md` — thêm mục "Quy trình khi có Requirement mới": AI tự quyết định Open Question hợp lý, merge thẳng vào `specs/`/`feature-specs/`, cập nhật `docs/03_DELTA_SPEC.md` (Merged) và `docs/04_CHANGE_LOG.md`, sửa code, build/lint, rồi mới đóng gói `.zip` giao một lần duy nhất. Chỉ giữ trạng thái `Proposed` cho phần thực sự cần quyết định business nằm ngoài phạm vi yêu cầu ban đầu (ví dụ DELTA-004 ở trên).

### Không thay đổi

- Không ảnh hưởng tới spec/code của bất kỳ feature nào khác.
