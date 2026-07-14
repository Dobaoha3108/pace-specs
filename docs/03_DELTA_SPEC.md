# Delta Spec

Tài liệu này chứa các đề xuất thay đổi/spec mới, **chưa được merge** vào specs chính thức (`specs/`, `feature-specs/`).

Trạng thái mỗi mục:

- `Proposed`: mới đề xuất, chờ duyệt.
- `Approved`: đã duyệt, sẵn sàng merge vào spec gốc.
- `Merged`: đã merge vào spec gốc, có thể xoá khỏi file này.

Sau khi một mục được `Approved`, nội dung sẽ được chuyển vào:

- `specs/17_UI_LAYOUT.md` (phần layout)
- `specs/12_BUSINESS_RULES.md` (phần business rule)
- `specs/11_DATA_MODEL.md` (nếu có field dữ liệu mới)

và ghi lại vào `docs/04_CHANGE_LOG.md`.

---

## DELTA-001

### Status

Merged vào specs/17_UI_LAYOUT.md và feature-specs/22_DASHBOARD.md (xem docs/04_CHANGE_LOG.md)

### Title

Budget Overview Card — Itemized Breakdown

### Related Screen

Dashboard

### Context / Lý do thay đổi

Budget Overview Card hiện tại (`specs/17_UI_LAYOUT.md`, mục "Budget Overview Card") chỉ hiển thị một khối gồm Remaining Budget + Monthly Budget + Remaining Daily Budget dưới dạng 2 progress bar.

Yêu cầu mới: tách thông tin thành từng ô riêng biệt để User đọc nhanh hơn, tham khảo bản thiết kế Figma.

### New Layout — Budget Overview Card

Card hiển thị theo thứ tự:

1. **Header row**
   - Greeting (giữ nguyên từ Section 1 hiện có)
   - Pig Coin Balance (số dư Pig Coin hiện tại)
   - Notification Icon

2. **Remaining Budget Block** (khối chính, nổi bật nhất)
   - Label: "Còn được tiêu trong tháng"
   - Giá trị: `Remaining Budget / Monthly Budget`
   - Progress Bar thể hiện tỉ lệ đã dùng / Monthly Budget

3. **Info Row** — 3 ô nằm ngang, chia đều:
   - **Ô 1 — Hôm nay nên tiêu**: hiển thị `Remaining Daily Budget` hiện tại (đã trừ các Expense hôm nay). Đây chính là field `remainingDailyBudget` đã có sẵn trong Data Model, không cần thêm field mới.
   - **Ô 2 — Dự kiến hết**: hiển thị ngày dự kiến Remaining Budget về 0, tính theo tốc độ chi tiêu trung bình những ngày đã qua trong chu kỳ. Cần field mới hoặc hàm tính runtime (xem mục Data/Logic bên dưới), không lưu trong Local Storage.
   - **Ô 3 — Tốc độ chi tiêu**: so sánh tổng chi tiêu thực tế từ đầu chu kỳ tới hiện tại với mức chi tiêu "kế hoạch" (Monthly Budget chia đều theo số ngày đã trôi qua). Hiển thị dạng phần trăm nhanh/chậm hơn kế hoạch, hoặc nhãn định tính (Tốt/Bình ổn/Nhanh hơn X%).
   - Đây chính là khái niệm **"Budget Status"** đã được nhắc tới trong `feature-specs/22_DASHBOARD.md` (Section 2) nhưng chưa từng được định nghĩa cụ thể ở spec nào khác — Delta này bổ sung định nghĩa chính thức cho nó.

### Data / Logic cần làm rõ (cần bạn xác nhận trước khi merge)

- "Tốc độ chi tiêu" tính theo công thức nào? Đề xuất:
  `Tốc độ chi tiêu (%) = (Tổng chi tiêu thực tế từ đầu chu kỳ / Chi tiêu kế hoạch tới hiện tại) - 1`
  trong đó `Chi tiêu kế hoạch tới hiện tại = Monthly Budget / Tổng số ngày chu kỳ × Số ngày đã trôi qua`.
- "Dự kiến hết" tính theo công thức nào? Đề xuất:
  `Số ngày còn lại dự kiến = Remaining Budget / (Tổng chi tiêu thực tế từ đầu chu kỳ / Số ngày đã trôi qua)`.
- Cả hai giá trị này là **derived data**, tính runtime từ Expense hiện có — không lưu thành field mới trong `pace_mvp_state`, tương tự nguyên tắc "Financial Report không được lưu như một nguồn dữ liệu độc lập" (RPT-001) đã áp dụng cho Financial Report.

