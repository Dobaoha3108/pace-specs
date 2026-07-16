# 11. SAVING GOAL

Version: 1.2 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Purpose

Saving Goal Management là Feature cho phép User tạo và quản lý các mục tiêu tiết kiệm trong PACE.

Saving Goal giúp User chủ động phân bổ một phần Budget cho các mục tiêu tài chính cá nhân.

Khoản tiền được chuyển vào Saving Goal sẽ không còn thuộc Remaining Budget cho đến khi User Withdraw hoặc Saving Goal bị Cancelled.

Expense không trực tiếp làm thay đổi Saving Goal.

---

# 2. Business Objective

Saving Goal Management giúp User:

- Tạo Saving Goal mới.
- Theo dõi tiến độ tiết kiệm.
- Nạp tiền vào Saving Goal.
- Rút tiền khỏi Saving Goal.
- Chỉnh sửa Saving Goal.
- Hoàn thành Saving Goal.
- Huỷ Saving Goal khi không còn nhu cầu.
- Theo dõi lịch sử Saving Goal.

---

# 3. Business Responsibility

Saving Goal Management chịu trách nhiệm:

- Create Saving Goal.
- View Saving Goal List.
- View Saving Goal Detail.
- Deposit.
- Withdraw.
- Edit Saving Goal.
- Request Cancel.
- Undo Cancel.
- Complete Saving Goal.
- View Saving Goal History.

Saving Goal Management không chịu trách nhiệm:

- Quản lý Expense.
- Tính Financial Report.
- Đổi Voucher.
- Chat với Pig Pig.

---

# 4. Screen Overview

Feature Name

Saving Goal Management

---

Business Goal

Cho phép User quản lý toàn bộ vòng đời của một Saving Goal.

---

Entry Point

- Dashboard Saving Goal Card.
- Dashboard View All.
- Dashboard Empty State.
- Notification.

---

Exit Point

- Dashboard.
- Saving Goal Detail.
- Saving Goal History.

---

# 5. Screen Type

Feature Group

Saving Goal Management bao gồm nhiều Screen con.

---

## Navigation Context

Child Screen.

Dashboard chỉ hiển thị Saving Goal Summary.

Toàn bộ thao tác được thực hiện trong Saving Goal Management.

---

# 6. Used Components

- CMP-001 App Header
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-006 Saving Goal Card
- CMP-013 Empty State
- CMP-014 Loading State
- CMP-015 Confirmation Dialog

---

# 7. Preconditions

- User đã hoàn thành Onboarding.
- Budget đã được khởi tạo.
- Remaining Budget lớn hơn 0 để có thể Deposit.
- User chưa vượt quá số Saving Goal Active theo giới hạn của gói hiện tại.

---

# 8. Saving Goal Screens

Saving Goal Management bao gồm các Screen sau.

---

## Screen 1

### Saving Goal List

Hiển thị toàn bộ Saving Goal ở trạng thái Active.

User có thể:

- Xem Detail.
- Tạo Saving Goal mới.
- Chuyển sang History.

---

## Screen 2

### Saving Goal Detail

Hiển thị thông tin chi tiết của Saving Goal.

Bao gồm:

- Progress.
- Deposit.
- Withdraw.
- Edit.
- Request Cancel.

---

## Screen 3

### Create Saving Goal

Cho phép User tạo Saving Goal mới.

---

## Screen 4

### Edit Saving Goal

Cho phép User chỉnh sửa:

- Goal Name.
- Target Amount.
- Target Date.

Saving Mode không được chỉnh sửa sau khi Saving Goal đã được tạo.

---

## Screen 5

### Saving Goal History

Hiển thị:

- Completed Saving Goal.
- Cancelled Saving Goal.

Saving Goal Active không hiển thị tại đây.

---

# 9. User Flow

## Create Saving Goal

Dashboard

↓

Saving Goal List

↓

Create Saving Goal

↓

Validate Information

↓

Create Saving Goal

↓

Refresh Dashboard

---

## Deposit Flow

Saving Goal Detail

↓

Deposit

↓

Validate Amount

↓

Update Saving Goal

↓

Update Remaining Budget

↓

Update Remaining Daily Budget

↓

Refresh Dashboard

---

## Withdraw Flow

Saving Goal Detail

↓

Withdraw

↓

Validate Request

↓

Update Saving Goal

↓

Update Remaining Budget

↓

Update Remaining Daily Budget

↓

Refresh Dashboard

---

## Complete Flow

Current Amount đạt Target Amount

↓

Saving Goal Completed

↓

Evaluate Pig Coin Reward

↓

Generate Notification

↓

Move to Saving Goal History

---

## Cancel Flow

Saving Goal Detail

↓

Request Cancel

↓

