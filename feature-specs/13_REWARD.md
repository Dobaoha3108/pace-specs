# 13. REWARD MARKETPLACE

Version: 1.1 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Purpose

Reward Marketplace là Feature cho phép User sử dụng Pig Coin để đổi Voucher.

Trong phiên bản MVP, Reward Marketplace chỉ hỗ trợ Voucher.

Reward Marketplace sử dụng Mock Data để phục vụ mục đích demo.

Không kết nối API với Brand thật.

Voucher Code chỉ dùng để minh họa và không có giá trị quy đổi thực tế.

---

# 2. Business Objective

Reward Marketplace giúp User:

- Xem danh sách Voucher có thể đổi.
- Xem chi tiết Voucher.
- Đổi Voucher bằng Pig Coin.
- Xem Voucher đã đổi.
- Tăng cảm giác gamification trong quá trình quản lý tài chính.

---

# 3. Business Responsibility

Reward Marketplace chịu trách nhiệm:

- Hiển thị Pig Coin Balance.
- Hiển thị Voucher List.
- Hiển thị Voucher Detail.
- Redeem Voucher.
- Tạo UserReward sau khi đổi Voucher thành công.
- Hiển thị My Voucher.
- Hiển thị Voucher Code.

Reward Marketplace không chịu trách nhiệm:

- Tạo Pig Coin.
- Tính Budget Streak.
- Xác thực Voucher với Brand thật.
- Quản lý Expense.
- Quản lý Saving Goal.
- Chat với Pig Pig.

---

# 4. Demo Rule

Trong MVP Demo, hệ thống cấp sẵn cho User:

- Initial Pig Coin Balance = 500

Mục đích:

- Cho phép demo luồng đổi Voucher ngay lập tức.
- Không cần User phải đạt Budget Streak trước khi trải nghiệm Reward Marketplace.

Lưu ý:

Trong phiên bản thực tế, User không được cấp sẵn Pig Coin.

Pig Coin chỉ được nhận thông qua các Reward Condition hợp lệ, ví dụ Budget Streak.

---

# 5. Mock Voucher Data

Reward Marketplace sử dụng dữ liệu Voucher mẫu.

Mỗi Voucher bao gồm:

- Voucher ID
- Brand Name
- Brand Logo
- Voucher Title
- Description
- Pig Coin Cost
- Expired Date
- Terms & Conditions
- Voucher Status
- Voucher Code

---

## Sample Voucher Data

### Voucher 1

Brand Name

Highlands Coffee

Voucher Title

Giảm 20.000đ cho hóa đơn từ 60.000đ

Description

Voucher dành riêng cho khách hàng thân thiết của PACE.

Pig Coin Cost

50

Expired Date

31/12/2026

Terms & Conditions

- Áp dụng tại tất cả cửa hàng Highlands Coffee.
- Không áp dụng đồng thời với các chương trình khuyến mãi khác.
- Không quy đổi thành tiền mặt.
- Mỗi Voucher chỉ sử dụng một lần.

Voucher Code

PACE-HL20K-2026

Status

Active

---

### Voucher 2

Brand Name

CGV

Voucher Title

Giảm 30.000đ vé xem phim

Description

Voucher dành riêng cho khách hàng thân thiết của PACE.

Pig Coin Cost

80

Expired Date

31/12/2026

Terms & Conditions

- Áp dụng tại các cụm rạp CGV.
- Không áp dụng cho suất chiếu đặc biệt.
- Không quy đổi thành tiền mặt.
- Mỗi Voucher chỉ sử dụng một lần.

Voucher Code

PACE-CGV30K-2026

Status

Active

---

### Voucher 3

Brand Name

Circle K

Voucher Title

Giảm 15.000đ cho hóa đơn từ 50.000đ

Description

Voucher dành riêng cho khách hàng thân thiết của PACE.

Pig Coin Cost

40

Expired Date

31/12/2026

Terms & Conditions

- Áp dụng cho mua trực tiếp tại cửa hàng.
- Không áp dụng với thuốc lá và thẻ cào.
- Không quy đổi thành tiền mặt.
- Mỗi Voucher chỉ sử dụng một lần.

Voucher Code

PACE-CK15K-2026

Status

Active

---

### Voucher 4

Brand Name

Mixue

Voucher Title

Giảm 10.000đ cho đồ uống bất kỳ

Description

Voucher dành riêng cho khách hàng thân thiết của PACE.

Pig Coin Cost

30

Expired Date

31/12/2026

Terms & Conditions

