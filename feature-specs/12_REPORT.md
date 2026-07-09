# 12. REPORT

Version: 1.1 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Purpose

Financial Report là Feature giúp User xem và hiểu tình hình chi tiêu của mình.

Report không tạo dữ liệu tài chính mới.

Report chỉ tổng hợp và hiển thị dữ liệu từ:

- Budget.
- Expense.
- Expense Category.

Financial Report không hiển thị Budget Streak.

Financial Report không trực tiếp quản lý Saving Goal, Reward Marketplace hoặc Pig Pig Chat.

---

# 2. Business Objective

Financial Report giúp User:

- Xem tổng quan chi tiêu.
- Hiểu tiền đã được chi vào đâu.
- Theo dõi mức sử dụng Budget.
- Xem lịch sử giao dịch gần nhất.
- Truy cập Expense History đầy đủ.
- Phát hiện xu hướng chi tiêu theo tuần và theo tháng.

---

# 3. Business Responsibility

Financial Report chịu trách nhiệm:

- Hiển thị Spending Overview.
- Hiển thị Category Analysis.
- Hiển thị Transaction History Preview.
- Điều hướng tới Expense History.
- Điều hướng tới Expense Detail.
- Điều hướng tới Edit Expense.
- Hỗ trợ chuyển đổi giữa Weekly Report và Monthly Report.
- Hỗ trợ Filter theo Category.

Financial Report không chịu trách nhiệm:

- Tạo Expense.
- Chỉnh sửa Expense trực tiếp trên màn hình Report.
- Quản lý Saving Goal.
- Hiển thị Budget Streak.
- Đổi Voucher.
- Chat với Pig Pig.

---

# 4. Screen Overview

Feature Name

Financial Report

---

Business Goal

Giúp User hiểu tình hình chi tiêu dựa trên dữ liệu Budget và Expense.

---

Entry Point

- Bottom Navigation → Report.
- Dashboard → Weekly Spending Snapshot.
- Notification → Financial Report.

---

Exit Point

- Expense History.
- Expense Detail.
- Dashboard.
- Bottom Navigation Modules.

---

# 5. Screen Type

Main Navigation Screen

---

## Navigation Context

Financial Report là một màn hình chính trong Bottom Navigation.

Bottom Navigation luôn hiển thị trên màn hình Financial Report.

Tab Report luôn ở trạng thái Selected khi User đang ở màn hình này.

---

# 6. Used Components

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-008 Statistic Card
- CMP-013 Empty State
- CMP-014 Loading State

---

# 7. Preconditions

- User đã hoàn thành Onboarding.
- Budget đã được khởi tạo.
- Expense có thể tồn tại hoặc chưa tồn tại.
- Expense Category đã có dữ liệu mặc định.

---

# 8. Report Sections

Financial Report bao gồm bốn section chính.

Financial Report hỗ trợ hai chế độ hiển thị:

- Weekly Report (Default).
- Monthly Report.

User có thể chuyển đổi giữa hai chế độ bất kỳ lúc nào.

---

## Section 1

### Spending Overview

Hiển thị tổng quan chi tiêu theo khoảng thời gian được chọn.

Bao gồm:

- Total Budget.
- Total Spending.
- Remaining Budget.
- Budget Usage Percentage.

Khoảng thời gian được hỗ trợ:

- This Week (Default).
- This Month.

---

## Section 2

### Category Analysis

Hiển thị phân bổ chi tiêu theo Category trong khoảng thời gian được chọn.

Bao gồm:

- Category Name.
- Total Spending by Category.
- Percentage of Total Spending.

---

## Section 3

### Transaction History Preview

Hiển thị ba Expense gần nhất trong khoảng thời gian được chọn.

Có Button:

View All

↓

Expense History.

---

## Section 4

### Summary

Nếu Time Filter = This Week.

↓

Hiển thị:

Weekly Summary.

Bao gồm:

- Total Spending This Week.
- Weekly Budget Usage.

---

Nếu Time Filter = This Month.

↓

Hiển thị:

Monthly Summary.

