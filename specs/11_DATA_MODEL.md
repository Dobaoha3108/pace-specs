# 03. DATA MODEL

Version: 2.0 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# Purpose

Định nghĩa toàn bộ dữ liệu được sử dụng trong hệ thống PACE.

Data Model mô tả:

- Các Entity.
- Thuộc tính của từng Entity.
- Quan hệ giữa các Entity.
- Quy tắc đồng bộ dữ liệu.

Data Model không mô tả Business Logic.

Business Logic được định nghĩa tại:

- Business Workflow
- System Workflow
- Business Rules

---

# 1. Entity: User

## Description

Lưu thông tin hồ sơ của người dùng.

---

## Fields

### id

Type

UUID

Required

Yes

Description

Định danh duy nhất của User.

---

### displayName

Type

String

Required

Yes

Description

Tên hiển thị.

---

### avatar

Type

String

Required

No

Description

Đường dẫn ảnh đại diện.

---

### onboardingCompleted

Type

Boolean

Required

Yes

Default

false

Description

Đánh dấu User đã hoàn thành Onboarding.

---

### createdAt

Type

Datetime

Required

Yes

---

### updatedAt

Type

Datetime

Required

Yes

---

# 2. Entity: Budget

## Description

Lưu toàn bộ thông tin ngân sách hiện tại của User.

Budget được khởi tạo trong Onboarding và được cập nhật theo từng chu kỳ ngân sách.

Remaining Budget và Remaining Daily Budget được tính toán dựa trên Budget hiện tại và các Expense đã Completed.

---

## Fields

### id

Type

UUID

Required

Yes

---

### userId

Type

UUID

Required

Yes

Relationship

User (1:1)

---

### monthlyIncome

Type

Currency

Required

Yes

Description

Thu nhập hàng tháng của User.

Chỉ sử dụng làm dữ liệu tham chiếu để khởi tạo Budget cho các chu kỳ tiếp theo.

---

### fixedExpenses

Type

Currency

Required

Yes

Description

Tổng chi phí cố định hàng tháng.

Ví dụ:

- Tiền nhà
- Tiền học
- Tiền điện
- Internet

System sử dụng để tính Monthly Budget.

Monthly Budget = Monthly Income - Fixed Expenses.

---

### monthlyBudget

Type

Currency

Required

Yes

Description

Ngân sách User được phép chi tiêu trong một chu kỳ.

---

### remainingBudget

Type

Currency

Required

Yes

Description

Ngân sách còn lại sau các Expense đã Completed.

---

### remainingDailyBudget

Type

Currency

Required

Yes

Description

Số tiền nên chi trong phần thời gian còn lại của chu kỳ.

---

### budgetResetDay

Type

Integer

Required

Yes

Allowed Values

1 - 31

Description

Ngày hệ thống yêu cầu User cập nhật Budget cho chu kỳ mới (tương ứng khái niệm "Ngày nhận tiền / Payday" ở `specs/10_DOMAIN_MODEL.md`, Entity User).

Do User tự nhập/chọn (qua UI chọn lịch) trong bước Financial Setup của Onboarding. Đây là trường bắt buộc, **không còn giá trị mặc định** suy ra từ ngày hoàn thành Onboarding.

Nếu tháng hiện tại không có đủ số ngày bằng `budgetResetDay` (ví dụ chọn 31 nhưng tháng chỉ có 28/29/30 ngày), hệ thống dùng ngày cuối cùng của tháng đó làm ngày Reset thực tế trong tháng đó.

User có thể thay đổi trong Budget Settings sau khi hoàn thành Onboarding.

---

### cycle

Type

Enum

Required

Yes

Allowed Values

- Monthly

Description

MVP chỉ hỗ trợ chu kỳ ngân sách theo tháng.

---

### createdAt

Type

Datetime

Required

Yes

---

### updatedAt

Type

Datetime

Required

Yes

---

# 3. Entity: Expense

## Description

Lưu toàn bộ khoản chi của User.

Expense là nguồn dữ liệu chính để cập nhật Budget, Financial Report, Dashboard Summary và Pig Pig Insight.

Expense không trực tiếp tác động tới Saving Goal.

---

## Fields

### id

Type

UUID

Required

Yes

---

### userId

Type

UUID

Required

Yes

