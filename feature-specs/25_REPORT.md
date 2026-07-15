# 12. REPORT

Version: 1.4 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

## Changelog

**v1.4**
- Bỏ Section "Spending Overview" đứng riêng ở đầu màn hình. Bốn số liệu (Total Budget, Total Spending, Remaining Budget, Budget Usage Percentage) chuyển xuống gộp vào Section "Weekly/Monthly Summary" ở cuối màn hình.
- Thêm Section mới "Pig Pig Insight" ở cuối màn hình (sau Weekly/Monthly Summary), hiển thị nhận định data-driven về chi tiêu trong kỳ (Weekly/Monthly) kèm Button "Chat với Pig Pig".
- Đổi thứ tự hiển thị Scrollable Content: Filter (This Week/This Month) → Category Analysis → Weekly Spending Comparison (chỉ Monthly) → Transaction History Preview → Weekly/Monthly Summary → Pig Pig Insight.
- AC-013 (Financial Report không hiển thị Pig Pig Insight) bị gỡ bỏ — Financial Report nay có hiển thị Pig Pig Insight (chỉ hiển thị Insight, không xử lý Chat trực tiếp trên màn hình Report).

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
- Nhận nhận định (Insight) từ Pig Pig về tình hình chi tiêu trong kỳ, dựa trên dữ liệu thực tế (data-driven).

---

# 3. Business Responsibility

Financial Report chịu trách nhiệm:

- Hiển thị Category Analysis dưới dạng biểu đồ vành khuyên (Donut Chart), mỗi Category một màu riêng biệt.
- Hiển thị Weekly Spending Comparison dưới dạng biểu đồ cột (chỉ khi Time Filter = This Month), mỗi tuần một màu riêng biệt.
- Hiển thị Transaction History Preview.
- Hiển thị Weekly/Monthly Summary (bao gồm Total Budget, Total Spending, Remaining Budget, Budget Usage Percentage).
- Hiển thị Pig Pig Insight (nhận định data-driven về chi tiêu trong kỳ) và Button "Chat với Pig Pig".
- Điều hướng tới Expense History.
- Điều hướng tới Expense Detail.
- Điều hướng tới Edit Expense.
- Điều hướng tới Pig Pig Chat (khi User chọn Button "Chat với Pig Pig").
- Hỗ trợ chuyển đổi giữa Weekly Report và Monthly Report.
- Hỗ trợ Filter theo Category.

Financial Report không chịu trách nhiệm:

- Tạo Expense.
- Chỉnh sửa Expense trực tiếp trên màn hình Report.
- Quản lý Saving Goal.
- Hiển thị Budget Streak.
- Đổi Voucher.
- Xử lý hội thoại Chat với Pig Pig (chỉ hiển thị Insight và điều hướng, không xử lý logic Chat).

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
- CMP-017 Category Pie Chart (Donut Chart — xem Section 18)
- CMP-018 Weekly Comparison Bar Chart (xem Section 18)
- CMP-010 Pig Pig Insight Banner (dùng chung với Dashboard, xem Section 18)

---

# 7. Preconditions

- User đã hoàn thành Onboarding.
- Budget đã được khởi tạo.
- Expense có thể tồn tại hoặc chưa tồn tại.
- Expense Category đã có dữ liệu mặc định.

---

# 8. Report Sections

Financial Report bao gồm sáu section chính.

Financial Report hỗ trợ hai chế độ hiển thị:

- Weekly Report (Default).
- Monthly Report.

User có thể chuyển đổi giữa hai chế độ bất kỳ lúc nào.

Thứ tự hiển thị từ trên xuống dưới: Filter (This Week/This Month) → Category Analysis (Section 1) → Weekly Spending Comparison (Section 2, chỉ Monthly) → Transaction History Preview (Section 3) → Weekly/Monthly Summary (Section 4) → Pig Pig Insight (Section 5).

Financial Report không còn Section "Spending Overview" đứng riêng ở đầu màn hình — bốn số liệu Total Budget, Total Spending, Remaining Budget, Budget Usage Percentage nay nằm trong Section 4 (Weekly/Monthly Summary) ở cuối màn hình.

---

## Section 1

### Category Analysis

