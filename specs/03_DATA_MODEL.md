# 03. DATA MODEL

Version: 1.0 (MVP)

Project: PACE - Personal Finance Management App

Status: Draft

---

# 1. Purpose

Data Model mô tả cấu trúc dữ liệu của toàn bộ hệ thống PACE.

Tài liệu này xác định:

- Các Entity của hệ thống.
- Thuộc tính của từng Entity.
- Kiểu dữ liệu của từng trường.
- Các ràng buộc dữ liệu.
- Quan hệ giữa các Entity.
- Trạng thái hợp lệ của từng Entity.

Data Model là nguồn dữ liệu chuẩn để Developer và AI Coding Agent triển khai Model, Storage và Data Layer của ứng dụng.

---

# 2. Data Model Principles

## DP-001

Mọi dữ liệu tài chính đều thuộc về đúng một User.

---

## DP-002

Expense là dữ liệu gốc của hệ thống.

Budget, Financial Report, Budget Streak và Pig Pig đều sử dụng Expense làm dữ liệu đầu vào.

---

## DP-003

Budget luôn phản ánh trạng thái ngân sách mới nhất của User.

---

## DP-004

Expense ở trạng thái Planned hoặc Completed đều làm thay đổi Budget.

---

## DP-005

Saving Goal Deposit làm giảm Remaining Budget.

Saving Goal Withdraw hoặc Finalize Cancel Goal làm tăng Remaining Budget.

---

## DP-006

Financial Report không lưu dữ liệu độc lập.

Financial Report được tổng hợp từ dữ liệu hiện có của hệ thống.

---

## DP-007

Pig Pig không được thay đổi dữ liệu tài chính.

Pig Pig chỉ đọc dữ liệu và tạo Insight hoặc Chat Response.

---

# 3. Entity: User

## Description

User đại diện cho một người sử dụng ứng dụng PACE.

Mỗi User sở hữu một hồ sơ tài chính riêng và là chủ sở hữu của toàn bộ dữ liệu tài chính phát sinh trong hệ thống.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã định danh User |
| displayName | string | Yes | Tên hiển thị |
| email | string | No | Email |
| avatarUrl | string | No | Ảnh đại diện |
| monthlyIncome | number | Yes | Thu nhập hàng tháng |
| fixedExpense | number | Yes | Chi phí cố định hàng tháng |
| payday | number | Yes | Ngày nhận lương |
| userTier | enum | Yes | Gói người dùng |
| createdAt | datetime | Yes | Thời điểm tạo |
| updatedAt | datetime | Yes | Thời điểm cập nhật |

---

## Allowed Values

### userTier

- Free
- Premium

---

## Business Rules

- monthlyIncome phải lớn hơn 0.
- fixedExpense không được nhỏ hơn 0.
- payday nằm trong khoảng từ 1 đến 31.
- Free User chỉ được tạo tối đa 2 Saving Goal.

---

# 4. Entity: Budget

## Description

Budget lưu trạng thái ngân sách hiện tại của User trong một chu kỳ tài chính.

Budget là nguồn dữ liệu để Dashboard, Budget Streak, Financial Report và Pig Pig tính toán.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã định danh Budget |
| userId | string | Yes | User sở hữu Budget |
| totalBudget | number | Yes | Tổng ngân sách khả dụng |
| remainingBudget | number | Yes | Ngân sách còn lại |
| remainingDailyBudget | number | Yes | Ngân sách còn lại mỗi ngày |
| cycleStartDate | date | Yes | Ngày bắt đầu chu kỳ |
| cycleEndDate | date | Yes | Ngày kết thúc chu kỳ |
| createdAt | datetime | Yes | Thời điểm tạo |
| updatedAt | datetime | Yes | Thời điểm cập nhật |

---

## Business Rules

- Một User chỉ có một Budget đang hoạt động.
- totalBudget được tính từ thu nhập sau khi trừ chi phí cố định.
- remainingBudget thay đổi sau Expense hoặc Saving Goal.
- remainingDailyBudget luôn được tính lại sau mỗi thay đổi remainingBudget.
- remainingDailyBudget = remainingBudget / số ngày còn lại của chu kỳ.