### Applies To

- Dashboard
- Budget
- UI_LAYOUT

### Priority

Medium

### Impact nếu Approved

- Cập nhật `specs/17_UI_LAYOUT.md` — thay layout "Budget Overview Card".
- Cập nhật `feature-specs/22_DASHBOARD.md` Section 2 — làm rõ định nghĩa "Budget Status".
- Không cần thay đổi `specs/11_DATA_MODEL.md` (không thêm field lưu trữ).
- Code cần sửa: `src/components/finance/budget-summary-card.tsx`, `src/features/dashboard/lib/dashboard-view-model.ts` (thêm hàm tính "dự kiến hết" và "tốc độ chi tiêu").

---

## DELTA-002

### Status

Merged vào specs/12_BUSINESS_RULES.md (rule EXP-007) và feature-specs/23_EXPENSE.md (xem docs/04_CHANGE_LOG.md)

### Title

Overspend Warning Pop-up khi tạo Expense vượt Remaining Daily Budget

### Related Screen

Add Expense, Dashboard

### Context / Lý do thay đổi

Hiện tại khi User chi tiêu vượt `Remaining Daily Budget`, hệ thống chỉ tạo một **Notification** loại "Budget Warning" (NTF-004) và một **Pig Pig Insight** hiển thị dạng banner text trên Dashboard (`feature-specs/22_DASHBOARD.md` dòng ~278). User phải tự vào Notification Center hoặc nhìn banner mới biết — không có cảnh báo tức thời ngay tại thời điểm tạo Expense.

Yêu cầu mới: hiển thị pop-up cảnh báo ngay khi User xác nhận một Expense khiến tổng chi tiêu trong ngày vượt Remaining Daily Budget hiện tại.

### New Rule (EXP-007)

**Title:** Daily Budget Overspend Confirmation

**Description:**

Khi User nhấn Save trên màn hình Add Expense (hoặc Edit Expense), hệ thống phải kiểm tra:

`Tổng Expense (Planned + Completed) trong ngày hôm nay, tính cả Expense vừa nhập > Remaining Daily Budget hiện tại`

Nếu điều kiện đúng:

1. Hiển thị Confirmation Dialog (tái sử dụng component CMP-015 đã có trong `feature-specs/23_EXPENSE.md`) với nội dung cảnh báo số tiền vượt là bao nhiêu.
2. Dialog có 2 lựa chọn:
   - **Tiếp tục lưu** → Expense được tạo bình thường, đồng thời tạo Notification "Budget Warning" như hiện tại (không đổi NTF-004).
   - **Quay lại chỉnh sửa** → đóng dialog, không tạo Expense.

Pop-up này **không chặn** việc tạo Expense (User vẫn có quyền tiêu vượt), chỉ đóng vai trò xác nhận có chủ đích — giữ đúng tinh thần MVP không ép buộc hành vi tài chính của User.

**Applies To:** Expense, Budget, Dashboard

**Priority:** Medium

### Open Question (cần bạn quyết định trước khi Approve)

- Ngưỡng cảnh báo là `Remaining Daily Budget` (theo ngày) hay `Remaining Budget` (theo cả tháng)? Đề xuất trên đang dùng theo ngày, khớp với ví dụ trong ảnh Figma bạn gửi ("Bạn đang tiêu nhanh hơn kế hoạch 18%").
- Pop-up chỉ hiện ở màn Add Expense, hay cũng hiện lại trên Dashboard nếu User mở lại app sau khi đã lỡ vượt? (Đề xuất: không — vì đã có Notification + Insight banner đảm nhiệm việc "nhắc lại", tránh làm phiền User nhiều lần cho cùng một sự kiện.)

### Impact nếu Approved

- Thêm rule `EXP-007` vào `specs/12_BUSINESS_RULES.md`, mục "5. Expense Rules".
- Cập nhật `feature-specs/23_EXPENSE.md` — thêm bước kiểm tra + Confirmation Dialog vào flow Save Expense.
- Không cần field dữ liệu mới.
- Code cần sửa: nơi xử lý Save Expense trong `src/features/finance/lib/finance-service.ts` (hoặc component form Add Expense — cần bạn chỉ đường dẫn file chính xác khi mình đọc thêm phần `features/expense`).

---

## DELTA-003

### Status

Merged vào `feature-specs/21_ONBOARDING.md`, `specs/11_DATA_MODEL.md` (xem `docs/04_CHANGE_LOG.md`). Các Open Question đã được quyết định — xem mục "Quyết định" bên dưới.

### Title

