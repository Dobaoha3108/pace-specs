# 04. Saving Goal Screen Specification

## 1. Purpose

Saving Goal giúp người dùng thiết lập và theo dõi các mục tiêu tiết kiệm.

Mục tiêu của màn hình là biến việc tiết kiệm trở nên trực quan, có động lực và hạn chế các quyết định chi tiêu cảm tính.

---

# 2. User Story

As a student,

I want to tạo mục tiêu tiết kiệm,

So that mình có động lực quản lý chi tiêu và đạt được những kế hoạch cá nhân.

---

# 3. Preconditions

- Người dùng đã hoàn thành Onboarding.
- Budget Engine đã được khởi tạo.

---

# 4. Screen Layout

Màn hình bao gồm:

1. Goal Summary Card
2. Goal Progress
3. Goal Information
4. Deposit Button
5. Withdraw Button
6. Goal History

---

# 5. Components

## 5.1 Goal Summary Card

Hiển thị:

- Tên mục tiêu
- Ảnh minh họa
- Số tiền mục tiêu
- Đã tiết kiệm
- Còn thiếu

Ví dụ

MacBook Air M4

15.000.000đ

Đã tiết kiệm

4.200.000đ

Còn thiếu

10.800.000đ

---

## 5.2 Progress Bar

Hiển thị tiến độ hoàn thành.

Ví dụ

28%

---

## 5.3 Goal Information

Hiển thị

- Ngày tạo
- Hạn hoàn thành
- Chế độ tiết kiệm

---

## 5.4 Deposit Button

Label

Thêm tiền tiết kiệm

Người dùng nhập số tiền muốn chuyển vào Goal.

Sau khi thành công:

- Progress cập nhật
- Dashboard cập nhật

---

## 5.5 Withdraw Button

Label

Rút tiền

Có hai chế độ.

### Gentle Mode

Người dùng rút tiền ngay.

---

### Determined Mode

Sau khi nhấn rút.

Hiển thị:

Pig Pig sẽ giữ yêu cầu trong 2 giờ.

Sau 2 giờ.

Người dùng mới có thể xác nhận rút.

Nếu đổi ý.

Có thể hủy.

---

## 5.6 Goal History

Hiển thị:

- Các lần nạp tiền
- Các lần rút tiền

---

# 6. User Interaction

User mở Saving Goal

↓

Xem tiến độ

↓

Có thể

- Nạp tiền
- Rút tiền

↓

Dashboard cập nhật

↓

Pig Pig đánh giá tiến độ

---

# 7. Business Rules

## Rule 1

Một Goal luôn có:

- Target Amount
- Current Amount

---

## Rule 2

Progress

=

Current Amount

/

Target Amount

---

## Rule 3

Current Amount không được âm.

---

## Rule 4

Nếu đạt 100%.

Pig Pig gửi lời chúc mừng.

Ví dụ

🐷

Chúc mừng!

Bạn đã hoàn thành mục tiêu đầu tiên.

---

## Rule 5

Nếu Goal gần hoàn thành.

Pig Pig có thể động viên.

Ví dụ

Bạn chỉ còn 8% nữa thôi.

Cố lên!

---

## Rule 6

Nếu Determined Mode.

Người dùng phải chờ 2 giờ mới được xác nhận rút.

---

# 8. Validation

Goal Name

Required

---

Target Amount

> 0

---

Deposit Amount

> 0

---

Withdraw Amount

Không vượt Current Amount

---

# 9. Edge Cases

## Case 1

Chưa có Goal.

↓

Hiển thị Empty State.

---

## Case 2

Goal hoàn thành.

↓

Hiển thị Celebration.

---

## Case 3

Rút toàn bộ tiền.

↓

Goal vẫn tồn tại.

Progress về 0%.

---

## Case 4

Người dùng hủy yêu cầu rút trong Determined Mode.

↓

Không thay đổi dữ liệu.

---

# 10. Acceptance Criteria

- Người dùng tạo Goal thành công.
- Progress cập nhật ngay.
- Dashboard hiển thị tiến độ mới.
- Pig Pig đưa ra Insight phù hợp.
- Determined Mode hoạt động đúng.