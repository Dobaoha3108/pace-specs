# 01. BUSINESS WORKFLOW

Version: 1.0 (MVP)

Project: PACE - Personal Finance Management App

Status: Draft

---

# 1. Purpose

Business Workflow mô tả cách các nghiệp vụ của PACE vận hành từ góc nhìn Business.

Tài liệu này xác định:

- Người dùng thực hiện hành động gì.
- Hệ thống phản hồi như thế nào.
- Dữ liệu nào được tạo hoặc cập nhật.
- Những quy tắc nghiệp vụ nào phải được áp dụng.
- Điều kiện nào làm thay đổi trạng thái của hệ thống.

Business Workflow không mô tả giao diện người dùng và không mô tả kiến trúc kỹ thuật.

Các nội dung về Service, API, Event hoặc Engine sẽ được mô tả trong tài liệu **02_SYSTEM_WORKFLOW.md**.

---

# 2. Workflow Principles

PACE được xây dựng dựa trên các nguyên tắc nghiệp vụ sau.

## Principle 1

Mọi Business Workflow đều bắt đầu từ một hành động của người dùng hoặc một sự kiện của hệ thống.

---

## Principle 2

Toàn bộ dữ liệu tài chính đều thuộc về User.

Mọi thay đổi dữ liệu phải được ghi nhận vào hồ sơ tài chính của User.

---

## Principle 3

Expense là nguồn dữ liệu trung tâm của toàn bộ hệ thống.

Các nghiệp vụ như Budget, Financial Report, Budget Streak và Pig Pig đều sử dụng Expense làm dữ liệu đầu vào.

---

## Principle 4

Pig Pig chỉ đóng vai trò hỗ trợ phân tích, giải thích và đưa ra khuyến nghị.

Pig Pig không được phép tự ý thay đổi dữ liệu tài chính của người dùng.

---

## Principle 5

Financial Report phải phản ánh đầy đủ tình hình tài chính hiện tại của người dùng.

Ngoài các biểu đồ và số liệu tổng hợp, Report phải cho phép người dùng xem lại lịch sử các khoản chi đã ghi nhận để phục vụ việc đối chiếu và kiểm tra.

---

## Principle 6

Reward Marketplace sử dụng Pig Coin làm đơn vị đổi thưởng.

Việc đổi Reward hoặc Voucher không làm thay đổi Budget của người dùng.

---

# 3. Workflow : User Onboarding & Budget Initialization

## Objective

Thiết lập hồ sơ tài chính ban đầu để hệ thống có đủ dữ liệu khởi tạo ngân sách và các thành phần nghiệp vụ cần thiết.

---

## Trigger

Người dùng hoàn thành đăng ký tài khoản hoặc lần đầu tiên mở ứng dụng.

---

## Actors

Primary Actor

- User

Supporting Actor

- System

---

## Preconditions

- User đã đăng ký thành công.
- User chưa có hồ sơ tài chính.

---

## Main Flow

### Step 1

Người dùng nhập các thông tin tài chính ban đầu:

- Thu nhập hàng tháng.
- Chi phí cố định hàng tháng.
- Ngày nhận tiền.

---

### Step 2

Người dùng có thể tạo Saving Goal ngay trong quá trình Onboarding.

Nếu tạo Saving Goal, người dùng cần nhập:

- Tên mục tiêu tiết kiệm.
- Số tiền mục tiêu.
- Ngày mong muốn hoàn thành.
- Chế độ tiết kiệm (Flexible hoặc Commitment).

Saving Goal có thể được bỏ qua và tạo sau.

---

### Step 3

Hệ thống kiểm tra tính hợp lệ của toàn bộ dữ liệu.

---

### Step 4

Nếu dữ liệu hợp lệ.

Hệ thống khởi tạo:

- Budget.
- Budget Streak.
- Pig Coin Wallet.
- Financial Report.

---

### Step 5

Dashboard được hiển thị.

---

### Step 6

Pig Pig gửi lời chào và hướng dẫn sử dụng lần đầu.

---

## Alternative Flow

Người dùng bỏ qua bước tạo Saving Goal.

↓

Hệ thống vẫn hoàn thành Onboarding.

↓

