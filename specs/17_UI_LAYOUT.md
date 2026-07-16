# 12. UI LAYOUT

Version: 1.3 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Purpose

UI Layout định nghĩa vị trí, thứ tự hiển thị và cách sắp xếp Component trên từng màn hình của PACE.

Tài liệu này không định nghĩa:

- Business Logic.
- Data Model.
- Business Rule.
- Visual Style.

UI Layout phải tuân thủ:

- Feature Specification.
- Component Library.
- Design System.
- Screen Map.

Mục tiêu của UI Layout là giúp Coding Agent dựng giao diện đúng bố cục mà không phải tự suy đoán vị trí của các Component.

---

# 2. Layout Principles

Toàn bộ giao diện PACE tuân thủ các nguyên tắc sau:

- Mobile First.
- Component được sắp xếp theo chiều dọc từ trên xuống dưới.
- Thông tin quan trọng được đặt ở khu vực phía trên màn hình.
- Một màn hình chỉ có một Primary Action.
- Nội dung dài phải hỗ trợ cuộn theo chiều dọc.
- Header có thể cố định nếu màn hình cần giữ Navigation.
- Bottom Navigation chỉ hiển thị tại các Main Navigation Screen.
- Child Screen sử dụng Back Button để quay lại màn hình cha.
- Không tự động thêm Feature vào Bottom Navigation nếu Feature Spec không quy định.

---

# 3. Global Mobile Frame

Kích thước thiết kế chuẩn:

390 × 844 px.

---

PACE được thiết kế như một Mobile App.

Khi trình chiếu trên Laptop, giao diện vẫn giữ tỷ lệ Mobile App và được đặt trong Mobile Frame ở giữa màn hình.

Không chuyển giao diện thành Desktop Layout.

---

## Standard Screen Structure

Header

↓

Scrollable Content

↓

Bottom Navigation nếu màn hình thuộc Main Navigation.

---

## Default Spacing

Padding ngang màn hình:

16px.

---

Khoảng cách giữa hai Component:

16px.

---

Khoảng cách giữa hai Section:

24px.

---

Card Padding:

20px.

---

## Safe Area

Safe Area phải được áp dụng cho:

- Header.
- Bottom Navigation.
- Sticky Button.
- Chat Input.

Không để nội dung bị che bởi:

- Camera Cutout.
- Status Bar.
- Bottom Navigation.
- System Navigation Bar.

---

# 4. Common Layout Structure

## Header

Header nằm ở phía trên màn hình.

Header có thể bao gồm:

- Screen Title.
- Back Button.
- Notification Icon.
- Profile Icon.
- Action Icon.

Mỗi màn hình chỉ có một Header.

---

## Main Navigation Screen

Main Navigation Screen là màn hình được truy cập trực tiếp từ Bottom Navigation.

PACE chỉ có năm Main Navigation Destination:

1. Dashboard.
2. Report.
3. Add Expense.
4. Reward.
5. Pig Pig Chat.

---

## Bottom Navigation

Bottom Navigation gồm đúng năm Item:

- Dashboard.
- Report.
- Add Expense.
- Reward.
- Pig Pig Chat.

---

### Dashboard

Icon:

Home.

---

### Report

Icon:

Chart hoặc Report.

---

### Add Expense

Icon:

Dấu cộng.

Đây là Action ở vị trí trung tâm Bottom Navigation.

Click vào sẽ mở màn hình Add Expense.

---

### Reward

Icon:

Gift hoặc Voucher.

---

### Pig Pig Chat

Icon:

Pig Pig hoặc Chat.

---

Bottom Navigation không bao gồm:

- Saving Goal.
- Expense History.
- Expense Detail.
- Edit Expense.
- Notification.
- Profile.

---

## Child Screen

Child Screen là màn hình được mở từ một Main Navigation Screen hoặc từ một Component nằm trong Main Navigation Screen.

Ví dụ:

Dashboard

↓

Saving Goal Card

↓

Saving Goal Detail.

---

Report

↓

Expense History Preview

↓

Expense History

↓

Expense Detail.

---

Child Screen phải có:

- Back Button.
- Screen Title.