- Áp dụng tại các cửa hàng Mixue tham gia chương trình.
- Không áp dụng đồng thời với chương trình giảm giá khác.
- Không quy đổi thành tiền mặt.
- Mỗi Voucher chỉ sử dụng một lần.

Voucher Code

PACE-MX10K-2026

Status

Active

---

### Voucher 5

Brand Name

ShopeeFood

Voucher Title

Freeship 25.000đ

Description

Voucher dành riêng cho khách hàng thân thiết của PACE.

Pig Coin Cost

60

Expired Date

31/12/2026

Terms & Conditions

- Áp dụng cho đơn hàng đủ điều kiện.
- Không áp dụng cùng Voucher Freeship khác.
- Không quy đổi thành tiền mặt.
- Mỗi Voucher chỉ sử dụng một lần.

Voucher Code

PACE-SF25K-2026

Status

Active

---

# 6. Screen Overview

Feature Name

Reward Marketplace

---

Business Goal

Cho phép User đổi Pig Coin lấy Voucher.

---

Entry Point

Bottom Navigation

↓

Reward

---

Exit Point

- Voucher Detail
- My Voucher
- Dashboard
- Bottom Navigation Modules

---

# 7. Screen Type

Main Navigation Screen

---

## Navigation Context

Reward Marketplace là một màn hình chính trong Bottom Navigation.

Bottom Navigation luôn hiển thị trên màn hình Reward Marketplace.

Tab Reward luôn ở trạng thái Selected khi User đang ở màn hình này.

---

# 8. Used Components

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-009 Voucher Card
- CMP-013 Empty State
- CMP-014 Loading State
- CMP-015 Confirmation Dialog

---

# 9. Preconditions

- User đã hoàn thành Onboarding.
- PigCoinWallet đã được khởi tạo.
- Demo User có sẵn 500 Pig Coins.
- Voucher Mock Data đã được load.
- Không cần kết nối API Brand thật.

---

# 10. Reward Screens

Reward Marketplace bao gồm các Screen sau.

---

## Screen 1

### Reward Marketplace

Hiển thị:

- Pig Coin Balance.
- Voucher List.
- My Voucher Entry Point.

---

## Screen 2

### Voucher Detail

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

## Screen 3

### My Voucher

Hiển thị Voucher User đã đổi.

Bao gồm ba trạng thái:

- Available.
- Used.
- Expired.

---

## Screen 4

### Redeemed Voucher Detail

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

# 11. User Flow

## Open Reward Marketplace Flow

Bottom Navigation

↓

Reward

↓

Load Pig Coin Balance

↓

Load Mock Voucher Data

↓

Render Reward Marketplace

---

## Redeem Voucher Flow

Reward Marketplace

↓

Voucher Detail

↓

User click "Đổi ngay"

↓

Confirmation Dialog

↓

Confirm

↓

Validate Pig Coin Balance

↓

Decrease Pig Coin Balance

↓

Create UserReward

↓

Show Redeemed Voucher Detail

---

## My Voucher Flow

Reward Marketplace

↓

My Voucher

↓

Select Voucher

↓

Redeemed Voucher Detail

---

# 12. Screen Content

## Reward Marketplace

Hiển thị:

- Pig Coin Balance.
- Voucher List.
- My Voucher Button.

Mỗi Voucher Card hiển thị:

- Brand Logo.
- Brand Name.
- Voucher Title.
- Pig Coin Cost.
- Expired Date.
- Status.

---

## Voucher Detail

Hiển thị:

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

Hiển thị Voucher đã đổi.

Phân loại theo:

- Available.
- Used.
- Expired.

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

# 13. User Actions

User có thể:

- Xem Voucher List.
- Xem Voucher Detail.
- Redeem Voucher.
- Xem My Voucher.
- Xem Redeemed Voucher Detail.
- Đánh dấu Voucher là đã sử dụng (Mark as Used).

---

# 14. System Response

## Open Reward Marketplace

User mở Reward Marketplace.

↓

System tải:

- Pig Coin Balance.
- Mock Voucher Data.
- UserReward Data.

↓

Render Reward Marketplace.

---

## View Voucher Detail

User chọn một Voucher.

↓

System mở Voucher Detail.

---

## Redeem Voucher

User chọn:

Đổi ngay.

↓

System mở Confirmation Dialog.

---

User xác nhận đổi Voucher.

↓

System kiểm tra:

- Pig Coin Balance.
- Voucher Status.
- Expired Date.

---

Nếu hợp lệ.

↓

System:

- Trừ Pig Coin.
- Cập nhật Pig Coin Balance.
- Tạo UserReward.
- Tạo Notification "Đổi Voucher thành công".
- Chuyển sang Redeemed Voucher Detail.

