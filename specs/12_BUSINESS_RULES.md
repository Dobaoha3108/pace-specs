# 5. Expense Rules

## EXP-001

### Title

Expense Amount Validation

### Description

Expense phải có Amount lớn hơn 0.

### Applies To

- Expense

### Priority

Critical

---

## EXP-002

### Title

Expense Category Required

### Description

Mỗi Expense phải thuộc đúng một Category.

### Applies To

- Expense

### Priority

High

---

## EXP-003

### Title

Expense Status

### Description

Expense chỉ có hai trạng thái:

- Planned
- Completed

Hai trạng thái này thuộc cùng một Expense.

Không được tạo hai Expense riêng biệt.

### Applies To

- Expense

### Priority

Critical

---

## EXP-004

### Title

Expense Budget Impact

### Description

Expense ở cả hai trạng thái Planned và Completed đều làm thay đổi Remaining Budget.

Khi Expense chuyển từ Planned sang Completed, việc chuyển trạng thái chỉ có thể xảy ra theo một trong hai cách:

- User chủ động mở ứng dụng và thay đổi trạng thái Expense sang Completed.
- Hệ thống gửi Notification nhắc nhở sau thời điểm thực hiện Expense (ví dụ sau 1 giờ) với nội dung:

"Bạn đã hoàn thành khoản chi này chưa?"

Notification hiển thị nút hành động **Completed** để User xác nhận nhanh.

Sau khi Expense được chuyển sang Completed, hệ thống **không được trừ Remaining Budget lần thứ hai**.

### Applies To

- Expense
- Budget

### Priority

Critical

---

## EXP-005

### Title

Expense History

### Description

Mọi Expense sau khi được tạo phải được lưu vào lịch sử giao dịch để phục vụ Financial Report và Dashboard.

### Applies To

- Expense
- Financial Report

### Priority

High

---

## EXP-006

### Title

Expense Data Source

### Description

Expense là nguồn dữ liệu gốc của hệ thống.

Budget, Financial Report, Budget Streak và Pig Pig phải sử dụng Expense làm dữ liệu đầu vào.

### Applies To

- Expense

### Priority

Critical

---

# 6. Saving Goal Rules

## SVG-001

### Title

Maximum Saving Goal Limit

### Description

Người dùng thuộc gói Free chỉ được phép có tối đa **hai Saving Goal ở trạng thái Active**.

Saving Goal ở trạng thái Completed hoặc Cancelled không được tính vào giới hạn này.

Saving Goal ở trạng thái Cancelling vẫn được tính là Active cho đến khi hoàn tất quá trình huỷ.

### Applies To

- Saving Goal

### Priority

Critical

---

## SVG-002

### Title

Saving Goal Target Validation

### Description

Saving Goal phải có:

- Goal Name
- Target Amount
- Target Date
- Saving Mode

Target Amount phải lớn hơn 0.

Target Date phải lớn hơn thời điểm hiện tại.

Nếu Target Date nằm cùng ngày tạo Saving Goal thì thời gian phải lớn hơn thời điểm tạo Goal.

Ví dụ:

Saving Goal được tạo lúc **13:00 ngày 07/07/2026**

↓

Target Date hợp lệ:

17:00 ngày 07/07/2026

↓

Target Date không hợp lệ:

12:00 ngày 07/07/2026

### Applies To

- Saving Goal

### Priority

Critical

---

## SVG-003

### Title

Saving Goal Deposit Validation

### Description

User chỉ được Deposit khi:

- Saving Goal đang ở trạng thái Active.
- Remaining Budget đủ để Deposit.
- Số tiền Deposit lớn hơn 0.

### Applies To

- Saving Goal
- Budget

### Priority

Critical

---

## SVG-004

### Title

Saving Goal Deposit Budget Impact

### Description

Sau mỗi lần User chuyển tiền vào Saving Goal thành công:

- Current Amount tăng.
- Remaining Budget giảm.
- Remaining Daily Budget được tính lại.
- Financial Report được cập nhật.
- Dashboard được đồng bộ.

### Applies To

- Saving Goal
- Budget
- Financial Report

### Priority

Critical

---

## SVG-005

### Title

Saving Goal Completion

### Description

Saving Goal được chuyển sang trạng thái Completed khi Current Amount đạt Target Amount.

Sau khi hoàn thành:

- Saving Goal không được Deposit thêm.
- Saving Goal không được Update.
- Saving Goal được lưu vào Saving Goal History.

### Applies To

- Saving Goal

### Priority

High

---

## SVG-006

### Title

Flexible Withdrawal

### Description

Saving Goal ở chế độ Flexible cho phép User Withdraw ngay sau khi xác nhận.

