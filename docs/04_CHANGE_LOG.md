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

## 2026-07-13 (5) — Onboarding: Budget Reset Day do User tự chọn, không còn mặc định theo ngày hoàn thành Onboarding

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

## 2026-07-13 (6) — Bug fix: Reward dùng icon/logo mặc định thay vì asset thật


### Phân loại

Bug implementation (không phải requirement mới) — asset đã có sẵn trong `assets/icons/pig_coin.png` và `assets/voucher/Logo *.png`, nhưng code chưa nối vào.

### Code thay đổi

- `src/features/reward/lib/reward-service.ts` — bổ sung field `brandLogo` (trỏ tới đúng file trong `public/assets/voucher/`) cho cả 5 voucher mock: Highlands Coffee, CGV, Circle K, Mixue, ShopeeFood. Field `brandLogo` đã tồn tại sẵn trong type `Voucher` (`src/types/finance.ts`), chỉ là mock data chưa điền.
- `src/features/reward/components/reward-screen.tsx` — Pig Coin Balance card: thay icon `Coins` (lucide-react, mặc định) bằng ảnh `/assets/icons/pig_coin.png` thật.

### Không thay đổi

- `src/components/reward/voucher-card.tsx` giữ nguyên fallback icon `Gift` khi `brandLogo` không có — đây là cơ chế dự phòng hợp lý, không phải lỗi.

## 2026-07-13 (7) — Redesign Pig Coin Balance Card theo mẫu tham khảo

### Lý do

Bản sửa trước (icon/logo asset) chưa đúng ý — User muốn redesign toàn bộ card: nền hồng, icon coin cỡ lớn không nền, có hình Pig Pig mascot, đổi thứ tự hiển thị.

### Spec thay đổi

