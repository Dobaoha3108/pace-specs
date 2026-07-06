# 05. Expense History Screen Specification

## 1. Purpose

Expense History cho phép người dùng xem toàn bộ lịch sử chi tiêu, tra cứu các giao dịch trước đây và theo dõi hành vi chi tiêu theo thời gian.

Màn hình này đóng vai trò là nơi lưu trữ và tra cứu tất cả các giao dịch đã được ghi nhận.

---

# 2. User Story

As a student,

I want to xem lại các khoản chi của mình,

So that mình hiểu tiền đã được sử dụng vào đâu.

---

# 3. Preconditions

- Người dùng đã có ít nhất một giao dịch.

---

# 4. Screen Layout

Bao gồm:

1. Search Bar
2. Filter
3. Transaction List
4. Transaction Detail
5. Edit Transaction
6. Delete Transaction

---

# 5. Components

## 5.1 Search Bar

Cho phép tìm theo:

- Tên giao dịch
- Ghi chú

---

## 5.2 Filter

Lọc theo:

- Thời gian
- Danh mục

---

## 5.3 Transaction List

Mỗi Item hiển thị:

- Icon Category
- Tên giao dịch
- Thời gian
- Số tiền

---

## 5.4 Transaction Detail

Hiển thị:

- Số tiền
- Danh mục
- Ghi chú
- Ngày tạo

---

## 5.5 Edit Transaction

Cho phép chỉnh sửa:

- Amount
- Category
- Note

Sau khi lưu:

Budget Engine tính lại.

---

## 5.6 Delete Transaction

Cho phép xóa.

Sau khi xóa.

Budget Engine tính lại.

Dashboard cập nhật.

---

# 6. User Interaction

Dashboard

↓

Xem tất cả

↓

Expense History

↓

Search / Filter

↓

Edit / Delete

↓

Dashboard cập nhật

---

# 7. Business Rules

## Rule 1

Danh sách hiển thị mới nhất trước.

---

## Rule 2

Sau khi sửa.

Budget Engine tính lại.

---

## Rule 3

Sau khi xóa.

Budget Engine tính lại.

---

## Rule 4

Pig Pig có thể tạo Insight mới nếu hành vi chi tiêu thay đổi.

---

# 8. Validation

Amount

>0

Category

Required

---

# 9. Edge Cases

Không có giao dịch.

↓

Hiển thị Empty State.

---

# 10. Acceptance Criteria

- Có thể tìm kiếm.
- Có thể lọc.
- Có thể chỉnh sửa.
- Có thể xóa.
- Dashboard cập nhật đúng.