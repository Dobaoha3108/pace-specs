# 07. Pig Pig AI Screen Specification

## 1. Purpose

Pig Pig là AI Copilot của PACE.

Pig Pig không thay thế người dùng đưa ra quyết định tài chính, mà đóng vai trò là người đồng hành, phân tích dữ liệu chi tiêu và chủ động hỗ trợ người dùng duy trì ngân sách, hoàn thành mục tiêu tiết kiệm và xây dựng thói quen tài chính lành mạnh.

Pig Pig chỉ hoạt động trên dữ liệu của PACE.

---

# 2. User Story

As a student,

I want to nhận được lời khuyên và cảnh báo đúng thời điểm,

So that mình có thể đưa ra quyết định chi tiêu hợp lý mà không cần tự tính toán.

---

# 3. Preconditions

- Người dùng đã hoàn thành Onboarding.
- Budget Engine đã có dữ liệu.
- Có ít nhất một giao dịch hoặc mục tiêu tiết kiệm.

---

# 4. Screen Layout

Pig Pig bao gồm 5 khu vực:

1. AI Greeting
2. AI Insights
3. Daily Check-in
4. Weekly Summary
5. AI Chat

---

# 5. Components

## 5.1 AI Greeting

Hiển thị lời chào theo ngữ cảnh.

Ví dụ

🐷

Chào Hà 👋

Hôm nay bạn còn 82.000đ để chi tiêu.

Chúc bạn có một ngày tiết kiệm nhé!

---

## 5.2 AI Insights

Hiển thị các cảnh báo hoặc lời khuyên quan trọng.

Ví dụ

⚠️

Khoản chi vừa rồi khiến ngân sách mỗi ngày giảm từ 82.000đ xuống còn 70.000đ.

Hoặc

🎉

Bạn đã duy trì Budget Streak được 8 ngày.

---

## 5.3 Daily Check-in

Pig Pig gửi lời nhắc mỗi ngày.

Ví dụ

Hôm nay bạn còn:

65.000đ

Đừng quên mục tiêu MacBook nhé!

---

## 5.4 Weekly Summary

Tóm tắt ngắn về tuần hiện tại.

Ví dụ

Tuần này

- Tiêu nhiều nhất: Ăn uống
- Tiết kiệm: 320.000đ
- Budget Streak: 6 ngày

Button

Xem báo cáo

↓

Reports

---

## 5.5 AI Chat

Cho phép người dùng hỏi các câu hỏi liên quan đến dữ liệu tài chính.

Ví dụ

"Tuần này mình tiêu nhiều nhất vào đâu?"

"Nếu cuối tuần đi xem phim thì còn đủ ngân sách không?"

"Mình còn bao lâu thì đạt mục tiêu MacBook?"

Pig Pig chỉ trả lời dựa trên dữ liệu trong PACE.

---

# 6. User Interaction

User mở Pig Pig

↓

Xem Insight

↓

Có thể

- Đọc Daily Check-in
- Xem Weekly Summary
- Chat với Pig Pig

↓

Đóng màn hình

↓

Quay lại Dashboard

---

# 7. Business Rules

## Rule 1

Pig Pig không tự tính toán.

Tất cả dữ liệu đều lấy từ Budget Engine.

---

## Rule 2

Pig Pig không chỉnh sửa dữ liệu.

Pig Pig chỉ:

- Phân tích
- Giải thích
- Cảnh báo
- Động viên
- Trả lời

---

## Rule 3

AI Chat chỉ trả lời các câu hỏi liên quan đến:

- Budget
- Expense
- Saving Goal
- Reports
- Budget Streak

---

## Rule 4

Pig Pig không trả lời các câu hỏi ngoài phạm vi PACE.

Ví dụ

❌ Viết thơ

❌ Dịch tiếng Anh

❌ Giải toán

---

## Rule 5

Khi Budget Engine thay đổi.

Pig Pig phải cập nhật Insight mới.

---

# 8. Validation

Nếu chưa có dữ liệu.

Pig Pig hiển thị:

"Bắt đầu ghi nhận khoản chi đầu tiên để mình có thể hỗ trợ bạn."

---

# 9. Edge Cases

## Case 1

Chưa có giao dịch.

↓

Pig Pig hướng dẫn bắt đầu.

---

## Case 2

Không có Saving Goal.

↓

Không hiển thị nội dung liên quan.

---

## Case 3

Không có Insight.

↓

Hiển thị lời chào mặc định.

---

## Case 4

Người dùng đặt câu hỏi ngoài phạm vi.

↓

Pig Pig trả lời:

"Mình chỉ có thể hỗ trợ các nội dung liên quan đến tài chính và dữ liệu trong PACE."

---

# 10. Acceptance Criteria

- Pig Pig luôn hiển thị Insight theo dữ liệu hiện tại.
- Daily Check-in hoạt động.
- Weekly Summary hoạt động.
- AI Chat trả lời theo dữ liệu của PACE.
- Không trả lời các câu hỏi ngoài phạm vi ứng dụng.