Sau khi Withdraw:

- Current Amount giảm.
- Remaining Budget tăng.
- Remaining Daily Budget được tính lại.

### Applies To

- Saving Goal

### Priority

Critical

---

## SVG-007

### Title

Commitment Withdrawal

### Description

Saving Goal ở chế độ Commitment phải trải qua thời gian chờ 2 giờ trước khi hoàn tất Withdraw.

Trong thời gian chờ:

- Saving Goal không thay đổi Current Amount.
- User có thể hủy yêu cầu Withdraw.

Sau khi hết thời gian chờ và User xác nhận lại:

- Current Amount giảm.
- Remaining Budget tăng.
- Remaining Daily Budget được tính lại.

### Applies To

- Saving Goal

### Priority

Critical

---

## SVG-008

### Title

Cancel Saving Goal

### Description

User không thể hủy Saving Goal ngay lập tức.

Khi User yêu cầu Cancel Saving Goal:

- Saving Goal chuyển sang trạng thái Cancelling.
- Hệ thống bắt đầu thời gian chờ 12 giờ.

Trong thời gian này:

- Không cho phép Deposit.
- Không cho phép Withdraw.
- Không cho phép Update Saving Goal.

### Applies To

- Saving Goal

### Priority

Critical

---

## SVG-009

### Title

Undo Cancel Saving Goal

### Description

Trong thời gian Cooling Period, User có thể chọn Undo Cancel.

Sau khi Undo:

Saving Goal trở lại trạng thái Active.

Không có thay đổi nào đối với Budget.

### Applies To

- Saving Goal

### Priority

High

---

## SVG-010

### Title

Finalize Cancel Saving Goal

### Description

Sau khi hết thời gian Cooling Period và User không Undo Cancel:

- Saving Goal chuyển sang trạng thái Cancelled.
- Toàn bộ Current Amount được cộng trở lại Remaining Budget.
- Remaining Daily Budget được tính lại.
- Financial Report được cập nhật.
- Saving Goal bị loại khỏi màn hình Saving Goal.
- Saving Goal không còn hiển thị trên Dashboard.
- Saving Goal được lưu vào Saving Goal History.
- Notification được tạo với nội dung:

"Hũ tiết kiệm '<Goal Name>' đã được huỷ thành công."

- Khi User nhấn vào Notification, hệ thống mở màn hình Saving Goal History và hiển thị đúng Saving Goal vừa bị huỷ.

Saving Goal History bao gồm:

- Saving Goal Completed.
- Saving Goal Cancelled.

### Applies To

- Saving Goal
- Budget
- Notification

### Priority

Critical

# 7. Budget Streak Rules

## STR-001

### Title

Budget Streak Qualification

### Description

Budget Streak chỉ tăng khi tổng chi tiêu trong ngày nhỏ hơn hoặc bằng Remaining Daily Budget hiện tại.

### Applies To

- Budget Streak

### Priority

Critical

---

## STR-002

### Title

Dynamic Budget Threshold

### Description

Remaining Daily Budget có thể thay đổi sau mỗi Expense hoặc Saving Goal.

Budget Streak luôn sử dụng Remaining Daily Budget mới nhất để đánh giá điều kiện.

### Applies To

- Budget
- Budget Streak

### Priority

Critical

---

## STR-003

### Title

Budget Streak Reset

### Description

Budget Streak bị reset khi:

- User chi tiêu vượt Remaining Daily Budget.
- User không ghi nhận Expense quá 3 ngày liên tiếp.

Sau khi bị reset, User có thể bắt đầu một Budget Streak mới ngay từ ngày tiếp theo nếu tiếp tục chi tiêu trong hạn mức Remaining Daily Budget hiện tại.

### Applies To

- Budget Streak

### Priority

High

---

## STR-004

### Title

Budget Streak Reward

### Description

Khi User đạt Budget Streak 7 ngày liên tiếp, hệ thống sẽ kiểm tra điều kiện nhận Pig Coin theo chính sách Reward hiện hành.

Pig Coin chỉ được cộng một lần cho mỗi mốc Streak hợp lệ.

### Applies To

- Budget Streak
- Pig Coin Wallet

### Priority

High

---

# 8. Reward Rules

## RWD-001

### Title

Pig Coin Ownership

### Description

Pig Coin chỉ được sử dụng để đổi Voucher trong Reward Marketplace.

Pig Coin không được quy đổi thành tiền mặt hoặc bất kỳ giá trị tiền tệ nào.

### Applies To

- Pig Coin Wallet

### Priority

Critical

---

## RWD-002

### Title

Voucher Redemption

### Description

User chỉ được đổi Voucher khi:

- Voucher đang ở trạng thái Active.
- Pig Coin Balance đủ để thanh toán.

### Applies To

- Reward
- Pig Coin Wallet

### Priority

Critical

---

## RWD-003

### Title

Voucher Redemption Transaction

### Description

Sau mỗi lần đổi Voucher thành công:

- Pig Coin Balance giảm.
- Một bản ghi UserReward được tạo.
- Notification được tạo.
- Voucher xuất hiện trong Voucher History của User.

### Applies To

- Reward
- UserReward
- Pig Coin Wallet

### Priority

High

---

## RWD-004

### Title

Voucher Availability

### Description

Voucher hết số lượng sẽ chuyển sang OutOfStock.

Voucher quá thời hạn sẽ chuyển sang Expired.

Voucher ở trạng thái OutOfStock hoặc Expired không được phép đổi.

### Applies To

- Reward

### Priority

Medium

---

## RWD-005

### Title

Demo Voucher

### Description

Trong phiên bản MVP Demo:

- Voucher sử dụng dữ liệu mẫu (Mock Data).
- Voucher Code không cần là mã thật.
- QR Code hoặc Barcode chỉ dùng để minh họa.
- Không kết nối tới hệ thống của Brand bên ngoài.

### Applies To

- Reward
- UserReward

### Priority

Medium

---

# 9. Pig Pig AI Rules

## AI-001

### Title

Financial Context Only

### Description

Pig Pig chỉ được phép trả lời các câu hỏi liên quan đến:

- Quản lý chi tiêu.
- Tiết kiệm.
- Saving Goal.
- Budget.
- Financial Report.
- Budget Streak.
- Reward Marketplace.
- Các chức năng của ứng dụng PACE.

### Applies To

- Pig Pig AI

### Priority

Critical

---

## AI-002

### Title

Unsupported Questions

### Description

Nếu User đặt câu hỏi nằm ngoài phạm vi của PACE, Pig Pig phải từ chối trả lời bằng thông báo mặc định.

Pig Pig không được tạo câu trả lời vượt ngoài phạm vi dữ liệu và chức năng của ứng dụng.

### Applies To

- Pig Pig AI

### Priority

Critical

---

## AI-003

### Title

Read-Only Access

### Description

Pig Pig chỉ được phép đọc dữ liệu.

Pig Pig không được phép tạo, chỉnh sửa hoặc xóa bất kỳ dữ liệu tài chính nào.

### Applies To

- Pig Pig AI

### Priority

Critical

---

## AI-004

### Title

Insight Generation

### Description

Pig Pig chỉ tạo Insight từ dữ liệu hiện có của User.

Insight phải phản ánh đúng tình trạng tài chính hiện tại.

### Applies To

- Pig Pig AI

### Priority

High

---

## AI-005

### Title

Conversation History

### Description

Mọi cuộc hội thoại giữa User và Pig Pig phải được lưu vào Chat History.

### Applies To

- Pig Pig AI
- Chat History

### Priority

Medium

---

# 10. Notification Rules

## NTF-001

### Title

Notification Generation

### Description

Notification chỉ được tạo khi xảy ra một Business Event hợp lệ.

### Applies To

- Notification

### Priority

High

---

## NTF-002

### Title

Notification History

### Description

Notification sau khi được tạo phải được lưu vào lịch sử Notification của User.

### Applies To

- Notification

### Priority

Medium

---

## NTF-003

### Title

Read Status

### Description

User chỉ được thay đổi trạng thái Notification từ Unread sang Read.

Không được phép chỉnh sửa nội dung Notification.

### Applies To

- Notification

### Priority

Medium

---

## NTF-004

### Title

Business Event Notification

### Description

Notification được tạo khi xảy ra một trong các sự kiện sau:

- Saving Goal Completed.
- Saving Goal Cancelled.
- Pig Coin Earned.
- Voucher Redeemed.
- Budget Warning.
- Commitment Withdraw Completed.
- Pig Pig hoàn thành Weekly Financial Report.

Đối với Weekly Financial Report:

- Hệ thống tự động tạo Notification vào **15:00 Chủ nhật hằng tuần**.
- Notification có nội dung thông báo rằng Pig Pig đã hoàn thành báo cáo tài chính tuần.
- Khi User nhấn vào Notification, hệ thống mở trực tiếp màn hình Financial Report.

### Applies To

- Notification
- Financial Report
- Pig Pig AI

### Priority

High

# 11. Financial Report Rules

## RPT-001

### Title

Generated Data

### Description

Financial Report là dữ liệu tổng hợp được sinh từ dữ liệu nghiệp vụ hiện có.

Financial Report không được lưu như một nguồn dữ liệu độc lập.