Onboarding bắt User tự chọn Budget Reset Day (Ngày nhận Income hàng tháng) — bỏ default theo ngày hoàn thành Onboarding

### Related Screen

Onboarding (Financial Setup)

### Context / Lý do thay đổi

Hiện tại (`feature-specs/21_ONBOARDING.md`, mục "Budget Initialization" và AC-008), `budgetResetDay` được System **tự gán bằng ngày User hoàn thành Onboarding** (code: `src/features/onboarding/components/onboarding-screen.tsx`, dòng `const budgetResetDay = new Date().getDate();`). User không được hỏi và không thể chọn ngày này trong lúc Onboarding.

Điều này thực ra lệch với 2 spec ở tầng cao hơn vẫn đang mô tả đúng ý định ban đầu:

- `specs/13_BUSINESS WORKFLOW.md`, Workflow "User Onboarding & Budget Initialization", Step 1: liệt kê **"Ngày nhận tiền"** là một trong các thông tin User phải nhập khi Onboarding.
- `specs/10_DOMAIN_MODEL.md`, Entity User: đã có field `payday` (Integer) — "Ngày nhận tiền hàng tháng", tương ứng chính là `budgetResetDay` ở `specs/11_DATA_MODEL.md`.

Yêu cầu mới: đưa Onboarding về đúng thiết kế ban đầu — User phải tự nhập/chọn Budget Reset Day (ngày nhận Income hàng tháng) bằng UI chọn lịch (calendar/day picker), không còn lấy mặc định theo ngày hoàn thành Onboarding.

### New Flow — Financial Setup (Step 2 của Onboarding)

Thứ tự hiển thị mới trong Financial Setup:

1. **Chọn Ngày nhận Income hàng tháng (Budget Reset Day)** — hiển thị **trước tiên**, dạng lưới chọn ngày 1–31 (calendar day-picker), bắt buộc chọn mới được đi tiếp.
2. Sau khi User đã chọn Budget Reset Day, hệ thống xác định lại Scenario dựa trên so sánh **Ngày hôm nay** với **Budget Reset Day vừa chọn** (thay vì so với "ngày 1 đầu tháng dương lịch" như cũ):
   - **Scenario A** — Hôm nay đúng bằng Budget Reset Day vừa chọn (User đang bắt đầu app đúng vào ngày bắt đầu chu kỳ): hiển thị `Monthly Income` + `Fixed Expenses`, tính `Budget = Monthly Income - Fixed Expenses` như hiện tại.
   - **Scenario B** — Hôm nay khác Budget Reset Day vừa chọn (chu kỳ hiện tại đã bắt đầu từ trước, User setup app giữa chừng): hỏi `Remaining Budget` — "Số tiền bạn còn có thể chi tiêu tới trước [Budget Reset Day tiếp theo]", giữ nguyên logic cũ, chỉ đổi mốc "hết tháng dương lịch" thành "tới Budget Reset Day tiếp theo".
3. `budgetResetDay` được lưu vào Budget = giá trị User chọn ở bước 1, không lấy `new Date().getDate()` nữa.

### Validation mới

- Budget Reset Day: Required, Integer 1–31, chỉ chọn qua UI lịch (không cho nhập tay tự do để tránh nhập sai định dạng/ngày không hợp lệ).
- Nếu tháng hiện tại thiếu ngày đó (VD chọn 31, tháng có 28/29/30 ngày): hệ thống tự dùng ngày cuối tháng làm Reset Day thực tế của tháng đó (áp dụng chung, xem thêm `specs/11_DATA_MODEL.md`).

### Applies To

- Onboarding
- Budget
- User

### Priority

High

### Quyết định (đã chốt, không còn Open Question)

1. **Vị trí câu hỏi Budget Reset Day trong Step 2**: hỏi **trước tiên** (Step 2.0), trước Monthly Income/Fixed Expenses. Lý do: đây là thông tin đầu tiên cần thu thập trong Financial Setup. > **Cập nhật theo DELTA-006**: khái niệm Scenario A/B (xác định bằng so sánh ngày hôm nay với Budget Reset Day) đã bị **bỏ hoàn toàn** — xem DELTA-006 bên dưới. Vị trí hỏi Budget Reset Day trước tiên vẫn giữ nguyên, chỉ khác lý do: không còn để "xác định Scenario" mà chỉ đơn thuần là bước thu thập dữ liệu đầu tiên trong Financial Setup.
2. **Ảnh hưởng dây chuyền tới các công thức "số ngày còn lại trong chu kỳ"** (Dashboard/Expense, `getTodayBudgetBreakdown()`, rule `EXP-007`): **giữ nguyên hành vi hiện tại** (tính theo "hết tháng dương lịch" qua `getRemainingDaysInMonth`) trong phạm vi DELTA-003 này. Đây là thay đổi ngoài phạm vi Onboarding, ảnh hưởng nhiều feature khác — theo dõi riêng ở **DELTA-004** (mục dưới đây), giữ trạng thái `Proposed`, không block việc merge DELTA-003.
3. **Ngày cuối tháng thiếu**: xác nhận dùng ngày cuối tháng làm Reset Day thực tế khi tháng đó không có đủ số ngày User chọn (VD chọn 31, tháng chỉ có 28/29/30 ngày). Áp dụng nhất quán ở cả Onboarding lẫn các chu kỳ sau.
4. **Sửa Budget Reset Day sau Onboarding**: giữ nguyên AC-009 cũ — User có thể đổi trong Budget Settings.

