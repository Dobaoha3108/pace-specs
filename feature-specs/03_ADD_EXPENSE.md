# 03. Add Expense Screen Specification

## 1. Purpose

Add Expense là màn hình cho phép người dùng ghi nhận một khoản chi mới.

Sau khi giao dịch được tạo thành công, hệ thống sẽ cập nhật Budget Engine, từ đó làm mới Dashboard và tạo AI Insight nếu cần.

---

# 2. User Story

As a student,

I want to ghi lại khoản chi chỉ trong vài giây,

So that mình luôn biết mình còn bao nhiêu ngân sách để sử dụng.

---

# 3. Preconditions

- Người dùng đã hoàn thành Onboarding.
- Budget Engine đã được khởi tạo.

---

# 4. Screen Layout

Màn hình bao gồm:

1. Budget Summary Card
2. Amount Input
3. Quick Amount
4. Category Selector
5. Note Input (Optional)
6. Confirm Button

---

# 5. Components

## 5.1 Budget Summary Card

Hiển thị:

- Ngân sách còn lại
- Daily Budget
- Progress Bar

Ví dụ

Còn được tiêu

1.520.000đ

≈ 52.000đ / ngày

Thanh tiến độ

75%

---

## 5.2 Amount Input

Component

Currency Input

Label

Bạn vừa tiêu bao nhiêu?

Ví dụ

20.000đ

---

## 5.3 Quick Amount

Shortcut

10k

20k

50k

100k

200k

Người dùng có thể nhấn để nhập nhanh.

---

## 5.4 Category Selector

Danh mục mặc định

🍜 Ăn uống

🛍️ Mua sắm

🚌 Di chuyển

🎮 Giải trí

📚 Học tập

💊 Sức khỏe

🏠 Sinh hoạt

🎁 Khác

Chỉ chọn một danh mục.

---

## 5.5 Note

Không bắt buộc.

Ví dụ

"Mua trà sữa"

---

## 5.6 Confirm Button

Label

Xác nhận

Sau khi nhấn:

- Lưu giao dịch
- Cập nhật Budget Engine
- Chạy Pig Pig Analysis
- Quay về Dashboard

---

# 6. User Interaction

User nhập số tiền

↓

Chọn danh mục

↓

Có thể nhập ghi chú

↓

Nhấn Xác nhận

↓

Hệ thống cập nhật ngân sách

↓

Pig Pig đánh giá khoản chi

↓

Quay về Dashboard

---

# 7. Business Rules

## Rule 1

Expense Amount phải lớn hơn 0.

---

## Rule 2

Sau khi lưu giao dịch.

Budget Remaining

=

Budget Remaining

-

Expense Amount

---

## Rule 3

Daily Budget được Budget Engine tính lại.

---

## Rule 4

Nếu giao dịch khiến Daily Budget giảm đáng kể.

Pig Pig tạo AI Insight.

Ví dụ

🐷

Khoản chi này làm ngân sách mỗi ngày giảm từ 70.000đ xuống còn 61.000đ.

---

## Rule 5

Nếu giao dịch vượt Daily Budget.

Pig Pig hiển thị cảnh báo.

Ví dụ

🐷

Bạn đã vượt ngân sách hôm nay 25.000đ.

Nếu tiếp tục, bạn sẽ cần giảm mức chi trong các ngày còn lại.

---

## Rule 6

Nếu người dùng vẫn nằm trong hạn mức.

Pig Pig có thể động viên.

Ví dụ

🐷

Bạn vẫn đang kiểm soát ngân sách rất tốt.

Tiếp tục duy trì Budget Streak nhé!

---

# 8. Validation

Expense Amount

- Required
- > 0

Category

- Required

Note

- Optional

---

# 9. Edge Cases

## Case 1

Không nhập số tiền.

↓

Disable nút Xác nhận.

---

## Case 2

Không chọn danh mục.

↓

Không cho phép lưu.

---

## Case 3

Khoản chi lớn hơn Budget Remaining.

↓

Vẫn cho phép lưu.

Pig Pig sẽ hiển thị cảnh báo mức cao.

---

## Case 4

Người dùng nhập số rất lớn.

↓

Hiển thị hộp xác nhận:

"Bạn có chắc chắn muốn ghi nhận khoản chi này?"

---

# 10. Acceptance Criteria

- Người dùng có thể tạo giao dịch trong dưới 10 giây.
- Dashboard cập nhật ngay sau khi lưu.
- Budget Engine được cập nhật chính xác.
- Pig Pig hiển thị Insight phù hợp.
- Recent Transactions hiển thị giao dịch mới.