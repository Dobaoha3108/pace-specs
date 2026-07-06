# 02. SYSTEM WORKFLOW

Version: 1.0 (MVP)

Project: PACE - Personal Finance Management App

Status: Draft

---

# 1. Purpose

System Workflow mô tả cách hệ thống xử lý dữ liệu sau mỗi hành động nghiệp vụ của người dùng.

Khác với Business Workflow (mô tả nghiệp vụ), System Workflow tập trung vào:

- Thứ tự xử lý dữ liệu.
- Dữ liệu nào được đọc.
- Dữ liệu nào được cập nhật.
- Thành phần nào của hệ thống bị ảnh hưởng.
- Trạng thái nào cần được đồng bộ sau khi xử lý.

Tài liệu này là cầu nối giữa Business Workflow và Feature Specification, đồng thời là đầu vào trực tiếp để AI Coding Agent triển khai mã nguồn.

---

# 2. System Principles

## SP-001

Mọi thay đổi dữ liệu đều bắt đầu từ một hành động hợp lệ của người dùng hoặc một sự kiện hợp lệ của hệ thống.

---

## SP-002

Expense là nguồn dữ liệu trung tâm của toàn bộ hệ thống.

Các module Budget, Financial Report, Budget Streak, Pig Pig và Dashboard đều sử dụng dữ liệu từ Expense.

---

## SP-003

Sau mỗi thay đổi dữ liệu, hệ thống phải đảm bảo mọi dữ liệu phụ thuộc đều được cập nhật trước khi giao diện được làm mới.

---

## SP-004

Không có module nào được phép cập nhật trực tiếp dữ liệu của module khác.

Mọi thay đổi phải thông qua quy trình xử lý tương ứng.

---

## SP-005

Pig Pig chỉ đọc dữ liệu và sinh Insight.

Pig Pig không được phép thay đổi bất kỳ dữ liệu tài chính nào.

---

## SP-006

Financial Report luôn được sinh từ dữ liệu hiện tại của hệ thống.

Không tạo hoặc lưu một bản sao độc lập của dữ liệu Expense.

---

# 3. Global Processing Flow

Mọi hành động trong hệ thống đều tuân theo quy trình xử lý chung dưới đây.

```text
User Action
        ↓
Input Validation
        ↓
Update Primary Data
        ↓
Recalculate Related Data
        ↓
Synchronize Dependent Modules
        ↓
Generate Insight / Notification (if needed)
        ↓
Refresh Application State
        ↓
Refresh UI
```

---

# 4. System Processing : User Onboarding

## Purpose

Khởi tạo toàn bộ dữ liệu ban đầu để người dùng có thể sử dụng hệ thống.

---

## Input

- Monthly Income
- Fixed Expense
- Payday
- Saving Goal (optional)

---

## Processing

### Step 1

Kiểm tra dữ liệu đầu vào.

↓

### Step 2

Tạo Financial Profile.

↓

### Step 3

Khởi tạo Budget.

↓

### Step 4

Tính:

- Remaining Budget
- Remaining Daily Budget

↓

### Step 5

Khởi tạo:

- Budget Streak
- Pig Coin Wallet
- Financial Report
- Notification List
- Chat History

↓

### Step 6

Nếu User tạo Saving Goal.

↓

Khởi tạo Saving Goal.

↓

Điều chỉnh Remaining Budget.

↓

Tính lại Remaining Daily Budget.

↓

### Step 7

Đồng bộ toàn bộ trạng thái của Dashboard.

---

## Updated Data

- User
- Budget
- Saving Goal
- Budget Streak
- Pig Coin Wallet
- Financial Report
- Notification
- Chat History

---

## Output

Dashboard sẵn sàng sử dụng.

---

## Affected Domains

- User
- Budget
- Saving Goal
- Dashboard
- Pig Pig

---

# 5. System Processing : Expense

## Purpose

Ghi nhận Expense và cập nhật toàn bộ dữ liệu phụ thuộc.

---

## Input

Expense

- Amount
- Category
- Note
- Transaction Date
- Status

---

## Processing

### Step 1

Validate Expense.

↓

### Step 2

Persist Expense.

↓

### Step 3

Tính lại:

Remaining Budget.

↓

### Step 4

Tính lại:

Remaining Daily Budget.

↓

### Step 5

Đồng bộ Saving Goal nếu Expense liên quan.

↓

### Step 6

Cập nhật Financial Report Dataset.

↓

### Step 7

Đánh giá Budget Streak.

↓

### Step 8

Pig Pig đọc dữ liệu mới.

↓

Nếu phát hiện vượt quá số tiền chi trong hạn mức.

↓

