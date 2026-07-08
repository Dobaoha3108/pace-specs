# 05. SCREEN MAP

Version: 1.0 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Purpose

Screen Map định nghĩa kiến trúc điều hướng (Navigation Architecture) của ứng dụng PACE.

Tài liệu này mô tả:

- Danh sách màn hình của hệ thống.
- Quan hệ giữa các màn hình.
- Navigation Flow.
- User Journey.
- Entry Point và Exit Point của từng tính năng.
- Điều kiện điều hướng giữa các màn hình.
- Quy tắc điều hướng trong toàn bộ ứng dụng.

Screen Map là tài liệu tham chiếu cho:

- UX/UI Design
- Feature Specification
- Front-end Development
- AI Coding Agent

Screen Map không mô tả giao diện chi tiết của từng màn hình.

---

# 2. Screen Map Principles

## SMP-001

Dashboard là màn hình trung tâm của toàn bộ ứng dụng.

Sau khi User hoàn thành Onboarding, mọi hành động chính đều bắt đầu từ Dashboard.

Dashboard không phải màn hình báo cáo hay biểu đồ.

Dashboard là nơi hiển thị nhanh tình trạng tài chính hiện tại của User và là Navigation Hub của toàn bộ ứng dụng.

---

## SMP-002

Một tính năng chỉ có một Entry Point chính.

Ví dụ:

- Saving Goal được truy cập từ Saving Goal Card.
- Reward Marketplace được truy cập từ Bottom Navigation.
- Notification được truy cập từ Notification Button.
- Profile được truy cập từ Profile Button.

Không tạo nhiều Entry Point cho cùng một chức năng nếu không có nhu cầu nghiệp vụ.

---

## SMP-003

Bottom Navigation chỉ chứa các tính năng được sử dụng thường xuyên.

Các màn hình cấu hình hoặc quản trị không được đặt trong Bottom Navigation.

Bottom Navigation bao gồm:

- Home
- Report
- Add Expense
- Reward
- Pig Pig

---

## SMP-004

Dashboard chỉ hiển thị dữ liệu tổng hợp.

Dashboard không thay thế chức năng của Report.

Dashboard chỉ hiển thị Snapshot của dữ liệu.

Khi User cần xem chi tiết sẽ được điều hướng tới màn hình tương ứng.

---

## SMP-005

Một Action không phải là một Screen.

Ví dụ:

- Deposit
- Withdraw
- Edit Saving Goal
- Cancel Saving Goal

được thực hiện bên trong Saving Goal Detail.

Không tạo thành các màn hình độc lập.

---

## SMP-006

Sau khi hoàn thành một thao tác, User luôn được điều hướng về màn hình gần nhất trong cùng Flow.

Ví dụ:

Expense Detail

↓

Edit Expense

↓

Save

↓

Expense Detail

Không tự động quay về Dashboard nếu không cần thiết.

---

# 3. Navigation Structure

PACE sử dụng Bottom Navigation gồm năm chức năng chính.

```
Home      Report      +      Reward      Pig Pig
```

---

## Home

Home mở Dashboard.

Dashboard hiển thị toàn bộ thông tin tài chính quan trọng nhất của User.

Dashboard bao gồm:

- Greeting
- Remaining Budget
- Remaining Daily Budget
- Add Expense
- Saving Goal
- Budget Streak
- Weekly Spending Snapshot
- Recent Expense
- Pig Pig Insight Banner

---

## Report

Report mở màn hình Financial Report.

Financial Report hiển thị:

- Weekly Report
- Monthly Report
- Expense Analytics
- Saving Goal Progress
- Transaction History

Budget Streak không hiển thị trong Report.

---

## +

Quick Action.

Luôn mở màn hình Add Expense.

Sau khi tạo Expense thành công.

↓

Quay về Dashboard.

---

## Reward

Mở Reward Marketplace.

Reward Marketplace hiển thị:

- Pig Coin Balance
- Voucher List
- Voucher Detail
- Voucher History

Trong MVP chỉ hỗ trợ Voucher.

---

