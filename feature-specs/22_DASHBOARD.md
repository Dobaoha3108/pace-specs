# 09. DASHBOARD

Version: 1.0 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Purpose

Dashboard là màn hình trung tâm của ứng dụng PACE.

Đây là màn hình đầu tiên User nhìn thấy sau khi hoàn thành Onboarding hoặc mở lại ứng dụng.

Dashboard giúp User nhanh chóng nắm được tình hình tài chính hiện tại mà không cần truy cập vào từng Module riêng biệt.

Dashboard không thực hiện Business Logic.

Dashboard chỉ hiển thị dữ liệu và điều hướng tới các Feature tương ứng.

---

# 2. Business Objective

Dashboard giúp User trả lời ngay các câu hỏi sau:

- Tôi còn bao nhiêu tiền để chi tiêu?
- Hôm nay tôi nên chi tối đa bao nhiêu?
- Tôi đang tiết kiệm được bao nhiêu?
- Tôi đã duy trì Budget Streak được bao nhiêu ngày?
- Chi tiêu tuần này có vượt kế hoạch không?
- Pig Pig có lời khuyên gì mới?

---

# 3. Screen Overview

Feature Name

Dashboard

---

Business Goal

Hiển thị toàn bộ thông tin tài chính quan trọng của User trên một màn hình duy nhất.

---

Entry Point

- Splash
- Onboarding
- App Resume

---

Exit Point

- Report
- Add Expense
- Saving Goal
- Reward Marketplace
- Pig Pig
- Notification
- Profile

---

# 4. Screen Type

Main Screen

---

## Navigation Context

Main Navigation Screen

Bottom Navigation luôn hiển thị trên màn hình này.

---

# 5. Used Components

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-005 Budget Summary Card
- CMP-006 Saving Goal Card
- CMP-007 Budget Streak Card
- CMP-008 Statistic Card
- CMP-010 Pig Pig Insight Banner

---

# 6. Preconditions

- User đã hoàn thành Onboarding.
- Budget đã được khởi tạo.
- Dashboard Summary đã được tạo.

Saving Goal có thể tồn tại hoặc không.

---

# 7. User Flow

```
Open Dashboard

↓

Load Dashboard Summary

↓

Load Budget Summary

↓

Load Saving Goal

↓

Load Budget Streak

↓

Load Weekly Spending Snapshot

↓

Load Pig Pig Insight

↓

Dashboard Ready
```

---

# 8. Screen Content

Dashboard bao gồm các khu vực sau.

---

## Section 1

### App Header

Hiển thị:

- Greeting
- User Avatar
- Notification Badge

---

## Section 2

### Budget Summary

Hiển thị:

- Remaining Budget
- Remaining Daily Budget
- Budget Status

---

## Section 3

### Add Expense

Hiển thị:

Primary Button

↓

Add Expense

---

## Section 4

### Saving Goal

Hiển thị:

- Saving Goal Card

Nếu User chưa có Saving Goal.

↓

Hiển thị Empty State.

↓

Button:

Create Saving Goal

---

Nếu User có nhiều Saving Goal.

↓

Dashboard chỉ hiển thị các Saving Goal đang ở trạng thái Active.

↓

Hiển thị nút:

View All

---

## Section 5

### Budget Streak

Hiển thị:

- Current Streak
- Progress to 7-day Reward
- Pig Coin Reward Hint

---

## Section 6

### Weekly Spending Snapshot

Hiển thị:

Statistic Card.

Bao gồm:

- Total Spending This Week.
- Weekly Budget Usage.

Ví dụ:

"Bạn đã sử dụng 42% ngân sách tuần."

Dashboard chỉ hiển thị snapshot ngắn gọn để User ra quyết định nhanh.
Không hiển thị biểu đồ hoặc phân tích chi tiết.

Các biểu đồ chi tiết và xu hướng chi tiêu được hiển thị trong Financial Report.

---

## Section 7

## Section 7

### Pig Pig Insight

Hiển thị Banner của Pig Pig.

Banner chỉ hiển thị Insight mới nhất.

Nội dung tối đa hai dòng.

Ví dụ:

"Bạn đang chi tiêu đúng kế hoạch."

hoặc

"Bạn đã vượt ngân sách hôm nay 120.000đ."

Bên dưới Banner hiển thị Button:

Chat với Pig Pig

User có thể mở Pig Pig Chat bằng một trong hai cách:

- Click Button "Chat với Pig Pig".
- Chọn Pig Pig trên Bottom Navigation.

Dashboard không hiển thị lịch sử Insight.

---

## Section 8

### Bottom Navigation

Hiển thị:

- Dashboard
- Report
- Add Expense
- Reward
- Pig Pig

Dashboard luôn được đánh dấu là Tab đang được chọn.

---

# 9. User Actions

User có thể thực hiện các hành động sau.

| Action | Destination |
|----------|-------------|
| Click Notification | Notification Center |
| Click Profile | Profile |
| Click Add Expense | Add Expense |
| Click Saving Goal Card | Saving Goal Detail |
| Click View All | Saving Goal List |
| Click Pig Pig Insight | Pig Pig Chat |
| Click Report | Financial Report |
| Click Reward | Reward Marketplace |
| Click Pig Pig | Pig Pig Chat |