Sau khi User hoàn thành thao tác hoặc chọn Back.

↓

Quay lại màn hình cha tương ứng.

---

## Scrollable Content

Scrollable Content nằm dưới Header.

Chỉ phần nội dung ở giữa màn hình được cuộn.

Nếu màn hình có Bottom Navigation.

↓

Nội dung phải có Bottom Padding đủ lớn để không bị Bottom Navigation che.

---

## Primary Action

Một màn hình chỉ có một Primary Action.

Primary Action có thể được đặt:

- Trong Scrollable Content.
- Sticky ở cuối màn hình.
- Trong Header nếu là Action ngắn.

Không sử dụng Floating Action Button trong MVP.

---

## Dialog

Dialog hiển thị ở giữa màn hình.

Khi Dialog mở:

- Làm mờ nền phía sau.
- Không cho phép tương tác với nội dung phía sau.
- Hiển thị Primary Action và Secondary Action nếu cần.

Dialog được sử dụng cho:

- Xác nhận Logout.
- Xác nhận Delete.
- Xác nhận đổi Voucher.
- Xác nhận Cancel Saving Goal.

---

## Bottom Sheet

Bottom Sheet là một bảng nội dung trượt từ cạnh dưới màn hình lên.

Bottom Sheet không phải là một màn hình riêng.

Bottom Sheet hiển thị phía trên màn hình hiện tại và không thay đổi Navigation.

---

Bottom Sheet có thể được sử dụng cho:

- Deposit Saving Goal.
- Withdraw Saving Goal.
- Chọn Expense Category.
- Các Form ngắn hoặc Action phụ.

---

Cấu trúc minh họa:

Current Screen

↓

Dim Background

↓

Bottom Sheet từ phía dưới trượt lên.

---

Bottom Sheet bao gồm:

- Drag Indicator.
- Title.
- Form hoặc Action Content.
- Primary Button.
- Secondary Button nếu cần.

---

Bottom Sheet có thể đóng bằng:

- Close Icon.
- Secondary Button.
- Vuốt xuống nếu không ảnh hưởng dữ liệu đang nhập.

---

# 5. Entry Screens

Entry Screen không hiển thị Bottom Navigation.

Bao gồm:

- Splash.
- Onboarding.

---

## Splash Screen

Không có Header.

Không có Bottom Navigation.

Không có vùng cuộn.

---

Layout căn giữa từ trên xuống dưới:

- PACE Logo.
- Pig Pig Illustration.
- App Name.
- Tagline.

---

Tagline:

"Quản lý dễ dàng - Vững vàng chi tiêu"

---

Toàn bộ nội dung căn giữa theo chiều ngang.

Splash tự động chuyển sang:

- Onboarding nếu User chưa hoàn thành Onboarding.
- Dashboard nếu User đã hoàn thành Onboarding.

---

## Onboarding

Onboarding bao gồm bốn Step.

Không hiển thị:

- App Header.
- Bottom Navigation.
- Notification Icon.
- Profile Icon.

---

## Onboarding Step 1

### Welcome

Layout từ trên xuống dưới:

- Progress Indicator.
- PACE Logo.
- Pig Pig Illustration.
- Welcome Title.
- Description.
- Primary Button "Bắt đầu".

Primary Button đặt ở cuối màn hình.

---

## Onboarding Step 2

### Financial Setup

> Cập nhật theo DELTA-006 (`docs/03_DELTA_SPEC.md`) — bỏ khái niệm Scenario A/B, luôn hiển thị đủ 3 trường bất kể ngày Onboarding là ngày nào.

Hiển thị từ trên xuống dưới:

- Progress Indicator.
- Screen Title.
- Câu hỏi + Day Picker Grid (CMP-016) để chọn Budget Reset Day (1–31).
- Description ngắn ("Nhập Monthly Income và Fixed Cost để PACE tính budget cho chu kỳ này.").
- Monthly Income Input.
- Fixed Expense Input.
- Monthly Budget Preview Card.
- Primary Button "Tiếp tục".

Monthly Budget Preview Card hiển thị:

Monthly Income − Fixed Expense.

---

