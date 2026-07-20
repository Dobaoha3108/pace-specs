# 06. UI COMPONENT LIBRARY

Version: 1.3 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---
 
# 1. Purpose

UI Component Library định nghĩa toàn bộ các UI Component được sử dụng trong ứng dụng PACE.

Tài liệu này nhằm:

- Chuẩn hóa các UI Component trên toàn bộ ứng dụng.
- Đảm bảo tính nhất quán giữa các Feature.
- Giảm lặp lại trong Feature Specification.
- Hỗ trợ AI Coding Agent tái sử dụng Component khi sinh mã nguồn.
- Hỗ trợ mở rộng sản phẩm trong tương lai.

UI Component Library chỉ mô tả hành vi và trách nhiệm nghiệp vụ của từng Component.

Các nội dung liên quan tới màu sắc, kích thước, typography hoặc spacing sẽ được mô tả trong UI Layout Guide.

---

# 2. Component Principles

## CMP-P001

### Single Responsibility

Mỗi Component chỉ đại diện cho một trách nhiệm nghiệp vụ duy nhất.

Ví dụ:

- Budget Summary Card chỉ hiển thị thông tin Budget.
- Saving Goal Card chỉ hiển thị thông tin Saving Goal.

Không kết hợp nhiều nghiệp vụ khác nhau trong cùng một Component.

---

## CMP-P002

### Reusability

Một Component có thể được sử dụng tại nhiều màn hình khác nhau.

Ví dụ:

Progress Bar được sử dụng tại:

- Dashboard
- Saving Goal
- Financial Report

---

## CMP-P003

### Business Logic Separation

Component không xử lý Business Logic.

Business Logic luôn được xử lý tại System Workflow.

Component chỉ:

- Hiển thị dữ liệu.
- Thu nhận User Action.
- Gửi Action tới hệ thống.

---

## CMP-P004

### Display State

Một Component có thể có nhiều Display State.

Ví dụ:

Saving Goal Card

- Loading
- Empty
- Active
- Cancelling
- Completed
- Cancelled

Display State chỉ phản ánh trạng thái hiển thị.

Không thay đổi Business Logic.

---

## CMP-P005

### Reusable First

Ưu tiên tái sử dụng Component.

Không tạo Component mới nếu Component hiện tại có thể đáp ứng cùng mục đích.

---

## CMP-P006

### Specification Consistency

Mọi Component phải tuân thủ:

- Domain Model
- Business Workflow
- System Workflow
- Business Rules

Không được tự định nghĩa nghiệp vụ mới trong Component.

---

# 3. Component Classification

Toàn bộ Component của PACE được chia thành các nhóm sau.

---

## Layout Components

Điều hướng và bố cục màn hình.

Bao gồm:

- App Header
- Bottom Navigation

---

## Action Components

Cho phép User thực hiện hành động.

Bao gồm:

- Primary Button
- Secondary Button

---

## Finance Components

Hiển thị dữ liệu tài chính.

Bao gồm:

- Budget Summary Card
- Saving Goal Card
- Budget Streak Card
- Statistic Card

---

## Reward Components

Hiển thị dữ liệu Voucher.

Bao gồm:

- Voucher Card

---

## AI Components

Hiển thị dữ liệu của Pig Pig.

Bao gồm:

- Pig Pig Insight Banner
- Chat Bubble

---

## Common Components

Các Component được tái sử dụng trên nhiều màn hình.

Bao gồm:

- Progress Bar
- Empty State
- Loading State
- Confirmation Dialog

---

# 4. Layout Components

## CMP-001

# App Header

## Purpose

Hiển thị thông tin chung của màn hình và cung cấp điều hướng nhanh.

---

## Used By

- Dashboard
- Financial Report
- Reward Marketplace
- Pig Pig Chat
- Saving Goal
- Expense History
- Profile

---

## Business Responsibility

Cho phép User:

- xem lời chào.
- mở Notification Center.
- mở Profile.

---

## Display Data

- User Avatar
- User Name
- Greeting
- Notification Badge

---

## User Actions

- Click Notification.
- Click Profile.
- Click Back Button (khi Header ở chế độ có Back Button, `showBackButton = true`).