## Pig Pig

Mở màn hình Pig Pig Chat.

Pig Pig bao gồm:

- AI Chat
- Conversation History
- Financial Advice
- App Guidance

Pig Pig không hiển thị thành một Card lớn trên Dashboard.

Dashboard chỉ hiển thị Pig Pig Insight Banner.

---

Notification và Profile không nằm trong Bottom Navigation.

Hai chức năng này được truy cập thông qua Dashboard Header.

---

# 4. User Journey

## First-time User

```
Splash

↓

Onboarding

↓

Financial Setup

↓

(Optional) Create Saving Goal

↓

Dashboard
```

Nếu User bỏ qua bước tạo Saving Goal trong Onboarding.

↓

Dashboard sẽ hiển thị Saving Goal Card ở trạng thái Empty.

↓

User có thể tạo Saving Goal đầu tiên trực tiếp từ Dashboard.

---

## Returning User

```
Splash

↓

Dashboard
```

---

## Daily Usage Journey

```
Dashboard

↓

Add Expense

↓

Dashboard Updated

↓

View Report

↓

Receive Pig Pig Insight

↓

Continue Daily Usage
```

---

## Saving Goal Journey

```
Dashboard

↓

Saving Goal Card

↓

Saving Goal List

↓

Saving Goal Detail

↓

Deposit

Withdraw

Edit

Cancel

↓

Saving Goal Detail
```

---

## Reward Journey

```
Dashboard

↓

Reward Marketplace

↓

Voucher Detail

↓

Redeem Voucher

↓

Voucher History
```

---

## Pig Pig Journey

```
Dashboard

↓

Pig Pig

↓

Conversation

↓

Conversation History
```

---

# 5. Screen Hierarchy

```
App Launch

│

├── Splash

│

├── Onboarding

│

└── Dashboard

      │

      ├── Header

      │      ├── Notification Button

      │      └── Profile Button

      │

      ├── Budget Summary Card

      │

      ├── Add Expense

      │

      ├── Saving Goal Card

      │      ├── Saving Goal List

      │      ├── Saving Goal Detail

      │      ├── Saving Goal History

      │      └── Create Saving Goal

      │

      ├── Budget Streak Card

      │

      ├── Weekly Spending Snapshot

      │

      ├── Recent Expense

      │

      └── Pig Pig Insight Banner
```

---

# 6. Screen Inventory

Screen Inventory định nghĩa toàn bộ các màn hình thuộc phạm vi MVP.

Mỗi Screen chỉ chịu trách nhiệm cho một mục tiêu nghiệp vụ chính.

---

## 6.1 Entry Screens

| ID | Screen | Purpose |
|-----|----------------------|-------------------------------------------|
| SCR-001 | Splash | Khởi tạo ứng dụng |
| SCR-002 | Onboarding | Thu thập thông tin tài chính ban đầu |

---

## 6.2 Main Screen

| ID | Screen | Purpose |
|-----|----------------------|-------------------------------------------|
| SCR-003 | Dashboard | Trung tâm điều hướng và hiển thị thông tin tài chính |

---

## 6.3 Expense Module

| ID | Screen | Purpose |
|-----|----------------------|-------------------------------------------|
| SCR-004 | Expense History | Danh sách Expense |
| SCR-005 | Add Expense | Tạo Expense |
| SCR-006 | Expense Detail | Chi tiết Expense |
| SCR-007 | Edit Expense | Chỉnh sửa Expense |

---

## 6.4 Saving Goal Module

| ID | Screen | Purpose |
|-----|----------------------|-------------------------------------------|
| SCR-008 | Saving Goal List | Danh sách Saving Goal |
| SCR-009 | Saving Goal Detail | Quản lý Saving Goal |
| SCR-010 | Create Saving Goal | Tạo Saving Goal |
| SCR-011 | Saving Goal History | Lịch sử Saving Goal Completed và Cancelled |

---

## 6.5 Report Module

| ID | Screen | Purpose |
|-----|----------------------|-------------------------------------------|
| SCR-012 | Financial Report | Báo cáo tài chính |