---

# 5. Entity: Expense

## Description

Expense đại diện cho một khoản chi của User.

Expense có thể là khoản chi dự định hoặc khoản chi đã phát sinh.

Expense là nguồn dữ liệu gốc của toàn bộ hệ thống.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã định danh Expense |
| userId | string | Yes | User sở hữu Expense |
| amount | number | Yes | Số tiền |
| categoryId | string | Yes | Danh mục |
| note | string | No | Ghi chú |
| transactionDate | datetime | Yes | Ngày giao dịch |
| status | enum | Yes | Trạng thái Expense |
| createdAt | datetime | Yes | Thời điểm tạo |
| updatedAt | datetime | Yes | Thời điểm cập nhật |

---

## Allowed Values

### status

- Planned
- Completed

---

## Business Rules

- amount phải lớn hơn 0.
- categoryId là bắt buộc.
- transactionDate là bắt buộc.
- Expense Planned và Completed đều làm thay đổi Budget.
- Planned và Completed là hai trạng thái của cùng một Expense.
- Khi Expense chuyển từ Planned sang Completed, hệ thống không được trừ Budget lần thứ hai.
- Expense không trực tiếp làm thay đổi Saving Goal.

---

# 6. Entity: Category

## Description

Category dùng để phân loại Expense.

Category giúp Financial Report thống kê chi tiêu theo từng nhóm.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã Category |
| name | string | Yes | Tên Category |
| icon | string | No | Icon |
| color | string | No | Màu đại diện |
| isDefault | boolean | Yes | Category mặc định |

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

## Business Rules

- Một Expense chỉ thuộc đúng một Category.
- Category mặc định không được phép xóa.

---

# 7. Entity: SavingGoal

## Description

Saving Goal đại diện cho một mục tiêu tiết kiệm của User.

Tiền được nạp vào Saving Goal sẽ được coi là đã phân bổ cho mục tiêu tiết kiệm và không còn nằm trong Remaining Budget.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã Saving Goal |
| userId | string | Yes | User sở hữu Saving Goal |
| title | string | Yes | Tên mục tiêu |
| targetAmount | number | Yes | Số tiền mục tiêu |
| currentAmount | number | Yes | Số tiền đã tiết kiệm |
| targetDate | date | Yes | Ngày hoàn thành mong muốn |
| savingMode | enum | Yes | Chế độ tiết kiệm |
| status | enum | Yes | Trạng thái Saving Goal |
| cancelRequestedAt | datetime | No | Thời điểm yêu cầu hủy |
| cancelAvailableAt | datetime | No | Thời điểm hoàn tất hủy |
| createdAt | datetime | Yes | Thời điểm tạo |
| updatedAt | datetime | Yes | Thời điểm cập nhật |

---

## Allowed Values

### savingMode

- Flexible
- Commitment

### status

- Active
- Completed
- Cancelling
- Cancelled

---

## Business Rules

- title là bắt buộc.
- targetAmount phải lớn hơn 0.
- currentAmount không được nhỏ hơn 0.
- currentAmount không được lớn hơn targetAmount.
- Free User chỉ được tạo tối đa 2 Saving Goal.
- Flexible cho phép Withdraw ngay sau khi xác nhận.
- Commitment yêu cầu chờ 2 giờ trước khi Withdraw.
- Cancel Saving Goal luôn trải qua 12 giờ Cooling Period.
- Trong trạng thái Cancelling, không cho phép Deposit, Withdraw hoặc Update Goal.
- User có thể Undo Cancel trước khi kết thúc Cooling Period.
- Sau khi Finalize Cancel Goal, toàn bộ currentAmount được cộng trở lại Remaining Budget.

---

# 8. Entity: BudgetStreak

## Description

BudgetStreak lưu thông tin về chuỗi ngày người dùng duy trì chi tiêu trong hạn mức cho phép.

