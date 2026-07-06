# 09. Onboarding Screen Specification

## 1. Purpose

Onboarding là màn hình đầu tiên người dùng sử dụng sau khi mở ứng dụng lần đầu.

Mục tiêu của màn hình là thu thập các thông tin tài chính cơ bản để hệ thống thiết lập Budget Engine, từ đó tính toán ngân sách chi tiêu hằng ngày và cá nhân hóa toàn bộ trải nghiệm trong PACE.

Sau khi hoàn thành Onboarding, người dùng sẽ được chuyển đến Home Dashboard.

---

# 2. User Story

As a student,

I want to nhập thông tin tài chính ban đầu,

So that PACE có thể tính toán ngân sách phù hợp và hỗ trợ mình quản lý chi tiêu ngay từ ngày đầu tiên.

---

# 3. Preconditions

- Người dùng mở ứng dụng lần đầu.
- Chưa có dữ liệu ngân sách.
- Chưa hoàn thành Onboarding.

---

# 4. Screen Layout

Màn hình gồm các thành phần sau:

1. Chọn ngày nhận tiền hàng tháng.
2. Thu nhập tháng (Sinh hoạt phí).
3. Chi phí cố định học tập & sinh hoạt.
4. Mục tiêu trích tiết kiệm trong tháng.
5. Card xem trước ngân sách được phép chi tiêu.
6. Button "Hoàn tất".

---

# 5. Components

## 5.1 Salary Date

**Component**

Date Selector

**Label**

Lịch nhận tiền

**Description**

Ngày người dùng thường nhận sinh hoạt phí hoặc thu nhập hàng tháng.

---

## 5.2 Monthly Income

**Component**

Currency Input

**Label**

Thu nhập tháng (Sinh hoạt phí)

**Description**

Tổng số tiền người dùng nhận được trong tháng.

---

## 5.3 Fixed Expenses

**Component**

Currency Input

**Label**

Chi phí cố định học tập & sinh hoạt

**Description**

Các khoản chi gần như cố định mỗi tháng.

Ví dụ:

- Tiền trọ
- Tiền điện nước
- Học phí
- Gửi xe
- Internet

---

## 5.4 Monthly Saving Goal

**Component**

Currency Input

**Label**

Mục tiêu trích tiết kiệm tháng này

**Description**

Khoản tiền người dùng muốn ưu tiên tiết kiệm trước khi bắt đầu chi tiêu.

---

## 5.5 Budget Preview Card

Hiển thị realtime.

Bao gồm:

- Ngân sách được phép chi tiêu trong tháng.
- Ngân sách khuyến nghị mỗi ngày.

Ví dụ:

MỨC BẠN ĐƯỢC PHÉP TIÊU

1.500.000đ

≈ 50.000đ / ngày

Card sẽ tự cập nhật ngay khi người dùng thay đổi bất kỳ giá trị nào.

---

## 5.6 Complete Button

Label

Hoàn tất ✨

Sau khi nhấn:

- Lưu dữ liệu.
- Khởi tạo Budget Engine.
- Chuyển sang Home Dashboard.

---

# 6. Business Rules

## Rule 1

Available Budget

=

Monthly Income

-

Fixed Expenses

-

Monthly Saving Goal

---

## Rule 2

Daily Budget

=

Available Budget

/

Số ngày từ hiện tại đến kỳ nhận tiền tiếp theo.

---

## Rule 3

Budget Preview Card phải cập nhật ngay khi người dùng thay đổi dữ liệu.

Không cần bấm Hoàn tất.

---

## Rule 4

Nếu Available Budget nhỏ hơn hoặc bằng 0.

Không cho phép hoàn thành Onboarding.

Hiển thị thông báo:

"Ngân sách khả dụng không hợp lệ. Vui lòng kiểm tra lại thông tin."

---

# 7. User Flow

User mở ứng dụng

↓

Nhập ngày nhận tiền

↓

Nhập thu nhập tháng

↓

Nhập chi phí cố định

↓

Nhập mục tiêu tiết kiệm

↓

Budget Preview cập nhật realtime

↓

Nhấn Hoàn tất

↓

Khởi tạo Budget Engine

↓

Đi tới Home Dashboard

---

# 8. Validation

Monthly Income

- Bắt buộc.
- Phải lớn hơn 0.

Fixed Expenses

- Không được âm.

Monthly Saving Goal

- Không được âm.

Available Budget

- Phải lớn hơn 0.

---

# 9. Edge Cases

## Case 1

Không nhập dữ liệu.

→ Disable nút Hoàn tất.

---

## Case 2

Thu nhập nhỏ hơn tổng chi phí cố định và tiết kiệm.

→ Hiển thị cảnh báo.

Không cho phép tiếp tục.

---

## Case 3

Người dùng thay đổi ngày nhận tiền.

→ Daily Budget được tính lại ngay lập tức.

---

## Case 4

Người dùng nhập số tiền rất lớn.

→ Hệ thống vẫn tính toán bình thường.

---

# 10. Acceptance Criteria

- Người dùng có thể hoàn thành Onboarding chỉ với một lần thiết lập.
- Budget Preview cập nhật theo thời gian thực.
- Budget Engine được khởi tạo thành công.
- Daily Budget được tính chính xác.
- Sau khi hoàn tất, người dùng được chuyển sang Home Dashboard.