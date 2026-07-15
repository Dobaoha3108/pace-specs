# 12. REPORT

Version: 1.2 (MVP)

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
- Hiểu tiền đã được chi vào đâu, thông qua biểu đồ trực quan theo Category.
- Theo dõi mức sử dụng Budget.
- So sánh chi tiêu giữa các tuần trong tháng (Monthly Report).
- Xem lịch sử giao dịch gần nhất.
- Truy cập Expense History đầy đủ.
- Phát hiện xu hướng chi tiêu theo tuần và theo tháng.

---

# 3. Business Responsibility

Financial Report chịu trách nhiệm:

- Hiển thị Spending Overview.
- Hiển thị Category Analysis dưới dạng biểu đồ tròn (Pie Chart), mỗi Category một màu riêng biệt.
- Hiển thị Weekly Spending Comparison dưới dạng biểu đồ cột (chỉ khi Time Filter = This Month), mỗi tuần một màu riêng biệt.
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

Giúp User hiểu tình hình chi tiêu dựa trên dữ liệu Budget và Expense, thông qua các số liệu tổng quan và biểu đồ trực quan.

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
- CMP-017 Category Pie Chart (mới — xem Section 18)
- CMP-018 Weekly Comparison Bar Chart (mới — xem Section 18)

---

# 7. Preconditions

- User đã hoàn thành Onboarding.
- Budget đã được khởi tạo.
- Expense có thể tồn tại hoặc chưa tồn tại.
- Expense Category đã có dữ liệu mặc định.

---

# 8. Report Sections

Financial Report bao gồm năm section chính.

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

Hiển thị phân bổ chi tiêu theo Category trong khoảng thời gian được chọn, dưới dạng **biểu đồ tròn (Pie Chart)**.

Quy tắc hiển thị:

- Mỗi Category tương ứng với đúng một màu, cố định và nhất quán xuyên suốt toàn bộ ứng dụng (không đổi màu khi User chuyển Time Filter hoặc Category Filter).
- Mỗi lát cắt (slice) trên Pie Chart có kích thước tỉ lệ với phần trăm chi tiêu của Category đó trên tổng chi tiêu trong khoảng thời gian đang chọn.
- Đi kèm Pie Chart là danh sách chú thích (Legend), mỗi dòng gồm: chấm màu tương ứng, tên Category, phần trăm.
- Áp dụng cho cả Weekly Report và Monthly Report — khác biệt duy nhất là khoảng thời gian dữ liệu (tuần hiện tại hoặc tháng hiện tại).

Category Analysis vẫn giữ nguyên nội dung dữ liệu như trước (Category Name, Total Spending by Category, Percentage of Total Spending) — chỉ đổi hình thức hiển thị từ danh sách thanh phần trăm sang Pie Chart + Legend.

---

## Section 3

### Weekly Spending Comparison (chỉ hiển thị khi Time Filter = This Month)

Hiển thị **biểu đồ cột (Bar Chart)** so sánh tổng chi tiêu giữa các tuần trong tháng đang chọn.

Quy tắc hiển thị:

- Mỗi cột tương ứng với một tuần trong tháng (Tuần 1, Tuần 2, ...), chia theo tuần dương lịch bắt đầu từ Thứ Hai.
- Mỗi cột một màu riêng biệt, khác với màu dùng cho Category Analysis (để tránh gây nhầm lẫn giữa hai loại biểu đồ).
- Chiều cao cột tỉ lệ với tổng chi tiêu (Total Spending) của tuần đó.
- Giá trị chi tiêu của từng tuần hiển thị dạng số phía trên mỗi cột.
- Áp dụng Category Filter hiện tại giống như Category Analysis (nếu User đang lọc theo một Category cụ thể, biểu đồ chỉ tính chi tiêu của Category đó).
- Section này **không hiển thị** khi Time Filter = This Week (vì không có nhiều hơn một tuần để so sánh).

