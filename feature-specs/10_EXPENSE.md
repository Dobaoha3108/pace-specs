# 10. EXPENSE

Version: 1.1 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Purpose

Expense Management là Feature cho phép User ghi nhận, theo dõi và cập nhật các khoản chi trong PACE.

Expense là nguồn dữ liệu gốc của hệ thống.

Dữ liệu Expense được sử dụng để cập nhật:

- Budget
- Remaining Budget
- Remaining Daily Budget
- Financial Report
- Budget Streak
- Dashboard Summary
- Pig Pig Insight

Expense không trực tiếp làm thay đổi Saving Goal.

---

# 2. Business Objective

Expense Management giúp User:

- Lập kế hoạch chi tiêu.
- Ghi nhận khoản chi đã hoàn thành.
- Theo dõi lịch sử chi tiêu.
- Chỉnh sửa khoản chi.
- Chuyển Expense từ Planned sang Completed.
- Xóa Expense khi cần.
- Cung cấp dữ liệu đầu vào chính xác cho Budget, Dashboard và Financial Report.

---

# 3. Business Responsibility

Expense Management chịu trách nhiệm:

- Create Expense.
- View Expense History.
- View Expense Detail.
- Edit Expense.
- Mark Expense as Completed.
- Delete Expense.
- Đồng bộ Budget và các dữ liệu liên quan sau khi Expense thay đổi.

Expense Management không chịu trách nhiệm:

- Quản lý Saving Goal.
- Tạo Financial Report.
- Đổi Voucher.
- Chat với Pig Pig.

---

# 4. Screen Overview

Feature Name

Expense Management

---

Business Goal

Cho phép User quản lý toàn bộ vòng đời của một Expense.

---

Entry Point

- Bottom Navigation → Add Expense.
- Dashboard → Add Expense.
- Financial Report → Transaction History → View All.
- Notification (Expense Reminder).

---

Exit Point

- Dashboard.
- Financial Report.
- Expense Detail.

---

# 5. Screen Type

Feature Group

Expense Management bao gồm nhiều Screen.

---

## Navigation Context

Bottom Navigation luôn hiển thị trong quá trình sử dụng ứng dụng (ngoại trừ các màn hình đặc biệt như Onboarding, Notification Center hoặc Profile).

Add Expense được mở trực tiếp từ Bottom Navigation.

Expense History là một phần của Report Module.

Cấu trúc điều hướng:

Financial Report

↓

Transaction History

↓

View All

↓

Expense History

↓

Expense Detail

↓

Edit Expense

---

# 6. Used Components

- CMP-001 App Header
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-008 Statistic Card
- CMP-013 Empty State
- CMP-014 Loading State
- CMP-015 Confirmation Dialog

---

# 7. Preconditions

- User đã hoàn thành Onboarding.
- Budget đã được khởi tạo.
- Expense Category đã có dữ liệu mặc định.
- User có thể tạo Expense dù chưa có Saving Goal.

---

# 8. Expense Screens

Expense Management bao gồm các màn hình sau.

---

## Screen 1

### Add Expense

Cho phép User tạo Expense mới.

Đây là màn hình được mở từ Bottom Navigation.

---

## Screen 2

### Expense History

Hiển thị toàn bộ Expense của User.

Được mở từ:

Financial Report

↓

Transaction History

↓

View All

---

## Screen 3

### Expense Detail

Hiển thị toàn bộ thông tin của một Expense.

---

## Screen 4

### Edit Expense

Cho phép User chỉnh sửa Expense.

---

# 9. User Flow

## Create Expense Flow

Dashboard hoặc Bottom Navigation

↓

Add Expense

↓

User nhập Expense Information

↓

Validate

↓

Create Expense

↓

Update Budget

↓

Update Remaining Daily Budget

↓

Update Financial Report

↓

Update Budget Streak

↓

Generate Pig Pig Insight (nếu cần)

↓

Refresh Dashboard

---

## View Expense Flow

Financial Report

↓

Transaction History

↓

View All

↓

Expense History

↓

Expense Detail

---

## Edit Expense Flow

Expense Detail

↓

Edit Expense

↓

Update Expense

↓

Recalculate Related Data

↓

Refresh Expense Detail

---

## Mark Completed Flow

Expense Detail

↓

Mark as Completed

↓

Expense Status = Completed

↓

