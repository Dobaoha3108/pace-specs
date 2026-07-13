# 08. ONBOARDING

Version: 1.2 (MVP, Draft — chờ xác nhận DELTA-003 trước khi chốt Final)

Project: PACE - Personal Finance Management App

Status: Draft (xem `docs/03_DELTA_SPEC.md` — DELTA-003)

---

# 1. Purpose

Onboarding là Feature đầu tiên mà User trải nghiệm sau khi mở ứng dụng lần đầu.

Mục tiêu của Onboarding là:

- Giới thiệu giá trị cốt lõi của PACE.
- Thu thập thông tin tài chính ban đầu của User.
- Khởi tạo Budget đầu tiên.
- Cho phép User tạo Saving Goal đầu tiên (Optional).
- Chuẩn bị dữ liệu để User bắt đầu sử dụng Dashboard.

Onboarding chỉ hiển thị một lần đối với mỗi User.

---

# 2. Business Objective

Sau khi hoàn thành Onboarding:

- User có Budget đầu tiên.
- User có thể có Saving Goal đầu tiên (Optional).
- Dashboard đã sẵn sàng hiển thị dữ liệu.
- Hệ thống có đủ dữ liệu để tính Remaining Budget và Remaining Daily Budget.

---

## Budget Reset Day (Ngày nhận Income hàng tháng)

> Cập nhật theo DELTA-003 (`docs/03_DELTA_SPEC.md`).

Trước khi xác định Scenario, Financial Setup luôn hỏi User trước tiên:

"Bạn nhận Income (lương/trợ cấp...) vào ngày nào hàng tháng?"

User chọn một ngày từ **1 đến 31** thông qua UI chọn lịch (calendar/day-picker) — đây là **Budget Reset Day**, bắt buộc phải chọn, không có giá trị mặc định.

Nếu tháng hiện tại không có đủ số ngày đó (ví dụ chọn 31 nhưng tháng chỉ có 28/29/30 ngày), hệ thống dùng ngày cuối cùng của tháng đó làm Budget Reset Day thực tế trong tháng thiếu ngày.

Sau khi có Budget Reset Day, System so sánh **ngày hôm nay** với **Budget Reset Day vừa chọn** để xác định Scenario.

---

## Budget Initialization

PACE hỗ trợ hai kịch bản khởi tạo Budget.

### Scenario A

Ngày hôm nay **đúng bằng** Budget Reset Day User vừa chọn (User bắt đầu sử dụng ứng dụng đúng vào ngày bắt đầu chu kỳ mới).

↓

Financial Setup yêu cầu User nhập:

- Monthly Income
- Fixed Expenses

↓

System tự động tính:

Budget = Monthly Income - Fixed Expenses

↓

Budget này sẽ được sử dụng làm Budget mặc định cho chu kỳ hiện tại.

↓

Ở các chu kỳ tiếp theo, User chỉ cần cập nhật Monthly Income nếu có thay đổi.

---

### Scenario B

Ngày hôm nay **khác** Budget Reset Day User vừa chọn (chu kỳ hiện tại đã bắt đầu từ trước, User cài đặt/setup app giữa chừng chu kỳ).

↓

Financial Setup yêu cầu User nhập:

"Số tiền bạn còn có thể chi tiêu tới trước [Budget Reset Day tiếp theo]."

↓

Giá trị này được sử dụng làm Budget của chu kỳ đầu tiên (chu kỳ rút gọn, tính từ hôm nay tới trước lần Budget Reset Day tiếp theo).

↓

Đến đúng Budget Reset Day của chu kỳ tiếp theo.

↓

Hệ thống yêu cầu User nhập:

- Monthly Income
- Fixed Expenses

↓

System tự động tính Budget hàng tháng từ thời điểm đó.

---

User luôn có thể chỉnh sửa Budget và Budget Reset Day sau khi hoàn thành Onboarding thông qua chức năng Edit Budget trên Dashboard.

---

# 3. Screen Overview

Feature Name

Onboarding

---

Business Goal

Thu thập dữ liệu tối thiểu để User có thể bắt đầu quản lý tài chính.

---

Entry Point

Splash

---

Exit Point

Dashboard

---

# 4. Screen Type

Entry Screen

---

# 5. Used Components

- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-014 Loading State
- CMP-015 Confirmation Dialog

---

# 6. Preconditions