### Impact (đã Merged)

- Cập nhật `feature-specs/21_ONBOARDING.md` — Budget Initialization, Screen Content (Step 2), User Actions, System Response, Navigation, Display Rules, Validation, Acceptance Criteria (AC-003/004/008 cập nhật, thêm AC-004a, AC-008b). Version 1.1 → 1.2, Status: Final.
- Cập nhật `specs/11_DATA_MODEL.md` — mô tả `budgetResetDay`: bỏ "mặc định theo ngày hoàn thành Onboarding", ghi rõ là input bắt buộc từ User + rule tháng thiếu ngày.
- Cập nhật `specs/16_COMPONENT_LIBRARY` — thêm `CMP-016 Day Picker Grid`.
- Không đổi `specs/12_BUSINESS_RULES.md`, `feature-specs/22_DASHBOARD.md`, `feature-specs/23_EXPENSE.md` trong Delta này — nằm trong phạm vi DELTA-004.
- Code đã sửa: `src/features/onboarding/components/onboarding-screen.tsx` (bỏ `new Date().getDate()`, thêm UI Day Picker Grid + logic xác định Scenario A/B + branch nhập liệu theo Scenario), `src/features/onboarding/types.ts` (thêm `budgetResetDay` vào `FinancialSetupData`), `src/lib/finance/amount.ts` (thêm helper xác định Scenario + Reset Day thực tế trong tháng thiếu ngày), `src/lib/validation/business-rules.ts` (nới lỏng `assertBudgetIsValid` để hỗ trợ Scenario B).

---

## DELTA-004

### Status

Merged — thực hiện bởi DELTA-007 (xem bên dưới và `docs/04_CHANGE_LOG.md`). Công thức cuối cùng dùng trong `specs/17_UI_LAYOUT.md` ("Số ngày trong chu kỳ" / "Số ngày còn lại của chu kỳ") khác cách đặt tên hàm được đề xuất ở đây (`getRemainingDaysInCycle`) nhưng cùng bản chất: tính theo Budget Reset Day thay vì hết tháng dương lịch.

### Title

Đổi mốc tính "số ngày còn lại trong chu kỳ" ở Dashboard/Expense từ "hết tháng dương lịch" sang "tới Budget Reset Day tiếp theo"

### Context / Lý do thay đổi

Từ DELTA-003, `budgetResetDay` do User tự chọn và có thể khác ngày cuối tháng dương lịch. Tuy nhiên `getRemainingDaysInMonth()` (dùng trong `getTodayBudgetBreakdown()`, `checkDailyBudgetOverspend()` — rule `EXP-007`, và `recalculateBudget()`) vẫn đang tính "số ngày còn lại" theo hết tháng dương lịch, không theo Budget Reset Day. Với User có Budget Reset Day khác ngày cuối tháng, các con số "Hôm nay nên tiêu", "Dự kiến hết", cảnh báo vượt ngân sách ngày (EXP-007) sẽ sai lệch so với chu kỳ Budget thực tế của họ.

### Đề xuất

Thay `getRemainingDaysInMonth(date)` bằng một hàm mới `getRemainingDaysInCycle(date, budgetResetDay)`, tính số ngày từ hôm nay tới trước lần Budget Reset Day tiếp theo (dùng lại rule "tháng thiếu ngày → dùng ngày cuối tháng" đã thống nhất ở DELTA-003).

### Applies To

- Dashboard
- Expense
- Budget

### Priority

Medium (không chặn trải nghiệm hiện tại — công thức cũ vẫn chạy đúng cho User có Budget Reset Day trùng ngày cuối tháng; chỉ sai lệch với User chọn ngày khác).

### Impact nếu Merge