---

Nếu không hợp lệ.

↓

Hiển thị thông báo lỗi.

---

## View My Voucher

User mở:

My Voucher.

↓

System tải danh sách Voucher đã đổi.

↓

Render My Voucher.

---

## View Redeemed Voucher Detail

User chọn một Voucher đã đổi.

↓

System mở Redeemed Voucher Detail.

---

## Mark as Used

User chọn:

Mark as Used.

↓

System cập nhật:

Status = Used.

↓

Refresh My Voucher.

---

# 15. Navigation

## Bottom Navigation

User chọn:

Reward.

↓

Open Reward Marketplace.

---

## Reward Marketplace

User chọn Voucher.

↓

Open Voucher Detail.

---

User chọn:

My Voucher.

↓

Open My Voucher.

---

## Voucher Detail

User chọn:

Đổi ngay.

↓

Confirmation Dialog.

↓

Confirm.

↓

Redeemed Voucher Detail.

---

## My Voucher

User chọn Voucher.

↓

Redeemed Voucher Detail.

---

## Redeemed Voucher Detail

User chọn:

Mark as Used.

↓

Update Status.

↓

Refresh Screen.

---

# 16. Display Rules

## Reward Marketplace

Luôn hiển thị:

- Pig Coin Balance.
- Voucher List.
- My Voucher.

---

Pig Coin Balance của Demo User mặc định:

500 Pig Coins.

---

Voucher có:

Status = Active.

↓

Hiển thị bình thường.

---

Voucher có:

Status = Out Of Stock.

↓

Hiển thị Badge:

Out of Stock.

↓

Không cho phép đổi.

---

Voucher có:

Status = Expired.

↓

Hiển thị Badge:

Expired.

↓

Không cho phép đổi.

---

## Voucher Detail

Hiển thị:

- Brand Image.
- Brand Name.
- Pig Coin Cost.
- Expired Date.
- Chi tiết ưu đãi.
- Nội dung ưu đãi.
- Điều khoản & Điều kiện.
- Button "Đổi ngay".

---

Button "Đổi ngay" chỉ được Enable khi:

- Voucher còn hiệu lực.
- User đủ Pig Coin.

---

Nếu User không đủ Pig Coin.

↓

Button Disabled.

↓

Hiển thị:

"Bạn chưa đủ Pig Coin để đổi Voucher này."

---

## My Voucher

Hiển thị Voucher đã đổi.

Phân loại:

- Available.
- Used.
- Expired.

---

Nếu chưa có Voucher.

↓

Hiển thị Empty State.

↓

Button:

Khám phá Voucher.

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

Nếu Status = Available.

↓

Hiển thị Button:

Mark as Used.

---

Nếu Status = Used.

↓

Hiển thị Badge:

Used.

↓

Ẩn Button.

---

Nếu Status = Expired.

↓

Hiển thị Badge:

Expired.

↓

Ẩn Button.

---

# 17. Validation

## Redeem Voucher

Điều kiện hợp lệ:

- User đủ Pig Coin.
- Voucher Status = Active.
- Voucher chưa hết hạn.

---

Nếu không hợp lệ.

↓

Không cho phép đổi Voucher.

---

## Mark as Used

Chỉ cho phép khi:

Status = Available.

---

# 18. Screen States

## Reward Marketplace

- Loading.
- Empty.
- Normal.
- Error.

---

## Voucher Detail

- Loading.
- Normal.
- Error.

---

## My Voucher

- Loading.
- Empty.
- Normal.
- Error.

---

## Redeemed Voucher Detail

- Loading.
- Normal.
- Error.

---

## Confirmation Dialog

- Visible.
- Hidden.

---

# 19. Error Handling

## Voucher Load Failed

Hiển thị:

"Không thể tải danh sách Voucher."

↓

Button:

"Thử lại"

---

## Pig Coin Load Failed

Hiển thị:

"Không thể tải Pig Coin."

↓

Button:

"Thử lại"

---

## Redeem Failed

Hiển thị:

"Không thể đổi Voucher."

↓

Button:

"Thử lại"

---

## Not Enough Pig Coin

Hiển thị:

"Bạn chưa đủ Pig Coin để đổi Voucher này."

↓

Không trừ Pig Coin.

↓

Không tạo UserReward.

---

## Voucher Unavailable

Hiển thị:

"Voucher hiện không khả dụng."

↓

Không cho phép đổi.

---

## Update Voucher Failed

Hiển thị:

"Không thể cập nhật Voucher."

↓

Button:

"Thử lại"

---

# 20. Related Specification

## Domain Model