Các trường nhập liệu nằm trong Scrollable Content.

Primary Button luôn hiển thị ở cuối màn hình.

---

## Onboarding Step 3

### Create First Saving Goal

Layout từ trên xuống dưới:

- Progress Indicator.
- Screen Title.
- Description.
- Goal Name Input.
- Target Amount Input.
- Target Date Input.
- Saving Mode Selection.
- Primary Button "Tạo Saving Goal".
- Secondary Button "Để sau".

Nếu nội dung dài.

↓

Form được cuộn theo chiều dọc.

Primary Button và Secondary Button nằm cuối Form.

---

## Onboarding Step 4

### Completed

Layout từ trên xuống dưới:

- Progress Indicator hoàn thành.
- Pig Pig Illustration.
- Success Title.
- Welcome Message.
- Primary Button "Bắt đầu sử dụng".

Toàn bộ nội dung căn giữa.

Không hiển thị dữ liệu tài chính chi tiết.

Sau khi User chọn "Bắt đầu sử dụng".

↓

Open Dashboard.

---

# 6. Dashboard Layout

## Screen Structure

Header (Fixed)

↓

Scrollable Content

↓

Bottom Navigation (Fixed)

---

## Header

Bao gồm:

- Greeting.
- Notification Icon.
- Profile Icon.

Header luôn cố định.

---

## Scrollable Content

Thứ tự hiển thị từ trên xuống dưới:

1. Budget Overview Card.

↓

2. Budget Streak Card.

↓

3. Saving Goal Preview Card.

↓

4. Weekly Spending Snapshot.

↓

5. Pig Pig Insight Banner.

---

## Budget Overview Card

Hiển thị theo thứ tự:

1. Remaining Budget Block (khối chính, nổi bật nhất).
   - Label: "Còn được tiêu trong tháng".
   - Giá trị: Remaining Budget / Monthly Budget.
   - Progress Bar thể hiện tỉ lệ đã dùng / Monthly Budget.
2. Info Row — 2 ô nằm ngang, chia đều:
   - Ô 1 — Hôm nay nên tiêu: hiển thị dạng phân số "Số tiền còn lại hôm nay / Số tiền được tiêu hôm nay", **hai giá trị này luôn nằm chung một dòng** (không xuống dòng, không tách thành 2 dòng riêng biệt) — ví dụ hôm nay được tiêu 100.000đ, đã chi 20.000đ → hiển thị chung một dòng dạng "80.000đ / 100.000đ" (số còn lại hiển thị nổi bật hơn, số baseline theo sau trên cùng dòng, ngăn cách bằng "/"). "Số tiền được tiêu hôm nay" (baseline) được tính cố định cho ngày hôm nay, không giảm khi User chi tiêu trong ngày; chỉ phần "còn lại" giảm dần.
   - Ô 2 — Dự kiến hết: hiển thị "Dự kiến hết trong XX ngày", trong đó XX = **số ngày còn lại của chu kỳ Budget hiện tại, tính từ hôm nay tới trước lần Budget Reset Day kế tiếp** (xem công thức "Số ngày còn lại của chu kỳ" bên dưới). Giá trị này thay đổi mỗi ngày (giảm dần khi ngày hôm nay tiến gần tới Budget Reset Day kế tiếp), không còn tính theo tốc độ chi tiêu trung bình như bản cũ, và không còn là hằng số cố định bằng tổng độ dài chu kỳ như bản DELTA-007 trước đó (xem DELTA-009).
3. Edit Budget Button.

"Số tiền được tiêu hôm nay", "Số tiền còn lại hôm nay" và "Dự kiến hết" đều là derived data, tính runtime, không lưu thành field mới trong Local Storage — tương tự nguyên tắc áp dụng cho Financial Report (RPT-001).

Công thức (đã cập nhật theo Budget Reset Day — thay cho mốc "hết tháng dương lịch" cũ, giải quyết DELTA-004):