- User mở ứng dụng lần đầu.
- User chưa hoàn thành Onboarding.

---

# 7. User Flow

```
Splash

↓

Welcome

↓

Financial Setup

↓

(Optional)

Create First Saving Goal

↓

Completed

↓

Dashboard
```

---

# 8. Screen Content

Feature Onboarding bao gồm bốn bước.

---

## Step 1

### Welcome

Hiển thị:

- Logo PACE
- App Name
- Welcome Message
- Illustration

Button:

Bắt đầu

---

## Step 2

### Financial Setup

### Step 2.0 — Chọn Budget Reset Day (bắt buộc, hiển thị đầu tiên)

Hiển thị:

- Câu hỏi: "Bạn nhận Income vào ngày nào hàng tháng?"
- UI chọn lịch (calendar/day-picker), cho phép chọn 1 ngày từ 1–31.

User phải chọn một ngày mới được đi tiếp.

↓

Hệ thống dùng lựa chọn này để xác định Scenario A hay B (so sánh với ngày hôm nay).

---

Hệ thống tự xác định Scenario dựa trên so sánh **ngày hôm nay** với **Budget Reset Day User vừa chọn**.

---

### Scenario A

Nếu ngày hôm nay đúng bằng Budget Reset Day vừa chọn.

↓

Hiển thị:

- Monthly Income
- Fixed Expenses

↓

System tự động tính:

Budget = Monthly Income - Fixed Expenses

↓

Hiển thị:

"Bạn sẽ có XXX để chi tiêu trong chu kỳ này."

---

### Scenario B

Nếu ngày hôm nay khác Budget Reset Day vừa chọn.

↓

Hiển thị:

"Số tiền bạn còn có thể chi tiêu tới trước [Budget Reset Day tiếp theo]."

↓

User chỉ cần nhập một giá trị.

↓

Giá trị này được sử dụng làm Budget của chu kỳ đầu tiên (chu kỳ rút gọn).

---

## Step 3

### Create First Saving Goal (Optional)

Hiển thị:

"Bạn có muốn tạo hũ tiết kiệm đầu tiên không?"

User có thể:

- Tạo Saving Goal
- Để sau

---

Nếu User chọn tạo Saving Goal.

↓

User nhập:

- Goal Name
- Target Amount
- Target Date
- Saving Mode

---

Nếu User chọn "Để sau".

↓

Bỏ qua bước này.

---

## Step 4

### Completed

Pig Pig hiển thị lời chào.

Ví dụ:

"Chúc mừng!

PACE đã sẵn sàng đồng hành cùng bạn."

Button:

Bắt đầu sử dụng

---

# 9. User Actions

## Welcome

- Click "Bắt đầu".

---

## Financial Setup

### Bước 0 (bắt buộc, mọi Scenario)

User chọn:

- Budget Reset Day (ngày nhận Income hàng tháng), qua UI chọn lịch.

---

### Scenario A

User nhập:

- Monthly Income
- Fixed Expenses

---

### Scenario B

User nhập:

- Remaining Budget của chu kỳ hiện tại.

---

## Saving Goal

User có thể:

- Tạo Saving Goal.
- Chọn "Để sau".

---

## Completed

Click:

"Bắt đầu sử dụng"

↓

Dashboard

---

# 10. System Response

## Welcome

User chọn "Bắt đầu".

↓

Open Financial Setup.

---

## Financial Setup

System yêu cầu User chọn Budget Reset Day trước tiên (Bước 0).

↓

Validate Budget Reset Day (Required, 1–31).

↓

Nếu hợp lệ, System xác định Scenario hiện tại bằng cách so sánh ngày hôm nay với Budget Reset Day vừa chọn.

---

### Scenario A

↓

Validate:

- Monthly Income
- Fixed Expenses

↓

Nếu hợp lệ.

↓

System tính:

Budget = Monthly Income - Fixed Expenses

↓

Khởi tạo Budget.

↓

Open Create First Saving Goal.

---

### Scenario B

↓

Validate Remaining Budget.

↓

Nếu hợp lệ.

↓

Khởi tạo Budget.

↓

Open Create First Saving Goal.

---

Nếu dữ liệu không hợp lệ.

↓

Hiển thị Validation Error.

↓

Ở lại Financial Setup.

---

## Saving Goal

Nếu User tạo Saving Goal.

↓

System khởi tạo Saving Goal.

↓

