# 07. SPLASH

Version: 1.0 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Purpose

Splash Screen là màn hình đầu tiên được hiển thị khi người dùng mở ứng dụng.

Mục tiêu của Splash Screen là:

- Hiển thị nhận diện thương hiệu PACE.
- Khởi tạo ứng dụng.
- Chuẩn bị dữ liệu cần thiết.
- Kiểm tra trạng thái người dùng.
- Điều hướng người dùng tới màn hình phù hợp.

Splash Screen không cho phép người dùng thực hiện bất kỳ thao tác nào.

---

# 2. Screen Overview

Screen Name

Splash

---

Business Goal

Khởi tạo ứng dụng và xác định luồng điều hướng ban đầu.

---

Entry Point

App Launch

---

Exit Point

- Onboarding
- Dashboard

---

# 3. Screen Type

Entry Screen

---

# 4. Used Components

- CMP-015 Loading State

---

# 5. Preconditions

Không có.

Splash luôn là màn hình đầu tiên sau khi ứng dụng được mở.

---

# 6. User Flow

```
App Launch

↓

Splash

↓

Initialize Application

↓

Check User Status

↓

Nếu User chưa hoàn thành Onboarding

↓

Onboarding

↓

Nếu User đã hoàn thành Onboarding

↓

Dashboard
```

---

# 7. Screen Content

Splash chỉ hiển thị:

- Logo PACE.
- App Name.
- Loading Animation.

Không hiển thị:

- Button.
- Navigation.
- Notification.
- User Information.

---

# 8. User Actions

Không có.

User không thể tương tác với Splash Screen.

---

# 9. System Response

Sau khi Splash được hiển thị.

Hệ thống thực hiện:

Step 1

Load Application Configuration.

↓

Step 2

Khởi tạo Local Storage.

↓

Step 3

Kiểm tra trạng thái User.

↓

Step 4

Xác định màn hình điều hướng tiếp theo.

↓

Step 5

Điều hướng.

---

# 10. Navigation

Nếu:

User chưa hoàn thành Onboarding.

↓

Open

Onboarding

---

Nếu:

User đã hoàn thành Onboarding.

↓

Open

Dashboard

---

# 11. Display Rules

Splash chỉ hiển thị trong thời gian hệ thống khởi tạo ứng dụng.

Sau khi hoàn thành quá trình khởi tạo.

↓

Splash phải tự động đóng.

Splash không được phép hiển thị lại trong cùng một phiên sử dụng.

---

# 12. Validation

Không có User Input.

Không có Validation.

---

# 13. Screen States

## Loading

Hiển thị:

- Logo PACE.
- App Name.
- Loading Animation.

---

## Completed

Hệ thống điều hướng sang màn hình tiếp theo.

---

# 14. Error Handling

Nếu quá trình khởi tạo thất bại.

↓

Hiển thị thông báo:

"Không thể khởi tạo ứng dụng."

↓

Hiển thị nút:

Retry

↓

Thực hiện lại quá trình khởi tạo.

---

# 15. Related Specification

Business Workflow

- User Onboarding & Budget Initialization

---

System Workflow

- Application Initialization

---

Data Model

- User

---

Business Rules

- NAV-001

---

UI Components

- CMP-015 Loading State

---

# 16. Acceptance Criteria

## AC-001

Khi ứng dụng được mở.

↓

Splash luôn là màn hình đầu tiên.

---

## AC-002

Splash hiển thị Logo PACE và Loading Animation.

---

## AC-003

User không thể tương tác với Splash.

---

## AC-004

Nếu User chưa hoàn thành Onboarding.

↓

Hệ thống mở Onboarding.

---

## AC-005

Nếu User đã hoàn thành Onboarding.

↓

Hệ thống mở Dashboard.

---

## AC-006

Splash chỉ xuất hiện một lần trong mỗi lần mở ứng dụng.

---

## AC-007

Nếu khởi tạo thất bại.

↓

Hiển thị Retry.

↓

User có thể thử lại.

---

# End of Document