Các thông số tổng quan khác (Total Spending, Budget Usage, Remaining Budget...) tiếp tục được hiển thị ở Section 1 (Spending Overview) và Section 5 (Summary) dưới dạng ô thông số (Statistic Card) như hiện tại — không lặp lại trong biểu đồ cột này.

---

## Section 4

### Transaction History Preview

Hiển thị ba Expense gần nhất trong khoảng thời gian được chọn.

Có Button:

View All

↓

Expense History.

---

## Section 5

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

System tính màu cố định cho từng Category.

↓

Render Financial Report (bao gồm Category Pie Chart).

---

## Change Report Period

User chuyển đổi giữa:

- This Week.
- This Month.

↓

System tính toán lại dữ liệu Report theo khoảng thời gian đã chọn.

↓

Nếu chuyển sang This Month.

↓

System tính thêm dữ liệu Weekly Spending Comparison (chia theo tuần trong tháng).

↓

Render Financial Report.

---

## Filter Category Flow

User chọn Category Filter.

↓

System lọc dữ liệu theo Category trong khoảng thời gian hiện tại.

↓

System tính lại Category Pie Chart và Weekly Spending Comparison (nếu đang ở Monthly Report) theo Category đã lọc.

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

Financial Report tự động Refresh (bao gồm Pie Chart và Weekly Comparison Chart).

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

- Pie Chart, mỗi Category một màu.
- Legend: chấm màu + Category Name + Spending Percentage.
- (Giữ nguyên dữ liệu) Category Spending Amount — hiển thị khi User cần xem chi tiết (trong Legend hoặc khi tương tác với slice).

---

## Weekly Spending Comparison (chỉ khi Time Filter = This Month)

Hiển thị:

- Bar Chart, mỗi cột là một tuần trong tháng, mỗi cột một màu riêng.
- Giá trị Total Spending của từng tuần hiển thị phía trên cột.
- Nhãn tuần (Tuần 1, Tuần 2, ...) hiển thị phía dưới cột.

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
- Xem Category Analysis dưới dạng Pie Chart.
- Xem Weekly Spending Comparison dưới dạng Bar Chart (khi ở Monthly Report).
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

System tổng hợp dữ liệu và tính màu cố định cho từng Category.

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
- Category Analysis (Pie Chart).
- Weekly Spending Comparison (chỉ khi chuyển sang This Month; ẩn hoàn toàn khi ở This Week).
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

Refresh toàn bộ Financial Report, bao gồm Pie Chart và Weekly Comparison Chart (nếu đang hiển thị).

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

Refresh Report (bao gồm Pie Chart và Weekly Comparison Chart).

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

Hiển thị dưới dạng Pie Chart.

Mỗi Category có một màu cố định, không đổi giữa các lần render, không đổi khi chuyển Time Filter hoặc Category Filter.

Chỉ hiển thị trong Pie Chart các Category có Total Spending > 0 trong khoảng thời gian đang chọn (Category không phát sinh chi tiêu không có slice).

Dữ liệu được tính theo Time Filter hiện tại.

---

## Weekly Spending Comparison

Chỉ hiển thị khi Time Filter = This Month.

Không hiển thị khi Time Filter = This Week.

Số lượng cột bằng số tuần dương lịch (bắt đầu Thứ Hai) giao với tháng đang chọn (thường 4-6 tuần, tuỳ tháng).

Mỗi cột một màu riêng, khác bảng màu dùng cho Category Analysis.

Nếu một tuần không có Expense nào, cột của tuần đó vẫn hiển thị với chiều cao tối thiểu (giá trị 0), không ẩn cột.

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

Category Filter luôn hoạt động trên Time Filter hiện tại, ảnh hưởng tới cả Category Analysis và Weekly Spending Comparison.

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

Hiển thị Empty State (Category Analysis và Weekly Spending Comparison không hiển thị biểu đồ trống, ẩn hoàn toàn section nếu không có dữ liệu).

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

- Empty (không có Expense nào trong khoảng thời gian/Category đang lọc → ẩn Pie Chart, không hiển thị biểu đồ rỗng).
- Normal.