Saving Goal có thể được tạo sau.

---

## Exception Flow

Thiếu thông tin bắt buộc.

↓

Không cho phép hoàn tất Onboarding.

↓

Hiển thị thông báo yêu cầu bổ sung.

---

## Postconditions

Sau khi hoàn tất Onboarding:

- User có hồ sơ tài chính.
- Budget được tạo.
- Budget Streak được tạo.
- Pig Coin Wallet được tạo.
- Financial Report được khởi tạo.
- Dashboard sẵn sàng sử dụng.

---

## Business Rules

### BR-001

Mỗi User chỉ có một Budget đang hoạt động.

---

### BR-002

Budget có thể được cập nhật khi người dùng thay đổi:

- Thu nhập.
- Chi phí cố định.
- Ngày nhận tiền.

Mỗi lần thay đổi, hệ thống phải tính toán lại Budget và Daily Budget.

---

### BR-003

User có thể bỏ qua Saving Goal trong Onboarding.

Saving Goal không phải dữ liệu bắt buộc.

---

## Related Domains

- User
- Budget
- Saving Goal
- Dashboard
- Pig Pig

---

## Outputs

- Financial Profile Created
- Budget Initialized
- Dashboard Ready

---

# 4. Workflow : Expense Management

## Objective

Ghi nhận một khoản chi và cập nhật toàn bộ dữ liệu tài chính liên quan.

---

## Trigger

Người dùng tạo mới hoặc chỉnh sửa một Expense.

---

## Actors

Primary Actor

- User

Supporting Actor

- System

---

## Preconditions

- User đã hoàn tất Onboarding.
- User đã có Budget.

---

## Main Flow

### Step 1

Người dùng chọn chức năng Add Expense.

---

### Step 2

Người dùng nhập:

- Amount.
- Category.
- Note.
- Transaction Date.
- Status (Planned hoặc Completed).

---

### Step 3

Hệ thống kiểm tra dữ liệu.

---

### Step 4

Nếu hợp lệ.

Expense được ghi nhận.

---

### Step 5

Hệ thống cập nhật Remaining Budget.

Sau đó tính toán lại Remaining Daily Budget dựa trên:

- Remaining Budget hiện tại.
- Số ngày còn lại trong chu kỳ ngân sách.

---

### Step 6

Financial Report được cập nhật.

Bao gồm:

- Tổng chi.
- Biểu đồ.
- Lịch sử giao dịch.
- Phân tích theo danh mục.

---

### Step 7

Budget Streak được đánh giá lại dựa trên Remaining Daily Budget mới.

---

### Step 8

Pig Pig phân tích dữ liệu mới và tạo Insight nếu cần.

---

### Step 9

Dashboard hiển thị dữ liệu mới nhất.

---

## Alternative Flow

Expense ở trạng thái Planned hoặc Completed đều được ghi nhận vào Budget.

Planned được sử dụng để giúp người dùng dự báo khả năng chi tiêu trong tương lai.

Completed phản ánh khoản chi đã thực sự phát sinh.

Cả hai trạng thái đều làm thay đổi Budget.

---

## Exception Flow

Một Expense được coi là không hợp lệ khi:

- Amount nhỏ hơn hoặc bằng 0.
- Không chọn Category.
- Transaction Date không hợp lệ.
- Thiếu thông tin bắt buộc.

Hệ thống không lưu Expense và hiển thị lỗi tương ứng.

---

## Postconditions

- Expense được lưu.
- Remaining Budget được cập nhật.
- Remaining Daily Budget được tính lại.
- Financial Report được cập nhật.
- Budget Streak được đánh giá lại.
- Dashboard hiển thị dữ liệu mới.

---

## Business Rules

### BR-004

Expense phải có Amount lớn hơn 0.

---

### BR-005

Expense phải thuộc đúng một Category.

---

### BR-006

Expense ở trạng thái Planned hoặc Completed đều làm thay đổi Budget.

---

### BR-007

Sau mỗi Expense, hệ thống phải tính toán lại Remaining Daily Budget dựa trên Remaining Budget mới và số ngày còn lại trong chu kỳ ngân sách.

---

## Related Domains

- Expense
- Budget
- Financial Report
- Budget Streak
- Pig Pig