### Applies To

- Financial Report

### Priority

Critical

---

## RPT-002

### Title

Transaction History

### Description

Financial Report phải lưu và hiển thị đầy đủ lịch sử giao dịch của User.

Lịch sử bao gồm:

- Expense History
- Saving Goal Deposit History
- Saving Goal Withdraw History

Financial Report không hiển thị Budget Streak.

### Applies To

- Financial Report

### Priority

Critical

---

## RPT-003

### Title

Automatic Refresh

### Description

Financial Report phải được cập nhật ngay sau khi xảy ra một trong các sự kiện sau:

- Expense Created
- Expense Updated
- Expense Completed
- Saving Goal Deposit
- Saving Goal Withdraw
- Saving Goal Completed
- Saving Goal Finalize Cancel

### Applies To

- Financial Report

### Priority

High

---

## RPT-004

### Title

Data Consistency

### Description

Financial Report phải luôn phản ánh chính xác dữ liệu tài chính mới nhất của User.

Không được hiển thị dữ liệu cũ sau khi Business Event đã hoàn tất.

### Applies To

- Financial Report

### Priority

Critical

---

# 12. Dashboard Rules

## DSH-001

### Title

Single Source Display

### Description

Dashboard chỉ hiển thị dữ liệu đã được hệ thống đồng bộ thành công.

Không được hiển thị dữ liệu trung gian hoặc dữ liệu chưa hoàn tất xử lý.

### Applies To

- Dashboard

### Priority

Critical

---

## DSH-002

### Title

Automatic Refresh

### Description

Dashboard phải được cập nhật sau mọi thay đổi của:

- Budget
- Expense
- Saving Goal
- Budget Streak
- Pig Coin Wallet
- Pig Pig Insight

### Applies To

- Dashboard

### Priority

High

---

## DSH-003

### Title

Dashboard Summary

### Description

Dashboard phải hiển thị tối thiểu các thông tin sau:

- Remaining Budget
- Remaining Daily Budget
- Saving Goal Progress
- Budget Streak
- Pig Coin Balance
- Pig Pig Insight
- Recent Expense
- Weekly Summary

### Applies To

- Dashboard

### Priority

High

---

## DSH-004

### Title

Saving Goal Visibility

### Description

Dashboard chỉ hiển thị Saving Goal ở trạng thái Active.

Saving Goal ở trạng thái Completed hoặc Cancelled không được hiển thị trên Dashboard.

Saving Goal History được truy cập từ màn hình Saving Goal.

### Applies To

- Dashboard
- Saving Goal

### Priority

High

---

# 13. Global Rules

## GR-001

### Title

Data Ownership

### Description

Mọi dữ liệu tài chính đều thuộc quyền sở hữu của đúng một User.

### Applies To

- System

### Priority

Critical

---

## GR-002

### Title

Single Source of Truth

### Description

Expense là nguồn dữ liệu gốc của hệ thống.

Budget, Financial Report, Budget Streak và Pig Pig phải sử dụng Expense làm dữ liệu đầu vào.

Saving Goal là một nguồn dữ liệu độc lập và chỉ thay đổi khi User thực hiện các hành động liên quan đến Saving Goal.

### Applies To

- System

### Priority

Critical

---

## GR-003

### Title

State Synchronization

### Description

Sau mỗi Business Event liên quan đến Expense, hệ thống phải đồng bộ dữ liệu theo đúng thứ tự:

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

Dashboard

Saving Goal **không nằm trong chuỗi đồng bộ này**.

Saving Goal chỉ được cập nhật khi xảy ra một trong các Business Event sau:

- Create Saving Goal
- Deposit
- Withdraw
- Complete Goal
- Request Cancel
- Undo Cancel
- Finalize Cancel

### Applies To

- System

### Priority

Critical

---

## GR-004

### Title

Data Integrity

### Description

Một Business Event chỉ được phép cập nhật dữ liệu đúng một lần.

Hệ thống không được:

- Trừ Budget hai lần.
- Cộng Pig Coin hai lần.
- Sinh Notification trùng lặp.
- Tạo Transaction History trùng lặp.

### Applies To

- System

### Priority

Critical

---

## GR-005

### Title

Business Rule Consistency

### Description

Mọi Feature Specification phải tham chiếu Business Rules trong tài liệu này.

Không được định nghĩa lại Business Rule tại Feature Specification nếu không có thay đổi về nghiệp vụ.

Khi Business Rule thay đổi, chỉ được cập nhật tại tài liệu này và các tài liệu liên quan phải tham chiếu lại Business Rule mới nhất.

### Applies To

- System

### Priority

High

---

# End of Document