Open Completed.

---

Nếu User chọn "Để sau".

↓

Bỏ qua Saving Goal.

↓

Open Completed.

---

## Completed

User chọn "Bắt đầu sử dụng".

↓

Open Dashboard.

---

# 11. Navigation

## Welcome

User click "Bắt đầu".

↓

Open Financial Setup.

---

## Financial Setup

Budget Reset Day chưa được chọn.

↓

Không cho đi tiếp, hiển thị Validation Error ngay tại UI chọn lịch.

---

Validation thành công (đã chọn Budget Reset Day + các trường theo Scenario hợp lệ).

↓

Open Create First Saving Goal.

---

Validation thất bại.

↓

Ở lại Financial Setup.

↓

Hiển thị Validation Error.

---

## Create First Saving Goal

User chọn "Tạo Saving Goal".

↓

Lưu Saving Goal.

↓

Open Completed.

---

User chọn "Để sau".

↓

Open Completed.

---

## Completed

User click "Bắt đầu sử dụng".

↓

Open Dashboard.

---

# 12. Display Rules

## Welcome

Hiển thị:

- Logo PACE
- Welcome Message
- Illustration
- Primary Button

Không hiển thị:

- Bottom Navigation
- App Header

---

## Financial Setup

Hiển thị đầu tiên, bắt buộc với mọi User: UI chọn lịch để chọn Budget Reset Day (1–31). Không đi tiếp được nếu chưa chọn.

↓

Sau khi đã chọn Budget Reset Day, hệ thống tự động xác định Scenario dựa trên so sánh ngày hôm nay với Budget Reset Day vừa chọn (không còn dựa trên "ngày đầu tháng dương lịch" như trước).

---

### Scenario A

(Ngày hôm nay đúng bằng Budget Reset Day vừa chọn)

Hiển thị:

- Monthly Income
- Fixed Expenses

↓

System tự động tính:

Budget = Monthly Income - Fixed Expenses

↓

Hiển thị:

"Bạn sẽ có XXX để chi tiêu trong chu kỳ này."

---

### Scenario B

(Ngày hôm nay khác Budget Reset Day vừa chọn)

Hiển thị:

"Số tiền bạn còn có thể chi tiêu tới trước [Budget Reset Day tiếp theo]."

↓

User chỉ nhập Remaining Budget.

---

Sau khi hoàn thành Onboarding.

↓

Budget Reset Day đã lưu chính là ngày User tự chọn ở Bước 0 của Financial Setup — **không** còn lấy theo ngày hoàn thành Onboarding.

Ví dụ:

User chọn Budget Reset Day là ngày 25 (vì đây là ngày User nhận lương), dù User hoàn thành Onboarding vào ngày 12.

↓

Từ chu kỳ tiếp theo.

↓

Ngày 25 hàng tháng (nếu tháng đó không có ngày 25 trở lên đủ như trường hợp chọn 29/30/31, hệ thống dùng ngày cuối tháng thay thế).

↓

PACE gửi Notification:

"Đã đến kỳ cập nhật thu nhập tháng mới."

↓

User cập nhật:

- Monthly Income
- Fixed Expenses

↓

System tính Budget mới.

---

## Create First Saving Goal

Saving Goal là bước Optional.

User có thể:

- Tạo Saving Goal.
- Chọn "Để sau".

Nếu chọn "Để sau".

↓

Dashboard sẽ hiển thị Saving Goal Empty State.

---

## Completed

Hiển thị:

- Pig Pig Illustration.
- Welcome Message.
- Primary Button.

Không hiển thị dữ liệu tài chính.

---

# 13. Validation

## Budget Reset Day (mọi Scenario)

- Required.
- Chỉ chọn qua UI lịch (calendar/day-picker), không cho nhập tay tự do.
- Giá trị hợp lệ: số nguyên từ 1 đến 31.
- Nếu tháng hiện tại không có đủ số ngày đó, hệ thống tự dùng ngày cuối tháng làm Reset Day thực tế trong tháng đó (không coi là lỗi Validation).

---

## Scenario A

Monthly Income

- Required.
- Chỉ cho phép nhập số.
- Phải lớn hơn 0.

---

Fixed Expenses

- Required.
- Chỉ cho phép nhập số.
- Phải lớn hơn hoặc bằng 0.
- Không được lớn hơn Monthly Income.

---

Budget