---

## 6.6 Reward Module

| ID | Screen | Purpose |
|-----|----------------------|-------------------------------------------|
| SCR-013 | Reward Marketplace | Danh sách Voucher |
| SCR-014 | Voucher Detail | Chi tiết Voucher |
| SCR-015 | Voucher History | Lịch sử Voucher đã đổi |

---

## 6.7 Pig Pig Module

| ID | Screen | Purpose |
|-----|----------------------|-------------------------------------------|
| SCR-016 | Pig Pig Chat | Chat với Pig Pig |
| SCR-017 | Conversation History | Lịch sử hội thoại |

---

## 6.8 Notification Module

| ID | Screen | Purpose |
|-----|----------------------|-------------------------------------------|
| SCR-018 | Notification Center | Danh sách Notification |

---

## 6.9 Profile Module

| ID | Screen | Purpose |
|-----|----------------------|-------------------------------------------|
| SCR-019 | Profile | Thông tin User |
| SCR-020 | Budget Settings | Cài đặt Budget |
| SCR-021 | Category Management | Quản lý Category |
| SCR-022 | App Settings | Cài đặt ứng dụng |
| SCR-023 | About | Giới thiệu ứng dụng |

---

# 7. Screen Groups

Các màn hình được chia thành các nhóm nghiệp vụ.

---

## Entry

- Splash
- Onboarding

---

## Core Finance

- Dashboard
- Expense History
- Add Expense
- Expense Detail
- Edit Expense

---

## Saving Goal

- Saving Goal List
- Saving Goal Detail
- Create Saving Goal
- Saving Goal History

---

## Financial Report

- Financial Report

---

## Reward

- Reward Marketplace
- Voucher Detail
- Voucher History

---

## AI

- Pig Pig Chat
- Conversation History

---

## Utility

- Notification Center
- Profile
- Budget Settings
- Category Management
- App Settings
- About

---

# 8. Dashboard Navigation

Dashboard là màn hình trung tâm của ứng dụng.

Dashboard được chia thành các Section độc lập.

---

## Header

Hiển thị:

- Pig Avatar
- Greeting
- Notification Button
- Profile Button

### Navigation

Notification Button

↓

Notification Center

---

Profile Button

↓

Profile

---

## Budget Summary Card

Hiển thị:

- Remaining Budget
- Remaining Daily Budget

Card này chỉ hiển thị dữ liệu.

Không có chức năng điều hướng.

---

## Quick Action

Hiển thị nút:

Add Expense

### Navigation

↓

Add Expense

---

## Saving Goal Card

Saving Goal Card là Entry Point chính của toàn bộ Saving Goal Module.

Card hiển thị:

- Active Saving Goal
- Progress
- Current Amount
- Target Amount
- Status

---

Nếu User chưa có Saving Goal.

↓

Hiển thị Empty State.

↓

Hiển thị nút:

Create Saving Goal

↓

Đi tới

Create Saving Goal

---

Nếu User đã có Saving Goal.

↓

Click Goal

↓

Saving Goal Detail

---

Click

View All

↓

Saving Goal List

---

Trong Saving Goal List.

↓

User có thể mở

Saving Goal History

để xem:

- Completed Goal
- Cancelled Goal

---

## Budget Streak Card

Hiển thị:

- Current Streak
- Longest Streak
- Progress tới mốc Reward tiếp theo

Ví dụ:

```text
🔥

Bạn đã duy trì

3 ngày

████░░░

3 / 7 ngày

+5 Pig Coin
```

Card này chỉ hiển thị dữ liệu.

Không có chức năng điều hướng.

---

## Weekly Spending Snapshot

Hiển thị:

- Tổng chi tuần này
- So sánh tuần trước

Ví dụ:

```text
Tuần này

1.200.000đ

↓

15%

so với tuần trước
```

### Navigation

Click Card

↓

Financial Report

---

## Recent Expense

Hiển thị Expense mới nhất.

Ví dụ:

- Cafe
- Grab
- Shopping

---

Click Expense

↓

