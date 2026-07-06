# 10. Splash Screen Specification

## 1. Purpose

Splash Screen là màn hình khởi động của ứng dụng.

Mục tiêu là hiển thị nhận diện thương hiệu và kiểm tra trạng thái người dùng trước khi điều hướng đến màn hình tiếp theo.

---

# 2. User Story

As a user,

I want to mở ứng dụng nhanh chóng,

So that mình có thể bắt đầu sử dụng PACE ngay lập tức.

---

# 3. Preconditions

Người dùng mở ứng dụng.

---

# 4. Screen Layout

Bao gồm:

- Logo PACE
- Pig Pig Mascot
- App Name
- Loading Indicator

---

# 5. User Flow

App Launch

↓

Splash

↓

Kiểm tra trạng thái

↓

Nếu chưa Onboarding

↓

Onboarding

↓

Nếu đã Onboarding

↓

Home Dashboard

---

# 6. Business Rules

## Rule 1

Hiển thị Splash trong khoảng 2–3 giây.

---

## Rule 2

Nếu chưa hoàn thành Onboarding.

↓

Đi tới Onboarding.

---

## Rule 3

Nếu đã hoàn thành Onboarding.

↓

Đi tới Home Dashboard.

---

# 7. Validation

Không có.

---

# 8. Edge Cases

Nếu không đọc được dữ liệu người dùng.

↓

Đi tới Onboarding.

---

# 9. Acceptance Criteria

- Hiển thị đúng logo.
- Điều hướng đúng màn hình.
- Không làm người dùng chờ quá lâu.