- `specs/12_BUSINESS_RULES.md` (rule `EXP-007`), `feature-specs/22_DASHBOARD.md`, `feature-specs/23_EXPENSE.md` — đổi mô tả mốc tính.
- Code: `src/lib/finance/amount.ts`, `src/features/finance/lib/finance-service.ts`, `src/features/dashboard/lib/dashboard-view-model.ts`.

---

## DELTA-005

### Status

Proposed

### Title

Delete Saving Goal

### Related Screen

Saving Goal Detail

### Context / Lý do thay đổi

Hiện Saving Goal Detail chỉ có 3 hành động cho một Active Saving Goal: Deposit, Withdraw, Edit — cộng thêm Request Cancel (đưa Goal vào trạng thái Cancelling, chờ 12 giờ, tiền trả lại Remaining Budget — theo SVG-008/SVG-010). User muốn bổ sung thêm hành động **Delete Saving Goal**, hiện chưa có trong spec ở bất kỳ tài liệu nào.

### Vấn đề cần làm rõ trước khi code (Open Questions — cần bạn xác nhận)

Delete khác Cancel như thế nào? Đề xuất 2 phương án, bạn chọn 1:

**Phương án A — Delete chỉ áp dụng cho Saving Goal đã Completed/Cancelled (trong Saving Goal History)**
- Dùng khi User muốn dọn dẹp lịch sử, xoá vĩnh viễn 1 mục khỏi Saving Goal History.
- Không ảnh hưởng Budget (vì Completed/Cancelled đã xử lý xong tiền từ trước).
- Không cần thời gian chờ, xoá ngay sau khi xác nhận (Confirmation Dialog).
- Không áp dụng cho Saving Goal đang Active/Cancelling.

**Phương án B — Delete là một lối tắt khác cho Active Saving Goal, khác Cancel**
- Ví dụ: Cancel = phải chờ 12 giờ (có thể Undo); Delete = xoá ngay lập tức, không chờ, không Undo được.
- Cần làm rõ: tiền trong Current Amount xử lý ra sao (trả lại Remaining Budget ngay, hay mất luôn)?
- Rủi ro: dễ nhầm lẫn với Cancel, User có thể xoá nhầm mất tiền/mất Goal vĩnh viễn không có cách khôi phục.

Mình đề xuất **Phương án A** (an toàn hơn, không xung đột với luồng Cancel đã có, đúng tinh thần "Delete = dọn dẹp lịch sử" phổ biến trong các app tài chính). Bạn xác nhận chọn phương án nào, hoặc mô tả lại nếu ý bạn khác 2 phương án trên.

### Applies To

- Saving Goal

### Priority

Medium

### Impact nếu Merge (theo Phương án A)

- `feature-specs/24_SAVING_GOAL.md` — thêm mục Delete Saving Goal vào Saving Goal History flow.
- `specs/12_BUSINESS_RULES.md` — thêm rule mới (SVG-011: Delete Saving Goal, chỉ áp dụng Completed/Cancelled, xoá vĩnh viễn, không hoàn tác).
- `specs/17_UI_LAYOUT.md` — thêm nút Delete vào layout Saving Goal History item.
- Code: `src/features/saving-goal/components/saving-goal-screen.tsx`, `src/features/finance/lib/finance-service.ts` (hàm xoá Saving Goal khỏi Local Storage).

---

## DELTA-006

### Status

Merged vào `feature-specs/21_ONBOARDING.md`, `specs/17_UI_LAYOUT.md` (xem `docs/04_CHANGE_LOG.md`). Thay thế/loại bỏ hoàn toàn khái niệm Scenario A/B đã đưa vào từ DELTA-003.

### Title

Bỏ Scenario A/B trong Onboarding Financial Setup — luôn yêu cầu đủ Budget Reset Day + Monthly Income + Fixed Expenses, bất kể ngày hoàn thành Onboarding

### Related Screen

Onboarding (Financial Setup)

### Context / Lý do thay đổi

DELTA-003 đưa ra 2 kịch bản: nếu ngày hôm nay đúng bằng Budget Reset Day vừa chọn thì hỏi Monthly Income + Fixed Expenses (Scenario A); nếu khác thì chỉ hỏi Remaining Budget (Scenario B), hoãn Monthly Income/Fixed Expenses tới chu kỳ sau. Dương phản hồi sau khi test bản deploy: ngày hoàn thành Onboarding không quan trọng, và không muốn nhánh Scenario B nữa — muốn Financial Setup **luôn** thu thập đủ cả 3 thông tin ngay từ đầu, để có dữ liệu Monthly Income/Fixed Expenses đầy đủ ngay từ chu kỳ đầu tiên thay vì phải đợi tới chu kỳ sau.

