# 00. DOMAIN MODEL

Version: 1.0 (MVP)

Project: PACE - Personal Finance Management App

Author: Business Analysis Team

Status: Draft

---

# 1. Purpose

Domain Model định nghĩa toàn bộ các đối tượng nghiệp vụ (Business Entities), mối quan hệ giữa các đối tượng và phạm vi dữ liệu mà hệ thống PACE quản lý.

Đây là tài liệu nền tảng để:

- Thiết kế Database
- Thiết kế Business Logic
- Thiết kế State Management
- Thiết kế API
- Thiết kế Feature Specification
- Thiết kế AI Context
- Triển khai Mobile Application

Tất cả các tài liệu đặc tả phía sau phải tuân thủ Domain Model này.

---

# 2. Domain Overview

PACE được xây dựng dựa trên các Business Domain sau:

```text
User
│
├── Budget
│     ├── Daily Budget
│     ├── Monthly Budget
│     └── Budget Streak
│
├── Expense
│     └── Category
│
├── Saving Goal
│
├── Financial Report
│
├── Pig Coin Wallet
│
├── Reward Marketplace
│     ├── Reward
│     ├── Voucher
│     └── Redemption History
│
├── Notification
│
└── Pig Pig AI
      ├── AI Copilot
      ├── AI Chatbot
      ├── Insight Engine
      ├── Recommendation Engine
      └── Budget Warning Engine
```

---

# 3. Domain Principles

PACE được thiết kế theo các nguyên tắc sau.

## Principle 1

User là Aggregate Root của toàn bộ hệ thống.

Mọi dữ liệu nghiệp vụ đều thuộc về một User.

---

## Principle 2

Expense là nguồn dữ liệu chính của hệ thống.

Hầu hết Business Logic đều bắt đầu từ việc phát sinh Expense.

---

## Principle 3

Budget là trung tâm của hệ thống.

Dashboard, Report và Pig Pig đều sử dụng dữ liệu từ Budget.

---

## Principle 4

Pig Pig không sở hữu dữ liệu.

Pig Pig chỉ đọc dữ liệu từ các Domain khác để:

- phân tích
- dự báo
- cảnh báo
- giải thích
- trả lời người dùng

---

## Principle 5

Reward Marketplace là một module độc lập.

Marketplace sử dụng Pig Coin làm đơn vị quy đổi nhưng không ảnh hưởng tới Business Logic của Budget.

---

## Principle 6

Financial Report chỉ lưu dữ liệu tổng hợp.

Report không lưu Transaction.

Toàn bộ Transaction luôn được lấy từ Expense.

---

## Principle 7

Business Logic luôn được ưu tiên hơn UI.

Mọi Screen chỉ là nơi hiển thị dữ liệu từ Domain.

Không được đặt Business Logic trong UI.

---

# 4. Entity : User

## Description

User đại diện cho một người sử dụng ứng dụng PACE.

User là Domain Root của toàn bộ hệ thống.

Mọi dữ liệu tài chính đều gắn với đúng một User.

---

## Attributes

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Định danh người dùng |
| displayName | String | Tên hiển thị |
| avatar | Image | Ảnh đại diện |
| email | String | Email đăng nhập |
| monthlyIncome | Currency | Thu nhập theo tháng |
| fixedExpense | Currency | Chi phí cố định |
| payday | Integer | Ngày nhận tiền hàng tháng |
| createdAt | DateTime | Ngày tạo tài khoản |
| updatedAt | DateTime | Ngày cập nhật gần nhất |

---

## Relationships

Một User có:

- Một Budget
- Nhiều Expense
- Tối đa hai Saving Goal (MVP 1.0)
- Một Financial Report
- Một Budget Streak
- Một Pig Coin Wallet
- Nhiều Notification
- Một Pig Pig AI Session

---

## Business Definition

Một User chỉ có một hồ sơ tài chính.

Toàn bộ Budget, Expense, Saving Goal và Report đều thuộc về User đó.

---

# 5. Entity : Budget

## Description

Budget đại diện cho toàn bộ ngân sách khả dụng của người dùng trong một chu kỳ tài chính.

Budget được sinh sau khi người dùng hoàn thành bước thiết lập ngân sách.

Budget là nguồn dữ liệu chính của Dashboard.

---