Sinh Insight.

↓

### Step 9

Nếu cần.

↓

Tạo Notification.

↓

### Step 10

Refresh Dashboard State.

---

## Updated Data

- Expense
- Budget
- Remaining Daily Budget
- Financial Report
- Budget Streak
- Pig Pig Insight
- Notification

---

## Output

Dashboard hiển thị dữ liệu mới.

Financial Report hiển thị dữ liệu mới.

Pig Pig có Insight mới (nếu có).

---

## Affected Domains

- Expense
- Budget
- Financial Report
- Budget Streak
- Pig Pig
- Notification

---

# 6. System Processing : Saving Goal

## Purpose

Quản lý toàn bộ quá trình tạo, cập nhật, nạp tiền, rút tiền, hoàn thành và hủy Saving Goal, đồng thời đảm bảo Budget và Remaining Daily Budget luôn phản ánh đúng số tiền người dùng còn có thể chi tiêu.

---

## Input

Saving Goal Action

- Create Saving Goal
- Deposit
- Withdraw
- Update Goal
- Complete Goal
- Request Cancel Goal
- Undo Cancel Goal
- Finalize Cancel Goal

---

## Processing

### Create Saving Goal

Step 1

Validate Saving Goal Information.

↓

Step 2

Persist Saving Goal.

↓

Step 3

Synchronize Dashboard State.

---

### Deposit Money

Step 1

Validate Deposit Amount.

↓

Step 2

Kiểm tra Remaining Budget.

↓

Step 3

Increase Saving Goal Current Amount.

↓

Step 4

Decrease Remaining Budget.

↓

Step 5

Recalculate Remaining Daily Budget.

↓

Step 6

Refresh Financial Report Dataset.

↓

Step 7

Evaluate Saving Goal Progress.

↓

Step 8

Nếu Saving Goal đạt Target Amount.

↓

Update Saving Goal Status = Completed.

↓

Evaluate Reward Condition.

↓

Generate Notification.

↓

Refresh Dashboard State.

---

### Withdraw Money

Step 1

Validate Withdraw Request.

↓

Step 2

Nếu Saving Mode = Commitment.

↓

Verify 2-hour Waiting Time Completed.

↓

Step 3

Decrease Saving Goal Current Amount.

↓

Step 4

Increase Remaining Budget.

↓

Step 5

Recalculate Remaining Daily Budget.

↓

Step 6

Refresh Financial Report Dataset.

↓

Step 7

Refresh Dashboard State.

---

### Request Cancel Saving Goal

Step 1

Validate Cancel Request.

↓

Step 2

Update Saving Goal Status = Cancelling.

↓

Step 3

Start 12-hour Cooling Period.

↓

Step 4

Generate Notification.

↓

Step 5

Refresh Dashboard State.

---

### During Cancelling Period

Trong thời gian Saving Goal ở trạng thái Cancelling:

- Không cho phép Deposit.
- Không cho phép Withdraw.
- Không cho phép Update Goal.
- Cho phép User chọn Undo Cancel.

---

### Undo Cancel Saving Goal

Step 1

User chọn Undo Cancel.

↓

Step 2

Update Saving Goal Status = Active.

↓

Step 3

Generate Notification.

↓

Step 4

Refresh Dashboard State.

---

### Finalize Cancel Saving Goal

Step 1

12-hour Cooling Period kết thúc.

↓

Step 2

Nếu User không Undo Cancel.

↓

Return Remaining Saving Amount to Remaining Budget.

↓

Step 3

Recalculate Remaining Daily Budget.

↓

Step 4

Update Saving Goal Status = Cancelled.

↓

Step 5

Refresh Financial Report Dataset.

↓

Step 6

Generate Notification.

↓

Step 7

Refresh Dashboard State.

---

## Updated Data

- Saving Goal
- Budget
- Remaining Daily Budget
- Financial Report
- Notification

---

## Output

Dashboard hiển thị dữ liệu Saving Goal mới nhất.

Financial Report phản ánh số dư mới.

Saving Goal có thể ở một trong các trạng thái:

- Active
- Completed
- Cancelling
- Cancelled

---

## Affected Domains

- Saving Goal
- Budget
- Financial Report
- Dashboard
- Notification

---

# 7. System Processing : Financial Report

## Purpose

Đồng bộ toàn bộ dữ liệu phục vụ việc trực quan hóa tình hình tài chính của người dùng.

Financial Report chỉ tổng hợp dữ liệu hiện có.

Không tạo dữ liệu mới.

---

## Input

Một trong các dữ liệu sau thay đổi:

- Expense
- Budget
- Saving Goal
- Budget Streak

---

## Processing

Step 1

