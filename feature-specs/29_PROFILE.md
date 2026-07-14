# 16. PROFILE

Version: 1.1 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Purpose

Profile giúp User quản lý thông tin cá nhân và các thiết lập của ứng dụng.

Profile là nơi User có thể:

- Xem thông tin cá nhân.
- Chỉnh sửa thông tin tài chính.
- Quản lý cài đặt ứng dụng.
- Xem thông tin phiên bản ứng dụng.
- Đăng xuất khỏi ứng dụng.

Profile không trực tiếp quản lý Budget, Expense, Saving Goal hoặc Reward.

---

# 2. Business Objective

Profile giúp User:

- Xem thông tin cá nhân.
- Cập nhật thông tin tài chính.
- Quản lý cài đặt thông báo.
- Theo dõi Pig Coin hiện có.
- Xem thông tin ứng dụng.
- Đăng xuất khỏi ứng dụng.

---

# 3. Business Responsibility

Profile chịu trách nhiệm:

- Hiển thị User Information.
- Hiển thị Pig Coin Balance.
- Chỉnh sửa Financial Information.
- Quản lý Notification Setting.
- Hiển thị About Application.
- Logout.

Profile không chịu trách nhiệm:

- Tạo Expense.
- Quản lý Saving Goal.
- Đổi Voucher.
- Tạo Financial Report.
- Chat với Pig Pig.

---

# 4. Screen Overview

Feature Name

Profile

---

Business Goal

Cho phép User quản lý thông tin cá nhân và các thiết lập của ứng dụng.

---

Entry Point

Dashboard

↓

Profile Icon.

---

Exit Point

- Dashboard.
- Financial Setting Detail.

---

# 5. Screen Type

Feature Group

Profile bao gồm nhiều Screen.

---

## Navigation Context

Profile được mở từ Dashboard.

Bottom Navigation không hiển thị trong Profile.

---

# 6. Used Components

- CMP-001 App Header
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-013 Empty State
- CMP-014 Loading State
- CMP-015 Confirmation Dialog

---

# 7. Preconditions

- User đã hoàn thành Onboarding.
- User Profile đã được tạo.
- Financial Information đã được khởi tạo.
- Pig Coin Wallet đã được khởi tạo.

---

# 8. Profile Screens

Profile bao gồm hai Screen.

---

## Screen 1

### Profile

Hiển thị:

- User Information.
- Pig Coin Balance.
- Financial Settings.
- App Settings.
- About.
- Logout.

---

## Screen 2

### Financial Setting Detail

Cho phép User chỉnh sửa:

- Monthly Income.
- Fixed Expense.

Budget Cycle luôn là:

Monthly.

Không cho phép chỉnh sửa.

---

**Note**

Monthly Budget được hệ thống tự động tính theo công thức:

**Monthly Budget = Monthly Income − Fixed Expense**

User không thể chỉnh sửa Monthly Budget trực tiếp.

---

# 9. Mock User Data

MVP sử dụng Mock User Data.

---

User ID

PACE000001 (hiển thị rút gọn còn 8 chữ số phía sau prefix "PACE", dẫn xuất runtime từ id thật của User, không lưu thành field mới, không ảnh hưởng dữ liệu liên kết khác)

---

Name

Đỗ Bảo Hà

---

Occupation

Student

---

Joined Date

19/06/2026

---

Pig Coin

500

---

Monthly Income

5.000.000 VNĐ

---

Fixed Expense

2.000.000 VNĐ

---

Budget Cycle

Monthly

---

# 10. User Flow

## Open Profile

Dashboard

↓

Profile Icon

↓

Load Profile

↓

Render Profile Screen.

---

## Edit Financial Information

Profile

↓

Financial Settings

↓

Financial Setting Detail

↓

Edit Information

↓

Save

↓

Update Monthly Budget

↓

Refresh Dashboard

↓

Refresh Profile.

---

## Logout

Profile

↓

Logout

↓

Confirmation Dialog

↓

Confirm

↓

Logout

↓

Open Splash Screen.

---

# 11. Screen Content

## User Information

Hiển thị:

- Avatar.
- User ID.
- User Name.
- Occupation.
- Joined Date.

---

## Pig Coin

Hiển thị:

- Pig Coin Balance.

Pig Coin chỉ dùng để đổi Voucher trong Reward Marketplace.

---

## Financial Settings

Hiển thị:

- Monthly Income.
- Fixed Expense.
- Budget Cycle.

Action:

Edit Financial Information.