---

## Navigation

Notification Button

↓

Notification Center

---

Profile Button

↓

Profile

---

Back Button

↓

Màn hình liền trước trong Navigation Stack của phiên hiện tại (xem NAV-012, `specs/15_SCREEN_MAP.md`) — không cố định về Dashboard.

---

## States

- Loading
- Normal

---

## Related Domain

- User
- Notification

---

## Related Workflow

- User Authentication
- Notification Management

---

## Related Business Rules

- NAV-005
- NAV-006
- NAV-012

---

## CMP-002

# Bottom Navigation

## Purpose

Cho phép User chuyển nhanh giữa các Module chính của ứng dụng.

Bottom Navigation luôn hiển thị sau khi User hoàn thành Onboarding.

---

## Used By

Chỉ sử dụng tại các Main Navigation Screen:

- Dashboard
- Financial Report
- Reward Marketplace
- Pig Pig Chat

Lưu ý:

Add Expense là một Quick Action của Bottom Navigation, không phải là một Main Navigation Screen.

---

## Business Responsibility

Điều hướng giữa các Module chính.

Không thực hiện Business Logic.

---

## Navigation Items

| Item | Destination |
|------|-------------|
| Home | Dashboard |
| Report | Financial Report |
| + | Add Expense |
| Reward | Reward Marketplace |
| Pig Pig | Pig Pig Chat |

---

## User Actions

User chọn một Navigation Item.

↓

Hệ thống điều hướng tới màn hình tương ứng.

---

## States

- Selected
- Unselected

---

## Related Workflow

- Screen Navigation

---

## Related Business Rules

- NAV-001
- NAV-002
- NAV-003

---

# 5. Action Components

## CMP-003

# Primary Button

## Purpose

Thực hiện hành động chính của màn hình.

---

## Used By

- Onboarding
- Add Expense
- Create Saving Goal
- Deposit
- Withdraw
- Redeem Voucher
- Budget Settings

---

## Business Responsibility

Cho phép User thực hiện hành động chính của Feature.

---

## Display Data

- Button Label
- Loading State
- Disabled State

---

## User Actions

User nhấn Button.

↓

Hệ thống thực hiện Action tương ứng.

---

## States

- Default
- Loading
- Disabled

---

## Related Domain

- Expense
- Saving Goal
- Voucher
- Budget

---

## Related Workflow

- Expense Processing
- Saving Goal Processing
- Voucher Redemption

---

## Related Business Rules

- EXP-001
- SVG-003
- SVG-004
- SVG-006
- SVG-007
- RWD-002

---

## CMP-004

# Secondary Button

## Purpose

Thực hiện các hành động phụ trên màn hình.

---

## Used By

- Edit Expense
- Saving Goal
- Notification
- Profile

---

## Business Responsibility

Cho phép User thực hiện các thao tác phụ mà không ảnh hưởng tới luồng chính.

---

## Display Data

- Button Label

---

## User Actions

- Cancel
- Back
- Undo Cancel
- Skip

---

## States

- Default
- Disabled

---

## Related Domain

- Saving Goal
- Expense

---

## Related Workflow

- Saving Goal Processing

---

## Related Business Rules

- SVG-008
- SVG-009

---

# 6. Finance Components

## CMP-005

# Budget Summary Card

## Purpose

Hiển thị tình trạng ngân sách hiện tại của User.

---

## Used By

- Dashboard
- Budget Settings

---

## Business Responsibility

Giúp User nhanh chóng biết:

- Remaining Budget.
- Remaining Daily Budget.
- Budget Status.

---

## Display Data

- Remaining Budget
- Remaining Daily Budget
- Budget Status
- Current Budget Cycle

---

## User Actions

Không có.

Component chỉ hiển thị dữ liệu.

---

## States

- Loading
- Normal
- Warning
- Empty

---

## Display Rules

Budget Summary Card luôn hiển thị ở đầu Dashboard.

Component này không được sử dụng trong Financial Report.

---

## Related Domain

- Budget

---

## Related Workflow

- Budget Processing

---

## Related Business Rules

- BGT-001
- BGT-002
- BGT-003

---

## CMP-006

# Saving Goal Card

