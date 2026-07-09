# 14. PIG PIG CHAT

Version: 1.0 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Purpose

Pig Pig Chat là trợ lý tài chính cá nhân của PACE.

Pig Pig giúp User hiểu tình hình tài chính, giải thích dữ liệu và đưa ra lời khuyên dựa trên dữ liệu hiện có trong ứng dụng.

Trong phiên bản MVP, Pig Pig sử dụng Rule-based Mock AI.

Không sử dụng mô hình AI hoặc LLM.

---

# 2. Business Objective

Pig Pig giúp User:

- Hiểu Budget hiện tại.
- Hiểu tình hình chi tiêu.
- Theo dõi Saving Goal.
- Hiểu Pig Coin.
- Trả lời các câu hỏi tài chính phổ biến.
- Tăng tính tương tác và gamification cho ứng dụng.

---

# 3. Business Responsibility

Pig Pig chịu trách nhiệm:

- Hiển thị màn hình Chat.
- Hiển thị Suggested Questions.
- Trả lời các câu hỏi mẫu.
- Đọc dữ liệu từ Budget, Expense, Saving Goal và Pig Coin.
- Đưa ra lời khuyên tài chính cơ bản.

Pig Pig không chịu trách nhiệm:

- Tạo Expense.
- Chỉnh sửa Expense.
- Tạo Saving Goal.
- Đổi Voucher.
- Thực hiện bất kỳ thay đổi dữ liệu nào.

---

# 4. Screen Overview

Feature Name

Pig Pig Chat

---

Business Goal

Cho phép User trò chuyện với trợ lý tài chính Pig Pig.

---

Entry Point

- Bottom Navigation → Pig Pig.
- Dashboard → Pig Pig Insight Banner → Chat với Pig Pig.

---

Exit Point

- Dashboard.
- Bottom Navigation Modules.

---

# 5. Screen Type

Main Navigation Screen

---

## Navigation Context

Pig Pig Chat là một màn hình chính trong Bottom Navigation.

Bottom Navigation luôn hiển thị khi User sử dụng Pig Pig Chat.

Tab Pig Pig luôn ở trạng thái Selected.

---

# 6. Used Components

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-003 Primary Button
- CMP-010 Chat Bubble
- CMP-011 Suggestion Chip
- CMP-013 Empty State
- CMP-014 Loading State

---

# 7. Preconditions

- User đã hoàn thành Onboarding.
- Budget đã được khởi tạo.
- Dashboard Summary đã được tạo.
- Pig Pig Mock Response đã được load.

---

# 8. Chat Screen

Pig Pig Chat chỉ bao gồm một màn hình duy nhất.

---

## Chat Area

Hiển thị toàn bộ cuộc hội thoại giữa User và Pig Pig.

User có thể cuộn lên để xem lại toàn bộ tin nhắn trước đó trong cuộc trò chuyện.

Không có màn hình Chat History riêng.

---

## Welcome Message

Lần đầu mở Pig Pig.

Hiển thị:

🐷 Xin chào!

Mình là Pig Pig - trợ lý tài chính của PACE.

Mình sẽ giúp bạn hiểu tình hình tài chính và đưa ra những gợi ý giúp bạn chi tiêu thông minh hơn.

---

## Suggested Questions

Pig Pig hiển thị sẵn các câu hỏi mẫu.

Ví dụ:

- Mình còn bao nhiêu tiền để tiêu?
- Tuần này mình đã chi bao nhiêu?
- Mình có đang vượt ngân sách không?
- Saving Goal của mình thế nào?
- Pig Coin dùng để làm gì?

User có thể:

- Click Suggested Question.
- Hoặc tự nhập câu hỏi.

---

## Chat Input

User nhập câu hỏi.

↓

Pig Pig trả lời.

---

# 9. User Flow

## Open Pig Pig

Bottom Navigation

↓

Pig Pig

↓

Load Chat Screen

↓

Load Suggested Questions

↓

Render Welcome Message

---

## Ask Question

User nhập câu hỏi.

↓

System tìm Mock Response phù hợp.

↓

Hiển thị:

🐷 đang suy nghĩ...

↓

Pig Pig trả lời.

---

## Suggested Question

User chọn Suggested Question.

↓

Tự động gửi câu hỏi.

↓

Pig Pig trả lời.

---

# 10. Screen Content

## Header

Hiển thị:

- Pig Pig Avatar.
- Pig Pig Chat.

---

## Chat Area

Hiển thị:

- User Message.
- Pig Pig Message.

Tin nhắn được hiển thị theo thứ tự thời gian.

---

## Suggested Questions

Hiển thị tối đa 5 Suggested Questions.