Bao gồm:

- Total Spending This Month.
- Monthly Budget Usage.

---

# 9. User Flow

## Open Report Flow

User mở Financial Report.

↓

System load Financial Report Data.

↓

Áp dụng Time Filter mặc định:

This Week.

↓

System tổng hợp dữ liệu từ Budget và Expense.

↓

Render Financial Report.

---

## Change Report Period

User chuyển đổi giữa:

- This Week.
- This Month.

↓

System tính toán lại dữ liệu Report theo khoảng thời gian đã chọn.

↓

Render Financial Report.

---

## Filter Category Flow

User chọn Category Filter.

↓

System lọc dữ liệu theo Category trong khoảng thời gian hiện tại.

↓

Render Financial Report.

---

## View All Transaction Flow

Financial Report

↓

Transaction History Preview

↓

View All

↓

Expense History.

---

## View Expense Detail Flow

Financial Report

↓

Transaction History Preview

↓

Select Expense

↓

Expense Detail.

---

## Edit Expense Flow

Expense Detail

↓

Edit Expense

↓

Save

↓

Financial Report tự động Refresh.

---

## Financial Report Notification Flow

User chọn Notification.

↓

Open Financial Report.

↓

Hiển thị Report theo loại Notification:

- Weekly Report.
- Monthly Report.

---

# 10. Screen Content

## Spending Overview

Hiển thị:

- Selected Report Period.
- Total Budget.
- Total Spending.
- Remaining Budget.
- Budget Usage Percentage.

---

## Category Analysis

Hiển thị:

- Category List.
- Category Spending Amount.
- Category Spending Percentage.

---

## Transaction History Preview

Hiển thị tối đa ba Expense gần nhất.

Mỗi Expense hiển thị:

- Category.
- Amount.
- Planned Date.
- Completed Date (nếu có).
- Status.

Button:

View All.

---

## Summary

Nếu Time Filter = This Week.

↓

Hiển thị:

- Total Spending This Week.
- Weekly Budget Usage.

---

Nếu Time Filter = This Month.

↓

Hiển thị:

- Total Spending This Month.
- Monthly Budget Usage.

---

## Filters

Financial Report hỗ trợ:

### Time Filter

- This Week (Default).
- This Month.

---

### Category Filter

Sử dụng Expense Category mặc định của hệ thống.

---

# 11. User Actions

User có thể:

- Xem Financial Report.
- Chuyển đổi giữa Weekly Report và Monthly Report.
- Thay đổi Category Filter.
- Xem Transaction History Preview.
- Chọn View All.
- Xem Expense Detail.
- Chỉnh sửa Expense từ Expense Detail.

---

# 12. System Response

## Open Financial Report

User mở Financial Report.

↓

System tải:

- Budget.
- Expense.
- Expense Category.

↓

Áp dụng Time Filter mặc định:

This Week.

↓

System tổng hợp dữ liệu.

↓

Hiển thị Financial Report.

---

## Change Time Filter

User chuyển đổi giữa:

- This Week.
- This Month.

↓

System tính toán lại:

- Spending Overview.
- Category Analysis.
- Transaction History Preview.
- Summary theo khoảng thời gian được chọn.

↓

Nếu Time Filter = This Week.

↓

Hiển thị Weekly Summary.

---

Nếu Time Filter = This Month.

↓

Hiển thị Monthly Summary.

---

Refresh Financial Report.

---

## Change Category Filter

User chọn Category.

↓

System lọc Expense theo Category trong khoảng thời gian hiện tại.

↓

Refresh toàn bộ Financial Report.

---

## View All Transaction

User chọn:

View All.

↓

Open Expense History.

---

## Open Expense Detail

User chọn một Expense.

↓

Open Expense Detail.

---

## Edit Expense

User chỉnh sửa Expense.

↓

Expense được cập nhật.

↓

Financial Report tự động tính toán lại dữ liệu.

↓

Refresh Report.

---

# 13. Navigation

## Bottom Navigation

User chọn:

Report.

↓

Open Financial Report.

---