## Attributes

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Định danh Budget |
| totalBudget | Currency | Tổng ngân sách khả dụng |
| remainingBudget | Currency | Ngân sách còn lại |
| dailyBudget | Currency | Ngân sách khuyến nghị mỗi ngày |
| remainingDailyBudget | Currency | Ngân sách còn lại trong ngày |
| cycleStartDate | Date | Ngày bắt đầu chu kỳ |
| cycleEndDate | Date | Ngày kết thúc chu kỳ |
| updatedAt | DateTime | Thời điểm cập nhật |

---

## Relationships

Budget sử dụng dữ liệu từ:

- User
- Expense
- Saving Goal

Budget cung cấp dữ liệu cho:

- Dashboard
- Financial Report
- Pig Pig AI
- Budget Streak

---

## Business Definition

Budget luôn phản ánh số tiền người dùng còn được phép sử dụng.

Budget sẽ thay đổi sau mỗi giao dịch hợp lệ.

---

# 6. Entity : Expense

## Description

Expense đại diện cho một khoản chi tiêu của người dùng.

Expense là nguồn dữ liệu quan trọng nhất trong hệ thống.

Mọi thay đổi về Budget đều bắt nguồn từ Expense.

---

## Attributes

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Định danh giao dịch |
| amount | Currency | Giá trị giao dịch |
| categoryId | UUID | Danh mục |
| note | String | Ghi chú |
| transactionDate | DateTime | Ngày phát sinh |
| status | Enum | Trạng thái |
| createdAt | DateTime | Ngày tạo |
| updatedAt | DateTime | Ngày cập nhật |

---

## Expense Status

- Planned
- Completed

---

## Relationships

Expense thuộc:

- Một User
- Một Category

Expense ảnh hưởng tới:

- Budget
- Financial Report
- Budget Streak
- Pig Pig AI

---

## Business Definition

Expense là Transaction gốc của hệ thống.

Mọi thống kê, báo cáo và phân tích AI đều sử dụng Expense làm nguồn dữ liệu đầu vào.

---

# 7. Entity : Category

## Description

Category là danh mục phân loại Expense.

Category giúp hệ thống thống kê và phân tích hành vi chi tiêu.

---

## Default Categories

- Food
- Transportation
- Shopping
- Entertainment
- Education
- Health
- Bills
- Other

---

## Relationships

Một Category có thể chứa nhiều Expense.

Một Expense chỉ thuộc một Category.

---

## Business Definition

Danh mục được sử dụng trong:

- Dashboard
- Financial Report
- Pig Pig Insight
- Analytics

# 8. Entity : Saving Goal

## Description

Saving Goal đại diện cho một mục tiêu tiết kiệm mà người dùng thiết lập nhằm đạt được một kế hoạch tài chính cụ thể.

Saving Goal giúp người dùng hình thành thói quen tiết kiệm thông qua việc theo dõi tiến độ, quản lý số tiền đã tích lũy và duy trì động lực hoàn thành mục tiêu.

Trong phiên bản MVP 1.0:

- Người dùng Free chỉ được phép tạo tối đa hai Saving Goal.
- Người dùng Premium có thể tạo không giới hạn Saving Goal.

---

## Attributes

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Định danh Saving Goal |
| title | String | Tên mục tiêu |
| targetAmount | Currency | Số tiền mục tiêu |
| currentAmount | Currency | Số tiền đã tiết kiệm |
| targetDate | Date | Ngày mong muốn hoàn thành |
| savingMode | Enum | Chế độ tiết kiệm |
| status | Enum | Trạng thái |
| progress | Decimal | Tiến độ hoàn thành (%) |
| createdAt | DateTime | Ngày tạo |
| updatedAt | DateTime | Ngày cập nhật |

---

## Saving Mode

- Flexible
- Commitment

---

## Saving Goal Status

- Active
- Completed
- Cancelled

---

## Relationships

Saving Goal thuộc:

- Một User

Saving Goal sử dụng dữ liệu từ:

- Budget

Saving Goal cung cấp dữ liệu cho:

- Dashboard
- Financial Report
- Pig Pig AI
- Reward Marketplace

---

## Business Definition

Saving Goal không làm thay đổi Budget.

Saving Goal chỉ theo dõi số tiền người dùng tự chuyển vào hũ tiết kiệm.