---

# 10. System Response

Khi Dashboard được mở.

↓

System thực hiện theo thứ tự.

Step 1

Load Dashboard Summary.

↓

Step 2

Load Budget Summary.

↓

Step 3

Load Active Saving Goal.

↓

Step 4

Load Budget Streak.

↓

Step 5

Load Weekly Spending Snapshot.

↓

Step 6

Load Pig Pig Insight.

↓

Step 7

Render Dashboard.

---

# 11. Navigation

## Notification

User click Notification Icon.

↓

Open Notification Center.

---

## Profile

User click Avatar.

↓

Open Profile.

---

## Add Expense

User click Add Expense.

↓

Open Add Expense.

---

## Saving Goal

User click Saving Goal Card.

↓

Open Saving Goal Detail.

---

User click View All.

↓

Open Saving Goal List.

---

Nếu Dashboard đang hiển thị Empty State.

↓

User click Create Saving Goal.

↓

Open Create Saving Goal.

---

## Budget Streak

Component chỉ hiển thị thông tin.

Không có Navigation.

---

## Weekly Spending Snapshot

User click Statistic Card.

↓

Open Financial Report.

---

## Pig Pig Insight

## Pig Pig Insight

Banner chỉ hiển thị Insight.

Không thực hiện Navigation.

---

User click:

Chat với Pig Pig

↓

Open Pig Pig Chat.

---

User cũng có thể mở Pig Pig Chat thông qua Bottom Navigation.

---

## Bottom Navigation

Dashboard

↓

Dashboard

(Current Screen)

---

Report

↓

Financial Report

---

Reward

↓

Reward Marketplace

---

Pig Pig

↓

Pig Pig Chat

---

Add Expense

↓

Add Expense

---

# 12. Display Rules

## App Header

Luôn hiển thị.

Bao gồm:

- Greeting.
- User Avatar.
- Notification Badge.

---

## Budget Summary

Luôn hiển thị.

Hiển thị:

- Remaining Budget.
- Remaining Daily Budget.
- Budget Status.

Nếu Budget chưa được tạo.

↓

Không cho phép mở Dashboard.

↓

Điều hướng về Onboarding.

---

## Add Expense

Luôn hiển thị.

Primary Action của Dashboard.

---

## Saving Goal

Nếu User chưa có Saving Goal.

↓

Hiển thị Empty State.

↓

Hiển thị Button:

Create Saving Goal.

---

Nếu User có Saving Goal.

↓

Chỉ hiển thị Saving Goal ở trạng thái Active.

---

Saving Goal ở trạng thái:

- Completed.
- Cancelled.

Không hiển thị trên Dashboard.

Chỉ hiển thị trong Saving Goal History.

---

Saving Goal ở trạng thái Cancelling.

↓

Hiển thị Badge:

Cancelling.

↓

Không cho phép:

- Deposit.
- Withdraw.
- Update.

↓

Hiển thị thời gian còn lại trước khi hoàn tất huỷ.

---

## Budget Streak

Luôn hiển thị.

Bao gồm:

- Current Streak.
- Progress to 7-day Reward.
- Pig Coin Reward Hint.

---

## Weekly Spending Snapshot

Hiển thị:

- Total Spending This Week.
- Spending Trend.
- Comparison với tuần trước.

Nếu chưa có dữ liệu.

↓

Hiển thị Empty State.

---

## Pig Pig Insight

Dashboard chỉ hiển thị:

- Insight mới nhất.
- Tối đa hai dòng nội dung.

Banner luôn hiển thị Button:

Chat với Pig Pig.

Banner không hiển thị lịch sử Insight.

Nếu chưa có Insight.

↓

Hiển thị:

"Hôm nay Pig Pig chưa có gợi ý mới."

---

## Bottom Navigation

Luôn hiển thị.

Dashboard luôn ở trạng thái Selected.

---

# 13. Validation

Dashboard không có User Input.

Không thực hiện Validation.

---

# 14. Screen States

## Loading

Hiển thị:

CMP-014 Loading State.

---

## Normal

Hiển thị đầy đủ các Component.

---

## Empty Saving Goal

Hiển thị:

- Empty Illustration.
- Create Saving Goal Button.

---

## Empty Weekly Report

Hiển thị:

- Empty Report Illustration.
- Description.

---

## Empty Insight

Hiển thị:

"Hôm nay Pig Pig chưa có gợi ý mới."

---

## Error

Hiển thị:

"Không thể tải Dashboard."

↓

Button:

Retry.

---

# 15. Error Handling

## Dashboard Summary Load Failed

Hiển thị:

"Không thể tải Dashboard."

↓

Retry.

---

## Budget Load Failed

Hiển thị:

"Không thể tải Budget."

↓

Retry.

---

## Saving Goal Load Failed

Saving Goal Card chuyển sang Error State.

Các Component khác vẫn hiển thị bình thường.

---

## Budget Streak Load Failed

Budget Streak Card chuyển sang Error State.