---

## Weekly Spending Comparison

- Ẩn (Time Filter = This Week, hoặc không có dữ liệu tháng).
- Normal (Time Filter = This Month).

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

Category color (Category Analysis) và Weekly Spending Comparison là **derived data**, tính runtime từ Category list và Expense hiện có — không lưu thành field mới trong `pace_mvp_state`, cùng nguyên tắc đã áp dụng cho Financial Report nói chung (RPT-001).

---

## Business Rules

- EXP-001
- EXP-002
- EXP-003
- EXP-004

- BGT-001
- BGT-002
- BGT-003

- RPT-001

---

## UI Components

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-008 Statistic Card
- CMP-013 Empty State
- CMP-014 Loading State
- **CMP-017 Category Pie Chart** (mới): biểu đồ tròn hiển thị phân bổ chi tiêu theo Category, mỗi Category một màu cố định, kèm Legend (chấm màu + tên + phần trăm). Dùng trong Category Analysis (Weekly và Monthly Report).
- **CMP-018 Weekly Comparison Bar Chart** (mới): biểu đồ cột so sánh Total Spending giữa các tuần trong tháng, mỗi cột một màu riêng. Chỉ dùng trong Monthly Report.

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

Weekly Spending Comparison chỉ hiển thị khi Time Filter = This Month (xem AC-004b).

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

Category Analysis hiển thị dưới dạng **Pie Chart**:

- Mỗi Category một màu cố định, nhất quán.
- Mỗi slice tỉ lệ với phần trăm chi tiêu của Category đó.
- Legend hiển thị: chấm màu, Category Name, Spending Percentage.

Áp dụng cho cả Weekly Report và Monthly Report.

---

## AC-004a

Category không có chi tiêu (Total Spending = 0) trong khoảng thời gian/Category Filter đang chọn thì không xuất hiện trong Pie Chart và Legend.

---

## AC-004b

Khi Time Filter = This Month, Financial Report hiển thị thêm **Weekly Spending Comparison** dạng Bar Chart:

- Số cột = số tuần dương lịch (bắt đầu Thứ Hai) giao với tháng đang chọn.
- Mỗi cột một màu riêng biệt, khác bảng màu của Category Analysis.
- Chiều cao cột tỉ lệ với Total Spending của tuần đó, giá trị hiển thị phía trên cột.
- Khi Time Filter = This Week, section này không hiển thị.

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

Financial Report tự động Refresh (bao gồm Pie Chart và Weekly Comparison Chart).

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

Category Filter ảnh hưởng tới Category Analysis và Weekly Spending Comparison.

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

Category color và Weekly Spending Comparison là derived data, không lưu trữ.

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
- Category Analysis hiển thị dưới dạng Pie Chart, mỗi Category một màu cố định.
- Monthly Report có thêm Weekly Spending Comparison dạng Bar Chart, mỗi tuần một màu riêng.
- Transaction History Preview hiển thị tối đa ba Expense gần nhất.
- Expense History thuộc Report Module.
- Dashboard chỉ hiển thị Weekly Spending Snapshot.
- Chỉnh sửa Expense sẽ tự động cập nhật Financial Report.
- Notification có thể mở Weekly Report hoặc Monthly Report.

Các nội dung sau chưa thuộc phạm vi MVP:

- So sánh với kỳ trước.
- Xu hướng chi tiêu nhiều tháng.
- Dự báo chi tiêu.
- Tương tác chạm vào từng slice của Pie Chart để lọc (chỉ hiển thị, chưa hỗ trợ tương tác lọc qua biểu đồ ở MVP này).
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
- Cho phép chạm vào slice/cột biểu đồ để lọc nhanh Transaction History.
- Xuất báo cáo PDF.
- Xuất báo cáo Excel.
- Chia sẻ báo cáo.

Các nội dung trên không ảnh hưởng tới kiến trúc hiện tại của Feature.

---

# End of Document