Status = Cancelling

↓

Countdown 12 Hours

↓

User có thể:

- Undo Cancel

hoặc

↓

Hệ thống tự động Cancel Saving Goal

↓

Hoàn trả Remaining Budget

↓

Move to Saving Goal History

---

# 10. Screen Content

## Saving Goal List

Hiển thị:

- Goal Name.
- Progress (%).
- Current Amount.
- Target Amount.
- Target Date.
- Saving Mode Badge.

Saving Mode Badge bao gồm:

- Flexible.
- Commitment.

Action:

- View Detail.
- Create Saving Goal.
- History.

---

## Saving Goal Detail

Hiển thị:

- Goal Name.
- Progress (%).
- Current Amount.
- Target Amount.
- Target Date.
- Saving Mode.
- Status.

Action:

- Deposit.
- Withdraw.
- Edit.
- Request Cancel.

---

Nếu Status = Cancelling.

↓

Hiển thị:

- Countdown 12 giờ.
- Button Undo Cancel.

---

## Create Saving Goal

User nhập:

- Goal Name.
- Target Amount.
- Target Date.
- Saving Mode.

---

## Edit Saving Goal

Cho phép chỉnh sửa:

- Goal Name.
- Target Amount.
- Target Date.

---

## Saving Goal History

Hiển thị:

- Completed Saving Goal.
- Cancelled Saving Goal.

Mỗi Goal hiển thị:

- Goal Name.
- Current Amount.
- Target Amount.
- Status.
- Completed Date hoặc Cancelled Date.

---

# 11. User Actions

User có thể:

- Create Saving Goal.
- View Saving Goal Detail.
- Deposit.
- Withdraw.
- Edit Saving Goal.
- Request Cancel.
- Undo Cancel.
- View Saving Goal History.

---

# 12. System Response

## Create Saving Goal

User tạo Saving Goal hợp lệ.

↓

System tạo Saving Goal.

↓

Refresh Dashboard.

---

## Deposit

System cập nhật:

- Current Amount.
- Remaining Budget.
- Remaining Daily Budget.

↓

Refresh Dashboard.

---

## Withdraw

System cập nhật:

- Current Amount.
- Remaining Budget.
- Remaining Daily Budget.

↓

Refresh Dashboard.

---

## Request Cancel

↓

Saving Goal Status = Cancelling.

↓

Lưu Cancel Requested Time.

↓

Bắt đầu Countdown 12 giờ.

---

## Undo Cancel

↓

Saving Goal Status = Active.

↓

Huỷ Countdown.

---

## Complete Saving Goal

↓

Saving Goal Status = Completed.

↓

Đánh giá điều kiện nhận Pig Coin.

↓

Generate Notification.

↓

Refresh Dashboard.

---

# 13. Navigation

## Dashboard

User click Saving Goal Card.

↓

Open Saving Goal Detail.

---

User click View All.

↓

Open Saving Goal List.

---

Nếu Dashboard hiển thị Empty State.

↓

User click Create Saving Goal.

↓

Open Create Saving Goal.

---

## Saving Goal List

User click Saving Goal.

↓

Open Saving Goal Detail.

---

User click Create Saving Goal.

↓

Open Create Saving Goal.

---

User click History.

↓

Open Saving Goal History.

---

## Saving Goal Detail

User click Deposit.

↓

Open Deposit Dialog.

---

User click Withdraw.

↓

Open Withdraw Dialog.

---

User click Edit.

↓

Open Edit Saving Goal.

---

User click Request Cancel.

↓

Open Confirmation Dialog.

---

Nếu Saving Goal ở trạng thái Cancelling.

↓

User click Undo Cancel.

↓

Saving Goal quay lại trạng thái Active.

---

## Saving Goal History

User click Saving Goal.

↓

Open Saving Goal Detail (Read Only).

---

# 14. Display Rules

## Saving Goal List

Chỉ hiển thị Saving Goal ở trạng thái:

- Active.

Saving Goal Completed hoặc Cancelled không hiển thị tại đây.

---

Mỗi Saving Goal hiển thị:

- Goal Name.
- Progress (%).
- Current Amount.
- Target Amount.
- Target Date.
- Saving Mode Badge.

Saving Mode Badge bao gồm:

- Flexible.
- Commitment.

---

Nếu chưa có Saving Goal.

↓

Hiển thị Empty State.

↓

Hiển thị Button:

Create Saving Goal.

---

## Saving Goal Detail

Luôn hiển thị:

- Goal Name.
- Progress (%).
- Current Amount.
- Target Amount.
- Target Date.
- Saving Mode.
- Status.

---

Progress được tính:

(Current Amount / Target Amount) × 100%

---

Nếu Status = Active.

↓