---

## Outputs

- Expense Recorded
- Budget Updated
- Remaining Daily Budget Updated
- Financial Report Updated
- Dashboard Updated

# 5. Workflow : Saving Goal Management

## Objective

Cho phép người dùng thiết lập và quản lý các mục tiêu tiết kiệm nhằm hình thành thói quen tiết kiệm và chủ động phân bổ ngân sách cho các mục tiêu tài chính.

Khoản tiền được đưa vào Saving Goal được xem là khoản tiền đã được dành riêng cho mục tiêu tiết kiệm và sẽ không còn thuộc ngân sách khả dụng để chi tiêu.

---

## Trigger

Một trong các hành động sau xảy ra:

- User tạo Saving Goal.
- User nạp tiền vào Saving Goal.
- User rút tiền khỏi Saving Goal.
- User chỉnh sửa Saving Goal.
- User hoàn thành Saving Goal.

---

## Actors

Primary Actor

- User

Supporting Actor

- System

---

## Preconditions

- User đã hoàn thành Onboarding.
- User đã có Budget.
- User chưa vượt quá số lượng Saving Goal được phép tạo.

---

## Main Flow

### Workflow A - Create Saving Goal

Step 1

User chọn chức năng Create Saving Goal.

---

Step 2

User nhập:

- Goal Name
- Target Amount
- Target Date
- Saving Mode

---

Step 3

Hệ thống kiểm tra dữ liệu.

---

Step 4

Saving Goal được tạo.

---

Step 5

Dashboard cập nhật danh sách Saving Goal.

---

Step 6

Pig Pig gửi lời động viên.

---

### Workflow B - Deposit Money

Step 1

User mở Saving Goal.

---

Step 2

User chọn Deposit.

---

Step 3

Nhập số tiền muốn chuyển vào Saving Goal.

---

Step 4

Hệ thống kiểm tra:

- Remaining Budget còn đủ.
- Số tiền hợp lệ.

---

Step 5

Nếu hợp lệ.

Hệ thống:

- tăng Current Amount của Saving Goal.
- giảm Remaining Budget.
- tính lại Remaining Daily Budget.
- cập nhật Financial Report.

---

Step 6

Pig Pig đánh giá tiến độ Saving Goal.

Nếu đạt một mốc quan trọng hoặc hoàn thành mục tiêu, hệ thống tạo lời chúc mừng phù hợp.

---

Step 7

Dashboard cập nhật.

---

### Workflow C - Withdraw Money

Step 1

User chọn Withdraw.

---

Step 2

Nếu Saving Mode là Flexible.

↓

Cho phép rút ngay.

↓

Saving Goal giảm số dư.

↓

Remaining Budget tăng tương ứng.

↓

Remaining Daily Budget được tính lại.

↓

Financial Report cập nhật.

↓

Dashboard cập nhật.

---

Step 3

Nếu Saving Mode là Commitment.

↓

Hiển thị thông báo xác nhận.

↓

Hệ thống bắt đầu thời gian chờ 2 giờ.

↓

Sau khi hết thời gian chờ.

↓

User xác nhận lại.

↓

Saving Goal giảm số dư.

↓

Remaining Budget tăng.

↓

Remaining Daily Budget được tính lại.

↓

Dashboard cập nhật.

---

### Workflow D - Complete Saving Goal

Step 1

Current Amount đạt Target Amount.

---

Step 2

Saving Goal chuyển sang trạng thái Completed.

---

Step 3

Pig Pig gửi lời chúc mừng.

---

Step 4

Hệ thống kiểm tra điều kiện nhận Pig Coin.

Nếu đủ điều kiện.

↓

Pig Coin được cộng vào Pig Coin Wallet.

↓

Notification được tạo.

↓

Dashboard cập nhật.

---

## Alternative Flow

User hủy Saving Goal.

↓

Saving Goal chuyển sang trạng thái Cancelled.

↓

Nếu Saving Goal vẫn còn số dư.

↓

Toàn bộ số tiền còn lại được cộng trở lại Remaining Budget.

↓

Remaining Daily Budget được tính lại.

---

## Exception Flow

Không cho phép tạo Saving Goal khi:

- thiếu Goal Name.
- Target Amount nhỏ hơn hoặc bằng 0.
- Target Date không hợp lệ.
- vượt quá số lượng Saving Goal của gói hiện tại.

Không cho phép Deposit khi:

- số tiền lớn hơn Remaining Budget.
- số tiền nhỏ hơn hoặc bằng 0.

Không cho phép Withdraw khi:

- số dư Saving Goal không đủ.
- Commitment chưa hết thời gian chờ.

---

## Postconditions

- Saving Goal được cập nhật.
- Remaining Budget được cập nhật.
- Remaining Daily Budget được cập nhật.
- Financial Report được cập nhật.
- Dashboard hiển thị dữ liệu mới nhất.

---

## Business Rules

### BR-008

Free User chỉ được tạo tối đa hai Saving Goal.

---

### BR-009

Saving Goal hỗ trợ hai chế độ:

Flexible

Người dùng có thể rút tiền ngay sau khi xác nhận.

Commitment

Người dùng phải chờ 2 giờ trước khi hoàn tất việc rút tiền.

---

### BR-010

Mỗi lần Deposit thành công.

↓

Remaining Budget phải giảm tương ứng.

↓

Remaining Daily Budget phải được tính lại.

---

### BR-011

Mỗi lần Withdraw thành công.

↓

Remaining Budget phải tăng tương ứng.

↓

Remaining Daily Budget phải được tính lại.

---

### BR-012

Saving Goal Completed có thể đủ điều kiện nhận Pig Coin theo chính sách Reward hiện hành.

---

## Related Domains

- Saving Goal
- Budget
- Financial Report
- Pig Coin Wallet
- Reward Marketplace
- Dashboard
- Pig Pig

---

## Outputs

- Saving Goal Updated
- Remaining Budget Updated
- Remaining Daily Budget Updated
- Dashboard Updated

---

# 6. Workflow : Financial Report

## Objective

Cung cấp cho người dùng góc nhìn tổng quan về tình hình tài chính hiện tại và lịch sử chi tiêu thông qua các dữ liệu trực quan và lịch sử giao dịch.

Financial Report giúp người dùng đánh giá hiệu quả quản lý ngân sách và theo dõi các xu hướng chi tiêu theo thời gian.

---

## Trigger

Financial Report được cập nhật khi:

- User tạo Expense.
- User chỉnh sửa Expense.
- User tạo hoặc chỉnh sửa Saving Goal.
- Budget thay đổi.

Hoặc khi User chủ động mở màn hình Report.

---

## Actors

Primary Actor

- User

Supporting Actor

- System

---

## Preconditions

- User đã có Budget.

---

## Main Flow

Step 1

Hệ thống lấy dữ liệu từ:

- Expense
- Budget
- Saving Goal
- Budget Streak

---

Step 2

Tính toán:

- Tổng chi tiêu.
- Remaining Budget.
- Remaining Daily Budget.
- Chi tiêu theo Category.
- Tỷ lệ sử dụng Budget.

---

Step 3

Tạo biểu đồ trực quan.

---

Step 4

Lấy lịch sử Expense theo thời gian.

---

Step 5

Pig Pig tạo Insight dựa trên dữ liệu hiện tại.

---

Step 6

Financial Report hiển thị:

- Tổng quan tài chính.
- Biểu đồ.
- Lịch sử giao dịch.
- AI Insight.

---

## Alternative Flow

Chưa có Expense.

↓

Hiển thị Empty State.

↓

Pig Pig hướng dẫn tạo giao dịch đầu tiên.

---

## Exception Flow

Không lấy được dữ liệu.

↓

Hiển thị Error State.

↓

Cho phép người dùng thử lại.

---

## Postconditions

Financial Report phản ánh dữ liệu mới nhất của hệ thống.

---

## Business Rules

### BR-013

Financial Report phải hiển thị đầy đủ lịch sử Expense của người dùng.

---

### BR-014

Financial Report luôn phản ánh dữ liệu mới nhất của Budget và Saving Goal.

---

### BR-015

AI Insight chỉ đóng vai trò hỗ trợ phân tích và không thay đổi dữ liệu.

---

## Related Domains