- **Số ngày còn lại của chu kỳ** = Ngày của lần Budget Reset Day kế tiếp − Ngày hôm nay (nếu một trong hai tháng liên quan không có đủ số ngày bằng `budgetResetDay`, dùng ngày cuối cùng của tháng đó làm mốc thực tế, áp dụng đúng rule đã thống nhất ở `specs/11_DATA_MODEL.md`/DELTA-003). Dùng chung cho cả baseline "Số tiền được tiêu hôm nay" và ô "Dự kiến hết". Thay thế hoàn toàn cách tính cũ dựa theo "hết tháng dương lịch" (`getRemainingDaysInMonth`).
- Số tiền được tiêu hôm nay (baseline, cố định trong ngày) = (Remaining Budget hiện tại + Tổng chi tiêu đã phát sinh hôm nay) / Số ngày còn lại của chu kỳ (theo định nghĩa ở trên).
- Số tiền còn lại hôm nay = Số tiền được tiêu hôm nay − Tổng chi tiêu đã phát sinh hôm nay (tối thiểu 0).
- Dự kiến hết (XX ngày) = Số ngày còn lại của chu kỳ (theo định nghĩa ở trên) — **tính từ hôm nay, không phải tổng độ dài chu kỳ**. Ví dụ: hôm nay là ngày 16, Budget Reset Day = 6 → Dự kiến hết còn khoảng 20 ngày (tới ngày 6 tháng sau), không phải 31 ngày. Nếu hôm nay trùng đúng Budget Reset Day (vừa mới reset chu kỳ), Số ngày còn lại của chu kỳ sẽ bằng đúng tổng độ dài chu kỳ (28–31 ngày tuỳ tháng) — đây là trường hợp đặc biệt trùng khớp, không phải quy tắc chung.

Ngưỡng cảnh báo vượt ngân sách hôm nay (EXP-007) dùng chung công thức "Số tiền được tiêu hôm nay" ở trên làm mốc so sánh, đảm bảo số hiển thị trên Dashboard khớp với điều kiện kích hoạt pop-up cảnh báo. Vì "Số ngày còn lại của chu kỳ" nay tính theo Budget Reset Day, ngưỡng EXP-007 cũng tự động theo đúng chu kỳ thực tế của User (không còn lệch với User có Budget Reset Day khác ngày cuối tháng).

Card chiếm toàn bộ chiều ngang khả dụng.

---

## Budget Streak Card

Hiển thị:

- Current Streak (số ngày streak hiện tại, dạng số).
- Streak Flame — dải **7 icon ngọn lửa**, mỗi icon tương ứng với 1 ngày trong chuỗi 7 ngày của Budget Streak hiện tại (ngày 1 → 7):
  - Ngày đã hoàn thành (đạt điều kiện STR-001 — tổng chi tiêu trong ngày ≤ Remaining Daily Budget hiện tại của ngày đó): icon ngọn lửa **hiện đầy đủ màu**.
  - Ngày chưa hoàn thành (chưa tới ngày đó, hoặc ngày đó đã qua nhưng không đạt điều kiện): icon ngọn lửa hiển thị dạng **bóng/outline (không màu)**, cùng hình dáng icon nhưng không tô màu.
  - Khi đủ cả 7/7 icon hiện màu, hệ thống trigger Budget Streak Reward (xem `specs/12_BUSINESS_RULES.md`, rule STR-004/STR-005).

Không hiển thị Longest Streak.

---

## Saving Goal Preview Card

Hiển thị tối đa:

2 Saving Goal đang ở trạng thái Active.

Nếu User có Saving Goal History.

↓

Button:

View All.

↓

Open Saving Goal Screen.

Saving Goal History chỉ hiển thị sau khi User mở Saving Goal.

Dashboard không hiển thị Saving Goal History.

---

## Weekly Spending Snapshot

Hiển thị:

- Weekly Spending.
- Weekly Budget.
- Progress Bar.

Không hiển thị so sánh với tuần trước.

---

## Pig Pig Insight Banner

Hiển thị:

- Pig Pig Illustration.
- Insight ngắn.
- Button:

Chat với Pig Pig.

---

## Bottom Navigation

Bao gồm đúng:

- Dashboard.
- Report.
- Add Expense.
- Reward.
- Pig Pig Chat.

Dashboard ở trạng thái Active.

---

# 7. Add Expense Layout