Expense Detail

---

Click

View All

↓

Expense History

---

## Pig Pig Insight Banner

Hiển thị Insight mới nhất.

Ví dụ:

"Hôm nay bạn đang chi tiêu đúng kế hoạch."

Banner chỉ hiển thị một Insight.

Không hiển thị Chat.

---

### Navigation

Click Banner

↓

Pig Pig Chat

---

# 9. Entry Points

| Feature | Entry Point |
|--------------------|------------------------------|
| Expense | Add Expense Button |
| Saving Goal | Saving Goal Card |
| Financial Report | Bottom Navigation / Weekly Spending Card |
| Reward Marketplace | Bottom Navigation |
| Pig Pig | Bottom Navigation / Insight Banner |
| Notification | Notification Button |
| Profile | Profile Button |

---

# 10. Exit Points

| Current Screen | Exit Destination |
|-------------------------|------------------------|
| Add Expense | Dashboard |
| Edit Expense | Expense Detail |
| Create Saving Goal | Saving Goal Detail |
| Voucher Detail | Reward Marketplace |
| Pig Pig Chat | Dashboard |
| Budget Settings | Profile |
| Category Management | Profile |
| App Settings | Profile |

---

# 11. Screen Dependencies

Mỗi màn hình chỉ được hiển thị khi dữ liệu đầu vào cần thiết đã sẵn sàng.

---

## Dashboard

Depends On

- User
- Budget
- Expense
- Saving Goal
- Budget Streak
- Pig Coin Wallet
- Pig Pig Insight

---

## Expense History

Depends On

- Expense

---

## Expense Detail

Depends On

- Expense

---

## Add Expense

Depends On

- Budget
- Category

---

## Edit Expense

Depends On

- Expense
- Category

---

## Saving Goal List

Depends On

- Saving Goal

---

## Saving Goal Detail

Depends On

- Saving Goal
- Budget

---

## Create Saving Goal

Depends On

- Budget

---

## Saving Goal History

Depends On

- Saving Goal

Hiển thị:

- Completed Saving Goal
- Cancelled Saving Goal

---

## Financial Report

Depends On

- Budget
- Expense
- Saving Goal

---

## Reward Marketplace

Depends On

- Reward
- Pig Coin Wallet

---

## Voucher Detail

Depends On

- Reward

---

## Voucher History

Depends On

- UserReward

---

## Pig Pig Chat

Depends On

- Budget
- Expense
- Saving Goal
- Financial Report
- Chat History

---

## Notification Center

Depends On

- Notification

---

## Profile

Depends On

- User

---

## Budget Settings

Depends On

- User
- Budget

---

## Category Management

Depends On

- Category

---

# 12. Navigation Rules

## NAV-001

Dashboard là màn hình trung tâm sau khi User hoàn thành Onboarding.

---

## NAV-002

Bottom Navigation luôn hiển thị trong toàn bộ Main App.

---

## NAV-003

Bottom Navigation chỉ bao gồm:

- Home
- Report
- Add Expense
- Reward
- Pig Pig

---

## NAV-004

Saving Goal chỉ được truy cập thông qua Saving Goal Card trên Dashboard.

Không đặt Saving Goal trong Bottom Navigation.

---

## NAV-005

Notification chỉ được truy cập thông qua Notification Button trên Dashboard Header.

---

## NAV-006

Profile chỉ được truy cập thông qua Profile Button trên Dashboard Header.

---

## NAV-007

Deposit

Withdraw

Edit Saving Goal

Cancel Saving Goal

đều là Action trong Saving Goal Detail.

Không tạo thành Screen riêng.

---

## NAV-008

Sau khi User hoàn thành một thao tác.

Hệ thống luôn điều hướng về Screen gần nhất trong cùng Flow.

Không tự động quay về Dashboard nếu không cần thiết.

---

## NAV-009

Saving Goal History chỉ được truy cập từ Saving Goal List.

Không cho phép mở trực tiếp từ Dashboard.

---

## NAV-010

Notification có thể điều hướng bằng Deep Link.

Ví dụ:

Saving Goal Cancelled Notification

↓

Saving Goal History

↓

Saving Goal Detail

---

Weekly Financial Report Notification

↓

Financial Report

---

## NAV-011

Pig Pig Insight Banner trên Dashboard luôn mở Pig Pig Chat.

Không mở trực tiếp Conversation History.

---

# 13. Route Naming Convention

Toàn bộ Route sử dụng định dạng:

Module / Screen

---

## Entry

- /splash
- /onboarding

---

## Dashboard

- /dashboard

---

## Expense

- /expense
- /expense/add
- /expense/detail
- /expense/edit

---

## Saving Goal

- /saving-goal
- /saving-goal/create
- /saving-goal/detail
- /saving-goal/history

---

## Report

- /report

---

## Reward

- /reward
- /reward/detail
- /reward/history

---

## Pig Pig

- /pig-pig
- /pig-pig/history

---

## Notification

- /notification

---

## Profile

- /profile
- /profile/budget
- /profile/category
- /profile/settings
- /profile/about

---

# 14. Navigation Matrix

| From | Action | To |
|------|--------|----|
| Splash | Continue | Onboarding / Dashboard |
| Onboarding | Finish | Dashboard |
| Dashboard | Add Expense | Add Expense |
| Dashboard | Saving Goal Card | Saving Goal Detail |
| Dashboard | View All Saving Goals | Saving Goal List |
| Dashboard | Weekly Spending Snapshot | Financial Report |
| Dashboard | Recent Expense | Expense Detail |
| Dashboard | Pig Pig Insight Banner | Pig Pig Chat |
| Dashboard | Notification Button | Notification Center |
| Dashboard | Profile Button | Profile |
| Saving Goal List | Select Goal | Saving Goal Detail |
| Saving Goal List | Create Goal | Create Saving Goal |
| Saving Goal List | Saving Goal History | Saving Goal History |
| Expense History | Select Expense | Expense Detail |
| Expense Detail | Edit | Edit Expense |
| Reward Marketplace | Select Voucher | Voucher Detail |
| Notification | Weekly Report Notification | Financial Report |
| Notification | Saving Goal Cancelled Notification | Saving Goal History |

---

# 15. Future Expansion

Kiến trúc Screen Map được thiết kế để có thể mở rộng trong các phiên bản tiếp theo.

Các Module dự kiến có thể bổ sung:

- Premium Subscription
- Family Budget
- Shared Saving Goal
- Bill Reminder
- Export Report
- Referral Program
- Reward Campaign
- AI Financial Coach

Các Module trên không thuộc phạm vi MVP.

---

# 16. Feature Specification Mapping

Mỗi Module trong Screen Map sẽ tương ứng với một hoặc nhiều Feature Specification.

| Module | Feature Specification |
|---------|----------------------|
| Splash | SPLASH |
| Onboarding | ONBOARDING |
| Dashboard | DASHBOARD |
| Expense | EXPENSE |
| Saving Goal | SAVING_GOAL |
| Financial Report | REPORT |
| Reward Marketplace | REWARD |
| Pig Pig | PIG_PIG |
| Notification | NOTIFICATION |
| Profile | PROFILE |

---

# 17. Screen Map Summary

PACE sử dụng mô hình điều hướng Hub-and-Spoke.

Dashboard đóng vai trò là Navigation Hub.

Các Module nghiệp vụ được tổ chức độc lập:

- Expense
- Saving Goal
- Financial Report
- Reward Marketplace
- Pig Pig AI
- Notification
- Profile

Mỗi Module có:

- Entry Point rõ ràng.
- Trách nhiệm nghiệp vụ riêng.
- Điều hướng độc lập.
- Có thể mở rộng mà không ảnh hưởng đến các Module khác.

Kiến trúc này giúp:

- Feature Specification dễ xây dựng.
- AI Coding Agent dễ sinh mã nguồn.
- Dễ mở rộng trong các phiên bản tiếp theo.
- Đảm bảo tính nhất quán của toàn bộ hệ thống.

---

# End of Document