Hiển thị:

- Deposit.
- Withdraw.
- Edit.
- Request Cancel.

---

Nếu Status = Cancelling.

↓

Hiển thị:

- Countdown thời gian còn lại.
- Undo Cancel.

Ẩn:

- Deposit.
- Withdraw.
- Edit.
- Request Cancel.

---

Nếu Status = Completed.

↓

Hiển thị Badge:

Completed.

↓

Không cho phép chỉnh sửa.

---

Nếu Status = Cancelled.

↓

Hiển thị Badge:

Cancelled.

↓

Chỉ cho phép xem.

---

## Saving Goal History

Chỉ hiển thị:

- Completed.
- Cancelled.

Mỗi Saving Goal hiển thị:

- Goal Name.
- Current Amount.
- Target Amount.
- Status.
- Completed Date hoặc Cancelled Date.

---

# 15. Validation

## Goal Name

- Required.
- Không được để trống.

---

## Target Amount

- Required.
- Chỉ cho phép nhập số.
- Phải lớn hơn 0.

---

## Target Date

- Required.

Nếu Target Date là ngày hiện tại.

↓

Thời gian phải lớn hơn thời điểm tạo Saving Goal.

---

## Saving Mode

- Required.

Sau khi Saving Goal được tạo.

↓

Không được thay đổi.

---

## Deposit

- Required.
- Chỉ cho phép nhập số.
- Phải lớn hơn 0.
- Không được lớn hơn Remaining Budget.

---

## Withdraw

- Required.
- Chỉ cho phép nhập số.
- Phải lớn hơn 0.
- Không được lớn hơn Current Amount.

---

Nếu Saving Mode = Flexible.

↓

User được phép Withdraw ngay sau khi xác nhận.

---

Nếu Saving Mode = Commitment.

↓

User gửi yêu cầu Withdraw.

↓

Hệ thống xử lý sau thời gian chờ 2 giờ theo Business Rule.

---

# 16. Screen States

## Saving Goal List

- Loading.
- Empty.
- Normal.

---

## Saving Goal Detail

- Loading.
- Normal.
- Cancelling.
- Completed.
- Cancelled.

---

## Create Saving Goal

- Normal.
- Validation Error.

---

## Edit Saving Goal

- Normal.
- Validation Error.

---

## Deposit

- Normal.
- Validation Error.

---

## Withdraw

- Normal.
- Validation Error.

---

## Saving Goal History

- Empty.
- Normal.

---

# 17. Error Handling

## Validation Error

Khi User nhập dữ liệu không hợp lệ.

↓

Hiển thị thông báo màu đỏ ngay dưới trường dữ liệu.

Ví dụ:

- "Vui lòng nhập số hợp lệ."
- "Số tiền phải lớn hơn 0."
- "Số tiền vượt quá Remaining Budget."

Thông báo tự động biến mất khi User nhập đúng.

---

## Continue With Invalid Data

Nếu User vẫn nhấn Save khi còn Validation Error.

↓

Hiển thị Dialog:

"Không thể lưu Saving Goal.

Vui lòng kiểm tra lại thông tin."

↓

Không lưu dữ liệu.

---

### Trường hợp riêng: vượt giới hạn Active Saving Goal (Free User)

Nếu Validation Error đang hiển thị là do vượt giới hạn Active Saving Goal của Free User (SVG-001, xem `specs/12_BUSINESS_RULES.md`) và User vẫn nhấn Save.

↓

Hiển thị Dialog với nội dung riêng (thay cho nội dung mặc định ở trên):

"Bạn đã vượt quá số lượng Active Saving Goal.

Nâng cấp lên gói VIP để lập thêm hũ tiết kiệm."

↓

Không lưu dữ liệu.

Các Validation Error khác (Goal Name trống, Target Amount không hợp lệ, Target Date không hợp lệ...) vẫn hiển thị đúng Dialog mặc định ở trên — không đổi.

---

## Saving Goal Creation Failed

Validation thành công.

Nhưng hệ thống không thể tạo Saving Goal.

↓

Hiển thị:

"Không thể tạo Saving Goal."

↓

Button:

"Thử lại"

---

## Deposit Failed

Hiển thị:

"Không thể nạp tiền vào Saving Goal."

↓

Button:

"Thử lại"

---

## Withdraw Failed

Hiển thị:

"Không thể rút tiền khỏi Saving Goal."

↓

Button:

"Thử lại"

---

## Cancel Failed

Hiển thị:

"Không thể huỷ Saving Goal."

↓

Button:

"Thử lại"

---

## Saving Goal Load Failed

Hiển thị:

"Không thể tải Saving Goal."

↓

Button:

"Thử lại"

---

# 18. Related Specification

## Domain Model