## Transaction History Preview

User chọn:

View All.

↓

Open Expense History.

---

User chọn một Expense.

↓

Open Expense Detail.

---

## Expense Detail

User chọn:

Edit Expense.

↓

Open Edit Expense.

---

Sau khi Save.

↓

Quay lại Expense Detail.

↓

Financial Report được Refresh.

---

## Financial Report Notification

User chọn Notification.

↓

Open Financial Report.

↓

Nếu Notification là Weekly Report.

↓

Áp dụng Time Filter:

This Week.

---

Nếu Notification là Monthly Report.

↓

Áp dụng Time Filter:

This Month.

---

# 14. Display Rules

## Spending Overview

Luôn hiển thị:

- Total Budget.
- Total Spending.
- Remaining Budget.
- Budget Usage Percentage.

Tất cả dữ liệu được tính theo Time Filter hiện tại.

---

## Category Analysis

Hiển thị theo Category.

Mặc định sắp xếp:

Category có tổng chi tiêu cao nhất hiển thị trước.

Dữ liệu được tính theo Time Filter hiện tại.

---

## Transaction History Preview

Hiển thị tối đa:

3 Expense gần nhất trong khoảng thời gian đang được chọn.

Mặc định sắp xếp theo:

Completed Date giảm dần.

Nếu Expense chưa Completed.

↓

Sử dụng Planned Date.

---

Nếu có nhiều hơn 3 Expense.

↓

Hiển thị Button:

View All.

---

Nếu chưa có Expense.

↓

Hiển thị Empty State.

↓

Hiển thị Button:

Add Expense.

---

## Summary

Nếu Time Filter = This Week.

↓

Hiển thị:

- Total Spending This Week.
- Weekly Budget Usage.

---

Nếu Time Filter = This Month.

↓

Hiển thị:

- Total Spending This Month.
- Monthly Budget Usage.

---

## Filters

### Time Filter

Bao gồm:

- This Week (Default).
- This Month.

---

### Category Filter

Mặc định:

All Categories.

Category Filter luôn hoạt động trên Time Filter hiện tại.

Ví dụ:

- This Week + Food.
- This Week + Entertainment.
- This Month + Food.
- This Month + Shopping.

---

# 15. Validation

Financial Report không có dữ liệu nhập từ User.

Chỉ Validate:

- Time Filter.
- Category Filter.

---

Nếu Filter không có dữ liệu.

↓

Hiển thị Empty State.

---

# 16. Screen States

## Financial Report

- Loading.
- Empty.
- Normal.

---

## Transaction History Preview

- Empty.
- Normal.

---

## Category Analysis

- Empty.
- Normal.

---

## Summary

- Empty.
- Normal.

---

# 17. Error Handling

## Report Load Failed

Không thể tải Financial Report.

↓

Hiển thị:

"Không thể tải báo cáo tài chính."

↓

Button:

"Thử lại"

---

## Filter Failed

Không thể áp dụng Filter.

↓

Hiển thị:

"Không thể cập nhật dữ liệu."

↓

Button:

"Thử lại"

---

## Expense Load Failed

Không thể tải Transaction History.

↓

Hiển thị:

"Không thể tải lịch sử giao dịch."

↓

Button:

"Thử lại"

---

## Expense Detail Failed

Không thể mở Expense Detail.

↓

Hiển thị:

"Không thể tải chi tiết khoản chi."

↓

Button:

"Thử lại"

---

# 18. Related Specification

## Domain Model

- Budget
- Expense
- ExpenseCategory
- DashboardSummary

---

## Business Workflow

- Financial Reporting

---

## System Workflow

- Financial Report Processing
- Dashboard Synchronization

---

## Data Model

- Budget
- Expense
- ExpenseCategory
- DashboardSummary

---

## Business Rules

- EXP-001
- EXP-002
- EXP-003
- EXP-004

- BGT-001
- BGT-002
- BGT-003

---

## UI Components

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-008 Statistic Card
- CMP-013 Empty State
- CMP-014 Loading State

---

# 19. Acceptance Criteria

