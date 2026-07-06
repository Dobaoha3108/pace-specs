# 02. Home Dashboard Screen Specification

## 1. Purpose

Home Dashboard là màn hình trung tâm của PACE.

Đây là màn hình người dùng sử dụng nhiều nhất, giúp họ theo dõi tình trạng tài chính hiện tại, ghi nhận khoản chi, nhận cảnh báo từ Pig Pig và duy trì thói quen chi tiêu trong hạn mức.

Sau khi hoàn thành Onboarding, người dùng sẽ luôn được điều hướng về Home Dashboard.

---

# 2. User Story

As a student,

I want to nhìn thấy ngay tình trạng tài chính hiện tại của mình,

So that mình biết hôm nay còn bao nhiêu tiền để tiêu và có thể đưa ra quyết định chi tiêu hợp lý.

---

# 3. Preconditions

- Người dùng đã hoàn thành Onboarding.
- Budget Engine đã được khởi tạo.
- Người dùng đã đăng nhập vào ứng dụng.

---

# 4. Screen Layout

Home Dashboard bao gồm các khu vực chính:

1. Header
2. Daily Budget Card
3. Pig Pig AI Insight Card
4. Budget Streak
5. Recent Transactions
6. Bottom Navigation

---

# 5. Components

## 5.1 Header

Hiển thị:

- Avatar người dùng
- Lời chào

Ví dụ:

Xin chào, Hà 👋

---

## 5.2 Daily Budget Card

Đây là thành phần quan trọng nhất của Dashboard.

Hiển thị:

- Ngân sách còn lại trong tháng
- Thanh tiến độ ngân sách
- Hôm nay còn được tiêu bao nhiêu
- Dự kiến ngân sách mỗi ngày

Ví dụ

Còn được tiêu trong tháng

2.350.000đ

Progress Bar

75%

Thông tin nhanh

• Hôm nay còn: 82.000đ

• Dự kiến mỗi ngày: 78.000đ

• Tiến độ tiết kiệm: 18%

---

## 5.3 Pig Pig AI Card

Pig Pig luôn xuất hiện trên Dashboard.

Mục tiêu:

Chủ động hỗ trợ người dùng.

Pig Pig có thể hiển thị:

• Cảnh báo vượt ngân sách.

• Lời khen khi duy trì Budget Streak.

• Gợi ý tiết kiệm.

• Daily Check-in.

Ví dụ

🐷

Pig Pig nhận thấy bạn đang chi tiêu cao hơn tuần trước 18%.

Nếu tiếp tục, ngân sách mỗi ngày sẽ giảm xuống còn khoảng 64.000đ.

Button

Tôi đã hiểu

Button

Xem chi tiết

---

## 5.4 Budget Streak

Hiển thị số ngày liên tiếp người dùng tiêu trong hạn mức.

Ví dụ

🔥

Budget Streak

8 ngày

Nếu bị vượt ngân sách.

Streak sẽ kết thúc.

---

## 5.5 Recent Transactions

Hiển thị tối đa:

10 giao dịch gần nhất.

Thông tin mỗi giao dịch:

- Icon danh mục
- Tên giao dịch
- Thời gian
- Số tiền

Có button

Xem tất cả

↓

Expense History

---

## 5.6 Floating Action Button

Button nổi

+

Chức năng:

Thêm khoản chi mới.

↓

Đi tới

Add Expense Screen

---

## 5.7 Bottom Navigation

Bao gồm:

🏠 Trang chủ

💳 Giao dịch

📊 Báo cáo

👤 Tài khoản

---

# 6. User Interaction

Người dùng có thể:

• Nhấn "+" để thêm giao dịch.

• Nhấn Pig Pig để xem AI Copilot.

• Nhấn "Xem tất cả" để mở Expense History.

• Chuyển tab bằng Bottom Navigation.

---

# 7. Business Rules

## Rule 1

Daily Budget được lấy từ Budget Engine.

Dashboard không tự tính toán.

---

## Rule 2

Sau mỗi giao dịch mới.

Dashboard phải cập nhật ngay:

- Budget Remaining
- Daily Budget
- Progress Bar
- Recent Transactions

---

## Rule 3

Pig Pig đọc dữ liệu từ Budget Engine.

Pig Pig không thực hiện tính toán.

Pig Pig chỉ:

- Giải thích.
- Đưa ra cảnh báo.
- Động viên.
- Gợi ý.

---

## Rule 4

Nếu Budget Remaining nhỏ hơn Daily Budget.

Pig Pig hiển thị cảnh báo màu vàng.

---

## Rule 5

Nếu ngân sách còn lại bằng 0.

Pig Pig hiển thị cảnh báo màu đỏ.

---

# 8. Validation

Không có input trực tiếp trên Dashboard.

Mọi dữ liệu đều lấy từ hệ thống.

---

# 9. Edge Cases

## Case 1

Chưa có giao dịch.

Hiển thị:

"Bạn chưa có giao dịch nào."

---

## Case 2

Không có Saving Goal.

Ẩn Progress Saving.

---

## Case 3

Không có AI Insight.

Pig Pig hiển thị lời chào mặc định.

---

## Case 4

Không có Internet.

Dashboard vẫn hiển thị dữ liệu đã lưu gần nhất.

---

# 10. Acceptance Criteria

- Dashboard hiển thị đầy đủ thông tin ngân sách.
- Budget Card cập nhật ngay sau mỗi giao dịch.
- Pig Pig hiển thị đúng Insight theo dữ liệu hiện tại.
- Floating Action Button mở màn hình Add Expense.
- Bottom Navigation hoạt động đúng.
- Người dùng có thể truy cập các màn hình liên quan từ Dashboard.