## Purpose

Hiển thị Saving Goal và đóng vai trò Entry Point của Saving Goal Module.

---

## Used By

- Dashboard
- Saving Goal List

---

## Business Responsibility

Cho phép User:

- xem tiến độ Saving Goal.
- truy cập Saving Goal Detail.
- tạo Saving Goal đầu tiên nếu chưa có Goal.

---

## Display Data

- Goal Name
- Current Amount
- Target Amount
- Progress
- Target Date
- Saving Mode
- Saving Goal Status

---

## User Actions

- Click Goal.
- Click View All.
- Click Create Saving Goal.

---

## Navigation

Click Goal

↓

Saving Goal Detail

---

Click View All

↓

Saving Goal List

---

Click Create Saving Goal

↓

Create Saving Goal

---

## States

- Loading
- Empty
- Active
- Cancelling
- Completed
- Cancelled

---

## Display Rules

Dashboard chỉ hiển thị Saving Goal ở trạng thái Active.

Nếu chưa có Saving Goal.

↓

Hiển thị Empty State.

↓

Hiển thị nút Create Saving Goal.

---

Saving Goal ở trạng thái Completed hoặc Cancelled không hiển thị trên Dashboard.

Chỉ hiển thị trong Saving Goal History.

---

Khi User yêu cầu Cancel Saving Goal.

↓

Saving Goal chuyển sang trạng thái Cancelling.

↓

Hệ thống bắt đầu thời gian chờ 12 giờ.

↓

Trong thời gian này:

- Không cho phép Deposit.
- Không cho phép Withdraw.
- Không cho phép Update.

↓

User có thể Undo Cancel.

↓

Sau 12 giờ.

Nếu User không Undo.

↓

Hệ thống tự động:

- Finalize Cancel.
- Chuyển Current Amount về Remaining Budget.
- Recalculate Remaining Daily Budget.
- Chuyển Saving Goal sang trạng thái Cancelled.

---

## Related Domain

- Saving Goal
- Budget

---

## Related Workflow

- Saving Goal Processing

---

## Related Business Rules

- SVG-001
- SVG-003
- SVG-004
- SVG-008
- SVG-009
- SVG-010

---

## CMP-007

# Budget Streak Card

## Purpose

Hiển thị tiến trình duy trì thói quen chi tiêu đúng ngân sách.

---

## Used By

- Dashboard

---

## Business Responsibility

Khuyến khích User duy trì Budget Streak để nhận Pig Coin.

---

## Display Data

- Current Streak
- Progress to 7-day Reward Milestone
- Pig Coin Reward Hint

---

## User Actions

Không có.

Component chỉ hiển thị dữ liệu.

---

## States

- Loading
- Normal
- Reset
- Reward Eligible

---

## Display Rules

Budget Streak chỉ hiển thị trên Dashboard.

Không hiển thị trong Financial Report.

---

## Related Domain

- Budget Streak
- PigCoinWallet

---

## Related Workflow

- Budget Streak Processing

---

## Related Business Rules

- STR-001
- STR-002
- STR-003
- STR-004

---

## CMP-008

# Statistic Card

## Purpose

Hiển thị một chỉ số tài chính dạng Snapshot.

---

## Used By

- Dashboard
- Financial Report
- Saving Goal Detail

---

## Business Responsibility

Giúp User nắm nhanh các số liệu quan trọng.

---

## Display Data

- Title
- Value
- Comparison
- Trend Indicator

---

## Example

- Chi tiêu tuần này.
- Chi tiêu tháng này.
- Tiến độ tiết kiệm.

---

## User Actions

Có thể Click nếu Component được cấu hình là Navigation Card.

---

## States

- Loading
- Normal
- Empty

---

## Related Domain

- Budget
- Expense
- Saving Goal

---

## Related Workflow

- Financial Report Generation

---

## Related Business Rules

- RPT-002
- RPT-003
- DSH-003

---

# 7. Reward Components

## CMP-009

# Voucher Card

## Purpose

Hiển thị thông tin của một Voucher trong Reward Marketplace.

---

## Used By

- Reward Marketplace
- Voucher History

---

## Business Responsibility

Cho phép User:

