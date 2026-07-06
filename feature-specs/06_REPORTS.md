# 06. Reports Screen Specification

## 1. Purpose

Reports giúp người dùng theo dõi tình hình chi tiêu thông qua các báo cáo trực quan theo tuần và theo tháng.

Màn hình này giúp người dùng nhìn lại hành vi chi tiêu, phát hiện các khoản chi bất hợp lý và theo dõi tiến độ cải thiện theo thời gian.

Pig Pig AI sẽ sử dụng dữ liệu tại màn hình này để tạo Weekly Summary và Financial Insight.

---

# 2. User Story

As a student,

I want to xem báo cáo chi tiêu của mình,

So that mình hiểu tiền đang được sử dụng như thế nào và có thể điều chỉnh hành vi chi tiêu.

---

# 3. Preconditions

- Người dùng đã có ít nhất một giao dịch.
- Budget Engine đã được khởi tạo.

---

# 4. Screen Layout

Màn hình bao gồm:

1. Report Summary Card
2. Weekly Report
3. Monthly Report
4. Category Breakdown
5. Trend Analysis
6. Pig Pig Insight

---

# 5. Components

## 5.1 Report Summary Card

Hiển thị:

- Tổng chi tháng
- Ngân sách còn lại
- Daily Budget hiện tại
- Budget Streak

---

## 5.2 Weekly Report

Hiển thị:

- Tổng chi tuần
- Số giao dịch
- Trung bình mỗi ngày

---

## 5.3 Monthly Report

Hiển thị:

- Tổng chi tháng
- Mức tiết kiệm
- Tiến độ Saving Goal

---

## 5.4 Category Breakdown

Biểu đồ hiển thị tỷ trọng chi tiêu theo từng danh mục.

Ví dụ

🍜 Ăn uống

45%

🚌 Di chuyển

18%

🎮 Giải trí

15%

...

---

## 5.5 Trend Analysis

Hiển thị xu hướng:

- Tuần này so với tuần trước
- Tháng này so với tháng trước

Ví dụ

Ăn uống

↑ 12%

Giải trí

↓ 8%

---

## 5.6 Pig Pig Insight

Pig Pig đưa ra nhận xét ngắn dựa trên báo cáo.

Ví dụ

🐷

Tuần này bạn đã giảm 18% chi phí ăn uống.

Tiếp tục duy trì nhé!

---

# 6. User Interaction

User mở Reports

↓

Xem Weekly Report

↓

Chuyển sang Monthly Report

↓

Đọc Pig Pig Insight

↓

Quay lại Dashboard

---

# 7. Business Rules

## Rule 1

Tất cả dữ liệu lấy từ Budget Engine và Expense History.

---

## Rule 2

Reports không chỉnh sửa dữ liệu.

---

## Rule 3

Category Breakdown tự động cập nhật sau mỗi giao dịch mới.

---

## Rule 4

Pig Pig Insight được tạo sau khi hoàn thành Weekly Report.

---

# 8. Validation

Không có dữ liệu đầu vào.

---

# 9. Edge Cases

## Case 1

Chưa có giao dịch.

↓

Hiển thị Empty State.

---

## Case 2

Chưa đủ dữ liệu để tạo Weekly Report.

↓

Hiển thị thông báo:

"Cần thêm dữ liệu để tạo báo cáo."

---

## Case 3

Không có Saving Goal.

↓

Ẩn Progress Saving Goal.

---

# 10. Acceptance Criteria

- Weekly Report hiển thị chính xác.
- Monthly Report hiển thị chính xác.
- Category Breakdown cập nhật theo giao dịch.
- Pig Pig Insight được tạo đúng dữ liệu.