Việc cộng Pig Coin được xử lý bởi Reward Engine.

---

# 9. Entity : Financial Report

## Description

Financial Report là module tổng hợp và trực quan hóa toàn bộ tình hình tài chính của người dùng.

Đây là một màn hình độc lập trên Bottom Navigation.

Financial Report giúp người dùng đánh giá hành vi chi tiêu và theo dõi tình trạng tài chính theo thời gian.

Report không lưu dữ liệu giao dịch.

Toàn bộ dữ liệu được tổng hợp từ các Domain khác.

---

## Attributes

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Định danh báo cáo |
| reportPeriod | Enum | Chu kỳ báo cáo |
| totalExpense | Currency | Tổng chi tiêu |
| totalBudget | Currency | Tổng ngân sách |
| remainingBudget | Currency | Ngân sách còn lại |
| budgetUsage | Decimal | Tỷ lệ sử dụng ngân sách |
| generatedAt | DateTime | Ngày tạo báo cáo |

---

## Relationships

Financial Report sử dụng dữ liệu từ:

- Budget
- Expense
- Saving Goal
- Budget Streak

Financial Report cung cấp dữ liệu cho:

- Pig Pig AI
- Dashboard

---

## Business Definition

Financial Report luôn phản ánh dữ liệu mới nhất.

Report không sở hữu Transaction.

Mọi dữ liệu hiển thị đều được tổng hợp từ Domain hiện tại.

---

# 10. Entity : Budget Streak

## Description

Budget Streak theo dõi số ngày liên tiếp người dùng duy trì chi tiêu trong giới hạn ngân sách.

Đây là North Star Metric của PACE.

Budget Streak được sử dụng để tạo động lực duy trì hành vi tài chính tích cực.

---

## Attributes

| Field | Type | Description |
|--------|------|-------------|
| currentStreak | Integer | Streak hiện tại |
| longestStreak | Integer | Streak dài nhất |
| currentWeek | Integer | Tuần hiện tại |
| lastUpdated | Date | Lần cập nhật cuối |

---

## Relationships

Budget Streak sử dụng dữ liệu từ:

- Budget
- Expense

Budget Streak cung cấp dữ liệu cho:

- Dashboard
- Financial Report
- Reward Marketplace
- Pig Pig AI

---

## Business Definition

Budget Streak phản ánh hành vi quản lý tài chính.

Việc tính toán Streak được thực hiện bởi Budget Engine.

---

# 11. Entity : Pig Coin Wallet

## Description

Pig Coin Wallet lưu trữ toàn bộ số Pig Coin mà người dùng đang sở hữu.

Pig Coin được sử dụng để đổi Reward và Voucher trong Reward Marketplace.

---

## Attributes

| Field | Type | Description |
|--------|------|-------------|
| balance | Integer | Số Pig Coin hiện có |
| totalEarned | Integer | Tổng Pig Coin đã nhận |
| totalSpent | Integer | Tổng Pig Coin đã sử dụng |
| updatedAt | DateTime | Ngày cập nhật |

---

## Relationships

Pig Coin Wallet thuộc:

- Một User

Pig Coin Wallet sử dụng dữ liệu từ:

- Budget Streak
- Saving Goal

Pig Coin Wallet cung cấp dữ liệu cho:

- Reward Marketplace

---

## Business Definition

Pig Coin không có giá trị quy đổi thành tiền.

Pig Coin chỉ được sử dụng trong hệ sinh thái PACE.

---

# 12. Entity : Reward Marketplace

## Description

Reward Marketplace là hệ thống đổi thưởng của PACE.

Người dùng sử dụng Pig Coin để đổi Reward hoặc Voucher từ các đối tác.

Reward Marketplace thuộc phạm vi MVP 1.0.

---

## Components

Reward Marketplace bao gồm:

- Reward
- Voucher
- Redemption History

---

## Relationships

Reward Marketplace sử dụng dữ liệu từ:

- Pig Coin Wallet

Reward Marketplace cung cấp dữ liệu cho:

- Dashboard
- Profile

---

## Business Definition

Reward Marketplace không tác động tới Budget.

Marketplace chỉ sử dụng Pig Coin làm đơn vị thanh toán.

---

# 13. Entity : Voucher

## Description