Hiển thị phân bổ chi tiêu theo Category trong khoảng thời gian được chọn, dưới dạng **biểu đồ vành khuyên (Donut Chart)**.

Quy tắc hiển thị:

- Phía trên biểu đồ hiển thị "Tổng chi tiêu" (label nhỏ) và Total Spending (số tiền, cỡ chữ lớn, đậm) của khoảng thời gian + Category Filter đang chọn.
- Biểu đồ là hình vành khuyên (đường tròn có lỗ rỗng ở giữa, không phải Pie Chart đặc kín), không hiển thị chữ/số bên trong lỗ rỗng.
- Mỗi Category tương ứng với đúng một màu, cố định và nhất quán xuyên suốt toàn bộ ứng dụng (không đổi màu khi User chuyển Time Filter hoặc Category Filter).
- Mỗi cung (arc) trên Donut Chart có kích thước tỉ lệ với phần trăm chi tiêu của Category đó trên tổng chi tiêu trong khoảng thời gian đang chọn.
- Phía dưới biểu đồ là danh sách chú thích (Legend) dạng cột dọc, chiều rộng đầy đủ (không đặt cạnh biểu đồ). Mỗi dòng Legend gồm:
  - Chấm màu vuông bo góc tương ứng với Category.
  - Tên Category (đậm, hàng trên).
  - Số tiền chi tiêu của Category đó (nhạt màu hơn, hàng dưới, ngay dưới tên Category) — luôn hiển thị mặc định, không cần thao tác/tương tác gì thêm.
  - Phần trăm chi tiêu (đậm, canh phải, cùng hàng với tên Category).
- Áp dụng cho cả Weekly Report và Monthly Report — khác biệt duy nhất là khoảng thời gian dữ liệu (tuần hiện tại hoặc tháng hiện tại).

Category Analysis vẫn giữ nguyên nội dung dữ liệu như trước (Category Name, Total Spending by Category, Percentage of Total Spending) — chỉ đổi hình thức hiển thị từ Pie Chart đặc + Legend nằm cạnh biểu đồ, sang Donut Chart + Total Spending ở trên + Legend dạng danh sách đầy đủ chiều rộng ở dưới, với Amount luôn hiển thị mặc định trong Legend (không còn ẩn/chờ tương tác slice).

Category Analysis không hiển thị badge so sánh với kỳ trước (ví dụ "tăng/giảm X% so với tuần trước") — nằm ngoài phạm vi MVP (xem Section 20/21).

---

## Section 2

### Weekly Spending Comparison (chỉ hiển thị khi Time Filter = This Month)

Hiển thị **biểu đồ cột (Bar Chart)** so sánh tổng chi tiêu giữa các tuần trong tháng đang chọn.

Quy tắc hiển thị:

- Mỗi cột tương ứng với một tuần trong tháng (Tuần 1, Tuần 2, ...), chia theo tuần dương lịch bắt đầu từ Thứ Hai.
- Mỗi cột một màu riêng biệt, khác với màu dùng cho Category Analysis (để tránh gây nhầm lẫn giữa hai loại biểu đồ).
- Chiều cao cột tỉ lệ với tổng chi tiêu (Total Spending) của tuần đó.
- Giá trị chi tiêu của từng tuần hiển thị dạng số phía trên mỗi cột.
- Áp dụng Category Filter hiện tại giống như Category Analysis (nếu User đang lọc theo một Category cụ thể, biểu đồ chỉ tính chi tiêu của Category đó).
- Section này **không hiển thị** khi Time Filter = This Week (vì không có nhiều hơn một tuần để so sánh).

Các thông số tổng quan khác (Total Spending, Budget Usage, Remaining Budget...) tiếp tục được hiển thị ở Section 4 (Weekly/Monthly Summary) dưới dạng ô thông số (Statistic Card) như hiện tại — không lặp lại trong biểu đồ cột này.

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

### Weekly/Monthly Summary

Nếu Time Filter = This Week.

↓

Hiển thị:

Weekly Summary.

Bao gồm bốn ô thông số (Statistic Card):

- Total Budget.
- Total Spending.
- Remaining Budget.
- Budget Usage Percentage.

---

Nếu Time Filter = This Month.

↓

Hiển thị:

Monthly Summary.

Bao gồm bốn ô thông số (Statistic Card):

