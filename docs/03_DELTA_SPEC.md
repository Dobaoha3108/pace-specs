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

