
## 1. Design Philosophy

PACE được thiết kế theo triết lý **Simple - Friendly - Motivating**.

Ứng dụng hướng tới sinh viên và người mới đi làm, vì vậy trải nghiệm cần trực quan, gần gũi và tạo cảm giác tích cực khi quản lý tài chính.

Thay vì tập trung vào việc ghi chép chi tiêu như các ứng dụng truyền thống, PACE hướng người dùng tới việc hình thành thói quen chi tiêu lành mạnh thông qua Budget Engine, AI Copilot (Pig Pig) và Gamification.

Pig Pig đóng vai trò là người đồng hành trong toàn bộ trải nghiệm, giúp người dùng hiểu tình hình tài chính của mình bằng ngôn ngữ đơn giản, thân thiện và dễ tiếp cận.

---

# 2. Color Palette

| Token | Color | Usage |
|---------|---------|---------|
| Primary Blue | #6ba1ff | Brand, Primary Button |
| Primary Yellow | #fff23d | Pig Pig, Highlight |
| Success Green | #32e15e | Saving Goal, Success |
| Warning Orange | #ffa200 | Budget Warning |
| Danger Red | #FF4D4F | Over Budget |
| Background | #F7F9FC | App Background |
| Surface | #FFFFFF | Card Background |
| Text Primary | #1F2937 | Main Text |
| Text Secondary | #6B7280 | Subtitle |
| Border | #E5E7EB | Divider & Border |

---

# 3. Typography

| Style | Size | Weight |
|---------|------|---------|
| H1 | 32 | Bold |
| H2 | 24 | Bold |
| Title | 20 | SemiBold |
| Subtitle | 18 | Medium |
| Body | 16 | Regular |
| Caption | 13 | Medium |

Font Family

- SF Pro Display (iOS)
- Inter (Android/Web Fallback)

---

# 4. Spacing

PACE sử dụng hệ thống khoảng cách theo quy tắc 8pt Grid.

Spacing Scale

- 4px
- 8px
- 16px
- 24px
- 32px
- 48px

---

# 5. Border Radius

| Component | Radius |
|-----------|--------|
| Button | 16px |
| Input | 16px |
| Card | 24px |
| Bottom Sheet | 28px |
| Pig Pig Bubble | 28px |
| Avatar | Circle |

---

# 6. Components

## Primary Button

- Full Width
- Height: 56px
- Radius: 16px
- Primary Blue Background
- White Text

---

## Secondary Button

- White Background
- Blue Border
- Blue Text

---

## Card

- White Background
- Radius: 24px
- Padding: 20px
- Soft Shadow

---

## Input

- Radius: 16px
- Filled Style
- Currency Formatting Support

---

## Progress Bar

- Rounded
- Animated
- Used for Budget Progress & Saving Goal

---

## Pig Pig Card

- Yellow Accent
- Rounded Corner
- Illustration Support
- CTA Button

---

# 7. Iconography

Icon Style

- Rounded
- Filled
- 24x24

Recommended Library

- Lucide Icons

Icon Categories

- Wallet
- Calendar
- Target
- Shopping
- Food
- Transport
- Entertainment
- Education
- Settings
- Notification

---

# 8. Motion

Animation Duration

250ms

Animation Curve

Ease In Out

Micro Interactions

- Button Press
- Progress Animation
- Card Fade In
- Pig Pig Bounce
- Bottom Sheet Slide Up

---

# 9. Illustration Style

Illustrations sử dụng phong cách:

- Flat Illustration
- Rounded Shape
- Soft Shadow
- Friendly Expression
- Bright Color Palette

Pig Pig là nhân vật trung tâm của toàn bộ hệ thống minh họa.

---

# 10. Accessibility

- Minimum touch target: 44x44px
- Color contrast đảm bảo dễ đọc
- Font không nhỏ hơn 13px
- Hỗ trợ Dark Mode trong các phiên bản tương lai

---

# 11. Responsive Rules

Ứng dụng ưu tiên Mobile First.

Thiết kế phù hợp với màn hình từ 5.4" đến 6.9".

Khoảng cách và kích thước component tự động co giãn theo màn hình nhưng vẫn tuân thủ hệ thống spacing và typography.

---

# 12. Design Principles

Mọi màn hình trong PACE cần tuân thủ các nguyên tắc sau:

- Ưu tiên sự đơn giản và dễ hiểu.
- Thông tin quan trọng luôn được đặt ở phía trên.
- Hạn chế tạo cảm giác áp lực khi hiển thị cảnh báo.
- Pig Pig luôn sử dụng ngôn ngữ tích cực, thân thiện và mang tính đồng hành.
- Một màn hình chỉ nên có một hành động chính (Primary Action).
- Mọi giao diện phải nhất quán với Design System này.