## Navigation Flow

Bottom Navigation

↓

Add Expense

↓

Submit Expense

↓

Quay lại Dashboard.

---

## Screen Structure

Header (Fixed)

↓

Scrollable Content

---

Bottom Navigation vẫn hiển thị.

---

## Header

Hiển thị:

- Screen Title.

---

## Scrollable Content

Chỉ bao gồm:

Add Expense Form.

---

## Add Expense Form

Hiển thị theo thứ tự:

- Expense Name.
- Category.
- Amount.
- Planned Date.
- Status.
- Note.
- Primary Button "Add Expense".

---

Status mặc định:

Planned.

User có thể chuyển sang:

Completed.

(nếu còn trong giới hạn Business Rule)

---

Sau khi tạo Expense thành công.

↓

Quay về Dashboard.

↓

Dashboard tự động cập nhật Budget.

---

Expense History.

Expense Detail.

Edit Expense.

KHÔNG thuộc Add Expense Layout.

Các màn hình này thuộc Financial Report.

---

# 8. Saving Goal Layout

## Navigation Flow

Dashboard

↓

Saving Goal Preview Card

↓

Saving Goal

↓

Back

↓

Dashboard.

---

## Screen Structure

Header (Fixed)

↓

Scrollable Content

---

Bottom Navigation vẫn hiển thị.

---

## Header

Hiển thị:

- Back Button.
- Screen Title.
- Create Saving Goal Button.

---

## Scrollable Content

Thứ tự hiển thị:

1. Saving Goal List.

↓

2. Saving Goal History.

---

## Saving Goal List

Hiển thị tối đa:

2 Saving Goal đang ở trạng thái Active.

Mỗi Card hiển thị:

- Goal Name.
- Current Amount.
- Target Amount.
- Progress Bar.
- Target Date.
- Deposit Button.
- Withdraw Button.

---

Button:

Create Saving Goal.

Hiển thị phía trên Saving Goal List.

---

## Saving Goal History

Hiển thị các Saving Goal đã:

- Completed.
- Cancelled.

Mỗi Card hiển thị:

- Goal Name.
- Amount.
- Status.
- Completed Date.

↓

Button:

View Detail.

---

Sau khi User chọn Back.

↓

Quay lại Dashboard.

Saving Goal không phải là một Item của Bottom Navigation.

---

# 9. Financial Report Layout

## Navigation Flow

Bottom Navigation

↓

Financial Report

↓

Expense History

↓

Expense Detail

↓

Edit Expense

↓

Back

↓

Expense Detail

↓

Back

↓

Expense History

↓

Back

↓

Financial Report

---

## Screen Structure

Header (Fixed)

↓

Scrollable Content

↓

Bottom Navigation (Fixed)

---

## Header

Hiển thị:

- Screen Title.

---

## Scrollable Content

Thứ tự hiển thị từ trên xuống dưới:

1. Filter Section.

↓

2. Category Analysis.

↓

3. Weekly Spending Comparison (chỉ hiển thị khi Time Filter = This Month — xem `feature-specs/25_REPORT.md`).

↓

4. Expense History Preview.

↓

5. Financial Summary (Weekly/Monthly Summary).

↓

6. Pig Pig Insight.

---

## Filter Section

Hiển thị:

- Time Filter.
- Category Filter.

---

### Time Filter

Bao gồm:

- This Week.
- This Month.

Mặc định:

This Week.

---

### Category Filter

Hiển thị:

Tất cả Category.

User có thể chọn một Category để xem báo cáo.

---

## Category Analysis

Hiển thị:

Biểu đồ phân tích chi tiêu theo Category.

↓

Danh sách Category.

↓

Amount.

↓

Percentage.

---

## Expense History Preview

Hiển thị:

3 Expense gần nhất.

Sắp xếp theo:

Planned Date giảm dần.

---

Mỗi Expense Card hiển thị:

- Category Icon.
- Expense Name.
- Amount.
- Planned Date.
- Status.
- Edit Icon.

---

User chọn:

Expense Card.

↓

Open Expense Detail.

---

User chọn:

Edit Icon.

↓

Open Edit Expense.

---