- `specs/17_UI_LAYOUT.md` — mục "Pig Coin Balance Card": mô tả chi tiết layout mới (nền #FDC9D3, thứ tự Label → Coin Icon + Balance → My Voucher link, mascot Pig Pig bên phải).

### Code thay đổi

- `src/lib/finance/amount.ts` — thêm `formatNumber()` (định dạng số có dấu chấm phân cách, không phải tiền tệ) dùng cho Pig Coin Balance.
- `src/features/reward/components/reward-screen.tsx` — redesign Pig Coin Balance Card: nền `bg-pace-pig-highlight` (#FDC9D3), icon `pig_coin.png` cỡ lớn không nền tròn, thêm mascot `pig-pig/pig_default.png` bên phải, thêm link "My Voucher" trong card (giữ nguyên Button "My Voucher" riêng bên dưới card không đổi).

### Không thay đổi

- Nút "My Voucher" dạng button riêng bên dưới card (đã có từ trước) vẫn giữ nguyên, không bị xoá — link "My Voucher" trong card là lối vào bổ sung, không thay thế.

## 2026-07-13 (8) — Điều chỉnh chi tiết Pig Coin Balance Card (typography, kích thước mascot, layout 2 cột)

### Lý do

User phản hồi chi tiết sau khi test bản redesign trước: tiêu đề/số quá nhỏ, mascot heo quá bé, cần layout 2 cột rõ ràng và đổi màu nền.

### Spec thay đổi

- `specs/17_UI_LAYOUT.md` — mục "Pig Coin Balance Card": cập nhật màu nền (#FFE6EA), font-size/weight cụ thể cho tiêu đề (20px/700) và số (44px/800), thêm sub-label "Pig Coin", quy định tỉ lệ layout 2 cột (58%/42%) và tỉ lệ mascot heo (~65-75% chiều cao card).

### Code thay đổi

- `src/features/reward/components/reward-screen.tsx` — Pig Coin Balance Card:
  - Nền đổi sang `bg-[#FFE6EA]`.
  - Tiêu đề "Pig Coin của bạn": `text-title font-bold text-pace-text-primary` (20px, weight 700, màu đen) thay vì `text-caption text-pace-text-secondary` (13px, xám).
  - Số Pig Coin: `text-[44px] font-extrabold` thay vì `text-h2` (24px). Thêm dòng label phụ "Pig Coin" màu xám bên dưới.
  - Mascot Pig Pig: tăng từ 96px lên 150px (~65-75% chiều cao card), dùng `object-contain` để không bị bóp méo/thu nhỏ.
  - Đổi layout từ `justify-between` (chia tuỳ nội dung) sang 2 cột cố định tỉ lệ `w-[58%]` / `w-[42%]`.

## 2026-07-13 (9) — Chỉnh chính xác tỉ lệ mascot heo và pig coin icon theo chiều cao card

### Lý do

User yêu cầu tỉ lệ cụ thể hơn: mascot cao 2/3 card (căn giữa đều 2 mép), pig coin icon cao 1/4 card (xấp xỉ chiều cao chữ số đầu của số Pig Coin).

### Spec thay đổi

- `specs/17_UI_LAYOUT.md` — Pig Coin Balance Card: đổi "chiều cao tối thiểu ~190px" thành "chiều cao cố định 200px" (cần cố định để các tỉ lệ phân số dưới đây tính được chính xác); pig_coin icon quy định rõ = 1/4 chiều cao card (50px); mascot quy định rõ = 2/3 chiều cao card, căn giữa đều 2 mép trên dưới.

### Code thay đổi

- `src/features/reward/components/reward-screen.tsx`:
  - Card đổi từ `min-h-[190px]` sang `h-[200px]` (cố định) — cần thiết để các class tỉ lệ (`h-2/3`) bên dưới tính đúng theo phần trăm chiều cao thật của card.
  - Pig Coin icon: `height={44}` → `height={50}` (đúng 1/4 của 200px).
  - Mascot Pig Pig: đổi từ chiều cao cố định `max-h-[150px]` sang class tỉ lệ `h-2/3` (luôn đúng 2/3 chiều cao card dù card có đổi kích thước sau này), vẫn giữ `object-contain` để không méo hình.

## 2026-07-13 (10) — Bug fix: ảnh mascot/pig coin vẫn nhỏ dù đã set width/height

### Nguyên nhân gốc (root cause)

Tailwind CSS Preflight (`@tailwind base`) có sẵn rule mặc định cho mọi thẻ `<img>`:
```
img, video { max-width: 100%; height: auto; }
```
Rule này thuộc CSS "base layer", có độ ưu tiên **cao hơn** thuộc tính `width`/`height` set qua Next.js `<Image>` (chỉ là HTML attribute, độ ưu tiên trình bày rất thấp) và cũng cao hơn cả class tỉ lệ tương đối `h-2/3` nếu chuỗi % không resolve được thành giá trị definite. Kết quả: ảnh luôn bị co về `height: auto` bất kể đã set số px nào ở props.

### Cách sửa

Dùng **class Tailwind cụ thể** (`h-[Npx] w-[Npx]`) thay vì chỉ dựa vào `width`/`height` props của Next Image hoặc class tỉ lệ phần trăm (`h-2/3`) — vì class Tailwind thuộc "utilities layer", luôn thắng được rule mặc định của Preflight ở "base layer".

### Code thay đổi

- `src/features/reward/components/reward-screen.tsx`:
  - Pig Coin icon: thêm `className="h-[50px] w-[50px]"`.
  - Mascot Pig Pig: đổi từ `h-2/3 w-auto` (tương đối, không đáng tin cậy qua chuỗi flex nhiều lớp) sang `h-[133px] w-[133px]` (cố định, đúng bằng 2/3 của card 200px).

## 2026-07-13 (11) — Cập nhật quy trình làm việc: không cần chờ duyệt spec trước khi merge

### Lý do

Dương yêu cầu: từ nay khi có requirement mới, AI viết spec chính xác và merge thẳng vào spec chính thức trước khi sửa code, không cần gửi bản nháp chờ duyệt trước — để tiết kiệm thời gian, tránh phải trao đổi qua lại nhiều lần cho cùng một yêu cầu.

### Spec thay đổi

- `docs/00_TECH_RULES.md` — thêm mục "Quy trình khi có Requirement mới": AI tự quyết định Open Question hợp lý, merge thẳng vào `specs/`/`feature-specs/`, cập nhật `docs/03_DELTA_SPEC.md` (Merged) và `docs/04_CHANGE_LOG.md`, sửa code, build/lint, rồi mới đóng gói `.zip` giao một lần duy nhất. Chỉ giữ trạng thái `Proposed` cho phần thực sự cần quyết định business nằm ngoài phạm vi yêu cầu ban đầu.

### Không thay đổi

- Không ảnh hưởng tới spec/code của bất kỳ feature nào khác.

## 2026-07-13 (12) — Onboarding: Bỏ Scenario A/B, luôn yêu cầu đủ Budget Reset Day + Monthly Income + Fixed Expenses

### Trạng thái

Merged. Nguồn gốc: `docs/03_DELTA_SPEC.md` — DELTA-006. Thay thế cách tiếp cận Scenario A/B của DELTA-003.

### Lý do

Dương phản hồi sau khi test bản deploy (DELTA-003): ngày hoàn thành Onboarding không quan trọng. Không muốn nhánh "Scenario B" (chỉ hỏi Remaining Budget, hoãn Monthly Income/Fixed Expenses tới chu kỳ sau) nữa — muốn Financial Setup luôn thu thập đủ 3 thông tin (Budget Reset Day, Monthly Income, Fixed Expenses) ngay từ đầu, bất kể Onboarding vào ngày nào trong tháng.

### Spec thay đổi

- `feature-specs/21_ONBOARDING.md` — Version 1.2 → 1.3 (Status: Final). Bỏ toàn bộ khái niệm Scenario A/B khỏi Budget Reset Day, Budget Initialization, Screen Content (Step 2), User Actions, System Response, Navigation, Display Rules, Validation. AC-003 viết lại thành luồng đơn (luôn hiển thị Monthly Income + Fixed Expenses); AC-004 và AC-006 (Remaining Budget) đánh dấu Đã bỏ; AC-004a, AC-005 cập nhật lại cho khớp luồng đơn.
- `specs/17_UI_LAYOUT.md` — mục "Financial Setup" (Onboarding Step 2): bỏ Scenario A/B, chỉ còn 1 layout duy nhất (Day Picker Grid + Monthly Income + Fixed Expense + Preview Card).
- `docs/03_DELTA_SPEC.md` — thêm `DELTA-006` (`Merged`), ghi chú DELTA-003 mục Quyết định #1 đã được DELTA-006 thay thế một phần (bỏ lý do "xác định Scenario").

### Code thay đổi

- `src/features/onboarding/components/onboarding-screen.tsx` — bỏ hoàn toàn logic `isScenarioA`, state/input `remainingBudget`, và nhánh UI Scenario B; `FinancialSetupStep` giờ luôn hiển thị Day Picker Grid + Monthly Income + Fixed Cost; `validateFinancialSetup()` và `continueFromFinancialSetup()` không còn rẽ nhánh theo Scenario, luôn validate đủ cả 3 trường; bỏ import `isBudgetResetDay` (không còn dùng trong file này).

### Không thay đổi

- `src/features/onboarding/types.ts`, `src/lib/validation/business-rules.ts`, `src/lib/finance/amount.ts` — không cần sửa. Field `remainingBudget` trong `FinancialSetupData` vẫn giữ, dùng làm giá trị Budget ban đầu (= Monthly Income − Fixed Expenses). Các helper Budget Reset Day (`resolveBudgetResetDayForMonth`, `isBudgetResetDay`, `getNextBudgetResetDate`) và nhánh `assertBudgetIsValid` cho `monthlyIncome === 0` vẫn giữ nguyên trong code — không gây hại, có thể tái sử dụng cho Budget Settings sau này.
- `specs/11_DATA_MODEL.md`, `specs/12_BUSINESS_RULES.md`, `specs/16_COMPONENT_LIBRARY` — không đổi.

## 2026-07-14 — Bug fix: thiếu nút huỷ yêu cầu Withdraw trong màn hình chờ 2 giờ (Commitment)

### Phân loại

Bug implementation — rule `SVG-007` (đã có sẵn trong spec từ trước) quy định rõ: "Trong thời gian chờ: ... User có thể hủy yêu cầu Withdraw", nhưng code chỉ hiển thị thông báo "Withdraw request is pending" mà không có nút thao tác nào để huỷ.

(Màn hình chờ 12 giờ Cancel Saving Goal đã có sẵn nút "Undo Cancel" đúng theo SVG-009 — không có lỗi.)

### Code thay đổi

- `src/features/saving-goal/components/saving-goal-screen.tsx` — thêm hàm `cancelWithdrawRequest()` (xoá các field `withdrawRequestedAmount`, `withdrawRequestedAt`, `withdrawAvailableAt`, Goal trở lại trạng thái bình thường không có pending withdraw) và nút "Cancel Withdraw Request" trong màn hình chờ 2 giờ.

### Ghi chú — cần bạn xác nhận thêm

"Delete Saving Goal" là tính năng **hoàn toàn mới**, chưa từng có trong spec — đã tách thành `DELTA-005` trong `docs/03_DELTA_SPEC.md` (Proposed), có 2 phương án đề xuất kèm câu hỏi cần bạn xác nhận trước khi code, để tránh làm sai ý hoặc gây rủi ro mất tiền/mất Goal không thể khôi phục.

## 2026-07-14 (2) — Tăng mạnh kích thước mascot và pig coin icon (vẫn còn nhỏ sau lần sửa trước)

### Lý do

User phản hồi sau khi deploy: dù đã áp dụng lần sửa trước (h-[133px]/h-[50px] cố định, đã build/verify đúng trong CSS), mascot và icon nhìn vẫn nhỏ so với mong đợi. Không phải bug lần này — tăng số đo lớn hơn hẳn theo phản hồi trực tiếp.

### Code thay đổi

- `src/features/reward/components/reward-screen.tsx`:
  - Card: `h-[200px]` → `h-[235px]`.
  - Mascot Pig Pig: `h-[133px] w-[133px]` → `h-[190px] w-[190px]` (~81% chiều cao card, tăng đáng kể so với 2/3 trước đó).
  - Pig Coin icon: `h-[50px] w-[50px]` → `h-[58px] w-[58px]`.
  - Cột trái/phải: `58%/42%` → `54%/46%` (nhường thêm không gian ngang cho mascot).
  - Đã tính toán để mascot 190px vẫn nằm gọn trong vùng nội dung card sau khi trừ padding (235px − 40px padding = 195px available, mascot 190px vừa khít, không bị cắt bởi `overflow-hidden`).

## 2026-07-14 (3) — Dashboard: "Hôm nay nên tiêu" gộp 1 dòng, "Dự kiến hết" tính theo Budget Reset Day, Budget Streak Flame + Reward 35 Pig Coin

### Nguồn gốc

Merge trực tiếp từ `docs/03_DELTA_SPEC.md` — DELTA-007 (đồng thời hoàn tất DELTA-004 còn treo). Theo quy trình mới đã thống nhất với Dương: requirement mới → viết spec chính xác → merge thẳng vào spec chính thức, không dừng lại chờ duyệt trước khi gửi.

### Lý do

Dương yêu cầu 3 thay đổi cho Dashboard:

1. Ô "Hôm nay nên tiêu" (ví dụ 80.000đ/100.000đ): đưa số tiền nên tiêu 1 ngày (100.000đ) về chung 1 dòng với số tiền còn lại (80.000đ), thay vì tách 2 dòng như hiện tại.
2. Ô "Dự kiến hết trong XX ngày": đổi công thức — XX = Ngày nhận Income (Budget Reset Day) tháng sau trừ ngày nhận Income tháng trước, luôn trong khoảng 28–31 ngày tuỳ lịch/tháng User chọn, thay vì tính theo tốc độ chi tiêu như cũ.
3. Budget Streak: hiển thị 7 ngọn lửa tương ứng 7 ngày streak — ngày hoàn thành thì ngọn lửa hiện màu, ngày chưa hoàn thành thì ngọn lửa là hình bóng (không màu); đủ màu cả 7 ngọn lửa thì được thưởng 35 Pig Coin.

### Spec thay đổi

- `specs/17_UI_LAYOUT.md` — mục "Budget Overview Card": Ô 1 ghi rõ 2 giá trị luôn nằm chung 1 dòng; Ô 2 đổi hẳn công thức "Dự kiến hết" sang "Số ngày trong chu kỳ" (tính theo Budget Reset Day, 28–31 ngày); thêm định nghĩa "Số ngày còn lại của chu kỳ" theo Budget Reset Day (dùng chung cho baseline "Số tiền được tiêu hôm nay" và ngưỡng EXP-007) — thay thế mốc "hết tháng dương lịch" cũ, hoàn tất DELTA-004. Mục "Budget Streak Card": mô tả 7 icon ngọn lửa, quy tắc màu/không màu.
- `specs/12_BUSINESS_RULES.md` — `STR-004`: ghi rõ phần thưởng là 35 Pig Coin (trước đây ghi chung chung "chính sách Reward hiện hành"). Thêm rule mới `STR-005` — Budget Streak Flame Display, định nghĩa chi tiết quy tắc hiển thị 7 icon.
- `feature-specs/22_DASHBOARD.md` — cập nhật 3 vị trí mô tả Budget Streak (Section 5, Display Rules, AC-007) theo flame + reward mới.
- `docs/03_DELTA_SPEC.md` — thêm `DELTA-007` (Merged), cập nhật `DELTA-004` sang Merged (thực hiện bởi DELTA-007).

### Code thay đổi

Đã thực hiện và build/typecheck sạch lỗi (`npx tsc --noEmit` + `npx next build`):

- `src/lib/finance/amount.ts` — thêm `getPreviousBudgetResetDate()`, `getRemainingDaysInCycle()` và `getCycleLengthDays()`, tính theo `budgetResetDay` (dùng rule tháng thiếu ngày đã có sẵn qua `resolveBudgetResetDayForMonth`/`getNextBudgetResetDate`).
- `src/features/finance/lib/finance-service.ts` — `recalculateBudget()`, `getTodayBudgetBreakdown()`, `checkDailyBudgetOverspend()` đổi từ `getRemainingDaysInMonth()` sang `getRemainingDaysInCycle(budget.budgetResetDay, ...)`. Thêm `awardBudgetStreakReward()` — cộng đúng 35 Pig Coin vào Pig Coin Wallet khi `evaluateBudgetStreak()` xác nhận đủ 7/7 ngày hợp lệ, sau đó reset `currentStreak` về 0 (bắt đầu chu kỳ 7 ngày flame kế tiếp) — theo STR-004/STR-005.
- `src/features/dashboard/lib/dashboard-view-model.ts` — `projectedDaysLeft` đổi hẳn sang `getCycleLengthDays(budget.budgetResetDay, now)` (không còn tính theo tốc độ chi tiêu); bỏ các biến/hàm chỉ phục vụ công thức cũ (`isThisMonth`, `elapsedDaysInCycle`, `cycleSpendingSoFar`, `averageDailySpending`); `weeklyBudget` cũng đổi sang `getRemainingDaysInCycle`.
- `src/features/onboarding/components/onboarding-screen.tsx` — `remainingDailyBudget` khởi tạo lúc hoàn thành Onboarding đổi sang `getRemainingDaysInCycle(budgetResetDay, ...)` thay vì tính theo hết tháng dương lịch, đồng bộ với Dashboard/Expense ngay từ đầu.
- `src/components/finance/budget-summary-card.tsx` — Ô "Hôm nay nên tiêu": `value` và `secondaryValue` giờ render trong cùng một dòng (`<span>` inline), không còn tách 2 dòng.
- `src/components/finance/budget-streak-card.tsx` — bỏ thanh Progress, đổi sang render dải 7 icon `Flame`: tô màu (`fill-pace-warning`) cho ngày đã hoàn thành, dạng outline không tô màu cho ngày chưa hoàn thành; `rewardHint` cập nhật nội dung "Đủ 7 ngọn lửa nhận 35 Pig Coin."

### Không thay đổi

- `specs/11_DATA_MODEL.md` — không thêm field lưu trữ mới; toàn bộ số liệu trên đều là derived data, tính runtime.
- Field `budgetResetDay`, cấu trúc `pace_mvp_state` giữ nguyên.