- Expense
- Budget
- Saving Goal
- Budget Streak
- Pig Pig

---

## Outputs

- Financial Report Updated
- AI Insight Generated

---

# 7. Workflow : Budget Streak Management

## Objective

Theo dõi khả năng duy trì thói quen chi tiêu đúng hạn mức hằng ngày của người dùng.

Budget Streak là chỉ số phản ánh mức độ kỷ luật trong quản lý tài chính và là North Star Metric của PACE.

---

## Trigger

Expense Planned hoặc Expense Completed được ghi nhận.

---

## Actors

Supporting Actor

- System

---

## Preconditions

- User đã có Budget.

---

## Main Flow

Step 1

Sau mỗi Expense.

↓

Hệ thống tính lại Remaining Daily Budget.

---

Step 2

So sánh tổng chi tiêu trong ngày với Remaining Daily Budget hiện tại.

---

Step 3

Nếu tổng chi tiêu trong ngày không vượt quá Remaining Daily Budget.

↓

Budget Streak được duy trì hoặc tăng thêm một ngày.

---

Step 4

Nếu tổng chi tiêu vượt quá Remaining Daily Budget.

↓

Budget Streak bị reset.

↓

Pig Pig gửi cảnh báo phù hợp.

---

Step 5

Nếu Remaining Daily Budget thay đổi do Budget được phân bổ lại.

↓

Hệ thống sử dụng Remaining Daily Budget mới làm hạn mức cho các ngày tiếp theo.

Người dùng vẫn có thể bắt đầu một Budget Streak mới nếu tiếp tục chi tiêu trong giới hạn mới.

---

## Alternative Flow

Trong ngày không có Expense.

↓

Budget Streak không tăng.

↓

Nếu người dùng không ghi nhận Expense quá 3 ngày liên tiếp.

↓

Budget Streak bị reset.

↓

Pig Pig gửi lời nhắc ghi chép chi tiêu.

---

## Exception Flow

Không có.

---

## Postconditions

Budget Streak phản ánh đúng trạng thái chi tiêu hiện tại của người dùng.

---

## Business Rules

### BR-016

Budget Streak được đánh giá dựa trên Remaining Daily Budget hiện tại.

---

### BR-017

Expense Planned và Expense Completed đều ảnh hưởng đến Budget Streak.

---

### BR-018

Người dùng chỉ nhận Pig Coin khi duy trì Budget Streak đủ 7 ngày liên tiếp trong hạn mức.

---

## Related Domains

- Budget
- Expense
- Pig Coin Wallet
- Reward Marketplace
- Dashboard
- Pig Pig

---

## Outputs

- Budget Streak Updated
- Pig Coin Updated
- Dashboard Updated

# 8. Workflow : Pig Coin & Reward Marketplace

## Objective

Khuyến khích người dùng duy trì các hành vi quản lý tài chính tích cực thông qua cơ chế tích điểm Pig Coin và đổi thưởng tại Reward Marketplace.

Reward Marketplace giúp tăng động lực sử dụng ứng dụng lâu dài nhưng không làm thay đổi Budget hay dữ liệu tài chính của người dùng.

---

## Trigger

Một trong các hành động sau xảy ra:

- User duy trì Budget Streak đủ điều kiện.
- User hoàn thành Saving Goal.
- User tham gia các chương trình thưởng của hệ thống.
- User đổi Voucher hoặc Reward.

---

## Actors

Primary Actor

- User

Supporting Actor

- System

---

## Preconditions

- User đã có Pig Coin Wallet.

---

## Main Flow

### Workflow A - Earn Pig Coin

Step 1

Người dùng hoàn thành một hành động đủ điều kiện nhận thưởng.

---

Step 2

Hệ thống kiểm tra điều kiện nhận Pig Coin.

---

Step 3

Nếu đủ điều kiện.

↓

Pig Coin được cộng vào Pig Coin Wallet.

↓

Notification được tạo.

↓

Pig Pig gửi lời chúc mừng.

↓

Dashboard cập nhật số Pig Coin mới.

---

### Workflow B - Redeem Voucher

Step 1

User mở Reward Marketplace.

---

Step 2

Chọn Voucher hoặc Reward muốn đổi.

---

Step 3