Button:

View All.

↓

Open Full Expense History.

---

## Full Expense History

Hiển thị:

Toàn bộ Expense của User.

Sắp xếp theo:

Planned Date giảm dần.

---

User chọn Expense.

↓

Open Expense Detail.

---

User chọn Edit Icon.

↓

Open Edit Expense.

---

## Financial Summary

Hiển thị (Weekly Summary hoặc Monthly Summary tuỳ Time Filter):

- Total Budget.
- Total Spending.
- Remaining Budget.
- Budget Usage Percentage.

---

## Pig Pig Insight

Hiển thị:

- Nội dung Insight (Báo cáo + Khuyên ngắn gọn), data-driven theo Overspend Day và Dominant Category của kỳ đang chọn (xem `feature-specs/25_REPORT.md`).
- Button "Chat với Pig Pig" → mở Pig Pig Chat.

---

## Bottom Navigation

Bao gồm:

- Dashboard.
- Report.
- Add Expense.
- Reward.
- Pig Pig Chat.

Report ở trạng thái Active.

---

# 10. Reward Marketplace Layout

## Navigation Flow

Bottom Navigation

↓

Reward Marketplace

↓

Voucher Detail

↓

Redeem Voucher

↓

My Voucher

↓

Redeemed Voucher Detail

---

## Screen Structure

Header (Fixed)

↓

Scrollable Content

↓

Bottom Navigation (Fixed)

---

## Header

Hiển thị:

- Screen Title.

---

## Scrollable Content

Thứ tự hiển thị:

1. Pig Coin Balance Card.

↓

2. Voucher List.

↓

3. My Voucher Button.

---

## Pig Coin Balance Card

Hiển thị:

- Pig Coin Balance.

---

## Voucher List

Hiển thị dạng danh sách dọc.

Mỗi Voucher Card hiển thị:

- Brand Logo.
- Brand Name.
- Voucher Title.
- Pig Coin Cost.
- Expired Date.
- Status.

---

User chọn Voucher.

↓

Open Voucher Detail.

---

## Voucher Detail

Hiển thị theo thứ tự:

- Brand Image.
- Brand Name.
- Pig Coin Cost.
- Expired Date.
- Chi tiết ưu đãi.
- Nội dung ưu đãi.
- Điều khoản & Điều kiện.
- Button "Đổi ngay".

---

## My Voucher

Hiển thị:

Voucher đã đổi.

↓

User chọn Voucher.

↓

Open Redeemed Voucher Detail.

---

## Redeemed Voucher Detail

Hiển thị:

- Brand Image.
- Brand Name.
- Voucher Title.
- Voucher Code.
- Expired Date.
- Chi tiết ưu đãi.
- Điều khoản & Điều kiện.
- Status.

---

## Bottom Navigation

Bao gồm:

- Dashboard.
- Report.
- Add Expense.
- Reward.
- Pig Pig Chat.

Reward ở trạng thái Active.

---

# 11. Pig Pig Chat Layout

## Navigation Flow

Bottom Navigation

↓

Pig Pig Chat

↓

View All Chat History

↓

Conversation

↓

Back

↓

Pig Pig Chat

---

## Screen Structure

Header (Fixed)

↓

Scrollable Chat Area

↓

Chat Input Area (Fixed)

↓

Bottom Navigation (Fixed)

---

## Header

Hiển thị:

- Screen Title.
- Button "View All Chat History".

---

## Chat Area

Hiển thị hội thoại.

Tin nhắn Pig Pig:

Căn trái.

---

Tin nhắn User:

Căn phải.

---

Chat Area cuộn theo chiều dọc.

---

## Suggestion Questions

Hiển thị theo trạng thái thu gọn/mở rộng:

### Trạng thái mặc định — Collapsed

- Chỉ hiển thị 03 Suggested Questions đầu tiên.
- Ngay bên dưới danh sách hiển thị Text Button: **"View all"**.
- Không render 17 Suggested Questions còn lại trong trạng thái mặc định.

### Trạng thái mở rộng — Expanded

User chọn **"View all"**.

↓