## AC-001

User có thể mở Financial Report từ:

- Bottom Navigation.
- Dashboard Weekly Spending Snapshot.
- Financial Report Notification.

---

## AC-002

Financial Report luôn hiển thị:

- Spending Overview.
- Category Analysis.
- Transaction History Preview.
- Summary.

---

## AC-003

Spending Overview luôn hiển thị:

- Total Budget.
- Total Spending.
- Remaining Budget.
- Budget Usage Percentage.

Dữ liệu được tính theo Time Filter hiện tại.

---

## AC-004

Category Analysis hiển thị:

- Category Name.
- Spending Amount.
- Spending Percentage.

Sắp xếp theo tổng chi tiêu giảm dần.

---

## AC-005

Transaction History Preview hiển thị tối đa:

3 Expense gần nhất.

---

## AC-006

Nếu có nhiều hơn 3 Expense.

↓

Hiển thị Button:

View All.

↓

Mở Expense History.

---

## AC-007

Expense History cho phép:

- Xem Expense Detail.
- Chỉnh sửa Expense.

Sau khi Expense được cập nhật.

↓

Financial Report tự động Refresh.

---

## AC-008

Nếu Time Filter = This Week.

↓

Hiển thị:

- Total Spending This Week.
- Weekly Budget Usage.

---

Nếu Time Filter = This Month.

↓

Hiển thị:

- Total Spending This Month.
- Monthly Budget Usage.

---

## AC-009

Financial Report hỗ trợ:

### Time Filter

- This Week.
- This Month.

---

### Category Filter

All Categories.

---

## AC-010

Time Filter mặc định:

This Week.

---

## AC-011

Category Filter mặc định:

All Categories.

---

## AC-012

Nếu chưa có Expense.

↓

Financial Report hiển thị Empty State.

↓

Hiển thị Button:

Add Expense.

---

## AC-013

Financial Report không hiển thị:

- Saving Goal.
- Budget Streak.
- Pig Pig Insight.
- Reward Marketplace.

---

## AC-014

Financial Report không lưu dữ liệu riêng.

Toàn bộ dữ liệu được tổng hợp từ:

- Budget.
- Expense.
- Expense Category.

---

## AC-015

Financial Report Notification hỗ trợ:

- Weekly Report.
- Monthly Report.

Khi User mở Notification.

↓

Financial Report tự động mở đúng Time Filter tương ứng.

---

## AC-016

Nếu xảy ra lỗi khi tải Report hoặc Filter.

↓

Hiển thị thông báo lỗi.

↓

Cho phép User thử lại.

---

# 20. Open Questions

Hiện tại MVP đã thống nhất:

- Financial Report là màn hình chỉ đọc dữ liệu.
- Report được tạo từ Budget và Expense.
- Report hỗ trợ hai chế độ:
  - Weekly Report.
  - Monthly Report.
- Time Filter mặc định là:
  - This Week.
- Transaction History Preview hiển thị tối đa ba Expense gần nhất.
- Expense History thuộc Report Module.
- Dashboard chỉ hiển thị Weekly Spending Snapshot.
- Chỉnh sửa Expense sẽ tự động cập nhật Financial Report.
- Notification có thể mở Weekly Report hoặc Monthly Report.

Các nội dung sau chưa thuộc phạm vi MVP:

- So sánh với kỳ trước.
- Xu hướng chi tiêu nhiều tháng.
- Dự báo chi tiêu.
- Export PDF.
- Export Excel.
- Chia sẻ báo cáo.

---

# 21. Future Enhancements

Các cải tiến có thể bổ sung trong các phiên bản tiếp theo:

- AI phân tích xu hướng chi tiêu.
- AI dự báo ngân sách cuối tháng.
- So sánh theo tháng hoặc quý.
- Báo cáo theo nhiều khoảng thời gian.
- Xuất báo cáo PDF.
- Xuất báo cáo Excel.
- Chia sẻ báo cáo.

Các nội dung trên không ảnh hưởng tới kiến trúc hiện tại của Feature.

---

# End of Document