Relationship

User (1:N)

---

### categoryId

Type

UUID

Required

Yes

Relationship

Expense Category (N:1)

---

### amount

Type

Currency

Required

Yes

Description

Số tiền của khoản chi.

---

### note

Type

String

Required

No

Description

Ghi chú của User.

---

### plannedDate

Type

Datetime

Required

Yes

Description

Ngày User dự định thực hiện khoản chi.

Được sử dụng để lập kế hoạch và gửi Notification nhắc xác nhận.

---

### completedDate

Type

Datetime

Required

No

Description

Ngày User xác nhận khoản chi đã hoàn thành.

Chỉ có giá trị khi Status = Completed.

---

### status

Type

Enum

Required

Yes

Allowed Values

- Planned
- Completed

---

### createdAt

Type

Datetime

Required

Yes

---

### updatedAt

Type

Datetime

Required

Yes

---

# 4. Entity: ExpenseCategory

## Description

Lưu danh mục dùng để phân loại Expense.

Category giúp User dễ ghi nhận khoản chi và giúp Financial Report phân tích chi tiêu theo nhóm.

---

## Fields

### id

Type

UUID

Required

Yes

---

### name

Type

String

Required

Yes

Description

Tên danh mục.

Ví dụ:

- Ăn uống
- Di chuyển
- Mua sắm
- Học tập
- Giải trí

---

### icon

Type

String

Required

No

Description

Icon đại diện cho Category.

---

### color

Type

String

Required

No

Description

Màu đại diện cho Category.

---

### isDefault

Type

Boolean

Required

Yes

Default

true

Description

Đánh dấu Category mặc định của hệ thống.

---

# 5. Entity: SavingGoal

## Description

Lưu thông tin hũ tiết kiệm của User.

Saving Goal là mục tiêu tiết kiệm độc lập và chỉ thay đổi khi User thực hiện các hành động trực tiếp với Saving Goal.

Expense không trực tiếp cập nhật Saving Goal.

---

## Fields

### id

Type

UUID

Required

Yes

---

### userId

Type

UUID

Required

Yes

Relationship

User (1:N)

---

### name

Type

String

Required

Yes

Description

Tên hũ tiết kiệm.

---

### targetAmount

Type

Currency

Required

Yes

Description

Số tiền mục tiêu.

---

### currentAmount

Type

Currency

Required

Yes

Default

0

Description

Số tiền hiện có trong Saving Goal.

---

### targetDate

Type

Datetime

Required

Yes

Description

Thời điểm User muốn hoàn thành Saving Goal.

Nếu cùng ngày tạo Goal, thời gian phải muộn hơn thời điểm tạo Goal.

---

### savingMode

Type

Enum

Required

Yes

Allowed Values

- Flexible
- Commitment

---

### status

Type

Enum

Required

Yes

Allowed Values

- Active
- Cancelling
- Completed
- Cancelled

---

### cancelRequestedAt

Type

Datetime

Required

No

Description

Thời điểm User yêu cầu huỷ Saving Goal.

Chỉ có giá trị khi Status = Cancelling.

---

### cancelAvailableAt

Type

Datetime

Required

No

Description

Thời điểm hệ thống được phép hoàn tất huỷ Saving Goal.

cancelAvailableAt = cancelRequestedAt + 12 hours.

---

### createdAt

Type

Datetime

Required

Yes

---

### updatedAt

Type

Datetime

Required

Yes

---

# 6. Entity: BudgetStreak

## Description

Lưu thông tin chuỗi ngày User chi tiêu trong hạn mức Remaining Daily Budget.

Budget Streak dùng để tạo động lực và là điều kiện nhận Pig Coin.

---

## Fields

### id

Type

UUID

Required

Yes

---

### userId

Type

UUID

Required

Yes

Relationship

User (1:1)

---

### currentStreak

Type

Integer

Required

Yes

Default

0

Description

Số ngày liên tiếp User chi tiêu trong hạn mức.

---

### noExpenseDays

Type

Integer

Required

Yes

Default

0

Description

Số ngày liên tiếp User không ghi nhận Expense.

Nếu quá 3 ngày thì Streak bị reset.

---

### lastQualifiedDate

Type

Date

Required

No

Description

Ngày gần nhất User đạt điều kiện Streak.

---