Hệ thống kiểm tra:

- số Pig Coin hiện có.
- trạng thái Voucher.
- số lượng còn lại.

---

Step 4

Nếu hợp lệ.

↓

Pig Coin bị trừ.

↓

Voucher được cấp cho User.

↓

Lưu lịch sử đổi thưởng.

↓

Notification được tạo.

↓

Dashboard cập nhật.

---

## Alternative Flow

Pig Coin không đủ.

↓

Không cho phép đổi.

↓

Hiển thị số Pig Coin còn thiếu.

---

## Exception Flow

Voucher hết số lượng.

↓

Không cho phép đổi.

↓

Hiển thị trạng thái Out Of Stock.

---

Voucher hết hạn.

↓

Không cho phép đổi.

↓

Hiển thị thông báo.

---

## Postconditions

- Pig Coin Wallet được cập nhật.
- Voucher được cấp.
- Lịch sử đổi thưởng được lưu.
- Notification được tạo.

---

## Business Rules

### BR-019

Pig Coin không được nhỏ hơn 0.

---

### BR-020

Voucher chỉ được đổi khi User có đủ Pig Coin.

---

### BR-021

Mọi lần đổi Voucher phải được lưu vào lịch sử đổi thưởng.

---

### BR-022

Reward Marketplace không được phép thay đổi Budget hoặc Expense.

---

## Related Domains

- Pig Coin Wallet
- Reward Marketplace
- Voucher
- Notification

---

## Outputs

- Pig Coin Updated
- Voucher Redeemed
- Reward History Updated

---

# 9. Workflow : Pig Pig AI

## Objective

Pig Pig là Financial Copilot của PACE.

Pig Pig hỗ trợ người dùng hiểu tình hình tài chính, xây dựng thói quen chi tiêu lành mạnh và trả lời các câu hỏi liên quan đến ứng dụng cũng như dữ liệu tài chính cá nhân.

Pig Pig không có quyền thay đổi dữ liệu của người dùng.

---

## Trigger

Một trong các trường hợp sau xảy ra:

- User mở màn hình Pig Pig.
- User gửi tin nhắn.
- Budget thay đổi.
- Expense thay đổi.
- Saving Goal thay đổi.
- Financial Report được cập nhật.

---

## Actors

Primary Actor

- User

Supporting Actor

- Pig Pig

---

## Preconditions

- User đã có hồ sơ tài chính.

---

## Main Flow

### Workflow A - AI Copilot

Step 1

Hệ thống phát hiện dữ liệu tài chính của User thay đổi.

---

Step 2

Pig Pig đọc dữ liệu mới nhất từ:

- Budget
- Expense
- Saving Goal
- Financial Report
- Budget Streak

---

Step 3

Pig Pig phân tích dữ liệu.

---

Step 4

Nếu phát hiện vấn đề hoặc cơ hội cải thiện.

↓

Sinh AI Insight.

↓

Nếu cần.

↓

Tạo Recommendation hoặc Warning.

---

### Workflow B - AI Chatbot

Step 1

User gửi câu hỏi.

---

Step 2

Pig Pig xác định nội dung câu hỏi.

---

Step 3

Nếu câu hỏi thuộc phạm vi hỗ trợ.

↓

Pig Pig đọc dữ liệu liên quan.

↓

Sinh câu trả lời.

↓

Hiển thị cho User.

↓

Lưu lịch sử hội thoại.

---

### Workflow C - Unsupported Question

Step 1

Pig Pig xác định câu hỏi nằm ngoài phạm vi hỗ trợ.

---

Step 2

Pig Pig trả lời:

"Tôi hiện chỉ hỗ trợ các câu hỏi liên quan đến quản lý tài chính cá nhân và ứng dụng PACE."

---

## Alternative Flow

Không đủ dữ liệu để phân tích.

↓

Pig Pig đưa ra lời khuyên mang tính tổng quát.

---

## Exception Flow

Không thể tạo phản hồi.

↓

Thông báo lỗi.

↓

Cho phép User gửi lại.

---

## Postconditions

- AI Insight được cập nhật.
- Recommendation được tạo (nếu có).
- Chat History được lưu.

---

## Business Rules

### BR-023