System cập nhật Budget một lần

↓

Refresh dữ liệu liên quan

---

## Notification Reminder Flow

Planned Date

↓

+1 giờ

↓

Nếu Expense vẫn là Planned

↓

Send Notification

↓

User có thể chọn:

Đã hoàn thành

↓

Expense Status = Completed

---

Nếu sau 24 giờ kể từ Planned Date Expense vẫn ở trạng thái Planned.

↓

System gửi Notification lần thứ hai.

↓

User có thể tiếp tục xác nhận Completed.

---

# 10. Screen Content

## Add Expense

User nhập:

- Amount
- Category
- Note
- Planned Date
- Status

---

Status mặc định:

Planned

---

## Expense History

Hiển thị:

- Expense List.
- Filter theo Status.
- Filter theo Category.
- Empty State.

Mỗi Expense hiển thị:

- Category.
- Amount.
- Note.
- Planned Date.
- Completed Date (nếu có).
- Status.

---

## Expense Detail

Hiển thị:

- Amount.
- Category.
- Note.
- Planned Date.
- Completed Date.
- Status.
- Created At.
- Updated At.

Action:

- Edit Expense.
- Mark as Completed.
- Delete Expense.

---

## Edit Expense

Cho phép chỉnh sửa:

- Amount.
- Category.
- Note.
- Planned Date.
- Status.

Nếu Expense đã Completed.

↓

Completed Date được giữ nguyên.

---

# 11. User Actions

User có thể:

- Create Expense.
- View Expense History.
- View Expense Detail.
- Edit Expense.
- Mark Expense as Completed.
- Delete Expense.
- Filter theo Status.
- Filter theo Category.

---

# 12. System Response

## Create Expense

User tạo Expense hợp lệ.

↓

System lưu Expense.

↓

Nếu Expense ở trạng thái Completed.

↓

System cập nhật:

- Remaining Budget.
- Remaining Daily Budget.
- Financial Report.
- Budget Streak.
- Dashboard Summary.
- Pig Pig Insight (nếu cần).

---

Nếu Expense ở trạng thái Planned.

↓

System chỉ lưu Expense.

↓

Budget chưa thay đổi.

---

## Edit Expense

System cập nhật Expense.

↓

Đồng bộ lại các dữ liệu liên quan nếu cần.

---

## Mark Completed

Expense chuyển từ Planned sang Completed.

↓

System:

- lưu Completed Date.
- cập nhật Remaining Budget.
- cập nhật Remaining Daily Budget.
- cập nhật Financial Report.
- cập nhật Budget Streak.
- cập nhật Dashboard Summary.

Budget không được cập nhật lần thứ hai nếu Expense đã ở trạng thái Completed.

---

## Delete Expense

System xóa Expense.

↓

Đồng bộ lại:

- Remaining Budget.
- Remaining Daily Budget.
- Financial Report.
- Dashboard Summary.

---

# 13. Navigation

## Dashboard

User chọn:

Add Expense

↓

Open Add Expense.

---

## Financial Report

User chọn:

Transaction History

↓

View All

↓

Open Expense History.

---

## Expense History

User chọn một Expense.

↓

Open Expense Detail.

---

## Expense Detail

User chọn:

Edit Expense.

↓

Open Edit Expense.

---

User chọn:

Delete Expense.

↓

Open Confirmation Dialog.

↓

Nếu xác nhận.

↓

Delete Expense.

---

User chọn:

Mark as Completed.

↓

Expense Status chuyển sang Completed.

↓

Refresh Expense Detail.

---

## Notification

User chọn Notification Expense Reminder.

↓

Open Expense Detail.

---

# 14. Display Rules

## Add Expense

Status mặc định:

Planned.

Completed Date không hiển thị.

---

Category sử dụng danh sách Category mặc định của hệ thống.

---

## Expense History

Hiển thị toàn bộ Expense của User.

Mặc định sắp xếp theo:

Planned Date giảm dần.

Thứ tự hiển thị:

- Planned Date gần nhất.
- Planned Date xa nhất.

---

Cho phép Filter theo:

- Status.
- Category.

---

Nếu chưa có Expense.

↓

Hiển thị Empty State.

↓

Hiển thị Button:

Add Expense.

---

## Expense Detail

Luôn hiển thị:

- Amount.
- Category.
- Note.
- Planned Date.
- Status.