### createdAt

Type

Datetime

Required

Yes

---

### updatedAt

Type

Datetime

Required

Yes

---

# 7. Entity: PigCoinWallet

## Description

Lưu số dư Pig Coin của User.

Pig Coin chỉ được sử dụng để đổi Voucher trong Reward Marketplace.

Pig Coin không được quy đổi thành tiền mặt.

---

## Fields

### id

Type

UUID

Required

Yes

---

### userId

Type

UUID

Required

Yes

Relationship

User (1:1)

---

### balance

Type

Integer

Required

Yes

Default

0

Description

Số Pig Coin hiện có.

---

### totalEarned

Type

Integer

Required

Yes

Default

0

Description

Tổng Pig Coin User đã nhận.

---

### totalSpent

Type

Integer

Required

Yes

Default

0

Description

Tổng Pig Coin User đã dùng để đổi Voucher.

---

### createdAt

Type

Datetime

Required

Yes

---

### updatedAt

Type

Datetime

Required

Yes

---

# 8. Entity: Voucher

## Description

Lưu thông tin Voucher hiển thị trong Reward Marketplace.

Trong MVP, Reward Marketplace chỉ hỗ trợ Voucher.

Voucher sử dụng Mock Data, không cần kết nối với brand thật.

---

## Fields

### id

Type

UUID

Required

Yes

---

### brandName

Type

String

Required

Yes

Description

Tên thương hiệu hiển thị trên Voucher.

---

### brandLogo

Type

String

Required

No

Description

Đường dẫn logo thương hiệu.

---

### title

Type

String

Required

Yes

Description

Tên Voucher.

---

### description

Type

String

Required

No

Description

Mô tả Voucher.

---

### pigCoinCost

Type

Integer

Required

Yes

Description

Số Pig Coin cần để đổi Voucher.

---

### expiredDate

Type

Date

Required

Yes

Description

Ngày hết hạn Voucher.

---

### status

Type

Enum

Required

Yes

Allowed Values

- Active
- OutOfStock
- Expired

---

### quantity

Type

Integer

Required

Yes

Description

Số lượng Voucher còn lại.

---

### imageUrl

Type

String

Required

No

Description

Ảnh minh hoạ Voucher.

---

### createdAt

Type

Datetime

Required

Yes

---

### updatedAt

Type

Datetime

Required

Yes

---

# 9. Entity: UserReward

## Description

Lưu lịch sử Voucher mà User đã đổi trong Reward Marketplace.

Mỗi lần User đổi Voucher thành công sẽ tạo một UserReward.

---

## Fields

### id

Type

UUID

Required

Yes

---

### userId

Type

UUID

Required

Yes

Relationship

User (1:N)

---

### voucherId

Type

UUID

Required

Yes

Relationship

Voucher (N:1)

---

### voucherCode

Type

String

Required

Yes

Description

Mã Voucher demo được hiển thị cho User.

---

### qrCodeValue

Type

String

Required

No

Description

Dữ liệu dùng để hiển thị QR Code demo.

---

### barcodeValue

Type

String

Required

No

Description

Dữ liệu dùng để hiển thị Barcode demo.

---

### status

Type

Enum

Required

Yes

Allowed Values

- Available
- Used
- Expired

---

### redeemedAt

Type

Datetime

Required

Yes

Description

Thời điểm User đổi Voucher.

---

### usedAt

Type

Datetime

Required

No

Description

Thời điểm User đánh dấu Voucher đã sử dụng.

---

### expiredAt

Type

Date

Required

No

Description

Ngày hết hạn của Voucher đã đổi.

---

# 10. Entity: Notification

## Description

Lưu thông báo được hệ thống gửi cho User.

Notification có thể được tạo từ các Business Event như Budget Warning, Saving Goal Cancelled, Voucher Redeemed hoặc Weekly Financial Report.

---

## Fields

### id

Type

UUID

Required

Yes

---

### userId

Type

UUID

Required

Yes

Relationship

User (1:N)

---

### title

Type

String

Required

Yes

---

### message

Type

String

Required

Yes

---

### type

Type

Enum

Required

Yes

Allowed Values

- Budget
- Expense
- SavingGoal
- Voucher
- PigPig
- Report
- System

---

### deepLinkTarget

Type

String

Required

No

Description