- Hiển thị tối đa 20 Suggested Questions/FAQ.
- Text Button đổi thành **"View less"**.
- User vẫn có thể chọn bất kỳ Suggested Question nào trong danh sách mở rộng.

User chọn **"View less"**.

↓

- Thu gọn lại còn 03 Suggested Questions đầu tiên.
- Text Button trở lại **"View all"**.

### Interaction Rules

User chọn Suggested Question.

↓

Gửi trực tiếp câu hỏi đã chọn vào Chat Flow.

Việc mở rộng hoặc thu gọn Suggested Questions:

- Không xoá Chat History.
- Không thay đổi nội dung đang nhập trong Chat Input.
- Không tự động gửi câu hỏi.
- Không điều hướng sang màn hình khác.

---

## Chat Input Area

Luôn cố định phía trên Bottom Navigation.

Hiển thị trên cùng một hàng ngang:

- Text Input.
- Send Button dạng icon.

### Text Input

- Chiếm toàn bộ chiều rộng còn lại của hàng.
- Chiều cao cố định: **56 px** (`h-14`).
- Không hiển thị Label hoặc chữ **"Message"** phía trên Input.
- Có thể hiển thị Placeholder: **"Hỏi Pig Pig về tài chính của bạn..."**.
- Nhấn Enter gửi tin nhắn.
- Khi lỗi nhập trống, Error Message hiển thị bên dưới Text Input.

### Send Button

- Dạng Button vuông.
- Kích thước cố định: **56 × 56 px** (`h-14 w-14`).
- Chỉ hiển thị Send Icon, không hiển thị Text Label.
- Căn giữa theo chiều dọc với khung Text Input.
- Disabled trong thời gian Pig Pig đang xử lý câu trả lời.

### Alignment Rules

- Text Input và Send Button phải có cùng chiều cao 56 px.
- Hai khung phải bắt đầu tại cùng một vị trí theo trục dọc.
- Không để Label của Input làm Send Button bị cao hoặc thấp hơn Input.
- Error Message chỉ mở rộng khu vực bên dưới Input, không làm thay đổi vị trí trên cùng của Send Button.

---

## Chat History

Hiển thị theo dòng thời gian.

Nhóm theo:

- Hôm nay.
- Hôm qua.
- Các ngày trước.

Trong mỗi nhóm.

↓

Các cuộc hội thoại được sắp xếp theo thời gian giảm dần.

---

User chọn Conversation.

↓

Quay lại màn hình Chat với toàn bộ nội dung cuộc trò chuyện.

---

## Bottom Navigation

Bao gồm:

- Dashboard.
- Report.
- Add Expense.
- Reward.
- Pig Pig Chat.

Pig Pig Chat ở trạng thái Active.

---

# 12. Notification Layout

## Navigation Flow

Dashboard

↓

Notification Icon

↓

Notification Center

↓

Notification Detail

↓

Back

↓

Dashboard

---

## Screen Structure

Header (Fixed)

↓

Scrollable Content

---

Bottom Navigation không hiển thị.

---

## Header

Hiển thị:

- Back Button.
- Screen Title.

---

## Scrollable Content

Hiển thị:

Notification List.

---

Notification được sắp xếp theo:

Created Time giảm dần.

Notification mới nhất hiển thị đầu tiên.

---

Mỗi Notification Card hiển thị:

- Notification Icon.
- Title.
- Message Preview.
- Created Time.
- Read Status.

---

Nếu Notification chưa đọc.

↓

Hiển thị chấm màu xanh.

---

User chọn Notification.

↓

Open Notification Detail.

---

## Notification Detail

Hiển thị theo thứ tự:

- Icon.
- Title.
- Full Message.
- Created Time.

---

Nếu Notification có màn hình liên quan.

↓

Hiển thị Button:

"Xem chi tiết".

↓

Đi tới màn hình tương ứng.

---

# 13. Profile Layout

## Navigation Flow

Dashboard

↓

Profile Icon

↓

Profile

↓

Financial Setting Detail

↓

Back

↓

Profile

↓

Back

↓

Dashboard

---

## Screen Structure

Header (Fixed)

↓

Scrollable Content

---

Bottom Navigation không hiển thị.