Đây là dữ liệu dùng để theo dõi thói quen quản lý tài chính của User và là một trong những điều kiện để nhận Pig Coin.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã Budget Streak |
| userId | string | Yes | User sở hữu Budget Streak |
| currentStreak | number | Yes | Chuỗi ngày hiện tại |
| longestStreak | number | Yes | Chuỗi ngày dài nhất |
| lastQualifiedDate | date | No | Ngày gần nhất đạt điều kiện Streak |
| noExpenseDays | number | Yes | Số ngày liên tiếp không ghi nhận Expense |
| createdAt | datetime | Yes | Thời điểm tạo |
| updatedAt | datetime | Yes | Thời điểm cập nhật |

---

## Business Rules

- currentStreak không được nhỏ hơn 0.
- longestStreak luôn lớn hơn hoặc bằng currentStreak.
- currentStreak chỉ tăng khi User chi tiêu trong Remaining Daily Budget.
- currentStreak bị reset nếu User vượt Remaining Daily Budget.
- Nếu User không ghi Expense quá 3 ngày liên tiếp thì currentStreak bị reset.
- User đủ điều kiện nhận Pig Coin khi currentStreak đạt 7 ngày liên tiếp.

---

# 9. Entity: PigCoinWallet

## Description

PigCoinWallet lưu toàn bộ thông tin về số dư Pig Coin của User.

Pig Coin được sử dụng để đổi Voucher trong Reward Marketplace.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã Pig Coin Wallet |
| userId | string | Yes | User sở hữu ví |
| balance | number | Yes | Số Pig Coin hiện có |
| lifetimeEarned | number | Yes | Tổng Pig Coin đã nhận |
| lifetimeSpent | number | Yes | Tổng Pig Coin đã sử dụng |
| createdAt | datetime | Yes | Thời điểm tạo |
| updatedAt | datetime | Yes | Thời điểm cập nhật |

---

## Business Rules

- balance không được nhỏ hơn 0.
- lifetimeEarned chỉ tăng.
- lifetimeSpent chỉ tăng.
- Khi User nhận thưởng, balance tăng.
- Khi User đổi Voucher, balance giảm.
- Pig Coin không được quy đổi thành tiền mặt.

---

# 10. Entity: Reward

## Description

Reward là danh mục Voucher được hiển thị trong Reward Marketplace.

Trong MVP demo, Reward Marketplace chỉ hỗ trợ Voucher.

Reward không thuộc về riêng User mà là dữ liệu dùng chung của toàn hệ thống.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã Reward |
| title | string | Yes | Tên Voucher |
| description | string | No | Mô tả Voucher |
| rewardType | enum | Yes | Loại Reward |
| brandName | string | Yes | Tên thương hiệu |
| brandLogoUrl | string | No | Logo thương hiệu |
| pigCoinCost | number | Yes | Số Pig Coin cần đổi |
| quantity | number | Yes | Số lượng còn lại |
| status | enum | Yes | Trạng thái Reward |
| imageUrl | string | No | Hình minh họa |
| expiredAt | date | No | Ngày hết hạn |
| createdAt | datetime | Yes | Thời điểm tạo |
| updatedAt | datetime | Yes | Thời điểm cập nhật |

---

## Allowed Values

### rewardType

- Voucher

### status

- Active
- OutOfStock
- Expired

---

## Business Rules

- MVP demo chỉ hỗ trợ rewardType = Voucher.
- pigCoinCost phải lớn hơn 0.
- quantity không được nhỏ hơn 0.
- Reward chỉ được đổi khi trạng thái là Active.
- Reward hết số lượng chuyển sang OutOfStock.
- Reward quá hạn chuyển sang Expired.
- Voucher trong MVP demo có thể dùng dữ liệu mock, không cần kết nối với thương hiệu thật.

---

# 11. Entity: UserReward

## Description

UserReward lưu lịch sử đổi Voucher của User.