Được System tự động tính.

Budget phải lớn hơn 0.

---

## Scenario B

Remaining Budget

- Required.
- Chỉ cho phép nhập số.
- Phải lớn hơn 0.

---

## Saving Goal

Goal Name

- Required.

---

Target Amount

- Required.
- Phải lớn hơn 0.

---

Target Date

- Required.

Nếu Target Date là hôm nay.

↓

Thời gian phải lớn hơn thời điểm tạo Saving Goal.

---

Saving Mode

- Required.

---

# 14. Screen States

## Welcome

- Normal

---

## Financial Setup

- Normal
- Validation Error

---

## Saving Goal

- Empty
- Normal
- Validation Error

---

## Completed

- Normal

---

## Loading

Trong quá trình:

- Create Budget
- Create Saving Goal
- Initialize Dashboard

↓

Hiển thị:

CMP-014 Loading State

---

# 15. Error Handling

## Validation Error

Khi User nhập dữ liệu không hợp lệ.

↓

Ngay lập tức hiển thị thông báo màu đỏ bên dưới trường dữ liệu.

Ví dụ:

- "Vui lòng nhập số hợp lệ."
- "Giá trị phải lớn hơn 0."
- "Chi phí cố định không được lớn hơn thu nhập."

Thông báo sẽ tự động biến mất ngay sau khi User nhập dữ liệu hợp lệ.

---

## Continue With Invalid Data

Nếu User vẫn nhấn "Tiếp tục" khi còn Validation Error.

↓

Hiển thị Dialog:

"Không thể tiếp tục.

Vui lòng kiểm tra lại các trường dữ liệu."

↓

Không tạo Budget.

↓

Không chuyển sang bước tiếp theo.

---

## Budget Creation Failed

Validation đã thành công.

Nhưng hệ thống không thể lưu Budget.

↓

Hiển thị thông báo:

"Không thể khởi tạo Budget."

↓

Hiển thị nút:

"Thử lại"

---

## Saving Goal Creation Failed

Validation đã thành công.

Nhưng hệ thống không thể tạo Saving Goal.

↓

Hiển thị:

"Không thể tạo hũ tiết kiệm."

↓

User có thể:

- Thử lại.
- Chọn "Để sau".

---

## Dashboard Initialization Failed

Hiển thị:

"Không thể khởi tạo Dashboard."

↓

Hiển thị nút:

"Thử lại"

---

# 16. Related Specification

## Domain Model

- User
- Budget
- Saving Goal

---

## Business Workflow

- User Onboarding & Budget Initialization

---

## System Workflow

- Budget Processing
- Saving Goal Processing

---

## Data Model

- User
- Budget
- SavingGoal

---

## Business Rules

- BGT-001
- BGT-002
- BGT-003

- SVG-001
- SVG-002
- SVG-003

---

## UI Components

- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-014 Loading State
- CMP-015 Confirmation Dialog

---

# 17. Acceptance Criteria

## AC-001

Khi User mở ứng dụng lần đầu.

↓

Hệ thống luôn mở Onboarding.

---

## AC-002

User hoàn thành Welcome.

↓

Hệ thống chuyển sang Financial Setup.

---

## AC-003

Nếu ngày hôm nay đúng bằng Budget Reset Day User vừa chọn ở Bước 0.

↓

Financial Setup hiển thị:

- Monthly Income.
- Fixed Expenses.

↓

System tự động tính:

Budget = Monthly Income - Fixed Expenses.

---

## AC-004

Nếu ngày hôm nay khác Budget Reset Day User vừa chọn ở Bước 0.

↓

Financial Setup chỉ yêu cầu User nhập:

Remaining Budget của chu kỳ hiện tại.

---

## AC-004a

Financial Setup luôn yêu cầu User chọn Budget Reset Day (qua UI lịch, 1–31) **trước khi** xác định Scenario A hay B.

↓

Không được đi tiếp nếu chưa chọn Budget Reset Day.

---

## AC-005

Monthly Income phải lớn hơn 0.

Fixed Expenses phải lớn hơn hoặc bằng 0.

Fixed Expenses không được lớn hơn Monthly Income.

---

## AC-006

Remaining Budget phải lớn hơn 0.

---

## AC-007

Sau khi Validation thành công.

↓

Budget được khởi tạo thành công.

---

## AC-008

