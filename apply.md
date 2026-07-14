# PACE — Pig Pig Chat update

## Trạng thái

Change set này đã được viết theo quy trình specs-first:

1. Requirement được chuẩn hoá thành spec chính xác.
2. `feature-specs/27_PIG_PIG.md` được kiểm tra và đã là Version 1.1 / Final với đúng requirement.
3. `specs/17_UI_LAYOUT.md` được đồng bộ.
4. `docs/03_DELTA_SPEC.md` được thêm DELTA-008 (Merged).
5. `docs/04_CHANGE_LOG.md` được cập nhật.
6. Implementation được sửa tại đúng path.

## Các file cần thay trên GitHub

Thay toàn bộ nội dung của từng file bằng file cùng path trong gói này:

- `specs/17_UI_LAYOUT.md`
- `docs/03_DELTA_SPEC.md`
- `docs/04_CHANGE_LOG.md`
- `src/features/pig-pig/components/pig-pig-screen.tsx`

## Cách commit

Commit message đề xuất:

`Update Pig Pig suggested questions and chat input UI`

Sau khi commit vào `main`, Vercel sẽ tự deploy lại nếu project của bạn đang liên kết với branch này.

## UI sau thay đổi

- Mặc định chỉ có 3 Suggested Questions.
- Có `View all` bên dưới.
- Bấm `View all` hiển thị tối đa 20 câu và đổi thành `View less`.
- Không còn Label `Message`.
- Input cao 56 px.
- Send Button 56 × 56 px và nằm thẳng hàng với Input.

## Lưu ý kiểm tra

Môi trường hiện tại không có quyền ghi trực tiếp vào GitHub repository và không có checkout đầy đủ toàn repo để chạy `npm run build`. Vì vậy cần xem trạng thái Vercel sau commit. File code được giữ nguyên flow hiện hành và chỉ thay đúng hai khu vực UI theo requirement.