Read Expense Dataset.

↓

Step 2

Read Budget Dataset.

↓

Step 3

Read Saving Goal Dataset.

↓

Step 4

Read Budget Streak Dataset.

↓

Step 5

Calculate:

- Total Expense
- Total Income
- Remaining Budget
- Remaining Daily Budget
- Expense by Category
- Saving Goal Progress
- Budget Usage

↓

Step 6

Generate Chart Dataset.

↓

Step 7

Generate Expense History Dataset.

↓

Step 8

Generate Pig Pig Insight Source Data.

↓

Step 9

Refresh Financial Report State.

---

## Updated Data

- Financial Report Dataset

---

## Output

Financial Report hiển thị:

- Summary
- Charts
- Expense History
- Saving Goal Progress
- AI Insight

---

## Affected Domains

- Expense
- Budget
- Saving Goal
- Budget Streak
- Pig Pig

---

# 8. System Processing : Budget Streak

## Purpose

Đánh giá khả năng duy trì thói quen chi tiêu đúng hạn mức hằng ngày của người dùng.

Budget Streak luôn dựa trên Remaining Daily Budget hiện tại.

---

## Input

Một trong các dữ liệu sau thay đổi:

- Expense
- Budget
- Remaining Daily Budget

---

## Processing

Step 1

Calculate Today's Total Spending.

↓

Step 2

Read Current Remaining Daily Budget.

↓

Step 3

Compare:

Today's Spending

vs

Remaining Daily Budget.

↓

Step 4

Nếu:

Today's Spending ≤ Remaining Daily Budget.

↓

Increase Current Streak.

↓

Step 5

Nếu:

Today's Spending > Remaining Daily Budget.

↓

Reset Current Streak.

↓

Step 6

Nếu Remaining Daily Budget thay đổi do Budget được phân bổ lại.

↓

Update Daily Threshold.

↓

Continue evaluating subsequent days using the new threshold.

↓

Step 7

Nếu User không ghi Expense trong ngày.

↓

Current Streak giữ nguyên.

↓

Nếu không ghi Expense quá 3 ngày liên tiếp.

↓

Reset Current Streak.

↓

Generate Reminder Notification.

↓

Step 8

Nếu Current Streak đạt điều kiện Reward.

↓

Evaluate Pig Coin Reward.

↓

Generate Congratulation Notification.

↓

Refresh Dashboard State.

---

## Updated Data

- Budget Streak
- Pig Coin Wallet
- Notification

---

## Output

Dashboard hiển thị Budget Streak mới.

Pig Coin cập nhật nếu đủ điều kiện.

---

## Affected Domains

- Budget
- Expense
- Pig Coin Wallet
- Dashboard
- Notification

# 9. System Processing : Pig Coin & Reward Marketplace

## Purpose

Quản lý việc cộng Pig Coin, đổi Voucher và đồng bộ toàn bộ dữ liệu liên quan đến Reward Marketplace.

Reward Marketplace chỉ sử dụng Pig Coin và không làm thay đổi Budget hoặc dữ liệu tài chính của User.

---

## Input

Một trong các dữ liệu sau thay đổi:

- Budget Streak
- Saving Goal
- Reward Campaign
- User Redeem Request

---

## Processing

### Reward Evaluation

Step 1

Read Current Budget Streak.

↓

Step 2

Read Saving Goal Status.

↓

Step 3

Evaluate Reward Rules.

↓

Step 4

Nếu User đủ điều kiện.

↓

Increase Pig Coin Balance.

↓

Generate Reward Record.

↓

Generate Notification.

↓

Refresh Reward Marketplace State.

---

### Voucher Redemption

Step 1

Read Pig Coin Balance.

↓

Step 2

Read Voucher Information.

↓

Step 3

Validate Redemption Condition.

↓

Step 4

Deduct Pig Coin.

↓

Step 5

Create Redemption History.

↓

Step 6

Assign Voucher to User.

↓

Step 7

Generate Notification.

↓

Refresh Reward Marketplace State.

---

## Updated Data

- Pig Coin Wallet
- Reward History
- Voucher
- Notification

---

## Output

Reward Marketplace hiển thị dữ liệu mới nhất.

Pig Coin Balance được cập nhật.

---

## Affected Domains

- Pig Coin Wallet
- Reward Marketplace
- Voucher
- Notification

---

# 10. System Processing : Pig Pig

## Purpose

Tạo AI Insight và phản hồi Chatbot dựa trên dữ liệu tài chính hiện tại của User.

Pig Pig không thay đổi dữ liệu của hệ thống.

Pig Pig chỉ đọc dữ liệu và tạo nội dung phản hồi.

---

