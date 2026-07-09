# 17. DESIGN SYSTEM

Version: 1.0 (MVP)

Project: PACE - Personal Finance Management App

Status: Final

---

# 1. Design Philosophy

PACE được thiết kế theo triết lý:

**Simple • Friendly • Motivating**

Ứng dụng hướng tới sinh viên và người mới đi làm, vì vậy trải nghiệm cần trực quan, gần gũi và tạo cảm giác tích cực khi quản lý tài chính.

Thay vì tập trung vào việc ghi chép chi tiêu như các ứng dụng truyền thống, PACE hướng người dùng tới việc hình thành thói quen chi tiêu lành mạnh thông qua:

- Budget Engine
- Pig Pig AI Companion
- Gamification

Pig Pig đóng vai trò là người đồng hành trong toàn bộ trải nghiệm, giúp người dùng hiểu tình hình tài chính bằng ngôn ngữ đơn giản, thân thiện và dễ tiếp cận.

---

# 2. Design Goals

Toàn bộ giao diện của PACE hướng tới các mục tiêu sau:

- Dễ học và dễ sử dụng ngay từ lần đầu.
- Giảm cảm giác "quản lý tài chính khô khan".
- Khuyến khích người dùng quay lại ứng dụng hằng ngày.
- Tạo cảm giác tích cực khi hoàn thành mục tiêu tài chính.
- Đồng nhất trải nghiệm trên toàn bộ ứng dụng.

---

# 3. Color Palette

| Token | Color | Usage |
|---------|---------|---------|
| Primary Blue | #6BA1FF | Brand, Primary Button, Active State |
| Primary Yellow | #FFF23D | Pig Coin, Highlight, Streak Flame |
| Pig Pig Pink | #FBB0C0 | Pig Pig Main Body / Face |
| Pig Pig Highlight | #FDC9D3 | Highlight on Pig Pig Body |
| Pig Pig Dark Pink | #F58098 | Pig Pig Ear / Nose / Accent |
| Pig Pig Blush | #F4707E | Pig Pig Cheek / Blush |
| Success Green | #32E15E | Saving Goal, Success State |
| Warning Orange | #FFA200 | Budget Warning |
| Danger Red | #FF4D4F | Over Budget, Error |
| Background | #F7F9FC | App Background |
| Surface | #FFFFFF | Card Background |
| Text Primary | #1F2937 | Main Text |
| Text Secondary | #6B7280 | Subtitle |
| Border | #E5E7EB | Divider & Border |

---

## Color Usage Rules

Primary Blue chỉ sử dụng cho:

- Primary Button.
- Active Bottom Navigation.
- Selected State.
- Link.
- Progress Highlight.

---

Primary Yellow chỉ sử dụng cho:

- Pig Coin.
- Coin Balance.
- Reward Highlight.
- Streak Flame.
- Gamification Element liên quan đến tiền hoặc coin.

---

Pig Pig Pink chỉ sử dụng cho:

- Thân chính của Pig Pig.
- Mặt Pig Pig.
- Pig Pig Illustration.

---

Pig Pig Highlight chỉ sử dụng cho:

- Vùng sáng trên thân Pig Pig.
- Highlight nhẹ trong Pig Pig Illustration.

---

Pig Pig Dark Pink chỉ sử dụng cho:

- Tai Pig Pig.
- Mũi Pig Pig.
- Túi hoặc phần nhấn đậm của Pig Pig.

---

Pig Pig Blush chỉ sử dụng cho:

- Má hồng của Pig Pig.
- Biểu cảm cảm xúc của Pig Pig.

---

Success Green chỉ sử dụng cho:

- Saving Goal Completed.
- Success Message.
- Completed Status.

---

Warning Orange chỉ sử dụng cho:

- Budget Warning.
- Pending Reminder.
- Warning Banner.

---

Danger Red chỉ sử dụng cho:

- Validation Error.
- Over Budget.
- Critical Action.

---

Background luôn sử dụng:

#F7F9FC

---

Card luôn sử dụng:

Surface White.


# 4. Typography

## Font Family

Primary Font

SF Pro Display (iOS)

Fallback

Inter (Android / Web)

---

## Typography Scale

| Style | Size | Weight |
|---------|------|---------|
| H1 | 32 | Bold |
| H2 | 24 | Bold |
| Title | 20 | SemiBold |
| Subtitle | 18 | Medium |
| Body | 16 | Regular |
| Caption | 13 | Medium |