Màn hình hoặc route mà Notification sẽ mở khi User click.

Ví dụ:

- Financial Report
- Saving Goal History
- Expense Detail

---

### relatedEntityId

Type

UUID

Required

No

Description

ID của Entity liên quan đến Notification.

Ví dụ:

- Expense ID
- Saving Goal ID
- UserReward ID

---

### isRead

Type

Boolean

Required

Yes

Default

false

---

### scheduledAt

Type

Datetime

Required

No

Description

Thời điểm Notification được lên lịch gửi.

---

### createdAt

Type

Datetime

Required

Yes

---

# 11. Entity: PigPigInsight

## Description

Lưu Insight mới nhất hoặc các Insight được Pig Pig tạo ra dựa trên dữ liệu tài chính của User.

Pig Pig chỉ đọc dữ liệu và không thay đổi dữ liệu tài chính.

---

## Fields

### id

Type

UUID

Required

Yes

---

### userId

Type

UUID

Required

Yes

Relationship

User (1:N)

---

### title

Type

String

Required

Yes

---

### content

Type

String

Required

Yes

---

### insightType

Type

Enum

Required

Yes

Allowed Values

- Information
- Recommendation
- Warning
- Achievement

---

### source

Type

Enum

Required

No

Allowed Values

- Budget
- Expense
- SavingGoal
- Report
- BudgetStreak

---

### createdAt

Type

Datetime

Required

Yes

---

# 12. Entity: ChatHistory

## Description

Lưu lịch sử hội thoại giữa User và Pig Pig Chatbot.

ChatHistory chỉ dùng để hiển thị lại nội dung hội thoại.

ChatHistory không thay đổi dữ liệu tài chính.

---

## Fields

### id

Type

UUID

Required

Yes

---

### userId

Type

UUID

Required

Yes

Relationship

User (1:N)

---

### userMessage

Type

String

Required

Yes

---

### aiResponse

Type

String

Required

Yes

---

### createdAt

Type

Datetime

Required

Yes

---

# 13. Entity: DashboardSummary

## Description

DashboardSummary là dữ liệu tổng hợp để hiển thị Dashboard.

DashboardSummary không phải nguồn dữ liệu độc lập.

DashboardSummary được tạo từ các Entity khác.

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
- Active Saving Goal
- Budget Streak
- Weekly Spending Snapshot
- Latest Pig Pig Insight

---

# 14. Entity Relationships

## One-to-One

- User ↔ Budget
- User ↔ BudgetStreak
- User ↔ PigCoinWallet

---

## One-to-Many

- User → Expense
- User → SavingGoal
- User → UserReward
- User → Notification
- User → PigPigInsight
- User → ChatHistory

---

## Many-to-One

- Expense → ExpenseCategory
- UserReward → Voucher

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

# 15. Data Synchronization

Sau mỗi thay đổi dữ liệu liên quan đến Expense, hệ thống đồng bộ theo thứ tự:

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

Notification

↓

DashboardSummary

---

## Saving Goal Synchronization

Saving Goal chỉ được cập nhật khi User thực hiện hành động trực tiếp với Saving Goal:

- Create Saving Goal
- Deposit
- Withdraw
- Request Cancel
- Undo Cancel
- Finalize Cancel
- Complete Goal

Expense không trực tiếp cập nhật Saving Goal.

---

## Voucher Synchronization

Khi User đổi Voucher:

Voucher

↓

PigCoinWallet

↓

UserReward

↓

Notification

↓

Reward Marketplace

---

# 16. Data Constraints

- Mỗi User chỉ có một Budget đang hoạt động.
- Mỗi User chỉ có một BudgetStreak.
- Mỗi User chỉ có một PigCoinWallet.
- Expense phải thuộc về một User.
- Expense phải thuộc về một ExpenseCategory.
- Saving Goal phải thuộc về một User.
- Voucher là dữ liệu dùng chung của hệ thống.
- UserReward phải tham chiếu tới một Voucher.
- DashboardSummary không được lưu như nguồn dữ liệu gốc.
- Financial Report không lưu dữ liệu độc lập.
- Pig Pig chỉ được đọc dữ liệu, không được thay đổi dữ liệu tài chính.
- Expense không trực tiếp cập nhật Saving Goal.

---

# End of Document