Pig Pig không được thay đổi dữ liệu tài chính của User.

---

### BR-024

Pig Pig chỉ sử dụng dữ liệu đã được User tạo trong PACE.

---

### BR-025

Pig Pig chỉ trả lời các câu hỏi liên quan đến:

- Budget
- Expense
- Saving Goal
- Financial Report
- Budget Streak
- Reward
- Voucher
- Cách sử dụng PACE

---

### BR-026

Pig Pig không trả lời các câu hỏi ngoài phạm vi trên.

---

### BR-027

Pig Pig không đưa ra lời khuyên về đầu tư, chứng khoán, tiền mã hóa hoặc các lĩnh vực tài chính chuyên sâu.

---

## Related Domains

- Budget
- Expense
- Saving Goal
- Financial Report
- Notification

---

## Outputs

- AI Insight
- AI Recommendation
- AI Warning
- Chat Response

---

# 10. Workflow : Notification

## Objective

Thông báo cho người dùng về các thay đổi quan trọng trong quá trình quản lý tài chính và sử dụng ứng dụng.

Notification giúp User không bỏ lỡ các sự kiện quan trọng và duy trì tương tác với PACE.

---

## Trigger

Một trong các sự kiện sau xảy ra:

- Expense được tạo.
- Budget thay đổi.
- Budget Streak thay đổi.
- Saving Goal hoàn thành.
- Pig Coin được cộng.
- Voucher được đổi.
- Pig Pig tạo Warning hoặc Recommendation.

---

## Actors

Supporting Actor

- System

---

## Preconditions

Notification đã được bật.

---

## Main Flow

Step 1

Hệ thống xác định có sự kiện cần thông báo.

---

Step 2

Notification được tạo.

---

Step 3

Lưu Notification vào lịch sử.

---

Step 4

Nếu User bật Push Notification.

↓

Gửi Push Notification.

---

Step 5

Notification hiển thị trong Notification Center.

---

## Alternative Flow

Push Notification bị tắt.

↓

Chỉ lưu Notification trong ứng dụng.

---

## Exception Flow

Không thể gửi Push Notification.

↓

Ghi nhận lỗi.

↓

Notification vẫn được lưu trong ứng dụng.

---

## Postconditions

Notification được lưu.

---

## Business Rules

### BR-028

Notification không làm thay đổi dữ liệu tài chính.

---

### BR-029

Mọi Notification đều phải được lưu vào lịch sử.

---

### BR-030

Notification chỉ được tạo khi có sự kiện hợp lệ.

---

## Related Domains

- Notification
- Pig Pig
- Reward Marketplace
- Budget

---

## Outputs

- Notification Created

---

# 11. Global Business Rules

### GR-001

Expense là nguồn dữ liệu gốc của toàn bộ hệ thống.

---

### GR-002

Budget luôn phản ánh ngân sách khả dụng mới nhất của User.

---

### GR-003

Deposit vào Saving Goal làm giảm Remaining Budget.

---

### GR-004

Withdraw khỏi Saving Goal làm tăng Remaining Budget.

---

### GR-005

Financial Report phải phản ánh đầy đủ dữ liệu tổng hợp và lịch sử Expense.

---

### GR-006

Pig Pig chỉ được phép đọc dữ liệu.

---

### GR-007

Reward Marketplace chỉ sử dụng Pig Coin làm đơn vị đổi thưởng.

---

### GR-008

Budget Streak luôn được đánh giá dựa trên Remaining Daily Budget hiện tại.

---

### GR-009

Expense ở trạng thái Planned và Completed đều làm thay đổi Budget.

---

### GR-010

Planned và Completed là hai trạng thái của cùng một Expense, không phải hai giao dịch độc lập.

---

# 12. Business Events

Các sự kiện nghiệp vụ chính của hệ thống:

- User Registered
- Budget Initialized
- Expense Created
- Expense Updated
- Expense Status Changed
- Saving Goal Created
- Saving Goal Updated
- Saving Goal Completed
- Saving Goal Cancelled
- Budget Updated
- Financial Report Updated
- Budget Streak Updated
- Pig Coin Earned
- Voucher Redeemed
- Notification Created
- AI Insight Generated

---

# End of Document