- SavingGoal
- Budget
- PigCoinWallet
- Notification
- DashboardSummary

---

## Business Workflow

- Saving Goal Management

---

## System Workflow

- Saving Goal Processing
- Budget Processing
- Dashboard Synchronization

---

## Data Model

- SavingGoal
- Budget
- PigCoinWallet
- Notification
- DashboardSummary

---

## Business Rules

- SVG-001
- SVG-002
- SVG-003
- SVG-004
- SVG-005
- SVG-006
- SVG-007
- SVG-008
- SVG-009
- SVG-010
- SVG-011
- SVG-012

---

## UI Components

- CMP-001 App Header
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-006 Saving Goal Card
- CMP-013 Empty State
- CMP-014 Loading State
- CMP-015 Confirmation Dialog

---

# 19. Acceptance Criteria

## AC-001

User có thể tạo Saving Goal mới.

---

## AC-002

Free User chỉ được có tối đa hai Saving Goal ở trạng thái Active.

Saving Goal Completed hoặc Cancelled không tính vào giới hạn này.

---

## AC-003

Saving Goal phải có:

- Goal Name.
- Target Amount.
- Target Date.
- Saving Mode.

---

## AC-004

Target Amount phải lớn hơn 0.

---

## AC-005

Nếu Target Date là ngày hiện tại.

↓

Thời gian phải lớn hơn thời điểm tạo Saving Goal.

---

## AC-006

Saving Mode không được thay đổi sau khi Saving Goal được tạo.

---

## AC-007

Deposit thành công.

↓

System:

- tăng Current Amount.
- giảm Remaining Budget.
- tính lại Remaining Daily Budget.
- cập nhật Dashboard Summary.

---

## AC-008

Withdraw thành công.

↓

System:

- giảm Current Amount.
- tăng Remaining Budget.
- tính lại Remaining Daily Budget.
- cập nhật Dashboard Summary.

---

## AC-009

Saving Goal đạt Target Amount.

↓

Status chuyển thành Completed.

↓

System kiểm tra điều kiện nhận Pig Coin.

↓

Generate Notification.

↓

Saving Goal được chuyển sang Saving Goal History.

---

## AC-010

User Request Cancel Saving Goal.

↓

Status chuyển thành Cancelling.

↓

Bắt đầu Countdown 12 giờ.

---

## AC-011

Trong thời gian Countdown.

↓

User có thể chọn:

Undo Cancel.

↓

Saving Goal quay trở lại trạng thái Active.

↓

Countdown bị hủy.

---

## AC-012

Nếu hết 12 giờ.

↓

System tự động:

- chuyển Status thành Cancelled.
- hoàn trả toàn bộ Current Amount vào Remaining Budget.
- tính lại Remaining Daily Budget.
- Generate Notification.
- chuyển Saving Goal vào History.
- cập nhật Dashboard Summary.

---

## AC-013

Saving Goal ở trạng thái Cancelling.

↓

Không cho phép:

- Deposit.
- Withdraw.
- Edit.

---

## AC-014

Saving Goal History chỉ hiển thị:

- Completed.
- Cancelled.

---

## AC-015

Dashboard chỉ hiển thị Saving Goal ở trạng thái Active.

Saving Goal Completed hoặc Cancelled không hiển thị trên Dashboard.

---

## AC-016

Deposit và Withdraw không tạo Expense.

---

## AC-017

Expense không trực tiếp cập nhật Saving Goal.

---

## AC-018

Nếu xảy ra lỗi khi:

- Create.
- Deposit.
- Withdraw.
- Cancel.
- Undo Cancel.

↓

Hiển thị thông báo lỗi.

↓

Cho phép User thử lại.

---

# 20. Open Questions

Hiện tại MVP đã thống nhất:

- Saving Goal có hai Saving Mode:
  - Flexible.
  - Commitment.
- Saving Goal History chỉ lưu:
  - Completed.
  - Cancelled.
- Dashboard chỉ hiển thị Saving Goal ở trạng thái Active.
- Cancel Saving Goal có thời gian chờ 12 giờ.
- User có thể Undo Cancel trong thời gian chờ.
- Deposit và Withdraw không tạo Expense.

Các nội dung sau chưa thuộc phạm vi MVP:

- Saving Goal Template.
- Chia sẻ Saving Goal.
- AI Recommendation cho Saving Goal.

---

# 21. Future Enhancements

Các cải tiến có thể bổ sung trong các phiên bản tiếp theo:

- AI đề xuất Saving Goal phù hợp với khả năng tài chính.
- Reminder định kỳ để Deposit.
- Saving Goal theo nhóm.

Các nội dung trên không ảnh hưởng tới kiến trúc hiện tại của Feature.

---

# End of Document