Mỗi lần User đổi Voucher sẽ tạo ra một bản ghi mới.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã User Reward |
| userId | string | Yes | User thực hiện đổi |
| rewardId | string | Yes | Voucher đã đổi |
| pigCoinSpent | number | Yes | Số Pig Coin đã sử dụng |
| voucherCode | string | Yes | Mã Voucher demo |
| qrCodeValue | string | No | Dữ liệu QR code demo |
| barcodeValue | string | No | Dữ liệu barcode demo |
| redeemedAt | datetime | Yes | Thời điểm đổi |
| status | enum | Yes | Trạng thái Voucher của User |

---

## Allowed Values

### status

- Available
- Used
- Expired

---

## Business Rules

- Một lần đổi Voucher tạo đúng một UserReward.
- Không được chỉnh sửa lịch sử đổi Voucher.
- Voucher chỉ có thể chuyển trạng thái từ Available sang Used hoặc Expired.
- voucherCode, qrCodeValue và barcodeValue trong MVP demo không cần là mã thật.
- Không cần xác thực Voucher với hệ thống của brand bên ngoài.

---

# 12. Entity: Notification

## Description

Notification lưu toàn bộ thông báo mà hệ thống gửi cho User.

Notification chỉ phản ánh trạng thái của hệ thống và không làm thay đổi dữ liệu nghiệp vụ.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã Notification |
| userId | string | Yes | User nhận Notification |
| title | string | Yes | Tiêu đề |
| message | string | Yes | Nội dung |
| type | enum | Yes | Loại Notification |
| isRead | boolean | Yes | Đã đọc hay chưa |
| createdAt | datetime | Yes | Thời điểm tạo |

---

## Allowed Values

### type

- Budget
- SavingGoal
- Reward
- PigPig
- System

---

## Business Rules

- Notification không được chỉnh sửa sau khi tạo.
- User chỉ được thay đổi trạng thái từ Unread sang Read.
- Notification luôn được lưu vào lịch sử.

---

# 13. Entity: PigPigInsight

## Description

PigPigInsight lưu các phân tích, cảnh báo và khuyến nghị được Pig Pig AI tạo ra dựa trên dữ liệu tài chính hiện tại của User.

Insight chỉ phục vụ hiển thị và tư vấn, không được phép thay đổi bất kỳ dữ liệu tài chính nào.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã Insight |
| userId | string | Yes | User nhận Insight |
| title | string | Yes | Tiêu đề Insight |
| content | string | Yes | Nội dung Insight |
| insightType | enum | Yes | Loại Insight |
| createdAt | datetime | Yes | Thời điểm tạo |

---

## Allowed Values

### insightType

- Recommendation
- Warning
- Achievement
- Information

---

## Business Rules

- Insight chỉ được sinh từ dữ liệu hiện có của User.
- Insight không được phép thay đổi Budget, Expense hoặc Saving Goal.
- Insight có thể được tạo lại bất kỳ lúc nào khi dữ liệu tài chính thay đổi.

---

# 14. Entity: ChatHistory

## Description

ChatHistory lưu lịch sử hội thoại giữa User và Pig Pig AI.

Pig Pig chỉ trả lời các câu hỏi liên quan đến dữ liệu tài chính và các chức năng trong ứng dụng PACE.

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Mã đoạn hội thoại |
| userId | string | Yes | User gửi tin nhắn |
| userMessage | string | Yes | Nội dung User |
| aiResponse | string | Yes | Nội dung Pig Pig trả lời |
| createdAt | datetime | Yes | Thời điểm tạo |

---

## Business Rules

- Mỗi User Message tạo đúng một AI Response.
- ChatHistory chỉ lưu lịch sử hội thoại.
- ChatHistory không được phép thay đổi dữ liệu tài chính.
- Nếu câu hỏi nằm ngoài phạm vi của PACE, Pig Pig trả về thông báo mặc định.

---

# 15. Entity: DashboardSummary

## Description

DashboardSummary là tập dữ liệu tổng hợp được hiển thị trên màn hình Dashboard.

Đây là dữ liệu được tính toán từ các Entity khác và không được lưu như một nguồn dữ liệu độc lập.