---

## App Settings

Hiển thị:

Notification.

Giá trị:

- ON.
- OFF.

---

## About

Hiển thị:

- App Name.
- Version.
- Copyright.

---

## Logout

Hiển thị:

Logout Button.

---

# 12. User Actions

User có thể:

- Xem Profile.
- Xem Pig Coin.
- Chỉnh sửa Financial Information.
- Bật/Tắt Notification.
- Xem About.
- Logout.

---

# 13. System Response

## Open Profile

User mở Profile.

↓

System tải:

- User Information.
- Pig Coin Balance.
- Financial Information.
- Notification Setting.
- App Information.

↓

Render Profile.

---

## Edit Financial Information

User cập nhật:

- Monthly Income.
- Fixed Expense.

↓

System Validate dữ liệu.

↓

Nếu hợp lệ.

↓

System:

- Cập nhật Financial Information.
- Tự động tính lại Monthly Budget.
- Cập nhật Remaining Budget.
- Tính lại Remaining Daily Budget.
- Refresh Dashboard.
- Refresh Profile.

---

Nếu không hợp lệ.

↓

Hiển thị Validation Error.

---

## Change Notification Setting

User bật hoặc tắt:

Local Push Notification.

↓

System cập nhật Notification Setting.

↓

Notification Center vẫn tiếp tục lưu Notification như bình thường.

↓

Refresh Profile.

---

## Logout

User chọn Logout.

↓

System hiển thị Confirmation Dialog.

---

Nếu User xác nhận.

↓

System:

- Logout User.
- Xóa User Session.
- Chuyển về Splash Screen.

---

Nếu User hủy.

↓

Đóng Confirmation Dialog.

---

# 14. Navigation

## Dashboard

User chọn:

Profile Icon.

↓

Open Profile.

---

## Profile

User chọn:

Financial Settings.

↓

Open Financial Setting Detail.

---

User chọn:

Logout.

↓

Open Confirmation Dialog.

---

## Financial Setting Detail

User chọn:

Save.

↓

Quay lại Profile.

↓

Refresh Dashboard.

---

## Confirmation Dialog

User chọn:

Confirm.

↓

Logout.

↓

Open Splash Screen.

---

User chọn:

Cancel.

↓

Đóng Dialog.

↓

Quay lại Profile.

---

# 15. Display Rules

## User Information

Luôn hiển thị:

- Avatar.
- User ID.
- User Name.
- Occupation.
- Joined Date.

---

## Pig Coin

Luôn hiển thị:

Pig Coin Balance.

Pig Coin chỉ mang tính hiển thị.

Không cho phép chỉnh sửa.

---

## Financial Settings

Luôn hiển thị:

- Monthly Income.
- Fixed Expense.
- Budget Cycle.

Budget Cycle luôn là:

Monthly.

Không cho phép chỉnh sửa.

Monthly Budget được hệ thống tự động tính từ:

Monthly Income − Fixed Expense.

Không hiển thị để chỉnh sửa trực tiếp.

---

## App Settings

Hiển thị:

Local Push Notification.

Cho phép:

- ON.
- OFF.

Lưu ý:

Thiết lập này chỉ ảnh hưởng đến Local Push Notification hiển thị trên thiết bị.

Notification Center trong ứng dụng luôn tiếp tục lưu và hiển thị Notification.

---

## About

Hiển thị:

- App Name.
- Version.
- Copyright.

Thông tin chỉ mang tính hiển thị.

---

## Logout

Luôn hiển thị:

Logout Button.

---

# 16. Validation

## Monthly Income

- Required.
- Chỉ cho phép nhập số.
- Phải lớn hơn 0.

---

## Fixed Expense

- Required.
- Chỉ cho phép nhập số.
- Phải lớn hơn hoặc bằng 0.
- Không được lớn hơn Monthly Income.

---

Nếu dữ liệu không hợp lệ.

↓

Hiển thị Validation Error ngay dưới trường dữ liệu.

---

# 17. Screen States

## Profile

- Loading.
- Normal.
- Error.

---

## Financial Setting Detail

- Normal.
- Validation Error.

---

## Confirmation Dialog

- Visible.
- Hidden.

---

# 18. Error Handling

## Profile Load Failed

Không thể tải Profile.

↓

Hiển thị:

"Không thể tải thông tin cá nhân."

↓

Button:

"Thử lại"

---

## Update Financial Information Failed

Không thể cập nhật Financial Information.

↓

Hiển thị:

"Không thể cập nhật thông tin tài chính."

↓

Button:

"Thử lại"

---

## Notification Setting Failed

Không thể cập nhật Notification Setting.

↓

Hiển thị:

"Không thể cập nhật cài đặt thông báo."

↓

Button:

"Thử lại"

---

## Logout Failed

Không thể đăng xuất.

↓

Hiển thị:

"Không thể đăng xuất."

↓

Button:

"Thử lại"

---

# 19. Related Specification

## Domain Model

- User
- Budget
- PigCoinWallet
- Notification

---

## Business Workflow

- User Profile Management

---

## System Workflow

- Profile Processing
- Budget Processing
- Dashboard Synchronization

---

## Data Model

- User
- Budget
- PigCoinWallet
- Notification

---

## Business Rules

- BGT-001
- BGT-002
- BGT-003

---

## UI Components

- CMP-001 App Header
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-013 Empty State
- CMP-014 Loading State
- CMP-015 Confirmation Dialog

---

# 20. Acceptance Criteria

## AC-001

User có thể mở Profile từ Dashboard.

---

## AC-002

Profile luôn hiển thị:

- User Information.
- Pig Coin Balance.
- Financial Settings.
- App Settings.
- About.
- Logout.

---

## AC-003

User Information hiển thị:

- Avatar.
- User ID.
- User Name.
- Occupation.
- Joined Date.

---

## AC-004

Pig Coin Balance chỉ mang tính hiển thị.

Không cho phép chỉnh sửa.

---

## AC-005

User có thể chỉnh sửa:

- Monthly Income.
- Fixed Expense.

---

## AC-006

Budget Cycle luôn là:

Monthly.

Không cho phép chỉnh sửa.

---

## AC-007

Sau khi cập nhật Financial Information thành công.

↓

System:

- Tự động tính lại Monthly Budget.
- Cập nhật Remaining Budget.
- Cập nhật Remaining Daily Budget.
- Refresh Dashboard.
- Refresh Profile.

---

## AC-008

User có thể bật hoặc tắt:

Local Push Notification.

Việc thay đổi thiết lập này chỉ ảnh hưởng đến Local Push Notification hiển thị trên thiết bị.

Notification Center trong ứng dụng luôn tiếp tục lưu và hiển thị Notification.

---

## AC-009

User có thể xem:

- App Name.
- Version.
- Copyright.

---

## AC-010

User có thể Logout.

↓

Hệ thống hiển thị Confirmation Dialog.

↓

Sau khi xác nhận.

↓

Quay về Splash Screen.

---

## AC-011

Nếu dữ liệu nhập không hợp lệ.

↓

Hiển thị Validation Error.

↓

Không cho phép lưu.

---

## AC-012

Nếu xảy ra lỗi khi:

- Load Profile.
- Update Financial Information.
- Update Notification Setting.
- Logout.

↓

Hiển thị thông báo lỗi.

↓

Cho phép User thử lại.

---

# 21. Open Questions

Hiện tại MVP đã thống nhất:

- Profile chỉ quản lý thông tin cá nhân và cài đặt.
- User Information hiển thị:
  - Avatar.
  - User ID.
  - User Name.
  - Occupation.
  - Joined Date.
- Financial Information gồm:
  - Monthly Income.
  - Fixed Expense.
- Monthly Budget được hệ thống tự động tính theo:
  - Monthly Income − Fixed Expense.
- Budget Cycle luôn là Monthly.
- Pig Coin chỉ hiển thị.
- Local Push Notification có thể bật hoặc tắt.
- Notification Center luôn tiếp tục lưu và hiển thị Notification.
- Profile được mở từ Dashboard.
- Logout quay về Splash Screen.

Các nội dung sau chưa thuộc phạm vi MVP:

- Đổi Avatar.
- Đổi mật khẩu.
- Xóa tài khoản.
- Đồng bộ đa thiết bị.
- Premium Membership.
- Thay đổi Theme.
- Dark Mode.
- Đổi ngôn ngữ.

---

# 22. Future Enhancements

Các cải tiến có thể bổ sung trong các phiên bản tiếp theo:

- Upload Avatar.
- Đổi mật khẩu.
- Đồng bộ tài khoản trên nhiều thiết bị.
- Dark Mode.
- Đổi ngôn ngữ.
- Quản lý tài khoản Premium.
- Sao lưu và khôi phục dữ liệu.

Các nội dung trên không ảnh hưởng tới kiến trúc hiện tại của Feature.

---

# End of Document