- Total Budget.
- Total Spending.
- Remaining Budget.
- Budget Usage Percentage.

---

Dữ liệu của bốn ô thông số được tính theo Time Filter + Category Filter hiện tại, giống cách tính đã áp dụng cho Spending Overview ở các phiên bản trước.

---

## Section 5

### Pig Pig Insight

Hiển thị Banner nhận định (Insight) của Pig Pig về tình hình chi tiêu trong khoảng thời gian đang chọn (Weekly hoặc Monthly).

Insight là **data-driven**: được tính toán trực tiếp từ dữ liệu Budget và Expense hiện có trong kỳ, không phải nhận định chung chung (data-informed).

Nội dung Insight theo cấu trúc: **Báo cáo + Khuyên ngắn gọn**.

Quy tắc tính Insight (Rule-based, không dùng AI/LLM — cùng nguyên tắc với Pig Pig Chat):

- **Overspend Day**: một ngày trong kỳ được tính là Overspend Day nếu tổng Expense phát sinh trong ngày đó vượt quá mức chi tiêu bình quân cho phép mỗi ngày (Total Budget của kỳ ÷ số ngày trong kỳ).
- **Dominant Category**: Category có Spending Percentage cao nhất trong kỳ; được coi là "chi tiêu lố" nếu Spending Percentage > 50% tổng chi tiêu.
- Nếu có Overspend Day **và** có Dominant Category > 50%:
  → "Tuần/Tháng vừa rồi bạn đã chi tiêu lố ngân sách {N} hôm và chi {X}% cho {Tên Category}, hãy cố gắng chi tiêu hợp lý hơn trong tuần/tháng tới bạn nhé!"
- Nếu chỉ có Overspend Day (không có Dominant Category > 50%):
  → "Tuần/Tháng vừa rồi bạn đã chi tiêu lố ngân sách {N} hôm, hãy cố gắng cân đối chi tiêu hơn trong tuần/tháng tới bạn nhé!"
- Nếu chỉ có Dominant Category > 50% (không có Overspend Day):
  → "Tuần/Tháng vừa rồi bạn đã chi {X}% cho {Tên Category}, hãy thử cân đối chi tiêu sang các khoản khác trong tuần/tháng tới bạn nhé!"
- Nếu không có Overspend Day và không có Dominant Category > 50% (chi tiêu trong tầm kiểm soát):
  → "Tuần/Tháng vừa rồi bạn đã chi tiêu khá hợp lý, tiếp tục duy trì phong độ này nhé!"

Insight áp dụng Category Filter hiện tại: nếu User đang lọc theo một Category cụ thể, Dominant Category check không áp dụng (vì đã lọc còn 1 Category duy nhất); Overspend Day vẫn tính theo tổng chi tiêu của Category đang lọc trong ngày so với mức bình quân cho phép của riêng Category đó trong kỳ.

Insight chỉ hiển thị nhận định **mới nhất** theo Time Filter hiện tại — không hiển thị lịch sử Insight.

Bên dưới nội dung Insight hiển thị Button:

"Chat với Pig Pig"

↓

Mở Pig Pig Chat.

Nếu chưa có Expense nào trong kỳ đang chọn (Empty State của toàn màn hình, xem AC-012), Pig Pig Insight không hiển thị.

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

System tính Pig Pig Insight (Overspend Day, Dominant Category) theo dữ liệu kỳ hiện tại.

↓

Render Financial Report (bao gồm Category Donut Chart và Pig Pig Insight).

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

System tính lại Pig Pig Insight theo khoảng thời gian mới.

↓

Render Financial Report.

---

## Filter Category Flow

User chọn Category Filter.

↓

System lọc dữ liệu theo Category trong khoảng thời gian hiện tại.

↓

System tính lại Category Donut Chart và Weekly Spending Comparison (nếu đang ở Monthly Report) theo Category đã lọc.

↓

System tính lại Pig Pig Insight theo Category đã lọc.

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

Financial Report tự động Refresh (bao gồm Donut Chart và Weekly Comparison Chart).

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

## Chat with Pig Pig Flow

Financial Report

↓

Pig Pig Insight

↓

Button "Chat với Pig Pig"

↓

Mở Pig Pig Chat.

