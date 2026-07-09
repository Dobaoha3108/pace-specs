# 15. NOTIFICATION

Version: 1.1 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Purpose

Notification giúp User nhận được các thông báo quan trọng trong quá trình sử dụng PACE.

Notification tổng hợp các sự kiện được tạo bởi những Feature khác trong ứng dụng.

Notification không tạo dữ liệu mới.

Notification chỉ hiển thị và điều hướng User tới đúng nội dung liên quan.

Trong phiên bản MVP, Notification hỗ trợ Local Push Notification.

Mỗi Notification Event sẽ:

- Hiển thị Local Push Notification.
- Đồng thời lưu vào Notification Center.

---

# 2. Business Objective

Notification giúp User:

- Không bỏ lỡ các sự kiện quan trọng.
- Nhận thông báo khi hoàn thành Saving Goal.
- Nhận thông báo khi hủy Saving Goal.
- Nhận thông báo khi đạt các mốc Saving Goal:
  - 25%.
  - 50%.
  - 75%.
- Nhận nhắc nhở Expense.
- Nhận thông báo đổi Voucher thành công.
- Nhận báo cáo tài chính hàng tuần.
- Nhận báo cáo tài chính hàng tháng.
- Theo dõi Budget Streak.

---

# 3. Business Responsibility

Notification chịu trách nhiệm:

- Hiển thị Notification List.
- Hiển thị Notification Detail.
- Đánh dấu Notification đã đọc.
- Điều hướng tới Feature tương ứng.
- Hiển thị Local Push Notification khi Event xảy ra.
- Lưu Notification vào Notification Center.

Notification không chịu trách nhiệm:

- Tạo Expense.
- Tạo Saving Goal.
- Redeem Voucher.
- Tính Budget Streak.
- Tạo Financial Report.

---

# 4. Screen Overview

Feature Name

Notification Center

---

Business Goal

Hiển thị toàn bộ Notification của User.

---

Entry Point

Dashboard

↓

Notification Icon

---

Exit Point

- Dashboard
- Expense Detail
- Saving Goal Detail
- Redeemed Voucher Detail
- Financial Report

---

# 5. Screen Type

Feature Group

Notification bao gồm nhiều Screen.

---

## Navigation Context

Notification Center được mở từ Dashboard.

Bottom Navigation không hiển thị trong Notification.

---

# 6. Used Components

- CMP-001 App Header
- CMP-003 Primary Button
- CMP-012 Notification Card
- CMP-013 Empty State
- CMP-014 Loading State

---

# 7. Preconditions

- User đã hoàn thành Onboarding.
- Notification Data đã được tạo.
- Notification Mock Data đã được load.

---

# 8. Notification Screens

Notification bao gồm hai Screen.

---

## Screen 1

### Notification Center

Hiển thị toàn bộ Notification của User.

---

## Screen 2

### Notification Detail

Hiển thị đầy đủ nội dung Notification.

Cho phép User chuyển tới màn hình liên quan.

---

# 9. Mock Notification Data

MVP sử dụng Notification Mock Data.

---

## Notification 1

Type

Saving Goal

Title

🎯 Chúc mừng!

Message

Bạn đã hoàn thành Saving Goal "MacBook Air".

Created Time

19/06/2026 09:30

Read

No

Destination

Saving Goal Detail

---

## Notification 2

Type

Reward

Title

🎁 Đổi Voucher thành công

Message

Bạn vừa đổi thành công Voucher Highlands Coffee trị giá 20.000đ.

Created Time

18/06/2026 18:20

Read

No

Destination

Redeemed Voucher Detail

---

## Notification 3

Type

Expense

Title

💰 Đừng quên cập nhật khoản chi

Message

Khoản chi "Ăn trưa" vẫn đang ở trạng thái Planned.

Hãy xác nhận nếu bạn đã hoàn thành.

Created Time

18/06/2026 13:00

Read

Yes

Destination

Expense Detail

---

# 10. User Flow

## Open Notification

Dashboard

↓

Notification Icon

↓

Load Notification Data

↓

Render Notification Center

---

## Receive Notification

Một Event xảy ra.

↓

System hiển thị Local Push Notification.

↓

Đồng thời lưu Notification vào Notification Center.

---

## View Notification Detail

Notification Center

↓

Select Notification

↓

Mark as Read

↓

Open Notification Detail

---

## Open Related Screen

Notification Detail

↓

Button

Xem chi tiết

↓

Open Related Feature

---

# 11. Screen Content

## Notification Center

Hiển thị:

- Notification List.

Mỗi Notification hiển thị:

- Icon.
- Title.
- Message Preview.
- Created Time.
- Read Status.