Không ảnh hưởng các Component khác.

---

## Weekly Spending Load Failed

Statistic Card chuyển sang Error State.

Không ảnh hưởng Dashboard.

---

## Pig Pig Insight Load Failed

Insight Banner chuyển sang Error State.

Dashboard vẫn hoạt động bình thường.

---

# 16. Related Specification

## Domain Model

- User
- Budget
- Saving Goal
- Budget Streak
- Expense
- PigPigInsight
- DashboardSummary

---

## Business Workflow

- Expense Management
- Saving Goal Management
- Dashboard Overview

---

## System Workflow

- Budget Processing
- Saving Goal Processing
- Expense Processing
- Dashboard Synchronization

---

## Data Model

- Budget
- SavingGoal
- BudgetStreak
- Expense
- DashboardSummary
- PigPigInsight

---

## Business Rules

- BGT-001
- BGT-002
- BGT-003

- SVG-001
- SVG-008
- SVG-009
- SVG-010

- STR-001
- STR-002
- STR-003

- DSH-001
- DSH-002
- DSH-003
- DSH-004

---

## UI Components

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-005 Budget Summary Card
- CMP-006 Saving Goal Card
- CMP-007 Budget Streak Card
- CMP-008 Statistic Card
- CMP-010 Pig Pig Insight Banner

---

# 17. Acceptance Criteria

## AC-001

Sau khi User hoàn thành Onboarding.

↓

Dashboard được mở thành công.

---

## AC-002

Dashboard luôn hiển thị:

- App Header
- Budget Summary
- Add Expense
- Saving Goal
- Budget Streak
- Weekly Spending Snapshot
- Pig Pig Insight
- Bottom Navigation

---

## AC-003

Budget Summary luôn hiển thị:

- Remaining Budget.
- Remaining Daily Budget.
- Budget Status.

---

## AC-004

Nếu User chưa có Saving Goal.

↓

Dashboard hiển thị Empty State.

↓

Hiển thị nút:

Create Saving Goal.

---

## AC-005

Nếu User có Saving Goal.

↓

Dashboard chỉ hiển thị Saving Goal ở trạng thái Active.

Saving Goal Completed hoặc Cancelled không được hiển thị trên Dashboard.

---

## AC-006

Nếu Saving Goal đang ở trạng thái Cancelling.

↓

Dashboard hiển thị:

- Badge "Cancelling".
- Countdown thời gian còn lại.

↓

Không cho phép:

- Deposit.
- Withdraw.
- Update.

---

## AC-007

Budget Streak luôn hiển thị:

- Current Streak.
- Progress tới mốc nhận Pig Coin.
- Pig Coin Reward Hint.

Không hiển thị Longest Streak.

---

## AC-008

## AC-008

Weekly Spending Snapshot luôn hiển thị:

- Total Spending This Week.
- Weekly Budget Usage.

---

## AC-009

Pig Pig Banner chỉ hiển thị:

- Insight mới nhất.
- Tối đa hai dòng nội dung.

Banner luôn hiển thị Button:

"Chat với Pig Pig".
---

## AC-010

Bottom Navigation luôn hiển thị.

Dashboard luôn là Tab đang được chọn.

---

## AC-011

Click Add Expense.

↓

Mở Add Expense.

---

## AC-012

Click Saving Goal Card.

↓

Mở Saving Goal Detail.

---

## AC-013

Click View All.

↓

Mở Saving Goal List.

---

## AC-014

Click Weekly Spending Snapshot.

↓

Mở Financial Report.

---

## AC-015

## AC-015

User có thể mở Pig Pig Chat bằng:

- Button "Chat với Pig Pig" trên Dashboard.
- Bottom Navigation.

---

## AC-016

Nếu một Component tải thất bại.

↓

Chỉ Component đó chuyển sang Error State.

↓

Các Component còn lại vẫn hoạt động bình thường.

---

## AC-017

Dashboard không thực hiện Business Logic.

Dashboard chỉ:

- Hiển thị dữ liệu.
- Điều hướng User.
- Đồng bộ trạng thái hiển thị.

---

# 18. Open Questions

Hiện tại MVP đã thống nhất:

- Dashboard chỉ hiển thị dữ liệu tổng quan.
- Không hiển thị lịch sử Expense.
- Chỉ hiển thị Saving Goal ở trạng thái Active.
- Budget Streak chỉ hiển thị Current Streak.
- Pig Pig chỉ hiển thị Insight mới nhất.

Các nội dung sau chưa thuộc phạm vi MVP:

- Dashboard Widget Customization.
- Drag & Drop Dashboard.
- Dashboard Theme.
- Dashboard Shortcut.

---

# 19. Future Enhancements

Các cải tiến có thể bổ sung trong các phiên bản tiếp theo:

- Cho phép User tùy chỉnh thứ tự Widget.
- Widget Pig Coin Balance.
- Widget Voucher Recommendation.
- Dashboard Quick Statistics.
- Dashboard Personalization.
- AI Dashboard Summary.

Các cải tiến trên không ảnh hưởng tới kiến trúc hiện tại của Dashboard.

---

# End of Document
