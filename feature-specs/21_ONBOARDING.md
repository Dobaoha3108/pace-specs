# 08. ONBOARDING

Version: 1.3 (MVP, Final)

Project: PACE - Personal Finance Management App

Status: Final (đã merge DELTA-003 và DELTA-006, xem `docs/03_DELTA_SPEC.md` và `docs/04_CHANGE_LOG.md`)

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

> Đã merge từ DELTA-003 và DELTA-006 (`docs/03_DELTA_SPEC.md`).

Financial Setup luôn hỏi User trước tiên:

"Bạn nhận Income (lương/trợ cấp...) vào ngày nào hàng tháng?"

User chọn một ngày từ **1 đến 31** thông qua UI chọn lịch (calendar/day-picker) — đây là **Budget Reset Day**, bắt buộc phải chọn, không có giá trị mặc định.

Nếu tháng hiện tại không có đủ số ngày đó (ví dụ chọn 31 nhưng tháng chỉ có 28/29/30 ngày), hệ thống dùng ngày cuối cùng của tháng đó làm Budget Reset Day thực tế trong tháng thiếu ngày.

Budget Reset Day chỉ được **lưu lại** để xác định thời điểm chu kỳ Budget tiếp theo bắt đầu (khi nào PACE nhắc User cập nhật Monthly Income/Fixed Expenses cho chu kỳ mới). Ngày này **không** ảnh hưởng tới các trường cần nhập trong Financial Setup — dù Onboarding vào ngày nào, User vẫn luôn nhập đủ Monthly Income và Fixed Expenses ngay từ đầu (xem DELTA-006).

---

## Budget Initialization

> Đã merge từ DELTA-006 (`docs/03_DELTA_SPEC.md`) — bỏ khái niệm Scenario A/B, chỉ còn một luồng duy nhất.

Dù User hoàn thành Onboarding vào ngày nào trong tháng, Financial Setup luôn yêu cầu User nhập đủ:

- Budget Reset Day (xem mục trên).
- Monthly Income.
- Fixed Expenses.

↓

System tự động tính:

Budget = Monthly Income - Fixed Expenses

↓

Budget này được sử dụng làm Budget cho chu kỳ hiện tại (có thể là chu kỳ rút gọn nếu hôm nay chưa tới Budget Reset Day — nhưng User vẫn nhập đủ Monthly Income/Fixed Expenses ngay từ đầu, không phải đợi tới chu kỳ sau).

↓

Ở các chu kỳ tiếp theo (khi tới Budget Reset Day), User chỉ cần cập nhật Monthly Income/Fixed Expenses nếu có thay đổi.

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
- CMP-016 Day Picker Grid

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

---

### Step 2.1 — Nhập Monthly Income & Fixed Expenses (bắt buộc, mọi User)

> Đã merge từ DELTA-006 — áp dụng bất kể ngày hôm nay là ngày nào so với Budget Reset Day vừa chọn.

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

User chọn/nhập (bắt buộc với mọi User, không phân biệt ngày Onboarding):

- Budget Reset Day (ngày nhận Income hàng tháng), qua UI chọn lịch.
- Monthly Income.
- Fixed Expenses.

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

System yêu cầu User chọn Budget Reset Day trước tiên.

↓

Validate Budget Reset Day (Required, 1–31).

↓

Nếu hợp lệ, hiển thị tiếp Monthly Income và Fixed Expenses (bắt buộc, mọi User).

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

Validation thành công (đã chọn Budget Reset Day + Monthly Income + Fixed Expenses hợp lệ).

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

Sau khi đã chọn Budget Reset Day, luôn hiển thị Monthly Income và Fixed Expenses — bắt buộc nhập với **mọi** User, không phân biệt ngày Onboarding là ngày nào (đã merge DELTA-006, bỏ khái niệm Scenario A/B).

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

## Budget Reset Day

- Required.
- Chỉ chọn qua UI lịch (calendar/day-picker), không cho nhập tay tự do.
- Giá trị hợp lệ: số nguyên từ 1 đến 31.
- Nếu tháng hiện tại không có đủ số ngày đó, hệ thống tự dùng ngày cuối tháng làm Reset Day thực tế trong tháng đó (không coi là lỗi Validation).

---

## Monthly Income & Fixed Expenses

> Đã merge từ DELTA-006 — áp dụng cho **mọi** User, không phân biệt ngày Onboarding.

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
- CMP-016 Day Picker Grid

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

> Cập nhật theo DELTA-006 — bỏ khái niệm Scenario A/B.

Sau khi User chọn Budget Reset Day ở Bước 0, Financial Setup **luôn** hiển thị (bất kể ngày hôm nay là ngày nào so với Budget Reset Day vừa chọn):

- Monthly Income.
- Fixed Expenses.

↓

System tự động tính:

Budget = Monthly Income - Fixed Expenses.

---

## AC-004

> **Đã bỏ (DELTA-006).** Trước đây AC-004 mô tả "Scenario B": nếu ngày hôm nay khác Budget Reset Day, Financial Setup chỉ yêu cầu nhập Remaining Budget. Hành vi này không còn tồn tại — mọi User đều theo AC-003.

---

## AC-004a

Financial Setup luôn yêu cầu User chọn Budget Reset Day (qua UI lịch, 1–31) **trước tiên**, trước khi hiển thị Monthly Income/Fixed Expenses.

↓

Không được đi tiếp nếu chưa chọn Budget Reset Day.

---

## AC-005

Monthly Income phải lớn hơn 0.

Fixed Expenses phải lớn hơn hoặc bằng 0.

Fixed Expenses không được lớn hơn Monthly Income.

Áp dụng cho **mọi** User (không phân biệt ngày Onboarding).

---

## AC-006

> **Đã bỏ (DELTA-006).** Trường "Remaining Budget" không còn tồn tại trong Onboarding.

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

- Financial Setup luôn yêu cầu User nhập đủ 3 thông tin — Budget Reset Day, Monthly Income, Fixed Expenses — bất kể Onboarding vào ngày nào trong tháng. Không còn khái niệm Scenario A/B (đã bỏ theo DELTA-006, xem `docs/03_DELTA_SPEC.md` — thay thế cách tiếp cận cũ ở DELTA-003).
- Saving Goal trong Onboarding là Optional.
- Budget Reset Day do User tự chọn qua UI Day Picker Grid (CMP-016) trong Financial Setup, hỏi **trước tiên** (Step 2.0, trước Monthly Income/Fixed Expenses) — bắt buộc, không còn mặc định theo ngày hoàn thành Onboarding (xem `docs/03_DELTA_SPEC.md`, DELTA-003 — Merged).
- Tháng thiếu ngày (VD chọn 31, tháng chỉ có 28/29/30 ngày): hệ thống dùng ngày cuối tháng làm Budget Reset Day thực tế của tháng đó.
- User có thể chỉnh sửa Budget và Budget Reset Day sau khi hoàn thành Onboarding.
- User chỉ thực hiện Onboarding một lần.

Không thuộc phạm vi của Onboarding, theo dõi riêng ở `docs/03_DELTA_SPEC.md` (DELTA-004, Proposed, chưa merge):

- Các công thức "số ngày còn lại trong chu kỳ" ở Dashboard/Expense (hiện tính theo hết tháng dương lịch) có nên đổi sang tính theo "tới Budget Reset Day tiếp theo" hay không — không ảnh hưởng hành vi của Onboarding, chỉ ảnh hưởng độ chính xác hiển thị ở feature khác cho User có Budget Reset Day khác ngày cuối tháng.

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