---

## Notification Detail

Hiển thị:

- Icon.
- Title.
- Full Message.
- Created Time.
- Read Status.

Button

Xem chi tiết.

↓

Đi tới màn hình tương ứng.

---

# 12. User Actions

User có thể:

- Xem Notification List.
- Xem Notification Detail.
- Đánh dấu Notification đã đọc.
- Mở màn hình liên quan.

---

# 13. System Response

## Open Notification Center

User mở Notification Center.

↓

System load Notification Data.

↓

Sắp xếp Notification theo Created Time giảm dần.

↓

Render Notification List.

---

## Receive Notification Event

Một Notification Event xảy ra.

Ví dụ:

- Expense Reminder.
- Saving Goal Completed.
- Saving Goal Cancelled.
- Saving Goal đạt mốc 25%.
- Saving Goal đạt mốc 50%.
- Saving Goal đạt mốc 75%.
- Voucher Redeemed.
- Weekly Report.
- Monthly Report.
- Budget Streak Reward.

↓

System tạo Notification.

↓

System hiển thị Local Push Notification.

↓

System lưu Notification vào Notification Center.

---

## Open Notification Detail

User chọn một Notification.

↓

System cập nhật:

Read = Yes.

↓

Mở Notification Detail.

---

## Open Related Feature

User chọn:

Xem chi tiết.

↓

System điều hướng tới Feature tương ứng.

Ví dụ:

- Expense Detail.
- Saving Goal Detail.
- Saving Goal History.
- Redeemed Voucher Detail.
- Financial Report.
- Dashboard.

---

# 14. Navigation

## Dashboard

User chọn:

Notification Icon.

↓

Open Notification Center.

---

## Notification Center

User chọn Notification.

↓

Open Notification Detail.

---

## Notification Detail

User chọn:

Xem chi tiết.

↓

Open Related Feature.

---

# 15. Display Rules

## Notification Center

Hiển thị toàn bộ Notification của User.

---

Notification được sắp xếp theo:

Created Time giảm dần.

Notification mới nhất luôn hiển thị đầu tiên.

---

Mỗi Notification hiển thị:

- Icon.
- Title.
- Message Preview.
- Created Time.
- Read Status.

---

Nếu Read = No.

↓

Hiển thị chấm màu xanh bên cạnh Notification.

---

Nếu Read = Yes.

↓

Ẩn chấm màu xanh.

---

Không phân nhóm Notification theo loại.

Tất cả Notification được hiển thị trong cùng một danh sách.

---

Nếu chưa có Notification.

↓

Hiển thị Empty State.

↓

Thông báo:

"Bạn chưa có thông báo nào."

---

## Local Push Notification

Khi Notification Event xảy ra.

↓

System hiển thị Local Push Notification.

---

Local Push Notification hiển thị:

- Title.
- Short Message.

---

Khi User click Local Push Notification.

↓

Open Notification Detail.

---

## Notification Detail

Hiển thị:

- Icon.
- Title.
- Full Message.
- Created Time.

---

Hiển thị Button:

Xem chi tiết.

↓

Đi tới màn hình liên quan.

---

Nếu Notification không có màn hình liên quan.

↓

Ẩn Button:

Xem chi tiết.

---

# 16. Validation

Notification không có dữ liệu nhập từ User.

Không yêu cầu Validation.

---

# 17. Screen States

## Notification Center

- Loading.
- Empty.
- Normal.
- Error.

---

## Notification Detail

- Loading.
- Normal.
- Error.

---

## Local Push Notification

- Visible.
- Hidden.

---

# 18. Error Handling

## Notification Load Failed

Không thể tải Notification.

↓

Hiển thị:

"Không thể tải thông báo."

↓

Button:

"Thử lại"

---

## Notification Detail Failed

Không thể tải chi tiết Notification.

↓

Hiển thị:

"Không thể tải nội dung thông báo."

↓

Button:

"Thử lại"

---

## Navigation Failed

Không thể mở màn hình liên quan.

↓

Hiển thị:

"Không thể mở nội dung."

↓

Button:

"Thử lại"

---

## Local Push Failed

Nếu Local Push Notification không hiển thị được.

↓

Notification vẫn phải được lưu vào Notification Center.

Không chặn luồng chính của ứng dụng.

---

# 19. Related Specification

## Domain Model

- Notification
- Expense
- SavingGoal
- Reward
- UserReward
- BudgetStreak
- FinancialReport

---

## Business Workflow

- Notification Management

---

## System Workflow

- Notification Processing
- Expense Processing
- Saving Goal Processing
- Reward Processing
- Financial Report Processing

