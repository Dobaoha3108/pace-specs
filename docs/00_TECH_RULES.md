# 00. Tech & Working Rules

Tài liệu này mô tả quy trình làm việc giữa Dương (Product Owner, không rành code) và AI Agent (Claude) cho repo `pace-specs`. Đọc file này trước khi làm bất kỳ thay đổi nào.

---

## 1. Nguồn dữ liệu chuẩn

- Lấy code + spec **mới nhất** qua `codeload.github.com/Dobaoha3108/pace-specs/tar.gz/refs/heads/main` (không dùng `github.com` trực tiếp vì hay bị chặn robot/rate-limit; chỉ dùng `api.github.com` nếu cần).
- Đọc đúng file spec liên quan + code liên quan trước khi sửa. Phân loại yêu cầu: bug / ambiguity / requirement mới.

## 2. Quy trình khi có Requirement mới (áp dụng từ 2026-07-13)

**Không cần chờ Dương duyệt spec trước khi merge.** Khi Dương đưa ra yêu cầu mới:

1. AI tự viết spec đầy đủ, chính xác, nhất quán với các spec liên quan hiện có.
2. AI tự quyết định các Open Question hợp lý (ưu tiên phương án an toàn nhất, ít phá vỡ hành vi hiện tại nhất) và ghi rõ quyết định + lý do vào spec — không để trạng thái "Proposed / chờ xác nhận" trừ khi thực sự cần Dương quyết định một lựa chọn business quan trọng không thể tự suy luận.
3. Merge thẳng vào spec chính thức (`specs/`, `feature-specs/`), cập nhật `docs/03_DELTA_SPEC.md` (đánh dấu `Merged`) và `docs/04_CHANGE_LOG.md`.
4. Sửa code trực tiếp theo spec vừa merge.
5. Build/lint để đảm bảo sạch lỗi mới giao (xem mục 4).
6. Đóng gói toàn bộ file đã đổi thành 1 file `.zip` (giữ nguyên đường dẫn thư mục) trong `/mnt/user-data/outputs/`, dùng `present_files` để Dương tải về.
7. Dương hướng dẫn tay: tải zip → giải nén → paste đè từng file theo đúng path trên GitHub → Commit → đợi Vercel deploy lại (~2-3 phút) → test trên app thật.

Nếu một thay đổi **vượt phạm vi** yêu cầu ban đầu (ảnh hưởng nhiều feature khác, rủi ro cao, hoặc cần quyết định business mà AI không có đủ thông tin) — AI vẫn merge phần trong phạm vi, đồng thời tạo một `DELTA-XXX` mới trong `docs/03_DELTA_SPEC.md` ở trạng thái `Proposed` để theo dõi riêng, không block phần đã merge.

## 3. Cấu trúc tài liệu

- `docs/01_PRD.md` — Product Requirement Document tổng.
- `docs/02_DESIGN_SYSTEM.md` — Design tokens, màu, typography.
- `docs/03_DELTA_SPEC.md` — Đề xuất thay đổi (Proposed/Approved/Merged). Sau khi Merged, nội dung coi như đã phản ánh đầy đủ trong `specs/` và `feature-specs/`.
- `docs/04_CHANGE_LOG.md` — Lịch sử thay đổi, entry mới thêm vào cuối file (không xoá entry cũ).
- `specs/` — Domain Model, Data Model, Business Rules, Business/System Workflow, Screen Map, Component Library, UI Layout.
- `feature-specs/` — Spec chi tiết theo từng màn hình/feature.

## 4. Build/Lint trước khi giao

```
corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile
npx tsc --noEmit -p tsconfig.json
npx next build
```

Phải sạch lỗi mới phát sinh do thay đổi của AI (lỗi có sẵn từ trước, không liên quan tới thay đổi hiện tại thì có thể ghi chú lại, không bắt buộc sửa trong cùng một lần giao).

## 5. Giao file

- Đóng gói `.zip` giữ nguyên đường dẫn thư mục gốc của repo.
- Không gửi từng file rời hoặc hỏi lại nhiều lần trong cùng một yêu cầu — gửi một lần duy nhất kèm tóm tắt ngắn gọn các file đã đổi.