---

## Header

Hiển thị:

- Back Button.
- Screen Title.

---

## Scrollable Content

Thứ tự hiển thị:

1. User Information Card.

↓

2. Pig Coin Wallet Card.

↓

3. Financial Setting Card.

↓

4. App Setting Card.

↓

5. About Card.

↓

6. Logout Button.

---

## User Information Card

Hiển thị:

- Avatar.
- User ID.
- User Name.
- Occupation.
- Joined Date.

---

## Pig Coin Wallet Card

Hiển thị:

- Pig Coin Balance.

Pig Coin chỉ mang tính hiển thị.

---

## Financial Setting Card

Hiển thị:

- Monthly Income.
- Fixed Expense.
- Budget Cycle.

↓

Button:

Edit Financial Information.

---

## Financial Setting Detail

Hiển thị theo thứ tự:

- Monthly Income Input.
- Fixed Expense Input.
- Budget Cycle.
- Monthly Budget Preview.
- Save Button.

Monthly Budget chỉ hiển thị.

Không cho phép chỉnh sửa trực tiếp.

---

## App Setting Card

Hiển thị:

- Local Push Notification Switch.

Chỉ ảnh hưởng đến Local Push Notification.

Không ảnh hưởng Notification Center.

---

## About Card

Hiển thị:

- App Name.
- Version.
- Copyright.

---

## Logout Button

Luôn nằm cuối màn hình.

Sử dụng Danger Style.

---

# 14. Laptop Demo Mode

PACE được thiết kế theo Mobile First.

Trong MVP, ứng dụng được trình chiếu trên Laptop dưới dạng Mobile Click-through Prototype.

---

## Demo Layout

Laptop

↓

Background

↓

Mobile Frame

↓

PACE App

---

## Mobile Frame

Kích thước đề xuất:

390 × 844 px.

---

Frame Radius:

32px.

---

App luôn nằm giữa màn hình Laptop.

---

## Demo Rules

Không chuyển giao diện sang Desktop.

Không thay đổi:

- Component Size.
- Typography.
- Spacing.
- Bottom Navigation.

Laptop chỉ đóng vai trò thiết bị trình chiếu.

Trải nghiệm sử dụng vẫn mô phỏng hoàn toàn như trên điện thoại.

---

# 15. Layout Checklist

Trước khi hoàn thành giao diện của mỗi màn hình, cần kiểm tra:

---

## Structure

✓ Đúng Header.

✓ Đúng Scrollable Content.

✓ Đúng Bottom Navigation (nếu là Main Navigation Screen).

✓ Child Screen có Back Button.

---

## Navigation

✓ Bottom Navigation chỉ gồm:

- Dashboard.
- Report.
- Add Expense.
- Reward.
- Pig Pig Chat.

---

✓ Saving Goal được mở từ Dashboard.

✓ Notification được mở từ Dashboard.

✓ Profile được mở từ Dashboard.

✓ Expense History được mở từ Financial Report.

✓ Expense Detail được mở từ Expense History.

✓ Edit Expense được mở từ Expense History hoặc Expense Detail.

---

## Layout

✓ Component hiển thị đúng thứ tự.

✓ Card không bị chồng lên nhau.

✓ Không để Bottom Navigation che nội dung.

✓ Scroll hoạt động đúng.

---

## Consistency

✓ Tuân thủ Design System.

✓ Tuân thủ Component Library.

✓ Tuân thủ Feature Specification.

✓ Không tự ý thay đổi vị trí Component.

✓ Không tự thêm Bottom Navigation Item.

---

# 16. Relationship with Other Specifications

UI Layout phụ thuộc vào:

- Design System.
- Component Library.
- Screen Map.
- Feature Specification.

---

Nếu có mâu thuẫn.

Thứ tự ưu tiên:

Business Rules

↓

Feature Specification

↓

Design System

↓

UI Layout

---

UI Layout chỉ định nghĩa:

- Bố cục.
- Thứ tự Component.
- Navigation.
- Cách hiển thị.

UI Layout không định nghĩa:

- Business Logic.
- Data Model.
- Validation.
- Business Rule.

---

# End of Document