---

## Data Model

- Notification
- Expense
- SavingGoal
- Reward
- UserReward
- BudgetStreak
- FinancialReport

---

## Business Rules

- EXP-004
- SVG-009
- SVG-010
- SVG-011
- RWD-002
- RWD-003
- BGT-003

---

## UI Components

- CMP-001 App Header
- CMP-003 Primary Button
- CMP-012 Notification Card
- CMP-013 Empty State
- CMP-014 Loading State

---

# 20. Acceptance Criteria

## AC-001

User có thể mở Notification Center từ Dashboard.

---

## AC-002

Notification Center hiển thị:

- Notification List.

---

## AC-003

Notification được sắp xếp theo:

Created Time giảm dần.

Notification mới nhất hiển thị đầu tiên.

---

## AC-004

Mỗi Notification hiển thị:

- Icon.
- Title.
- Message Preview.
- Created Time.
- Read Status.

---

## AC-005

Nếu Notification chưa đọc.

↓

Hiển thị chấm màu xanh.

---

## AC-006

Khi User mở Notification.

↓

System tự động cập nhật:

Read = Yes.

---

## AC-007

User có thể xem Notification Detail.

---

## AC-008

Notification Detail hiển thị:

- Icon.
- Title.
- Full Message.
- Created Time.

---

## AC-009

Nếu Notification có màn hình liên quan.

↓

Hiển thị Button:

Xem chi tiết.

↓

Đi tới Feature tương ứng.

---

## AC-010

Nếu Notification không có màn hình liên quan.

↓

Ẩn Button:

Xem chi tiết.

---

## AC-011

Nếu chưa có Notification.

↓

Hiển thị Empty State.

---

## AC-012

Notification không cho phép:

- Delete.
- Edit.
- Filter.
- Phân loại theo Tab.

---

## AC-013

Notification sử dụng Mock Data trong phiên bản MVP để phục vụ mục đích demo.

---

## AC-014

Notification hỗ trợ Local Push Notification.

Khi một Notification Event xảy ra.

↓

System:

- Hiển thị Local Push Notification.
- Đồng thời lưu Notification vào Notification Center.

---

## AC-015

Saving Goal chỉ tạo Notification trong các trường hợp:

- Hoàn thành Saving Goal.
- Huỷ Saving Goal.
- Đạt 25% mục tiêu.
- Đạt 50% mục tiêu.
- Đạt 75% mục tiêu.

Các thay đổi khác của Saving Goal không tạo Notification.

---

## AC-016

Expense tạo Notification trong các trường hợp:

- Sau Planned Date +1 giờ nếu Expense vẫn ở trạng thái Planned.
- Sau Planned Date +24 giờ nếu Expense vẫn chưa được chuyển sang Completed.

---

## AC-017

Reward tạo Notification khi:

- User đổi Voucher thành công.

---

## AC-018

Financial Report tạo Notification khi:

- Weekly Report được tạo.
- Monthly Report được tạo.

---

## AC-019

Nếu xảy ra lỗi khi:

- Load Notification.
- Load Notification Detail.
- Điều hướng tới Feature liên quan.

↓

Hiển thị thông báo lỗi.

↓

Cho phép User thử lại.

---

# 21. Open Questions

Hiện tại MVP đã thống nhất:

- Notification chỉ hiển thị dữ liệu do các Feature khác tạo ra.
- Notification có hai màn hình:
  - Notification Center.
  - Notification Detail.
- Notification được sắp xếp theo Created Time giảm dần.
- User mở Notification sẽ tự động đánh dấu đã đọc.
- Notification Detail cho phép điều hướng tới Feature liên quan.
- Notification sử dụng Mock Data để phục vụ demo.
- Notification hỗ trợ Local Push Notification.
- Mỗi Notification Event sẽ:
  - Hiển thị Local Push Notification.
  - Đồng thời lưu vào Notification Center.

Các nội dung sau chưa thuộc phạm vi MVP:

- Notification Setting.
- Xóa Notification.
- Tìm kiếm Notification.
- Phân loại Notification theo nhóm.
- Đồng bộ Notification với Server.

---

# 22. Future Enhancements

Các cải tiến có thể bổ sung trong các phiên bản tiếp theo:

- Firebase Push Notification.
- Server Push Notification theo thời gian thực.
- Cho phép bật/tắt từng loại Notification.
- Tìm kiếm Notification.
- Đánh dấu tất cả là đã đọc.
- Xóa Notification.
- Đồng bộ Notification đa thiết bị.

Các nội dung trên không ảnh hưởng tới kiến trúc hiện tại của Feature.

---

# End of Document
