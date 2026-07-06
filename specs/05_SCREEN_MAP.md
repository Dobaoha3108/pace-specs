# PACE Screen Map

## Purpose

Tài liệu này mô tả cấu trúc điều hướng (Navigation), danh sách màn hình (Screen List) và mối quan hệ giữa các màn hình trong MVP của PACE.

Mục tiêu là giúp Designer, Developer và AI Coding Assistant (Codex) hiểu được toàn bộ luồng sử dụng của người dùng trước khi triển khai chi tiết từng màn hình.

---

# 1. Navigation Flow

```
Launch App
      │
      ▼
 Splash Screen
      │
      ▼
 Onboarding
      │
      ▼
 Home Dashboard
      │
      ├────────► Add Expense
      │              │
      │              ▼
      │         Home Dashboard
      │
      ├────────► Saving Goal
      │              │
      │              ▼
      │         Withdraw Saving
      │              │
      │              ▼
      │         Saving Goal
      │
      ├────────► Expense History
      │
      ├────────► Reports
      │
      ├────────► Pig Pig AI
      │
      └────────► Profile
```

---

# 2. Screen List

| Screen | Purpose |
|----------|---------|
| Splash | Hiển thị logo và khởi động ứng dụng |
| Onboarding | Thiết lập ngân sách ban đầu cho người dùng |
| Home Dashboard | Trung tâm theo dõi tài chính hằng ngày |
| Add Expense | Ghi nhận khoản chi mới |
| Saving Goal | Quản lý các mục tiêu tiết kiệm |
| Withdraw Saving | Rút tiền từ mục tiêu tiết kiệm |
| Expense History | Xem toàn bộ lịch sử giao dịch |
| Reports | Xem báo cáo chi tiêu |
| Pig Pig AI | AI Copilot hỗ trợ người dùng |
| Profile | Thông tin tài khoản và cài đặt |

---

# 3. Navigation Rules

## Splash

→ Onboarding (lần đầu)

→ Home Dashboard (đã thiết lập)

---

## Home Dashboard

Có thể điều hướng đến:

- Add Expense
- Saving Goal
- Expense History
- Reports
- Pig Pig AI
- Profile

---

## Add Expense

Sau khi lưu giao dịch:

→ Quay lại Home Dashboard

---

## Saving Goal

Có thể:

- Tạo mục tiêu mới
- Xem chi tiết mục tiêu
- Rút tiền tiết kiệm

Sau khi hoàn thành:

→ Quay lại Saving Goal

---

## Reports

Có thể chuyển đổi:

- Theo tuần
- Theo tháng

---

## Pig Pig AI

Người dùng có thể:

- Chat với Pig Pig
- Xem cảnh báo ngân sách
- Xem Daily Check-in
- Xem Weekly Summary

---

## Profile

Bao gồm:

- Thông tin tài khoản
- Notification Settings
- App Settings
- About PACE

---

# 4. Bottom Navigation

MVP sử dụng Bottom Navigation gồm 4 tab:

🏠 Trang chủ

💳 Giao dịch

📊 Báo cáo

👤 Tài khoản

---

# 5. Global Entry Points

Một số chức năng có thể được truy cập từ nhiều màn hình:

- Pig Pig AI
- Saving Goal
- Add Expense

Các chức năng này có thể được mở thông qua button, card hoặc shortcut tùy theo từng màn hình.

---

# 6. Notes

- Screen Map chỉ mô tả cấu trúc điều hướng.
- Chi tiết UI, Business Rules và Interaction sẽ được mô tả trong từng Screen Specification.
- Đây là tài liệu nền tảng cho toàn bộ quá trình phát triển MVP.