Có thể thay đổi sau mỗi lần User gửi câu hỏi.

---

## Chat Input

Bao gồm:

- Text Input.
- Send Button.

---

# 11. Mock AI Knowledge Base

Pig Pig sử dụng khoảng 20 câu hỏi mẫu.

Mỗi câu hỏi sẽ được ánh xạ tới một câu trả lời tương ứng.

Nếu User nhập đúng hoặc gần giống câu hỏi mẫu.

↓

Pig Pig trả về câu trả lời đã được chuẩn bị sẵn.

Nếu User nhập câu hỏi ngoài phạm vi hỗ trợ.

↓

Pig Pig trả lời:

"Xin lỗi, mình vẫn đang trong giai đoạn học hỏi.

Hiện tại mình chỉ có thể hỗ trợ một số câu hỏi tài chính trong phiên bản demo."

---

# 12. User Actions

User có thể:

- Nhập câu hỏi.
- Gửi câu hỏi.
- Chọn Suggested Question.
- Cuộn lên để xem lại cuộc hội thoại.

---

# 13. System Response

## Open Pig Pig

User mở Pig Pig Chat.

↓

System load:

- Dashboard Summary.
- Budget Summary.
- Saving Goal Summary.
- Pig Coin Balance.
- Suggested Questions.
- Mock AI Knowledge Base.

↓

Render Chat Screen.

---

## Send Message

User nhập câu hỏi.

↓

System chuẩn hóa nội dung câu hỏi.

↓

Tìm câu trả lời trong Mock AI Knowledge Base.

↓

Hiển thị:

🐷 Đang suy nghĩ...

↓

Pig Pig trả lời.

---

Nếu không tìm thấy câu trả lời phù hợp.

↓

Pig Pig trả lời:

"Xin lỗi, mình vẫn đang trong giai đoạn học hỏi.

Hiện tại mình chỉ có thể hỗ trợ một số câu hỏi tài chính trong phiên bản demo."

---

## Suggested Question

User chọn Suggested Question.

↓

Tự động gửi câu hỏi.

↓

Pig Pig trả lời.

---

# 14. Navigation

## Dashboard

User chọn:

Pig Pig Insight Banner

↓

Button "Chat với Pig Pig"

↓

Open Pig Pig Chat.

---

## Bottom Navigation

User chọn:

Pig Pig Chat.

↓

Open Pig Pig Chat.

---

## Suggestion Question

User chọn một câu hỏi gợi ý.

↓

Tự động điền nội dung vào ô nhập.

↓

User có thể chỉnh sửa hoặc gửi ngay.

---

## Send Message

User nhập tin nhắn.

↓

Send.

↓

System tạo phản hồi.

↓

Hiển thị trong Chat Area.

---

## Chat History

User chọn:

View All Chat History.

↓

Open Chat History.

---

User chọn một cuộc hội thoại.

↓

Open Conversation.

---

## Back Navigation

User chọn:

Back.

↓

Quay lại màn hình trước.

---

# 15. Display Rules

## Chat Area

Hiển thị theo dạng hội thoại.

Tin nhắn của User căn phải.

Tin nhắn của Pig Pig căn trái.

---

## Suggestion Questions

Hiển thị tối đa:

20 câu hỏi mẫu.

User có thể chọn bất kỳ câu hỏi nào.

---

## Chat History

Hiển thị theo dòng thời gian.

Nhóm theo:

- Hôm nay.
- Hôm qua.
- Các ngày trước.

Trong mỗi nhóm.

↓

Các cuộc hội thoại được sắp xếp theo thời gian giảm dần (mới nhất ở trên).

---

Nếu chưa có Chat History.

↓

Hiển thị Empty State.

↓

Thông báo:

"Bạn chưa có cuộc trò chuyện nào."

---

# 16. Validation

## User Message

Không được gửi tin nhắn để trống.

---

Nếu User gửi tin nhắn trống.

↓

Hiển thị:

"Không được gửi tin nhắn để trống."

---

Không gửi yêu cầu tới hệ thống.

---

# 17. Screen States

## Pig Pig Chat

- Loading.
- Normal.
- Empty.
- Error.

---

## Chat History

- Loading.
- Normal.
- Empty.
- Error.

---

# 18. Error Handling

## Chat Response Failed

Không thể tạo phản hồi.

↓

Hiển thị:

"Pig Pig đang bận. Vui lòng thử lại."

↓

Button:

"Thử lại"

---

## Chat History Load Failed

Không thể tải lịch sử trò chuyện.

↓

Hiển thị:

"Không thể tải lịch sử trò chuyện."

↓

Button:

"Thử lại"

---

# 19. Mock AI Knowledge Base

## Q1

User:

Làm sao để tiết kiệm hơn?

Pig Pig:

Hãy bắt đầu bằng việc đặt Saving Goal và cố gắng không vượt quá Remaining Daily Budget mỗi ngày.

---

## Q2

User:

Pig Coin dùng để làm gì?

Pig Pig:

Pig Coin được dùng để đổi Voucher trong Reward Marketplace.

---

## Q3

User:

Budget của mình được tính như thế nào?

Pig Pig:

Monthly Budget được tính bằng:

Monthly Income trừ Fixed Expense.

---

## Q4

User:

Mình đang chi tiêu đúng kế hoạch không?

Pig Pig:

Nếu Remaining Daily Budget vẫn lớn hơn 0 thì bạn vẫn đang chi tiêu đúng kế hoạch.

---

## Q5

User:

Saving Goal là gì?

Pig Pig:

Saving Goal giúp bạn dành riêng một khoản tiền để đạt mục tiêu tài chính trong tương lai.

---

## Q6

User:

Budget Streak là gì?

Pig Pig:

Budget Streak là số ngày liên tiếp bạn chi tiêu đúng kế hoạch.

---

## Q7

User:

Tại sao mình chưa nhận được Pig Coin?

Pig Pig:

Pig Coin chỉ được thưởng khi bạn đạt đủ điều kiện theo Budget Streak.

---

## Q8

User:

Expense Planned là gì?

Pig Pig:

Expense Planned là khoản chi bạn dự định thực hiện trong tương lai.

---

## Q9

User:

Expense Completed là gì?

Pig Pig:

Expense Completed là khoản chi đã thực sự phát sinh.

---

## Q10

User:

Khi nào Remaining Budget giảm?

Pig Pig:

Remaining Budget giảm khi Expense được chuyển sang trạng thái Completed hoặc Planned.

---

... (giữ nguyên các câu hỏi mẫu còn lại)

---

# 20. Related Specification

## Domain Model

- ChatMessage
- User
- Budget
- Expense
- SavingGoal
- PigCoinWallet

---

## Business Workflow

- Pig Pig Chat

---

## System Workflow

- Pig Pig Chat Processing

---

## Data Model

- ChatMessage
- User
- Budget
- Expense
- SavingGoal
- PigCoinWallet

---

## Business Rules

- BGT-001
- EXP-001
- SVG-001
- RWD-001

---

## UI Components

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-003 Primary Button
- CMP-013 Empty State
- CMP-014 Loading State

---

# 21. Acceptance Criteria

## AC-001

User có thể mở Pig Pig Chat từ:

- Bottom Navigation.
- Dashboard → Pig Pig Insight Banner → Button "Chat với Pig Pig".

---

## AC-002

User có thể xem Chat History bằng cách chọn:

View All Chat History.

Chat History được nhóm theo:

- Hôm nay.
- Hôm qua.
- Các ngày trước.

Trong mỗi nhóm.

↓

Các cuộc trò chuyện được sắp xếp theo thời gian giảm dần (mới nhất ở trên).

---

## AC-003

User có thể chọn một trong 20 câu hỏi mẫu.

---

## AC-004

User có thể nhập và gửi tin nhắn.

---

## AC-005

Pig Pig trả lời dựa trên Mock AI Knowledge Base.

---

## AC-006

Không cho phép gửi tin nhắn để trống.

---

## AC-007

Nếu xảy ra lỗi khi tải Chat History hoặc tạo phản hồi.

↓

Hiển thị thông báo lỗi.

↓

Cho phép User thử lại.

---

# 22. Open Questions

Hiện tại MVP đã thống nhất:

- Pig Pig sử dụng Mock AI Knowledge Base.
- Có sẵn 20 câu hỏi mẫu.
- Chat History được lưu cục bộ.
- Chat History có thể xem lại qua View All Chat History.
- Chat History được nhóm theo thời gian và sắp xếp mới nhất trước.
- Pig Pig không kết nối OpenAI API.

Các nội dung sau chưa thuộc phạm vi MVP:

- AI tạo phản hồi theo ngữ cảnh.
- Voice Chat.
- Hình ảnh.
- File Upload.
- Streaming Response.

---

# 23. Future Enhancements

Các cải tiến có thể bổ sung trong các phiên bản tiếp theo:

- Tích hợp OpenAI API.
- Hỗ trợ Voice Chat.
- Gợi ý Saving Goal bằng AI.
- Phân tích Financial Report bằng AI.
- Gợi ý Voucher phù hợp.
- Cá nhân hóa phản hồi theo hành vi người dùng.

Các nội dung trên không ảnh hưởng tới kiến trúc hiện tại của Feature.

---

# End of Document