---

## Typography Usage Rules

H1

Chỉ sử dụng cho:

- Splash.
- Onboarding.

---

H2

Sử dụng cho:

- Screen Title.
- Dashboard Summary.

---

Title

Sử dụng cho:

- Card Title.
- Dialog Title.

---

Subtitle

Sử dụng cho:

- Section Header.

---

Body

Sử dụng cho:

- Nội dung chính.
- Input.
- Button.

---

Caption

Sử dụng cho:

- Helper Text.
- Label.
- Timestamp.
- Validation Message.

---

# 5. Spacing System

PACE sử dụng quy tắc:

8pt Grid System.

---

## Spacing Scale

- 4px
- 8px
- 16px
- 24px
- 32px
- 48px

---

## Layout Rules

Khoảng cách giữa hai Component:

16px

---

Khoảng cách giữa hai Section:

24px

---

Padding mặc định của Screen:

16px

---

Padding mặc định của Card:

20px

---

# 6. Grid System

Mobile First.

PACE được thiết kế như một Mobile App.

Thiết kế chính sử dụng:

4-Column Grid.

---

Safe Area luôn được ưu tiên trên:

- iOS.
- Android.

---

Content luôn căn theo:

16px Horizontal Margin.

---

Bottom Navigation luôn nằm trong Safe Area.

---

## Laptop Demo Mode

Mặc dù PACE là Mobile App, bản MVP có thể được trình chiếu trên Laptop dưới dạng Mobile Click-through Prototype.

Khi trình chiếu trên Laptop:

- Giao diện vẫn giữ kích thước và tỷ lệ của Mobile App.
- App được đặt trong một Mobile Frame ở giữa màn hình.
- User có thể click và tương tác như đang dùng điện thoại.
- Không chuyển UI sang Desktop Layout.
- Không mở rộng Component theo toàn bộ màn hình Laptop.

---

## Recommended Demo Frame

Mobile Frame Width:

390px

---

Mobile Frame Height:

844px

---

Frame Radius:

32px

---

Frame Background:

#FFFFFF

---

Outer Background:

#EAF1FF

---

## Laptop Demo Rules

Trên Laptop, PACE phải hiển thị như một ứng dụng điện thoại được mô phỏng.

Không thiết kế lại thành Web Dashboard.

Không thay đổi Bottom Navigation.

Không thay đổi spacing, typography hoặc component size theo Desktop.

Laptop chỉ đóng vai trò môi trường trình chiếu.


# 7. Border Radius

PACE sử dụng Border Radius lớn nhằm tạo cảm giác mềm mại, thân thiện và hiện đại.

| Component | Radius |
|-----------|--------|
| Button | 16px |
| Input | 16px |
| Card | 24px |
| Bottom Sheet | 28px |
| Dialog | 24px |
| Pig Pig Bubble | 28px |
| Chip | 16px |
| Avatar | Circle |

---

## Border Radius Rules

Không sử dụng góc vuông (0px) cho bất kỳ Component nào.

Tất cả Card, Button và Dialog phải tuân thủ Radius đã quy định.

---

# 8. Elevation & Shadow

PACE sử dụng Shadow nhẹ để tạo chiều sâu.

Không sử dụng Shadow đậm.

---

## Card Shadow

Offset Y

4px

Blur

16px

Opacity

10%

---

## Dialog Shadow

Offset Y

8px

Blur

24px

Opacity

15%

---

## Floating Button Shadow

Offset Y

6px

Blur

20px

Opacity

15%

---

## Elevation Rules

Không chồng nhiều Shadow trên cùng một màn hình.

Một Component chỉ sử dụng một mức Shadow.

---

# 9. Components Style

## Primary Button

- Full Width
- Height: 56px
- Radius: 16px
- Primary Blue Background
- White Text

---

### States

- Default
- Pressed
- Disabled
- Loading

---

## Secondary Button

- White Background
- Blue Border
- Blue Text

---

### States

- Default
- Pressed
- Disabled

---

## Input

- Height: 56px
- Radius: 16px
- Filled Style
- Currency Formatting Support

---

### States

- Default
- Focused
- Error
- Disabled

---

## Card

- White Background
- Radius: 24px
- Padding: 20px
- Soft Shadow

---

## Progress Bar

- Rounded
- Animated
- Used cho:
  - Budget Progress
  - Saving Goal Progress

---

## Pig Pig Card

