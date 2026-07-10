# 08. ONBOARDING

Version: 1.1 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

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

## Budget Initialization

PACE hỗ trợ hai kịch bản khởi tạo Budget.

### Scenario A

User bắt đầu sử dụng ứng dụng vào ngày đầu tiên của tháng.

↓

Financial Setup yêu cầu User nhập:

- Monthly Income
- Fixed Expenses

↓

System tự động tính:

Budget = Monthly Income - Fixed Expenses

↓

Budget này sẽ được sử dụng làm Budget mặc định cho tháng hiện tại.

↓

Ở các tháng tiếp theo, User chỉ cần cập nhật Monthly Income nếu có thay đổi.

---

### Scenario B

User bắt đầu sử dụng ứng dụng từ giữa hoặc cuối tháng.

↓

Financial Setup yêu cầu User nhập:

"Số tiền bạn còn có thể chi tiêu trong phần còn lại của tháng này."

↓

Giá trị này được sử dụng làm Budget của tháng đầu tiên.

↓

Đến ngày Reset Budget của tháng tiếp theo.

↓

Hệ thống yêu cầu User nhập:

- Monthly Income
- Fixed Expenses

↓

System tự động tính Budget hàng tháng từ thời điểm đó.

---

User luôn có thể chỉnh sửa Budget sau khi hoàn thành Onboarding thông qua chức năng Edit Budget trên Dashboard.

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

Hệ thống tự xác định Scenario dựa trên ngày User bắt đầu sử dụng ứng dụng.

---

### Scenario A

Nếu User bắt đầu sử dụng vào ngày đầu tiên của tháng.

↓

Hiển thị:

- Monthly Income
- Fixed Expenses

↓

System tự động tính:

Budget = Monthly Income - Fixed Expenses

↓

Hiển thị:

"Bạn sẽ có XXX để chi tiêu trong tháng."

---

### Scenario B

Nếu User bắt đầu sử dụng từ giữa hoặc cuối tháng.

↓

Hiển thị:

"Số tiền bạn còn có thể chi tiêu trong phần còn lại của tháng này."

↓

User chỉ cần nhập một giá trị.

↓

Giá trị này được sử dụng làm Budget của tháng đầu tiên.

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

### Scenario A

User nhập:

- Monthly Income
- Fixed Expenses

---

### Scenario B

User nhập:

- Remaining Budget của tháng hiện tại.

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

System xác định Scenario hiện tại.

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

Validation thành công.

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

Hệ thống tự động xác định Scenario dựa trên ngày User bắt đầu sử dụng ứng dụng.

---

### Scenario A

(Ngày đầu tiên của tháng)

Hiển thị:

- Monthly Income
- Fixed Expenses

↓

System tự động tính:

Budget = Monthly Income - Fixed Expenses

↓

Hiển thị:

"Bạn sẽ có XXX để chi tiêu trong tháng."

---

### Scenario B

(Từ ngày thứ hai của tháng trở đi)

Hiển thị:

"Số tiền bạn còn có thể chi tiêu trong phần còn lại của tháng này."

↓

User chỉ nhập Remaining Budget.

---

Sau khi hoàn thành Onboarding.

↓

Ngày User hoàn thành Onboarding sẽ trở thành Budget Reset Day mặc định.

Ví dụ:

User hoàn thành Onboarding ngày 12.

↓

Từ tháng tiếp theo.

↓

Ngày 12 hàng tháng.

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

Nếu User bắt đầu sử dụng vào ngày đầu tiên của tháng.

↓

Financial Setup hiển thị:

- Monthly Income.
- Fixed Expenses.

↓

System tự động tính:

Budget = Monthly Income - Fixed Expenses.

---

## AC-004

Nếu User bắt đầu sử dụng từ ngày thứ hai của tháng trở đi.

↓

Financial Setup chỉ yêu cầu User nhập:

Remaining Budget của tháng hiện tại.

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

Budget Reset Day mặc định bằng ngày User hoàn thành Onboarding.

↓

Đến Budget Reset Day của tháng tiếp theo.

↓

Hệ thống yêu cầu User cập nhật:

- Monthly Income.
- Fixed Expenses.

↓

System tính Budget mới.

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

- Budget được khởi tạo theo hai Scenario.
- Saving Goal trong Onboarding là Optional.
- Budget Reset Day mặc định bằng ngày User hoàn thành Onboarding.
- User có thể chỉnh sửa Budget và Budget Reset Day sau khi hoàn thành Onboarding.
- User chỉ thực hiện Onboarding một lần.

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