---

Nếu Status = Completed.

↓

Hiển thị thêm:

- Completed Date.

---

Nếu Status = Planned.

↓

Hiển thị Button:

Mark as Completed.

---

Nếu Status = Completed.

↓

Ẩn Button:

Mark as Completed.

---

## Edit Expense

Cho phép chỉnh sửa:

- Amount.
- Category.
- Note.
- Planned Date.

---

Nếu Expense đã Completed.

↓

Không cho phép chỉnh sửa Completed Date.

---

## Notification Reminder

Sau Planned Date 1 giờ.

↓

Nếu Expense vẫn ở trạng thái Planned.

↓

System gửi Notification lần thứ nhất.

↓

Nội dung:

"Bạn đã hoàn thành khoản chi này chưa?"

↓

Hiển thị Button:

Đã hoàn thành.

---

Nếu sau 24 giờ kể từ Planned Date Expense vẫn ở trạng thái Planned.

↓

System gửi Notification lần thứ hai.

↓

Nội dung:

"Khoản chi này vẫn chưa được xác nhận. Hãy cập nhật trạng thái để PACE tính toán ngân sách chính xác."

↓

Hiển thị Button:

Đã hoàn thành.

Sau Notification thứ hai, hệ thống không gửi thêm Notification cho Expense này.

---

# 15. Validation

## Amount

- Required.
- Chỉ cho phép nhập số.
- Phải lớn hơn 0.

---

## Category

- Required.

---

## Planned Date

- Required.

---

## Note

Optional.

---

## Status

Mặc định:

Planned.

---

User được phép tạo Expense trực tiếp với Status = Completed.

Giới hạn:

Tối đa hai Expense Completed được tạo trực tiếp trong mỗi tuần.

Nếu vượt quá giới hạn.

↓

Status mặc định chuyển thành Planned.

↓

User cần Mark as Completed sau khi tạo.

---

# 16. Screen States

## Add Expense

- Normal.
- Validation Error.

---

## Expense History

- Loading.
- Empty.
- Normal.

---

## Expense Detail

- Loading.
- Normal.

---

## Edit Expense

- Normal.
- Validation Error.

---

## Delete Confirmation

- Visible.
- Hidden.

---

# 17. Error Handling

## Validation Error

Khi User nhập dữ liệu không hợp lệ.

↓

Hiển thị thông báo màu đỏ ngay bên dưới trường dữ liệu.

Ví dụ:

- "Vui lòng nhập số hợp lệ."
- "Số tiền phải lớn hơn 0."

Thông báo tự động biến mất khi User nhập đúng.

---

## Continue With Invalid Data

Nếu User nhấn Save khi vẫn còn Validation Error.

↓

Hiển thị Dialog:

"Không thể lưu khoản chi.

Vui lòng kiểm tra lại thông tin."

↓

Không lưu Expense.

---

## Expense Creation Failed

Validation thành công.

Nhưng hệ thống không thể lưu Expense.

↓

Hiển thị:

"Không thể tạo khoản chi."

↓

Button:

"Thử lại"

---

## Expense Update Failed

Hiển thị:

"Không thể cập nhật khoản chi."

↓

Button:

"Thử lại"

---

## Expense Delete Failed

Hiển thị:

"Không thể xóa khoản chi."

↓

Button:

"Thử lại"

---

## Expense Load Failed

Hiển thị:

"Không thể tải dữ liệu khoản chi."

↓

Button:

"Thử lại"

---

# 18. Related Specification

## Domain Model

- Expense
- Budget
- BudgetStreak
- FinancialReport
- DashboardSummary
- PigPigInsight

---

## Business Workflow

- Expense Management

---

## System Workflow

- Expense Processing
- Budget Processing
- Dashboard Synchronization

---

## Data Model

- Expense
- Budget
- BudgetStreak
- FinancialReport
- DashboardSummary
- PigPigInsight

---

## Business Rules

- EXP-001
- EXP-002
- EXP-003
- EXP-004

- BGT-001
- BGT-002
- BGT-003

---

## UI Components

- CMP-001 App Header
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-008 Statistic Card
- CMP-013 Empty State
- CMP-014 Loading State
- CMP-015 Confirmation Dialog

---

# 19. Acceptance Criteria

## AC-001

User có thể tạo Expense mới.

---

## AC-002