- Yellow Accent
- Rounded Corner
- Pig Pig Illustration
- CTA Button

---

## Dialog

- Radius: 24px
- Primary Button
- Secondary Button
- Center Aligned

---

## Bottom Sheet

- Radius: 28px
- Drag Indicator
- Slide Up Animation

---

# 10. Iconography

## Icon Style

- Rounded
- Filled
- 24 × 24px

---

## Recommended Library

Lucide Icons

---

## Icon Categories

- Wallet
- Calendar
- Target
- Shopping
- Food
- Transport
- Entertainment
- Education
- Saving
- Reward
- Chat
- Notification
- Settings
- Profile

---

## Icon Usage Rules

Một chức năng luôn sử dụng cùng một Icon trong toàn bộ ứng dụng.

Ví dụ:

Saving Goal luôn dùng Target.

Reward luôn dùng Gift.

Pig Pig luôn dùng Pig Illustration.

Không thay đổi Icon giữa các màn hình.

---

# 11. Illustration Style

Illustration sử dụng phong cách:

- Flat Vector
- Rounded Shape
- Soft Shadow
- Friendly Expression
- Bright Color Palette

---

Pig Pig là nhân vật trung tâm của toàn bộ hệ thống minh họa.

Pig Pig xuất hiện tại:

- Splash
- Onboarding
- Dashboard
- Reward
- Pig Pig Chat
- Empty State

---

## Brand Illustration

Logo thương hiệu (Highlands, CGV, Circle K...)

Sử dụng Logo chính thức hoặc Mock Logo.

Không chỉnh sửa màu sắc thương hiệu.

---

## Empty State Illustration

Empty State luôn sử dụng Illustration đơn giản.

Không sử dụng ảnh thật.

Ví dụ:

- Empty Expense
- Empty Saving Goal
- Empty Notification
- Empty Reward

---

# 12. CTA Hierarchy

Một màn hình chỉ có một Primary CTA.

Các hành động còn lại sử dụng Secondary Button hoặc Text Button.

Ví dụ:

Dashboard

Primary CTA

- Add Expense

---

Saving Goal

Primary CTA

- Create Saving Goal

---

Reward

Primary CTA

- Redeem

---

Pig Pig Chat

Primary CTA

- Send Message

---

Profile

Primary CTA

- Save

---

Nếu trên màn hình có nhiều Action.

↓

Chỉ một Action được sử dụng Primary Button.

---

# 13. Design Tokens

## Color

color.primary

Primary Blue

---

color.secondary

Primary Yellow

---

color.success

Success Green

---

color.warning

Warning Orange

---

color.danger

Danger Red

---

color.background

Background

---

color.surface

Surface White

---

## Radius

radius.button

16

---

radius.input

16

---

radius.card

24

---

radius.dialog

24

---

radius.bottomSheet

28

---

## Spacing

spacing.xs

4

---

spacing.sm

8

---

spacing.md

16

---

spacing.lg

24

---

spacing.xl

32

---

spacing.xxl

48

---

## Typography

font.h1

32

---

font.h2

24

---

font.title

20

---

font.subtitle

18

---

font.body

16

---

font.caption

13

---

# 14. Motion

PACE sử dụng Animation nhẹ nhằm tạo cảm giác mượt mà và thân thiện.

Animation chỉ đóng vai trò hỗ trợ trải nghiệm.

Không sử dụng Animation phức tạp hoặc gây mất tập trung.

---

## Animation Duration

| Animation | Duration |
|------------|----------|
| Micro Interaction | 150ms |
| Button Press | 150ms |
| Card Animation | 250ms |
| Bottom Sheet | 300ms |
| Page Transition | 300ms |
| Dialog | 250ms |

---

## Animation Curve

Ease In Out

---

## Motion Usage

Sử dụng Animation cho:

- Button Press
- Card Fade In
- Progress Bar
- Bottom Sheet
- Dialog
- Page Transition
- Pig Pig Bounce
- Loading Indicator

---

Không sử dụng Animation khi:

- Hiển thị Validation Error.
- Chuyển đổi giữa các Tab Bottom Navigation.
- Hiển thị Notification List.

---

# 15. Accessibility

PACE hướng tới trải nghiệm dễ sử dụng cho mọi người dùng.

---

## Touch Target

Minimum Touch Area

44 × 44 px

---

## Font Size

Không sử dụng Font nhỏ hơn:

13px

---