- xem thông tin Voucher.
- mở Voucher Detail.
- đổi Voucher bằng Pig Coin.

---

## Display Data

- Brand Logo
- Brand Name
- Voucher Name
- Required Pig Coin
- Expired Date
- Voucher Status

---

## User Actions

Click Voucher

↓

Open Voucher Detail

---

## Navigation

Voucher Card

↓

Voucher Detail

---

## States

- Loading
- Available
- Out Of Stock
- Expired
- Redeemed

---

## Display Rules

Voucher chỉ hiển thị trong Reward Marketplace.

Voucher đã đổi sẽ hiển thị trong Voucher History.

Voucher trong MVP sử dụng Mock Data.

---

## Related Domain

- Voucher
- UserReward
- PigCoinWallet

---

## Related Workflow

- Voucher Redemption

---

## Related Business Rules

- RWD-001
- RWD-002
- RWD-003
- RWD-004
- RWD-005

---

# 8. AI Components

## CMP-010

# Pig Pig Insight Banner

## Purpose

Hiển thị Insight tài chính mới nhất do Pig Pig tạo ra.

---

## Used By

- Dashboard
- Financial Report

---

## Business Responsibility

Giúp User nhanh chóng nắm được lời khuyên tài chính mà không cần mở Pig Pig Chat.

---

## Display Data

- Insight Title
- Insight Content
- Insight Type

---

## User Actions

Click Banner

↓

Open Pig Pig Chat

---

## States

- Loading
- Information
- Recommendation
- Warning
- Achievement

---

## Display Rules

Dashboard chỉ hiển thị Insight mới nhất, tính theo dữ liệu ngày hiện tại.

Financial Report chỉ hiển thị Insight mới nhất, tính theo Time Filter (Weekly/Monthly) và Category Filter đang chọn — độc lập với Insight trên Dashboard (xem `feature-specs/25_REPORT.md`).

Không hiển thị lịch sử Insight ở cả hai màn hình.

---

## Related Domain

- PigPigInsight

---

## Related Workflow

- Pig Pig Processing

---

## Related Business Rules

- AI-001
- AI-003
- AI-004

---

## CMP-011

# Chat Bubble

## Purpose

Hiển thị một tin nhắn trong cuộc hội thoại giữa User và Pig Pig.

---

## Used By

- Pig Pig Chat

---

## Business Responsibility

Hiển thị nội dung hội thoại giữa User và Pig Pig.

---

## Display Data

- Sender
- Message
- Timestamp

---

## User Actions

- Scroll Conversation

---

## States

- User Message
- Pig Pig Message
- Loading Response

---

## Related Domain

- ChatHistory

---

## Related Workflow

- Pig Pig Processing

---

## Related Business Rules

- AI-001
- AI-002
- AI-005

---

# 9. Common Components

## CMP-012

# Progress Bar

## Purpose

Hiển thị tiến độ hoàn thành của một mục tiêu.

---

## Used By

- Saving Goal Card
- Budget Streak Card

---

## Business Responsibility

Giúp User dễ dàng theo dõi tiến độ bằng trực quan.

---

## Display Data

- Current Value
- Maximum Value
- Percentage

---

## States

- Empty
- In Progress
- Completed

---

## Related Domain

- SavingGoal
- BudgetStreak

---

## CMP-013

# Empty State

## Purpose

Hiển thị khi màn hình chưa có dữ liệu.

---

## Used By

- Saving Goal
- Expense History
- Financial Report
- Voucher History
- Notification Center

---

## Business Responsibility

Thông báo rằng chưa có dữ liệu và hướng User tới hành động tiếp theo.

---

## Display Data

- Illustration
- Title
- Description
- Primary Button (nếu có)

---

## Example

Saving Goal

↓

"Bạn chưa có hũ tiết kiệm nào."

↓

Create Saving Goal

---

Expense History

↓

"Bạn chưa ghi nhận khoản chi nào."

↓

Add Expense

---

Voucher History

↓

"Bạn chưa đổi Voucher nào."

---

Financial Report

↓

"Chưa có đủ dữ liệu để tạo báo cáo."

---

## States

- Empty

---

## Related Domain

