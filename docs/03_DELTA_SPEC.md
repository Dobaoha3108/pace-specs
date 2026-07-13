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

1. **Vị trí câu hỏi Budget Reset Day trong Step 2**: hỏi **trước tiên** (Step 2.0), trước Monthly Income/Fixed Expenses/Remaining Budget. Lý do: bắt buộc phải biết ngày này mới xác định được Scenario A hay B, nên không thể hỏi sau.
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

Proposed — chưa merge. Nằm ngoài phạm vi yêu cầu Onboarding ban đầu, tạo ra do hệ quả của DELTA-003 (mục Open Question #2 cũ).

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