### New Flow — Financial Setup (Step 2 của Onboarding)

Chỉ còn **một luồng duy nhất**, áp dụng cho mọi User bất kể Onboarding vào ngày nào trong tháng:

1. Chọn Budget Reset Day (Day Picker Grid, CMP-016, 1–31) — bắt buộc, hiển thị đầu tiên.
2. Nhập Monthly Income — bắt buộc.
3. Nhập Fixed Expenses — bắt buộc.
4. System tính `Budget = Monthly Income - Fixed Expenses`, dùng làm Budget cho chu kỳ hiện tại (chu kỳ đầu tiên, dù có thể là chu kỳ rút gọn nếu hôm nay chưa tới Budget Reset Day).

Không còn bước hỏi "Remaining Budget" trong Onboarding.

### Validation mới

- Budget Reset Day: giữ nguyên như DELTA-003 (Required, 1–31, chỉ chọn qua Day Picker Grid).
- Monthly Income: Required, số, > 0 — áp dụng cho **mọi** User, không phân biệt ngày Onboarding.
- Fixed Expenses: Required, số, ≥ 0, không lớn hơn Monthly Income — áp dụng cho **mọi** User.
- Bỏ hẳn trường/validation "Remaining Budget" khỏi Onboarding.

### Applies To

- Onboarding
- Budget

### Priority

High

### Impact (đã Merged)

- `feature-specs/21_ONBOARDING.md` — Version 1.2 → 1.3 (Status: Final). Bỏ toàn bộ mục "Scenario A" / "Scenario B" (Budget Initialization, Screen Content, User Actions, System Response, Navigation, Display Rules, Validation). AC-003/004/004a/005/006 viết lại thành luồng đơn (không còn phân biệt Scenario); AC-004 (Remaining Budget) và AC-006 bị xoá vì không còn áp dụng.
- `specs/17_UI_LAYOUT.md` — mục "Financial Setup" (Onboarding Step 2): bỏ Scenario A/B, còn một layout duy nhất (Day Picker Grid + Monthly Income + Fixed Expense + Preview Card).
- Không đổi `specs/11_DATA_MODEL.md` — field `monthlyIncome`, `fixedExpenses`, `budgetResetDay` không đổi kiểu/ý nghĩa, chỉ đổi cách Onboarding thu thập chúng (luôn hỏi, không còn hoãn).
- Code đã sửa: `src/features/onboarding/components/onboarding-screen.tsx` (bỏ toàn bộ logic `isScenarioA`/nhánh Remaining Budget, luôn validate + hiển thị Monthly Income/Fixed Expenses), `src/features/onboarding/types.ts` không đổi (field `remainingBudget` trong `FinancialSetupData` vẫn giữ, dùng làm giá trị Budget ban đầu = Monthly Income − Fixed Expenses).
- Không ảnh hưởng `src/lib/validation/business-rules.ts` (`assertBudgetIsValid`) — logic nới lỏng cho Scenario B ở DELTA-003 giờ không còn đường nào gọi tới nhánh `monthlyIncome === 0` từ Onboarding nữa, nhưng vẫn giữ nguyên trong code vì không gây hại (an toàn dự phòng, không phải dead code nguy hiểm).

---

## DELTA-007

### Status

Merged vào `specs/17_UI_LAYOUT.md`, `specs/12_BUSINESS_RULES.md` (STR-004, STR-005 mới), `feature-specs/22_DASHBOARD.md` (xem `docs/04_CHANGE_LOG.md`). Theo quy trình mới đã thống nhất với Dương (requirement mới → viết spec chính xác → merge thẳng vào spec chính thức, không cần dừng lại chờ duyệt), delta này được viết và merge trực tiếp trong cùng một lượt.

### Title

Dashboard: Sửa layout "Hôm nay nên tiêu", đổi công thức "Dự kiến hết" theo Budget Reset Day, và định nghĩa lại Budget Streak Flame + Reward

### Related Screen

Dashboard

### Context / Lý do thay đổi

Ba thay đổi Dương yêu cầu:

1. Ô "Hôm nay nên tiêu" đang hiển thị số tiền còn lại và baseline tách thành 2 dòng riêng (số còn lại đậm ở trên, "/ baseline" nhỏ ở dưới — xem Change Log mục 2026-07-13 (2)). Yêu cầu mới: đưa cả 2 số về **chung một dòng**.
2. Ô "Dự kiến hết" trước đây tính theo tốc độ chi tiêu (`Remaining Budget / tốc độ chi tiêu trung bình`) và dùng mốc "hết tháng dương lịch" cho các phép tính số ngày liên quan (đây chính là nội dung còn treo của DELTA-004). Yêu cầu mới: đổi hẳn cách tính — "Dự kiến hết trong XX ngày" = tổng số ngày của chu kỳ Budget hiện tại = Ngày nhận Income (Budget Reset Day) của chu kỳ kế tiếp trừ ngày nhận Income của chu kỳ hiện tại, luôn nằm trong khoảng 28–31 ngày tuỳ tháng. Nhân tiện việc này cũng giải quyết luôn DELTA-004 (đổi toàn bộ mốc tính "số ngày còn lại của chu kỳ" từ lịch dương sang theo Budget Reset Day).
3. Budget Streak Card hiện chỉ mô tả chung chung "Streak Flame" và phần thưởng theo "chính sách Reward hiện hành" (STR-004 cũ), chưa từng định nghĩa cụ thể. Yêu cầu mới: cụ thể hoá — 7 icon ngọn lửa (1 icon/ngày trong chuỗi 7 ngày), ngày hoàn thành → icon hiện màu, ngày chưa hoàn thành → icon dạng bóng/outline không màu; đủ 7/7 icon màu → thưởng chính xác **35 Pig Coin**.

### Thay đổi đã Merge

- `specs/17_UI_LAYOUT.md` — mục "Budget Overview Card": Ô 1 ghi rõ hiển thị chung 1 dòng; Ô 2 đổi công thức "Dự kiến hết" sang tổng số ngày chu kỳ (theo Budget Reset Day); thêm định nghĩa "Số ngày trong chu kỳ" và cập nhật lại "Số ngày còn lại của chu kỳ" (dùng cho baseline + EXP-007) sang tính theo Budget Reset Day thay vì hết tháng dương lịch. Mục "Budget Streak Card": mô tả rõ 7 icon ngọn lửa, trạng thái màu/không màu.
- `specs/12_BUSINESS_RULES.md` — `STR-004` ghi rõ phần thưởng là 35 Pig Coin (thay vì "chính sách Reward hiện hành" chung chung); thêm rule mới `STR-005` (Budget Streak Flame Display) định nghĩa quy tắc hiển thị 7 icon.
- `feature-specs/22_DASHBOARD.md` — 3 vị trí mô tả Budget Streak (Section 5, Display Rules, AC-007) cập nhật theo flame/reward mới.

### Applies To

- Dashboard
- Budget Streak
- Budget

### Priority

High

### Impact — Code cần sửa (thực hiện khi triển khai, theo spec đã chốt ở trên)

- `src/lib/finance/amount.ts` — thay `getRemainingDaysInMonth`/công thức tốc độ chi tiêu bằng hàm tính theo Budget Reset Day: `getCycleLengthDays(budgetResetDay, referenceDate)` (chu kỳ hiện tại, dùng cho "Dự kiến hết") và `getRemainingDaysInCycle(budgetResetDay, today)` (dùng cho baseline "Số tiền được tiêu hôm nay" + `EXP-007`).
- `src/features/finance/lib/finance-service.ts` — `getTodayBudgetBreakdown()`, `checkDailyBudgetOverspend()` dùng `getRemainingDaysInCycle` thay cho `getRemainingDaysInMonth`.
- `src/features/dashboard/lib/dashboard-view-model.ts` — `projectedDaysLeft` đổi sang trả về `getCycleLengthDays(...)` thay vì công thức tốc độ chi tiêu; bỏ các biến trung gian không còn dùng.
- `src/components/finance/budget-summary-card.tsx` — Ô "Hôm nay nên tiêu": đổi layout `secondaryValue` sang hiển thị inline cùng dòng với `value` (hiện đang tách dòng qua CSS component `BudgetInfoBox`). Budget Streak Card: đổi từ hiển thị text/số streak đơn sang render dải 7 icon ngọn lửa (màu/outline) dựa trên vị trí ngày trong chu kỳ 7 ngày hiện tại.
- Cần field/logic runtime mới để xác định trạng thái từng ngày trong 7 ngày Streak hiện tại (đã hoàn thành hay chưa) — tính từ lịch sử Expense theo ngày, không cần thêm field lưu trữ mới trong `pace_mvp_state` (derived data, tương tự nguyên tắc RPT-001).
- `src/features/finance/lib/finance-service.ts` (hoặc nơi xử lý Budget Streak hiện có) — khi đạt đủ 7/7 ngày, cộng chính xác 35 Pig Coin vào Pig Coin Wallet (thay cho logic "chính sách Reward hiện hành" chưa rõ ràng trước đó).