- SavingGoal
- Expense
- Voucher
- Notification

---

## CMP-014

# Loading State

## Purpose

Hiển thị trạng thái hệ thống đang tải dữ liệu.

---

## Used By

Toàn bộ ứng dụng.

---

## Business Responsibility

Thông báo cho User rằng hệ thống đang xử lý.

---

## States

- Loading

---

## Display Rules

Loading chỉ xuất hiện trong thời gian xử lý.

Sau khi hoàn thành.

↓

Chuyển sang:

- Normal
- Empty
- Error

---

## CMP-015

# Confirmation Dialog

## Purpose

Yêu cầu User xác nhận trước khi thực hiện một hành động quan trọng.

---

## Used By

- Withdraw Saving Goal
- Request Cancel Saving Goal
- Redeem Voucher
- Delete Expense

---

## Business Responsibility

Giảm nguy cơ thao tác nhầm.

---

## Display Data

- Title
- Message
- Primary Button
- Secondary Button

---

## User Actions

- Confirm
- Cancel

---

## States

- Visible
- Hidden

---

## Display Rules

Confirmation Dialog chỉ dùng để xác nhận hành động.

Sau khi User xác nhận Request Cancel Saving Goal.

↓

Saving Goal chuyển sang trạng thái Cancelling.

↓

Hệ thống bắt đầu thời gian chờ 12 giờ theo Business Rule.

Confirmation Dialog không thực hiện Business Logic.

---

## Related Business Rules

- SVG-007
- SVG-008
- SVG-009
- SVG-010
- RWD-002

---

## CMP-016

# Day Picker Grid

## Purpose

Cho phép User chọn một ngày trong tháng (1–31) dưới dạng lưới số, dùng cho các trường hợp cần một ngày định kỳ hàng tháng thay vì một ngày cụ thể trên lịch dương.

---

## Used By

- Onboarding (Financial Setup — chọn Budget Reset Day)
- Budget Settings (đổi Budget Reset Day)

---

## Business Responsibility

Thu thập một giá trị Integer từ 1 đến 31, tránh User nhập tay sai định dạng hoặc chọn ngày không hợp lệ.

---

## Display Data

- Lưới 31 ô, mỗi ô là một số từ 1 đến 31.
- Ô đang được chọn hiển thị nổi bật (khác màu nền/viền).
- Label/câu hỏi phía trên lưới (ví dụ: "Bạn nhận Income vào ngày nào hàng tháng?").

---

## User Actions

- Chạm chọn một ô số.

---

## States

- Empty (chưa chọn ngày nào — bắt buộc chọn mới đi tiếp được)
- Selected (đã chọn một ngày)
- Validation Error (bắt buộc nhưng chưa chọn, User cố gắng đi tiếp)

---

## Display Rules

Chỉ cho phép chọn đúng 1 ngày tại một thời điểm.

Không cho nhập tay tự do (không có ô input dạng số đi kèm) — chỉ chọn qua lưới, để tránh nhập sai định dạng hoặc giá trị ngoài khoảng 1–31.

Component không tự suy luận "tháng thiếu ngày" — việc quy đổi ngày cuối tháng khi tháng không có đủ số ngày đã chọn được xử lý ở tầng Business Rule/System Logic, không phải ở Component này.

---

## Related Business Rules

- BGT-001 (Budget Reset Day validation)

---

# 10. Component Dependency

Các Component được kết hợp để tạo thành từng màn hình.

Ví dụ:

Dashboard

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-005 Budget Summary Card
- CMP-006 Saving Goal Card
- CMP-007 Budget Streak Card
- CMP-008 Statistic Card
- CMP-010 Pig Pig Insight Banner

---

Saving Goal Detail

- CMP-001 App Header
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-006 Saving Goal Card
- CMP-012 Progress Bar
- CMP-015 Confirmation Dialog

---

Reward Marketplace

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-009 Voucher Card

---

Financial Report

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-008 Statistic Card
- CMP-010 Pig Pig Insight Banner
- CMP-017 Category Pie Chart (Donut Chart)
- CMP-018 Weekly Comparison Bar Chart

---

Pig Pig Chat

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-011 Chat Bubble

---

# 11. Component Naming Convention