---

# 10. Screen Content

## Category Analysis

Hiển thị:

- Tổng chi tiêu (label + số tiền) phía trên biểu đồ.
- Donut Chart, mỗi Category một màu.
- Legend dạng danh sách đầy đủ chiều rộng, mỗi dòng: chấm màu + Category Name + Category Spending Amount (luôn hiển thị) + Spending Percentage.

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

## Weekly/Monthly Summary

Nếu Time Filter = This Week.

↓

Hiển thị (Weekly Summary):

- Total Budget.
- Total Spending.
- Remaining Budget.
- Budget Usage Percentage.

---

Nếu Time Filter = This Month.

↓

Hiển thị (Monthly Summary):

- Total Budget.
- Total Spending.
- Remaining Budget.
- Budget Usage Percentage.

---

## Pig Pig Insight

Hiển thị:

- Nội dung Insight (Báo cáo + Khuyên ngắn gọn), data-driven theo Overspend Day và Dominant Category của kỳ đang chọn.
- Button "Chat với Pig Pig".

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
- Xem Category Analysis dưới dạng Donut Chart.
- Xem Weekly Spending Comparison dưới dạng Bar Chart (khi ở Monthly Report).
- Xem Transaction History Preview.
- Chọn View All.
- Xem Expense Detail.
- Chỉnh sửa Expense từ Expense Detail.
- Xem Weekly/Monthly Summary (Total Budget, Total Spending, Remaining Budget, Budget Usage Percentage).
- Xem Pig Pig Insight.
- Chọn Button "Chat với Pig Pig".

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

System tính Pig Pig Insight (Overspend Day, Dominant Category) theo dữ liệu kỳ hiện tại.

↓

Hiển thị Financial Report.

---

## Change Time Filter

User chuyển đổi giữa:

- This Week.
- This Month.

↓

System tính toán lại:

- Category Analysis (Donut Chart).
- Weekly Spending Comparison (chỉ khi chuyển sang This Month; ẩn hoàn toàn khi ở This Week).
- Transaction History Preview.
- Weekly/Monthly Summary (Total Budget, Total Spending, Remaining Budget, Budget Usage Percentage) theo khoảng thời gian được chọn.
- Pig Pig Insight theo khoảng thời gian được chọn.

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

Refresh toàn bộ Financial Report, bao gồm Donut Chart, Weekly Comparison Chart (nếu đang hiển thị) và Pig Pig Insight.

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

Refresh Report (bao gồm Donut Chart, Weekly Comparison Chart và Pig Pig Insight).

---

## Chat with Pig Pig

User chọn Button:

"Chat với Pig Pig".

↓

Open Pig Pig Chat.

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

## Pig Pig Insight

User chọn:

Button "Chat với Pig Pig".

↓

Open Pig Pig Chat.

---

# 14. Display Rules

## Category Analysis

Hiển thị dưới dạng Donut Chart (vành khuyên), không phải Pie Chart đặc kín.

Total Spending hiển thị dạng label + số tiền lớn, đặt phía trên Donut Chart, tính theo Time Filter + Category Filter hiện tại.

Mỗi Category có một màu cố định, không đổi giữa các lần render, không đổi khi chuyển Time Filter hoặc Category Filter.

Chỉ hiển thị trong Donut Chart các Category có Total Spending > 0 trong khoảng thời gian đang chọn (Category không phát sinh chi tiêu không có cung/arc và không có dòng Legend).

Legend hiển thị dạng danh sách đầy đủ chiều rộng bên dưới biểu đồ (không đặt cạnh biểu đồ). Amount của từng Category luôn hiển thị mặc định trong Legend, không cần tương tác.

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

## Weekly/Monthly Summary

Luôn hiển thị bốn ô thông số:

- Total Budget.
- Total Spending.
- Remaining Budget.
- Budget Usage Percentage.

Tất cả dữ liệu được tính theo Time Filter + Category Filter hiện tại.

Nếu Time Filter = This Week → nhãn "Weekly Summary".

Nếu Time Filter = This Month → nhãn "Monthly Summary".

---

## Pig Pig Insight

Insight được tính lại mỗi khi Time Filter, Category Filter hoặc dữ liệu Expense thay đổi (thêm/sửa Expense).