---

---

## DELTA-008

### Status

Merged vào `feature-specs/27_PIG_PIG.md`, `specs/17_UI_LAYOUT.md` và implementation Pig Pig Chat trong cùng change set. Theo quy trình chính thức: requirement mới → viết spec chính xác → merge vào spec chính thức → cập nhật Delta/Change Log → sửa code → bàn giao file theo đúng repository path.

### Title

Pig Pig Chat: mặc định chỉ hiển thị 03 Suggested Questions, thêm View all/View less, bỏ Label "Message" và cân bằng chiều cao Chat Input với Send Button

### Related Screen

Pig Pig Chat

### Context / Lý do thay đổi

Bản deploy hiện tại hiển thị toàn bộ 20 Suggested Questions/FAQ ngay khi mở màn hình, làm Chat Area dài và chiếm nhiều không gian. Chat Input đang dùng Label "Message", khiến tổng chiều cao vùng Input lớn hơn Send Button và hai khung không thẳng hàng.

### Requirement đã Merge

#### Suggested Questions

1. Trạng thái mặc định chỉ hiển thị 03 Suggested Questions đầu tiên.
2. Bên dưới 03 câu hiển thị Text Button **"View all"**.
3. Chọn **"View all"** hiển thị tối đa 20 Suggested Questions và đổi nút thành **"View less"**.
4. Chọn **"View less"** thu gọn lại còn 03 câu.
5. Việc mở rộng/thu gọn không làm mất Chat History, không xoá nội dung đang nhập và không tự động gửi câu hỏi.
6. Suggested Question vẫn có thể được chọn ở cả trạng thái thu gọn và mở rộng.

#### Chat Input + Send Button

1. Bỏ Label/visible text **"Message"**.
2. Giữ Placeholder **"Hỏi Pig Pig về tài chính của bạn..."**.
3. Text Input và Send Button nằm trên cùng một hàng.
4. Text Input cao cố định 56 px.
5. Send Button có kích thước 56 × 56 px.
6. Send Button chỉ hiển thị Send Icon.
7. Text Input và Send Button phải thẳng hàng theo mép trên và cân giữa theo chiều dọc.
8. Error Message nhập trống hiển thị bên dưới Input, không thay đổi vị trí mép trên của Send Button.

### Acceptance Criteria

- **AC-001:** Khi mở Pig Pig Chat lần đầu, chỉ nhìn thấy đúng 03 Suggested Questions.
- **AC-002:** Text Button "View all" nằm ngay dưới 03 Suggested Questions.
- **AC-003:** Chọn "View all" hiển thị tối đa 20 câu và nút đổi thành "View less".
- **AC-004:** Chọn "View less" trở về đúng 03 câu.
- **AC-005:** Không còn chữ/Label "Message" phía trên Chat Input.
- **AC-006:** Chat Input và Send Button đều cao 56 px và thẳng hàng.
- **AC-007:** Nhấn Enter hoặc Send Button vẫn gửi tin nhắn theo flow hiện hành.
- **AC-008:** Khi Pig Pig đang xử lý, Suggested Question và Send Button vẫn tuân thủ trạng thái disabled hiện hành.
- **AC-009:** Không thay đổi Data Model, Local Storage schema, Chat History hoặc rule tạo phản hồi.

### Impact đã Merge

- `feature-specs/27_PIG_PIG.md` — đã là Version 1.1, Status Final và đã chứa chính xác requirement này; không cần thay đổi nội dung thêm.
- `specs/17_UI_LAYOUT.md` — đồng bộ layout chi tiết cho Collapsed/Expanded Suggested Questions và Chat Input/Send Button.
- `src/features/pig-pig/components/pig-pig-screen.tsx`:
  - `SuggestionChips` thêm state `isExpanded`, mặc định render 03 câu, View all/View less.
  - Bỏ `Input` component có Label bắt buộc tại riêng màn Pig Pig.
  - Dùng native input có accessibility label ẩn, cao 56 px.
  - Send Button cao/rộng 56 px, thẳng hàng với Input.
- `docs/04_CHANGE_LOG.md` — thêm entry tương ứng.

### Không thay đổi

- `specs/11_DATA_MODEL.md`.
- `specs/12_BUSINESS_RULES.md`.
- `src/features/pig-pig/lib/pig-pig-service.ts`.
- Danh sách nội dung 20 Suggested Questions hiện có.
- Logic tạo response và lưu Chat History.