---

## Data Sources

DashboardSummary sử dụng dữ liệu từ:

- Budget
- Expense
- Saving Goal
- Budget Streak
- PigCoinWallet
- PigPigInsight

---

## Display Data

DashboardSummary bao gồm:

- Remaining Budget
- Remaining Daily Budget
- Saving Goal Progress
- Budget Streak
- Pig Coin Balance
- Latest Pig Pig Insight
- Recent Expense
- Weekly Financial Summary

---

## Business Rules

- DashboardSummary luôn được tạo từ dữ liệu mới nhất của hệ thống.
- DashboardSummary không được phép chỉnh sửa dữ liệu nguồn.
- Sau mỗi thay đổi dữ liệu tài chính, DashboardSummary phải được đồng bộ trước khi hiển thị.

---

# 16. Entity Relationships

## One-to-One Relationships

- User ↔ Budget
- User ↔ BudgetStreak
- User ↔ PigCoinWallet

---

## One-to-Many Relationships

- User → Expense
- User → SavingGoal
- User → Notification
- User → UserReward
- User → ChatHistory
- User → PigPigInsight

---

## Many-to-One Relationships

- Expense → Category
- UserReward → Reward

---

## Derived Relationships

DashboardSummary được tạo từ:

- Budget
- Expense
- Saving Goal
- Budget Streak
- PigCoinWallet
- PigPigInsight

Financial Report được tạo từ:

- Budget
- Expense
- Saving Goal

Pig Pig sử dụng dữ liệu từ:

- Budget
- Expense
- Saving Goal
- Financial Report
- Budget Streak

---

# 17. Data Ownership

Mỗi loại dữ liệu có một chủ sở hữu duy nhất.

| Entity | Owner |
|------|------|
| User | User |
| Budget | User |
| Expense | User |
| Saving Goal | User |
| Budget Streak | User |
| Pig Coin Wallet | User |
| Notification | User |
| Chat History | User |
| Pig Pig Insight | User |
| User Reward | User |
| Reward | System |
| Category | System |

---

# 18. Data Lifecycle

## Expense

Created

↓

Updated

↓

Completed

---

## Saving Goal

Active

↓

Completed

Hoặc

Active

↓

Cancelling

↓

Cancelled

---

## Notification

Created

↓

Read

---

## UserReward

Available

↓

Used

Hoặc

Available

↓

Expired

---

## Pig Pig Insight

Generated

↓

Displayed

↓

Re-generated khi dữ liệu tài chính thay đổi

---

# 19. Data Synchronization

Sau mỗi thay đổi dữ liệu liên quan đến Expense, hệ thống phải đồng bộ theo đúng thứ tự sau:

Expense

↓

Budget

↓

Remaining Daily Budget

↓

Budget Streak

↓

Financial Report

↓

Pig Pig Insight

↓

Pig Coin Wallet (nếu có)

↓

Notification

↓

Dashboard Summary

---

## Saving Goal Synchronization Note

Saving Goal chỉ được cập nhật khi User thực hiện các hành động liên quan trực tiếp đến Saving Goal, bao gồm:

- Create Saving Goal
- Deposit
- Withdraw
- Request Cancel
- Undo Cancel
- Finalize Cancel
- Complete Goal

Expense không trực tiếp cập nhật Saving Goal.

---

# 20. Data Constraints

- Mọi Expense phải thuộc đúng một User.
- Mọi Saving Goal phải thuộc đúng một User.
- Một User chỉ có một Budget đang hoạt động.
- Một User chỉ có một Budget Streak đang hoạt động.
- Một User chỉ có một Pig Coin Wallet.
- Reward là dữ liệu Voucher dùng chung của toàn hệ thống.
- Financial Report và DashboardSummary là dữ liệu tổng hợp, không phải dữ liệu lưu trữ độc lập.
- Pig Pig chỉ được phép đọc dữ liệu, không được phép thay đổi dữ liệu tài chính.
- MVP demo không cần kết nối với brand thật để xác thực Voucher.

---

# End of Document