Voucher đại diện cho các phần thưởng có thể đổi bằng Pig Coin.

Voucher được cung cấp bởi các đối tác của PACE.

---

## Attributes

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Định danh Voucher |
| title | String | Tên Voucher |
| partner | String | Đối tác |
| requiredCoin | Integer | Pig Coin cần đổi |
| quantity | Integer | Số lượng còn lại |
| expiredDate | Date | Ngày hết hạn |
| status | Enum | Trạng thái |

---

## Voucher Status

- Available
- Redeemed
- Expired

---

## Relationships

Voucher thuộc:

- Reward Marketplace

---

## Business Definition

Voucher chỉ được đổi khi người dùng có đủ Pig Coin.

---

# 14. Entity : Notification

## Description

Notification là hệ thống thông báo của ứng dụng.

Thông báo được sử dụng để:

- cảnh báo
- nhắc nhở
- thông báo phần thưởng
- thông báo Saving Goal
- thông báo từ Pig Pig

---

## Attributes

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Định danh |
| title | String | Tiêu đề |
| message | String | Nội dung |
| type | Enum | Loại thông báo |
| createdAt | DateTime | Thời điểm tạo |
| isRead | Boolean | Đã đọc hay chưa |

---

## Notification Types

- Budget Warning
- Daily Check-in
- Saving Reminder
- Reward
- Voucher
- System

---

## Relationships

Notification thuộc:

- Một User

Notification được tạo bởi:

- Pig Pig AI
- Budget Engine
- Reward Marketplace

---

## Business Definition

Notification chỉ có nhiệm vụ truyền tải thông tin.

Notification không thực hiện Business Logic.

# 15. Entity : Pig Pig AI

## Description

Pig Pig AI là AI Copilot của PACE, đóng vai trò như một Financial Copilot đồng hành cùng người dùng trong suốt quá trình quản lý tài chính.

Pig Pig không chỉ trả lời câu hỏi mà còn chủ động phân tích dữ liệu tài chính, phát hiện rủi ro, đưa ra cảnh báo và khuyến nghị phù hợp nhằm giúp người dùng đưa ra quyết định chi tiêu tốt hơn.

Pig Pig không sở hữu dữ liệu.

Pig Pig chỉ sử dụng dữ liệu từ các Domain khác để tạo Insight và hỗ trợ người dùng.

---

## Responsibilities

Pig Pig AI bao gồm hai nhóm chức năng chính:

### 1. AI Copilot

Hoạt động chủ động trong hệ thống.

Bao gồm:

- Budget Analysis
- Budget Warning
- Spending Forecast
- Daily Check-in
- Saving Goal Reminder
- Weekly Insight
- Recommendation

---

### 2. AI Chatbot

Hoạt động theo yêu cầu của người dùng.

Pig Pig Chatbot có màn hình riêng trên Bottom Navigation.

Người dùng có thể đặt câu hỏi liên quan đến:

- Budget
- Expense
- Saving Goal
- Financial Report
- Budget Streak
- Pig Coin
- Reward
- Cách sử dụng PACE

---

## Data Sources

Pig Pig sử dụng dữ liệu từ:

- Budget
- Expense
- Saving Goal
- Financial Report
- Budget Streak
- Pig Coin Wallet
- Notification

---

## Outputs

Pig Pig có thể tạo ra:

- Insight
- Warning
- Forecast
- Recommendation
- Daily Check-in
- Chat Response

---

## Relationships

Pig Pig AI sử dụng dữ liệu từ:

- Budget
- Expense
- Saving Goal
- Financial Report
- Budget Streak

Pig Pig AI tạo dữ liệu cho:

- Dashboard
- Notification
- Financial Report (AI Insight)
- Chat Screen

---

## Business Definition

Pig Pig không được phép thay đổi dữ liệu.

Pig Pig chỉ đọc dữ liệu và sinh Insight.

Mọi Business Logic vẫn được thực hiện bởi Budget Engine hoặc các Domain Service tương ứng.

---

# 16. Entity : Pig Pig Chat Session

## Description

Pig Pig Chat Session lưu trữ lịch sử hội thoại giữa User và Pig Pig.

Mỗi User có một lịch sử hội thoại riêng.

Chat Session chỉ phục vụ AI Chatbot.

Không ảnh hưởng tới Budget Engine.