Insight chỉ hiển thị nhận định mới nhất — không hiển thị lịch sử Insight, không cho phép cuộn xem Insight cũ.

Nếu chưa có Expense nào trong kỳ/Category đang lọc (Empty State toàn màn hình) → ẩn hoàn toàn Pig Pig Insight, không hiển thị Insight rỗng.

Button "Chat với Pig Pig" luôn hiển thị cùng Insight khi Insight có dữ liệu.

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

- Empty (không có Expense nào trong khoảng thời gian/Category đang lọc → ẩn Donut Chart, không hiển thị biểu đồ rỗng).
- Normal.

---

## Weekly Spending Comparison

- Ẩn (Time Filter = This Week, hoặc không có dữ liệu tháng).
- Normal (Time Filter = This Month).

---

## Weekly/Monthly Summary

- Empty.
- Normal.

---

## Pig Pig Insight

- Ẩn (chưa có Expense nào trong kỳ/Category đang lọc — trùng với Empty State toàn màn hình).
- Normal (hiển thị Insight data-driven + Button "Chat với Pig Pig").

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

Category color (Category Analysis), Weekly Spending Comparison và Pig Pig Insight (Overspend Day, Dominant Category) là **derived data**, tính runtime từ Category list và Expense hiện có — không lưu thành field mới trong `pace_mvp_state`, cùng nguyên tắc đã áp dụng cho Financial Report nói chung (RPT-001).

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
- **CMP-010 Pig Pig Insight Banner**: banner hiển thị nhận định data-driven (Báo cáo + Khuyên ngắn gọn) kèm Button "Chat với Pig Pig", dùng chung component với Dashboard. Trong Report, Insight được tính theo Time Filter + Category Filter hiện tại thay vì luôn theo ngày như ở Dashboard.
- **CMP-017 Category Pie Chart (Donut Chart)**: biểu đồ vành khuyên hiển thị phân bổ chi tiêu theo Category, mỗi Category một màu cố định. Total Spending hiển thị phía trên biểu đồ. Legend dạng danh sách đầy đủ chiều rộng bên dưới (chấm màu + tên + số tiền + phần trăm, Amount luôn hiển thị mặc định). Dùng trong Category Analysis (Weekly và Monthly Report).
- **CMP-018 Weekly Comparison Bar Chart**: biểu đồ cột so sánh Total Spending giữa các tuần trong tháng, mỗi cột một màu riêng. Chỉ dùng trong Monthly Report.

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

- Category Analysis.
- Transaction History Preview.
- Weekly/Monthly Summary.
- Pig Pig Insight (trừ khi ở Empty State, xem AC-012).

Weekly Spending Comparison chỉ hiển thị khi Time Filter = This Month (xem AC-004b).

---

## AC-003

Weekly/Monthly Summary luôn hiển thị bốn ô thông số:

- Total Budget.
- Total Spending.
- Remaining Budget.
- Budget Usage Percentage.

Dữ liệu được tính theo Time Filter + Category Filter hiện tại.

---

## AC-004

Category Analysis hiển thị dưới dạng **Donut Chart**:

- Total Spending (label + số tiền) hiển thị phía trên biểu đồ.
- Mỗi Category một màu cố định, nhất quán.
- Mỗi cung (arc) tỉ lệ với phần trăm chi tiêu của Category đó, biểu đồ có lỗ rỗng ở giữa (không phải Pie Chart đặc kín).
- Legend dạng danh sách đầy đủ chiều rộng bên dưới biểu đồ, mỗi dòng hiển thị: chấm màu, Category Name, Category Spending Amount (luôn hiển thị mặc định), Spending Percentage.

Áp dụng cho cả Weekly Report và Monthly Report.

---

## AC-004a

Category không có chi tiêu (Total Spending = 0) trong khoảng thời gian/Category Filter đang chọn thì không xuất hiện trong Donut Chart và Legend.

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

Financial Report tự động Refresh (bao gồm Donut Chart, Weekly Comparison Chart và Pig Pig Insight).

---

## AC-008

Weekly/Monthly Summary hiển thị bốn ô thông số (Total Budget, Total Spending, Remaining Budget, Budget Usage Percentage) theo Time Filter hiện tại:

Nếu Time Filter = This Week → nhãn "Weekly Summary".

Nếu Time Filter = This Month → nhãn "Monthly Summary".

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
- Reward Marketplace.

Financial Report chỉ hiển thị Pig Pig Insight và điều hướng tới Pig Pig Chat — không xử lý hội thoại Chat trực tiếp trên màn hình Report (xem AC-018).

---

## AC-014

Financial Report không lưu dữ liệu riêng.

Toàn bộ dữ liệu được tổng hợp từ:

- Budget.
- Expense.
- Expense Category.

Category color, Weekly Spending Comparison và Pig Pig Insight (Overspend Day, Dominant Category) là derived data, không lưu trữ.

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

## AC-017

Category Analysis không hiển thị badge/nhãn so sánh với kỳ trước (ví dụ "tăng/giảm X% so với tuần trước") — mục này thuộc Future Enhancement, ngoài phạm vi MVP (xem Section 20/21).

---

## AC-018

Pig Pig Insight hiển thị ở cuối màn hình, sau Weekly/Monthly Summary:

- Nội dung theo cấu trúc Báo cáo + Khuyên ngắn gọn, data-driven từ Overspend Day và Dominant Category của kỳ đang chọn (xem Section 8, Section 5).
- Kèm Button "Chat với Pig Pig", mở Pig Pig Chat khi chọn.
- Nếu chưa có Expense nào trong kỳ/Category đang lọc, Pig Pig Insight không hiển thị (trùng Empty State toàn màn hình, xem AC-012).
- Insight tự động tính lại khi Time Filter, Category Filter thay đổi, hoặc khi Expense được thêm/sửa (xem AC-007).

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
- Category Analysis hiển thị dưới dạng Donut Chart, mỗi Category một màu cố định, Total Spending hiển thị phía trên biểu đồ, Legend đầy đủ chiều rộng bên dưới với Amount luôn hiển thị.
- Monthly Report có thêm Weekly Spending Comparison dạng Bar Chart, mỗi tuần một màu riêng.
- Transaction History Preview hiển thị tối đa ba Expense gần nhất.
- Bốn số liệu Total Budget/Total Spending/Remaining Budget/Budget Usage Percentage nằm trong Weekly/Monthly Summary ở cuối màn hình (không còn Section Spending Overview riêng ở đầu màn hình).
- Cuối màn hình có thêm Pig Pig Insight (data-driven, rule-based, không dùng AI/LLM) kèm Button "Chat với Pig Pig".
- Expense History thuộc Report Module.
- Dashboard chỉ hiển thị Weekly Spending Snapshot.
- Chỉnh sửa Expense sẽ tự động cập nhật Financial Report (bao gồm Pig Pig Insight).
- Notification có thể mở Weekly Report hoặc Monthly Report.

Các nội dung sau chưa thuộc phạm vi MVP:

- So sánh với kỳ trước (bao gồm badge tăng/giảm % so với kỳ trước ở Category Analysis).
- Xu hướng chi tiêu nhiều tháng.
- Dự báo chi tiêu.
- Tương tác chạm vào từng cung/slice của Donut Chart để lọc (chỉ hiển thị, chưa hỗ trợ tương tác lọc qua biểu đồ ở MVP này).
- Lịch sử Pig Pig Insight (chỉ hiển thị Insight mới nhất).
- Export PDF.
- Export Excel.
- Chia sẻ báo cáo.

---

# 21. Future Enhancements

Các cải tiến có thể bổ sung trong các phiên bản tiếp theo:

- AI phân tích xu hướng chi tiêu (thay thế Rule-based Insight bằng mô hình AI/LLM thật).
- AI dự báo ngân sách cuối tháng.
- So sánh theo tháng hoặc quý (bao gồm badge % so với kỳ trước ở Category Analysis).
- Báo cáo theo nhiều khoảng thời gian.
- Cho phép chạm vào cung/cột biểu đồ để lọc nhanh Transaction History.
- Lưu lịch sử Pig Pig Insight để User xem lại nhận định các kỳ trước.
- Xuất báo cáo PDF.
- Xuất báo cáo Excel.
- Chia sẻ báo cáo.

Các nội dung trên không ảnh hưởng tới kiến trúc hiện tại của Feature.

---

# End of Document