Budget Reset Day **do User tự chọn** qua UI lịch ở Bước 0 của Financial Setup — **không** còn mặc định bằng ngày User hoàn thành Onboarding.

↓

Đến Budget Reset Day của chu kỳ tiếp theo (hoặc ngày cuối tháng, nếu tháng đó không có đủ số ngày User đã chọn).

↓

Hệ thống yêu cầu User cập nhật:

- Monthly Income.
- Fixed Expenses.

↓

System tính Budget mới.

---

## AC-008b

Nếu User không chọn Budget Reset Day (bỏ trống).

↓

Hệ thống không cho tiếp tục, hiển thị Validation Error tại UI chọn lịch.

---

## AC-009

User có thể thay đổi Budget Reset Day sau này trong Budget Settings.

---

## AC-010

Saving Goal là bước Optional.

User có thể:

- Tạo Saving Goal.
- Chọn "Để sau".

Cả hai trường hợp đều được phép tiếp tục.

---

## AC-011

Nếu User tạo Saving Goal.

↓

Saving Goal được lưu thành công.

↓

Dashboard hiển thị Saving Goal sau khi hoàn thành Onboarding.

---

## AC-012

Nếu User chọn "Để sau".

↓

Dashboard hiển thị Saving Goal Empty State.

↓

User có thể tạo Saving Goal sau.

---

## AC-013

Saving Goal phải thỏa điều kiện:

- Goal Name hợp lệ.
- Target Amount > 0.
- Target Date hợp lệ.
- Saving Mode được chọn.

---

## AC-014

Nếu Target Date là ngày hiện tại.

↓

Thời gian phải lớn hơn thời điểm tạo Saving Goal.

---

## AC-015

Sau khi hoàn thành Onboarding.

↓

Dashboard được mở.

↓

User không quay lại Onboarding ở những lần mở ứng dụng tiếp theo.

---

## AC-016

Nếu xảy ra lỗi khi khởi tạo Budget hoặc Saving Goal.

↓

Hiển thị thông báo lỗi.

↓

Cho phép User thử lại.

---

## AC-017

Trong suốt quá trình Onboarding.

↓

Không hiển thị:

- Bottom Navigation.
- Notification.
- Profile.

---

## AC-018

Sau khi Dashboard được mở.

↓

Bottom Navigation bắt đầu hiển thị.

---

# 18. Open Questions

Hiện tại MVP đã thống nhất:

- Budget được khởi tạo theo hai Scenario, xác định bằng cách so sánh ngày hôm nay với Budget Reset Day User tự chọn.
- Saving Goal trong Onboarding là Optional.
- Budget Reset Day do User tự chọn qua UI lịch trong Financial Setup (bắt buộc, không còn mặc định theo ngày hoàn thành Onboarding — xem `docs/03_DELTA_SPEC.md`, DELTA-003).
- User có thể chỉnh sửa Budget và Budget Reset Day sau khi hoàn thành Onboarding.
- User chỉ thực hiện Onboarding một lần.

Đang chờ xác nhận (xem DELTA-003 để biết chi tiết):

- Thứ tự hỏi Budget Reset Day trong Step 2 (trước hay sau Income/Fixed Expenses).
- Có cần đổi công thức "số ngày còn lại trong chu kỳ" ở Dashboard/Expense (hiện đang tính theo hết tháng dương lịch) sang tính theo "tới Budget Reset Day tiếp theo" hay không — nếu có, sẽ cần một Delta riêng (DELTA-004) vì ảnh hưởng ra ngoài phạm vi Onboarding.

Các nội dung sau chưa thuộc phạm vi MVP:

- Đồng bộ dữ liệu Cloud.
- Đăng nhập nhiều thiết bị.
- Import dữ liệu từ ứng dụng khác.
- Đồng bộ tài khoản ngân hàng.
- AI tự động phân tích Income.

---

# 19. Future Enhancements

Các cải tiến có thể bổ sung trong tương lai:

- AI gợi ý Budget dựa trên lịch sử chi tiêu.
- AI đề xuất Fixed Expenses phổ biến.
- Hỗ trợ nhiều Budget Cycle.
- Hỗ trợ nhiều nguồn Income.
- Cho phép nhập thu nhập định kỳ tự động.
- Đồng bộ Budget với tài khoản ngân hàng.

Các nội dung trên không ảnh hưởng tới kiến trúc hiện tại của Feature.

---

# End of Document