Toàn bộ Component sử dụng định dạng:

CMP-XXX

Ví dụ:

- CMP-001 App Header
- CMP-006 Saving Goal Card
- CMP-010 Pig Pig Insight Banner

Tên Component phải:

- Ngắn gọn.
- Dễ hiểu.
- Phản ánh đúng trách nhiệm nghiệp vụ.
- Có thể tái sử dụng.

---

# 12. Feature Specification Mapping

Mỗi Feature Specification sẽ tham chiếu Component thay vì mô tả lại.

Ví dụ:

Dashboard

↓

Use Components

- CMP-001
- CMP-002
- CMP-005
- CMP-006
- CMP-007
- CMP-008
- CMP-010

---

Expense

↓

Use Components

- CMP-001
- CMP-003
- CMP-004
- CMP-008
- CMP-013
- CMP-014
- CMP-015

---

Saving Goal

↓

Use Components

- CMP-001
- CMP-003
- CMP-004
- CMP-006
- CMP-012
- CMP-015

---

Reward Marketplace

↓

Use Components

- CMP-001
- CMP-002
- CMP-009

---

Financial Report

↓

Use Components

- CMP-001
- CMP-002
- CMP-003
- CMP-004
- CMP-008
- CMP-010
- CMP-013
- CMP-014
- CMP-017
- CMP-018

---

Pig Pig

↓

Use Components

- CMP-001
- CMP-002
- CMP-010
- CMP-011

---

## CMP-017 Category Pie Chart (Donut Chart)

### Mô tả

Biểu đồ vành khuyên (Donut Chart — đường tròn có lỗ rỗng ở giữa, không tô đặc như Pie Chart) hiển thị phân bổ chi tiêu theo Category. Mỗi Category có một màu cố định, nhất quán trong toàn ứng dụng.

Layout theo thứ tự từ trên xuống:

1. Label "Tổng chi tiêu" + số tiền tổng (cỡ chữ lớn, đậm).
2. Donut Chart, canh giữa (không hiển thị chữ/số bên trong lỗ rỗng).
3. Legend dạng danh sách đầy đủ chiều rộng (không đặt cạnh biểu đồ), mỗi dòng gồm:
   - Chấm màu vuông bo góc.
   - Category Name (đậm, hàng trên) + Category Spending Amount (nhạt màu hơn, hàng dưới, ngay dưới tên Category, luôn hiển thị mặc định).
   - Percentage (đậm, canh phải, cùng hàng với Category Name).

### Sử dụng tại

- Financial Report — Category Analysis (Weekly Report và Monthly Report).

### Props / Data đầu vào

- Danh sách Category kèm: màu, Total Spending, Percentage.
- Tổng chi tiêu (hiển thị phía trên biểu đồ, không hiển thị ở tâm biểu đồ).

### Trạng thái

- Có dữ liệu: hiển thị đầy đủ Total Spending + Donut Chart + Legend.
- Không có dữ liệu (Total Spending = 0 toàn bộ): ẩn component, không hiển thị biểu đồ rỗng.

### Ghi chú

Không hiển thị badge so sánh với kỳ trước (ví dụ "Giảm X% so với tuần trước") — nằm ngoài phạm vi MVP, thuộc Future Enhancement (xem `feature-specs/25_REPORT.md` Section 20/21).

---

## CMP-018 Weekly Comparison Bar Chart

### Mô tả

Biểu đồ cột (Bar Chart) so sánh Total Spending giữa các tuần trong một tháng. Mỗi cột đại diện một tuần, mỗi cột một màu riêng biệt (khác bảng màu của CMP-017).

### Sử dụng tại

- Financial Report — Weekly Spending Comparison (chỉ khi Time Filter = This Month).

### Props / Data đầu vào

- Danh sách tuần trong tháng, mỗi tuần gồm: nhãn (Tuần 1, Tuần 2, ...), Total Spending, màu.

### Trạng thái

- Có dữ liệu: hiển thị cột cho mọi tuần trong tháng (kể cả tuần Total Spending = 0, hiển thị cột chiều cao tối thiểu).
- Không áp dụng (Time Filter = This Week): component không được render.

# End of Document