Expense mới mặc định có Status = Planned.

---

## AC-003

User được phép tạo Expense trực tiếp với Status = Completed.

Giới hạn:

Tối đa hai Expense Completed được tạo trực tiếp trong mỗi tuần.

Nếu vượt quá giới hạn.

↓

Expense sẽ được tạo với Status = Planned.

↓

User cần chuyển sang Completed sau khi Expense được tạo.

---

## AC-004

Expense phải có:

- Amount.
- Category.
- Planned Date.

---

## AC-005

Amount phải lớn hơn 0.

---

## AC-006

Category là trường bắt buộc.

---

## AC-007

User có thể chỉnh sửa:

- Amount.
- Category.
- Note.
- Planned Date.

---

## AC-008

Nếu Expense chuyển từ Planned sang Completed.

↓

System:

- cập nhật Expense Status.
- lưu Completed Date.
- cập nhật Remaining Budget.
- tính lại Remaining Daily Budget.
- cập nhật Financial Report.
- cập nhật Budget Streak.
- cập nhật Dashboard Summary.
- tạo Pig Pig Insight nếu cần.

---

## AC-009

Expense đã ở trạng thái Completed.

↓

Budget không được cập nhật lần thứ hai.

---

## AC-010

Expense không trực tiếp cập nhật Saving Goal.

---

## AC-011

Sau Planned Date 1 giờ.

↓

Nếu Expense vẫn ở trạng thái Planned.

↓

System gửi Notification lần thứ nhất.

↓

User có thể chọn:

"Đã hoàn thành".

---

Nếu sau 24 giờ kể từ Planned Date Expense vẫn ở trạng thái Planned.

↓

System gửi Notification lần thứ hai.

↓

Sau Notification lần thứ hai, hệ thống không gửi thêm Notification cho Expense đó.

---

## AC-012

Nếu User chọn:

"Đã hoàn thành"

từ Notification.

↓

Expense chuyển sang Completed.

↓

Completed Date được lưu theo thời điểm xác nhận.

---

## AC-013

Nếu User xóa Expense.

↓

System:

- cập nhật Remaining Budget.
- cập nhật Remaining Daily Budget.
- cập nhật Financial Report.
- cập nhật Dashboard Summary.

---

## AC-014

Nếu Expense History rỗng.

↓

Hiển thị Empty State.

↓

Hiển thị Button:

Add Expense.

---

## AC-015

Expense History mặc định sắp xếp theo Planned Date giảm dần.

↓

Expense có Planned Date gần nhất hiển thị trước.

---

## AC-016

Expense History được truy cập từ:

Financial Report

↓

Transaction History

↓

View All.

---

## AC-017

Nếu xảy ra lỗi trong quá trình:

- Create.
- Update.
- Delete.

↓

Hiển thị thông báo lỗi.

↓

Cho phép User thử lại.

---

# 20. Open Questions

Hiện tại MVP đã thống nhất:

- Expense có hai trạng thái:
  - Planned
  - Completed.
- Expense không ảnh hưởng trực tiếp tới Saving Goal.
- Expense History thuộc Report Module.
- Dashboard chỉ dùng để tạo Expense thông qua Bottom Navigation hoặc Add Expense.
- Notification nhắc xác nhận Expense sau Planned Date 1 giờ.
- Nếu Expense vẫn ở trạng thái Planned sau 24 giờ kể từ Planned Date, hệ thống gửi thêm một Notification nhắc lần thứ hai.
- Budget chỉ thay đổi một lần khi Expense chuyển sang Completed.
- User được tạo trực tiếp Expense với Status = Completed tối đa hai lần trong mỗi tuần.

Các nội dung sau chưa thuộc phạm vi MVP:

- Expense Recurring.
- Split Expense.
- Shared Expense.
- Attach Receipt.
- OCR hóa đơn.
- Đồng bộ giao dịch ngân hàng.

---

# 21. Future Enhancements

Các cải tiến có thể bổ sung trong các phiên bản tiếp theo:

- AI tự động phân loại Category.
- AI phát hiện khoản chi bất thường.
- Tự động tạo Expense từ ảnh hóa đơn.
- Expense Template.
- Expense Recurring.
- Voice Input.
- Import giao dịch từ ngân hàng.

Các nội dung trên không ảnh hưởng tới kiến trúc hiện tại của Feature.

---

# End of Document