- PigCoinWallet
- Reward
- UserReward
- Notification

---

## Business Workflow

- Reward Marketplace

---

## System Workflow

- Reward Processing
- Pig Coin Processing
- Notification Processing

---

## Data Model

- PigCoinWallet
- Reward
- UserReward
- Notification

---

## Business Rules

- RWD-001
- RWD-002
- RWD-003
- RWD-004
- RWD-005
- RWD-006

---

## UI Components

- CMP-001 App Header
- CMP-002 Bottom Navigation
- CMP-003 Primary Button
- CMP-004 Secondary Button
- CMP-009 Voucher Card
- CMP-013 Empty State
- CMP-014 Loading State
- CMP-015 Confirmation Dialog

---

# 21. Acceptance Criteria

## AC-001

User có thể mở Reward Marketplace từ Bottom Navigation.

---

## AC-002

Demo User mặc định có:

500 Pig Coins.

---

## AC-003

Reward Marketplace hiển thị:

- Pig Coin Balance.
- Voucher List.
- My Voucher.

---

## AC-004

Mỗi Voucher Card hiển thị:

- Brand Logo.
- Brand Name.
- Voucher Title.
- Pig Coin Cost.
- Expired Date.
- Status.

---

## AC-005

User có thể xem Voucher Detail.

Voucher Detail hiển thị:

- Brand Image.
- Brand Name.
- Pig Coin Cost.
- Expired Date.
- Chi tiết ưu đãi.
- Nội dung ưu đãi.
- Điều khoản & Điều kiện.
- Button "Đổi ngay".

---

## AC-006

Nếu User đủ Pig Coin.

↓

Cho phép đổi Voucher.

---

## AC-007

Đổi Voucher thành công.

↓

System:

- Trừ Pig Coin.
- Tạo UserReward.
- Tạo Notification.
- Chuyển Voucher vào My Voucher.

---

## AC-008

My Voucher được phân loại theo:

- Available.
- Used.
- Expired.

---

## AC-009

User có thể xem Redeemed Voucher Detail.

Bao gồm:

- Brand Image.
- Brand Name.
- Voucher Title.
- Voucher Code.
- Expired Date.
- Chi tiết ưu đãi.
- Điều khoản & Điều kiện.
- Status.

---

## AC-010

User có thể chuyển Voucher từ:

Available

↓

Used.

---

## AC-011

Voucher ở trạng thái:

Used

hoặc

Expired

↓

Không thể sử dụng lại.

---

## AC-012

Nếu User không đủ Pig Coin.

↓

Không cho phép đổi Voucher.

↓

Hiển thị thông báo lỗi.

---

## AC-013

Reward Marketplace sử dụng Mock Data.

Không kết nối API của Brand.

Voucher chỉ phục vụ mục đích Demo.

---

## AC-014

Nếu xảy ra lỗi khi:

- Load Voucher.
- Đổi Voucher.
- Cập nhật trạng thái Voucher.

↓

Hiển thị thông báo lỗi.

↓

Cho phép User thử lại.

---

# 22. Open Questions

Hiện tại MVP đã thống nhất:

- Reward Marketplace chỉ hỗ trợ Voucher.
- Voucher sử dụng Mock Data.
- Demo User được cấp sẵn 500 Pig Coins.
- Voucher đổi thành công sẽ được lưu trong My Voucher.
- My Voucher được chia thành:
  - Available.
  - Used.
  - Expired.
- Voucher chỉ sử dụng Voucher Code để minh họa.
- Voucher Detail và Redeemed Voucher Detail đều hiển thị:
  - Chi tiết ưu đãi.
  - Điều khoản & Điều kiện.
- Không kết nối hệ thống của Brand.

Các nội dung sau chưa thuộc phạm vi MVP:

- Thanh toán trực tiếp bằng Voucher.
- Đồng bộ Voucher với Brand.
- Redeem nhiều Voucher cùng lúc.
- Chuyển Voucher cho người khác.
- Mua Pig Coin.

---

# 23. Future Enhancements

Các cải tiến có thể bổ sung trong các phiên bản tiếp theo:

- Kết nối API Voucher của đối tác.
- Đồng bộ trạng thái Voucher theo thời gian thực.
- Tự động cập nhật thời hạn Voucher.
- Thêm nhiều loại Reward ngoài Voucher.
- Gợi ý Voucher phù hợp bằng AI.
- Tìm kiếm Voucher.
- Lọc Voucher theo Brand hoặc danh mục.
- Lịch sử giao dịch Pig Coin.

Các nội dung trên không ảnh hưởng tới kiến trúc hiện tại của Feature.

---

# End of Document