## Input

Một trong các dữ liệu sau thay đổi:

- Expense
- Budget
- Saving Goal
- Financial Report
- Budget Streak

Hoặc

User gửi Message.

---

## Processing

### Insight Generation

Step 1

Read Budget.

↓

Step 2

Read Expense History.

↓

Step 3

Read Saving Goal.

↓

Step 4

Read Financial Report Dataset.

↓

Step 5

Read Budget Streak.

↓

Step 6

Generate:

- Insight
- Recommendation
- Warning

↓

Step 7

Refresh Pig Pig State.

---

### Chat Processing

Step 1

Receive User Message.

↓

Step 2

Identify User Intent.

↓

Step 3

Determine Required Context.

↓

Step 4

Read Related Data.

↓

Step 5

Generate Response.

↓

Step 6

Save Chat History.

↓

Step 7

Display Response.

---

### Unsupported Request

Step 1

Detect Unsupported Intent.

↓

Step 2

Return Default Response.

↓

Do not update any Business Data.

---

## Updated Data

- Pig Pig Insight
- Chat History

---

## Output

Latest Insight.

Latest Recommendation.

Latest Chat Response.

---

## Affected Domains

- Budget
- Expense
- Saving Goal
- Financial Report
- Chat History

---

# 11. System Processing : Notification

## Purpose

Đồng bộ Notification sau khi hệ thống phát hiện một sự kiện cần thông báo.

Notification chỉ phản ánh trạng thái của hệ thống.

Notification không thay đổi dữ liệu nghiệp vụ.

---

## Input

Notification Trigger.

Ví dụ:

- Budget Warning
- Saving Goal Completed
- Pig Coin Earned
- Voucher Redeemed
- Pig Pig Warning

---

## Processing

Step 1

Receive Notification Trigger.

↓

Step 2

Generate Notification Content.

↓

Step 3

Assign Notification Type.

↓

Step 4

Save Notification.

↓

Step 5

Refresh Notification State.

---

## Updated Data

- Notification

---

## Output

Notification Center hiển thị dữ liệu mới.

---

## Affected Domains

- Notification

---

# 12. State Synchronization

Sau mỗi Processing, hệ thống phải đảm bảo toàn bộ dữ liệu phụ thuộc được đồng bộ trước khi giao diện hiển thị.

## Synchronization Order

Expense Updated

↓

Budget Updated

↓

Remaining Daily Budget Updated

↓

Saving Goal Updated (if affected)

↓

Financial Report Updated

↓

Budget Streak Updated

↓

Pig Pig Updated

↓

Reward Updated

↓

Notification Updated

↓

Dashboard Refreshed

---

Nguyên tắc:

- Dashboard chỉ được làm mới sau khi toàn bộ dữ liệu liên quan đã được cập nhật.
- Không hiển thị trạng thái trung gian (partial state) cho người dùng.

---

# 13. Error Handling

## Validation Error

Nếu dữ liệu đầu vào không hợp lệ.

↓

Không cập nhật dữ liệu.

↓

Hiển thị lỗi.

---

## Processing Error

Nếu quá trình xử lý thất bại.

↓

Rollback toàn bộ thay đổi của Processing hiện tại.

↓

Hiển thị thông báo lỗi.

---

## Data Synchronization Error

Nếu một module không thể đồng bộ.

↓

Giữ nguyên trạng thái dữ liệu đã lưu.

↓

Đánh dấu module cần đồng bộ lại.

↓

Không làm ảnh hưởng các module khác.

---

## Unknown Error

Hiển thị thông báo lỗi chung.

Lưu thông tin lỗi để phục vụ việc phân tích.

---

# 14. System Constraints

SC-001

Expense luôn là nguồn dữ liệu gốc của hệ thống.

---

SC-002

Remaining Budget phải luôn được tính trước Remaining Daily Budget.

---

SC-003

Remaining Daily Budget luôn được tính dựa trên:

- Remaining Budget
- Số ngày còn lại trong chu kỳ ngân sách

---

SC-004

Financial Report chỉ đọc dữ liệu.

Không được phép chỉnh sửa dữ liệu.

---

SC-005

Pig Pig chỉ đọc dữ liệu.

Không được phép thay đổi Budget, Expense hoặc Saving Goal.

---

SC-006

Reward Marketplace chỉ thay đổi Pig Coin Wallet và Reward History.

Không được thay đổi Budget.

---

SC-007

Dashboard luôn là màn hình cuối cùng được đồng bộ sau mỗi Processing.

---

SC-008

Mọi dữ liệu hiển thị trên giao diện phải được lấy từ trạng thái đã đồng bộ thành công.

---

# End of Document