## Contrast

Text và Background phải đảm bảo độ tương phản đủ cao để dễ đọc.

---

## Icon

Không sử dụng Icon làm hành động duy nhất.

Nếu cần thiết phải bổ sung Label hoặc Tooltip.

---

## Form

Validation Error luôn hiển thị ngay dưới trường dữ liệu.

Sử dụng màu Danger Red.

---

# 16. Responsive Rules

PACE được thiết kế theo định hướng:

Mobile First.

---

## Supported Screen Size

- 5.4 inch
- 5.8 inch
- 6.1 inch
- 6.5 inch
- 6.7 inch
- 6.9 inch

---

## Layout Rules

Component luôn mở rộng theo chiều ngang màn hình.

Không sử dụng chiều rộng cố định.

---

Card luôn chiếm:

100% chiều ngang khả dụng.

---

Dialog và Bottom Sheet luôn căn giữa màn hình.

---

Bottom Navigation luôn cố định ở cuối màn hình.

---

# 17. Visual Consistency Rules

Toàn bộ màn hình trong PACE phải tuân thủ các nguyên tắc sau.

---

## Header

Mỗi màn hình chỉ có một Header.

Header luôn nằm trên cùng.

---

## Card

Card luôn sử dụng:

- Radius 24px.
- Padding 20px.
- Surface White.
- Soft Shadow.

---

## Primary Button

Một màn hình chỉ có một Primary Button.

---

## Spacing

Luôn sử dụng hệ thống 8pt Grid.

Không sử dụng khoảng cách tùy ý.

---

## Alignment

Nội dung luôn căn trái.

Các Button hành động căn theo quy tắc của từng màn hình.

---

## Illustration

Không sử dụng ảnh thật.

Chỉ sử dụng:

- Flat Illustration.
- Pig Pig Illustration.
- Brand Logo.

---

## Empty State

Mọi Empty State cần có:

- Illustration.
- Title.
- Description.
- Primary Action (nếu có).

---

## Error State

Hiển thị:

- Error Message.
- Retry Button.

Không hiển thị màn hình trắng.

---

## Loading State

Ưu tiên sử dụng:

Skeleton Loading.

Nếu không phù hợp.

↓

Sử dụng Circular Loading Indicator.

---

# 18. Design Principles

Mọi màn hình trong PACE cần tuân thủ các nguyên tắc sau:

- Ưu tiên sự đơn giản và dễ hiểu.
- Thông tin quan trọng luôn được đặt ở phía trên.
- Hạn chế tạo cảm giác áp lực khi hiển thị cảnh báo.
- Pig Pig luôn sử dụng ngôn ngữ tích cực, thân thiện và mang tính đồng hành.
- Một màn hình chỉ nên có một Primary Action.
- Mọi giao diện phải nhất quán với Design System này.

---

# 19. Design Checklist

Trước khi hoàn thành một màn hình, cần kiểm tra:

## Visual

- Đúng Color Palette.
- Đúng Typography.
- Đúng Border Radius.
- Đúng Shadow.
- Đúng Illustration Style.

---

## Layout

- Đúng 8pt Grid.
- Khoảng cách giữa các Component nhất quán.
- Không tràn nội dung.
- Bottom Navigation hiển thị đúng vị trí (nếu có).

---

## Interaction

- Chỉ có một Primary Action.
- Button có đầy đủ State.
- Input có Validation.
- Loading và Error State đầy đủ.

---

## Accessibility

- Touch Target tối thiểu 44 × 44 px.
- Font không nhỏ hơn 13 px.
- Nội dung dễ đọc.
- Contrast đạt yêu cầu.

---

## Consistency

- Sử dụng đúng Component trong Component Library.
- Tuân thủ UI Layout.
- Không tự tạo Component mới nếu chưa được định nghĩa.

---

# 20. Relationship with Other Specifications

Design System là tiêu chuẩn thiết kế chung của toàn bộ ứng dụng.

Mọi Feature Specification từ:

- Splash
- Onboarding
- Dashboard
- Expense
- Saving Goal
- Report
- Reward Marketplace
- Pig Pig Chat
- Notification
- Profile

đều phải tuân thủ Design System này.

Design System không định nghĩa nghiệp vụ.

Design System chỉ định nghĩa:

- Phong cách giao diện.
- Quy tắc hiển thị.
- Quy tắc tương tác.
- Quy tắc trực quan.

---

# End of Document



