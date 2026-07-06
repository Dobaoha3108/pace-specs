# 08. Profile Screen Specification

## 1. Purpose

Profile là nơi người dùng quản lý thông tin cá nhân, cài đặt ứng dụng và các tùy chọn liên quan đến tài khoản.

Đây không phải màn hình nghiệp vụ mà là màn hình quản lý thông tin và cấu hình ứng dụng.

---

# 2. User Story

As a user,

I want to quản lý thông tin cá nhân và cài đặt ứng dụng,

So that mình có thể cá nhân hóa trải nghiệm sử dụng PACE.

---

# 3. Preconditions

- Người dùng đã đăng nhập.

---

# 4. Screen Layout

Bao gồm:

1. User Information
2. Monthly Budget Settings
3. Notification Settings
4. App Settings
5. About
6. Logout

---

# 5. Components

## 5.1 User Information

Hiển thị

- Avatar
- Tên
- Email

---

## 5.2 Monthly Budget Settings

Cho phép chỉnh sửa:

- Salary Date
- Monthly Income
- Fixed Expenses
- Monthly Saving Goal

Sau khi lưu.

Budget Engine sẽ tính lại.

---

## 5.3 Notification Settings

Bật/Tắt

- Daily Check-in
- Budget Warning
- Weekly Summary
- Saving Reminder

---

## 5.4 App Settings

Bao gồm:

- Language
- Dark Mode (Future)
- Privacy

---

## 5.5 About

Hiển thị:

- Phiên bản ứng dụng
- Điều khoản
- Chính sách bảo mật

---

## 5.6 Logout

Đăng xuất tài khoản.

---

# 6. User Interaction

Profile

↓

Chỉnh sửa thông tin

↓

Lưu

↓

Budget Engine cập nhật (nếu có thay đổi)

---

# 7. Business Rules

## Rule 1

Thay đổi Monthly Income hoặc Fixed Expenses.

↓

Budget Engine tính lại.

---

## Rule 2

Notification Settings chỉ ảnh hưởng thông báo.

Không ảnh hưởng dữ liệu.

---

# 8. Validation

Monthly Income > 0

Salary Date Required

---

# 9. Edge Cases

Không có Internet.

↓

Cho phép xem dữ liệu đã lưu.

---

# 10. Acceptance Criteria

- Có thể chỉnh sửa Budget Settings.
- Có thể bật/tắt Notification.
- Có thể Logout.