---

## Attributes

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Định danh cuộc hội thoại |
| userId | UUID | Người dùng |
| createdAt | DateTime | Thời điểm bắt đầu |
| updatedAt | DateTime | Lần cập nhật gần nhất |

---

## Relationships

Chat Session thuộc:

- Một User

Chat Session sử dụng:

- Pig Pig AI

---

## Business Definition

Chat Session chỉ lưu lịch sử trao đổi.

Không lưu Business Data.

---

# 17. Domain Relationships

```text
User
│
├──────── Budget
│              │
│              ├──────── Expense
│              │
│              ├──────── Budget Streak
│              │
│              ├──────── Financial Report
│              │
│              └──────── Pig Pig AI
│
├──────── Saving Goal
│              │
│              ├──────── Pig Pig AI
│              │
│              └──────── Financial Report
│
├──────── Pig Coin Wallet
│              │
│              └──────── Reward Marketplace
│
├──────── Notification
│              │
│              └──────── Pig Pig AI
│
└──────── Pig Pig Chat Session
               │
               └──────── Pig Pig AI
```

---

# 18. Business Definitions

## Budget

Nguồn dữ liệu phản ánh khả năng chi tiêu hiện tại của người dùng.

---

## Expense

Nguồn dữ liệu gốc của toàn bộ hệ thống.

Mọi phân tích tài chính đều bắt đầu từ Expense.

---

## Saving Goal

Đối tượng theo dõi tiến độ tiết kiệm.

Không làm thay đổi Business Logic của Budget.

---

## Financial Report

Module tổng hợp và trực quan hóa dữ liệu tài chính.

Không lưu Transaction.

---

## Pig Coin

Đơn vị phần thưởng trong hệ sinh thái PACE.

Không có giá trị quy đổi thành tiền.

---

## Reward Marketplace

Module đổi Reward và Voucher bằng Pig Coin.

Không ảnh hưởng tới Budget.

---

## Pig Pig AI

Financial Copilot của người dùng.

Không thay đổi dữ liệu.

Không thực hiện Business Logic.

Chỉ tạo Insight.

---

# 19. Domain Constraints

Hệ thống phải tuân thủ các ràng buộc sau.

## User

Một User chỉ có một Budget.

---

## Saving Goal

Free User:

- Tối đa hai Saving Goal.

Premium User:

- Không giới hạn.

---

## Budget

Mỗi Budget chỉ thuộc một User.

---

## Expense

Mỗi Expense chỉ thuộc một User.

Mỗi Expense chỉ thuộc một Category.

---

## Financial Report

Financial Report chỉ đọc dữ liệu.

Không chỉnh sửa dữ liệu.

---

## Pig Coin

Pig Coin không được phép âm.

---

## Reward Marketplace

Chỉ đổi Voucher khi Pig Coin đủ điều kiện.

---

## Pig Pig AI

Không được phép:

- chỉnh sửa Budget
- chỉnh sửa Expense
- chỉnh sửa Saving Goal

Pig Pig chỉ có quyền đọc dữ liệu.

---

# 20. Assumptions

Các giả định của Domain Model:

- Người dùng chỉ có một hồ sơ tài chính.
- Toàn bộ dữ liệu được đồng bộ theo thời gian thực trong phạm vi ứng dụng.
- Pig Pig luôn sử dụng dữ liệu mới nhất để tạo Insight.
- Financial Report luôn được tổng hợp từ dữ liệu hiện tại.
- Reward Marketplace sử dụng Pig Coin làm đơn vị thanh toán duy nhất.

---

# 21. Open Questions

Các nội dung dưới đây cần được làm rõ trong Business Workflow Specification.

### Q01

Daily Budget Engine sẽ phân bổ lại ngân sách sau mỗi giao dịch theo thuật toán nào?

---

### Q02

Expense ở trạng thái Planned có ảnh hưởng tới Budget hay chỉ phục vụ AI Forecast?

---

### Q03

Budget Streak được tính theo ngày, theo tuần hay theo chu kỳ ngân sách?

---

### Q04

Pig Pig AI tạo Insight ngay sau mỗi giao dịch hay theo chu kỳ định kỳ?

---

### Q05

Financial Report được cập nhật theo thời gian thực hay theo lịch (cron job)?

---

# End of Document