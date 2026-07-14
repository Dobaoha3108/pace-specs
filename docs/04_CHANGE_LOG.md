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

## 2026-07-13 (5) — Bug fix: Reward dùng icon/logo mặc định thay vì asset thật

### Phân loại

Bug implementation (không phải requirement mới) — asset đã có sẵn trong `assets/icons/pig_coin.png` và `assets/voucher/Logo *.png`, nhưng code chưa nối vào.

### Code thay đổi

- `src/features/reward/lib/reward-service.ts` — bổ sung field `brandLogo` (trỏ tới đúng file trong `public/assets/voucher/`) cho cả 5 voucher mock: Highlands Coffee, CGV, Circle K, Mixue, ShopeeFood. Field `brandLogo` đã tồn tại sẵn trong type `Voucher` (`src/types/finance.ts`), chỉ là mock data chưa điền.
- `src/features/reward/components/reward-screen.tsx` — Pig Coin Balance card: thay icon `Coins` (lucide-react, mặc định) bằng ảnh `/assets/icons/pig_coin.png` thật.

### Không thay đổi

- `src/components/reward/voucher-card.tsx` giữ nguyên fallback icon `Gift` khi `brandLogo` không có — đây là cơ chế dự phòng hợp lý, không phải lỗi.

## 2026-07-13 (6) — Redesign Pig Coin Balance Card theo mẫu tham khảo

### Lý do

Bản sửa trước (icon/logo asset) chưa đúng ý — User muốn redesign toàn bộ card: nền hồng, icon coin cỡ lớn không nền, có hình Pig Pig mascot, đổi thứ tự hiển thị.

### Spec thay đổi

- `specs/17_UI_LAYOUT.md` — mục "Pig Coin Balance Card": mô tả chi tiết layout mới (nền #FDC9D3, thứ tự Label → Coin Icon + Balance → My Voucher link, mascot Pig Pig bên phải).

### Code thay đổi

- `src/lib/finance/amount.ts` — thêm `formatNumber()` (định dạng số có dấu chấm phân cách, không phải tiền tệ) dùng cho Pig Coin Balance.
- `src/features/reward/components/reward-screen.tsx` — redesign Pig Coin Balance Card: nền `bg-pace-pig-highlight` (#FDC9D3), icon `pig_coin.png` cỡ lớn không nền tròn, thêm mascot `pig-pig/pig_default.png` bên phải, thêm link "My Voucher" trong card (giữ nguyên Button "My Voucher" riêng bên dưới card không đổi).

### Không thay đổi

- Nút "My Voucher" dạng button riêng bên dưới card (đã có từ trước) vẫn giữ nguyên, không bị xoá — link "My Voucher" trong card là lối vào bổ sung, không thay thế.

## 2026-07-13 (7) — Điều chỉnh chi tiết Pig Coin Balance Card (typography, kích thước mascot, layout 2 cột)

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

## 2026-07-13 (8) — Chỉnh chính xác tỉ lệ mascot heo và pig coin icon theo chiều cao card

### Lý do

User yêu cầu tỉ lệ cụ thể hơn: mascot cao 2/3 card (căn giữa đều 2 mép), pig coin icon cao 1/4 card (xấp xỉ chiều cao chữ số đầu của số Pig Coin).

### Spec thay đổi

- `specs/17_UI_LAYOUT.md` — Pig Coin Balance Card: đổi "chiều cao tối thiểu ~190px" thành "chiều cao cố định 200px" (cần cố định để các tỉ lệ phân số dưới đây tính được chính xác); pig_coin icon quy định rõ = 1/4 chiều cao card (50px); mascot quy định rõ = 2/3 chiều cao card, căn giữa đều 2 mép trên dưới.

### Code thay đổi

- `src/features/reward/components/reward-screen.tsx`:
  - Card đổi từ `min-h-[190px]` sang `h-[200px]` (cố định) — cần thiết để các class tỉ lệ (`h-2/3`) bên dưới tính đúng theo phần trăm chiều cao thật của card.
  - Pig Coin icon: `height={44}` → `height={50}` (đúng 1/4 của 200px).
  - Mascot Pig Pig: đổi từ chiều cao cố định `max-h-[150px]` sang class tỉ lệ `h-2/3` (luôn đúng 2/3 chiều cao card dù card có đổi kích thước sau này), vẫn giữ `object-contain` để không méo hình.

## 2026-07-13 (9) — Bug fix: ảnh mascot/pig coin vẫn nhỏ dù đã set width/height

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

## 2026-07-14 (3) — Rút gọn User ID còn 8 chữ số; đề xuất Delta Spec cho đổi Avatar/Tên

### Phân loại

- **User ID quá dài**: Bug/display fix — User ID thực tế đang hiển thị là UUID đầy đủ 36 ký tự (`crypto.randomUUID()`), không phải "PACE000001" ngắn gọn như Mock Data trong spec mô tả.
- **Đổi Avatar + Đổi tên**: Requirement mới — `feature-specs/29_PROFILE.md` mục 21 ghi rõ "Đổi Avatar" hiện **chưa thuộc phạm vi MVP** → tách thành `DELTA-006`, cần bạn xác nhận trước khi code (đặc biệt phần Avatar, có 2 phương án kỹ thuật khác nhau).

### Spec thay đổi

- `feature-specs/29_PROFILE.md` — ghi chú User ID hiển thị rút gọn 8 chữ số (derived, không lưu field mới).
- `docs/03_DELTA_SPEC.md` — thêm `DELTA-006` (Proposed) cho Đổi Avatar + Đổi tên.

### Code thay đổi

- `src/lib/id.ts` — thêm `formatShortDisplayId()`: hàm hash một chiều, luôn cho ra đúng 8 chữ số ổn định (cùng input → cùng output) từ id thật, chỉ dùng để hiển thị.
- `src/features/profile/components/profile-screen.tsx` — User ID hiển thị đổi thành `PACE{8 chữ số}` thay vì UUID đầy đủ.

### Không thay đổi

- Field `id` thật của User (UUID) giữ nguyên 100%, vẫn dùng làm khoá liên kết Budget/Expense/SavingGoal/... như cũ — chỉ đổi cách **hiển thị**, không đổi dữ liệu lưu trữ.
