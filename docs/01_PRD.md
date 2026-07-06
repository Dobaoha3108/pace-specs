# PACE Product Requirement Document (PRD)


## 1. Product Overview

PACE là ứng dụng quản lý tài chính cá nhân dành cho sinh viên, được thiết kế nhằm giúp người dùng kiểm soát chi tiêu cảm tính và xây dựng thói quen chi tiêu bền vững.

Khác với các ứng dụng quản lý chi tiêu truyền thống chỉ tập trung vào việc ghi chép giao dịch, PACE kết hợp cơ chế Gamification và AI Copilot (Pig Pig) để tạo động lực, đồng hành và giúp người dùng duy trì các hành vi tài chính tích cực mỗi ngày.

Mục tiêu của PACE không chỉ là giúp người dùng tiết kiệm nhiều tiền hơn, mà còn giúp họ tránh rơi vào tình trạng mất cân bằng tài chính và luôn chủ động trong việc quản lý tiền bạc hằng tháng.

## 2. Problem Statement

Sinh viên thường có nguồn thu nhập cố định theo tháng nhưng thiếu khả năng nhận biết tốc độ chi tiêu của bản thân theo thời gian thực. Họ dễ đưa ra các quyết định mua sắm theo cảm xúc hoặc thói quen mà không nhận ra mình đã sử dụng bao nhiêu ngân sách so với kế hoạch của cả tháng.

Khi nhận ra số tiền còn lại không đủ để duy trì đến cuối tháng, người dùng vẫn phải tiếp tục chi tiêu cho các nhu cầu thiết yếu hoặc những khoản phát sinh ngoài dự kiến. Điều này dễ dẫn đến vòng lặp thiếu tiền – vay mượn – trả nợ – tiếp tục thiếu tiền, khiến việc quản lý tài chính ngày càng mất cân bằng.

Phần lớn các ứng dụng quản lý chi tiêu hiện nay tập trung vào việc ghi chép và thống kê sau khi giao dịch đã xảy ra. Trong khi đó, PACE hướng tới việc hỗ trợ người dùng đưa ra quyết định chi tiêu tốt hơn ngay trước khi phát sinh khoản chi, từ đó từng bước hình thành thói quen chi tiêu lành mạnh và bền vững.

## 3. Product Goals

PACE hướng tới việc giúp sinh viên kiểm soát chi tiêu trước khi họ rơi vào tình trạng mất cân bằng tài chính cuối tháng.

Cụ thể, sản phẩm cần đạt được các mục tiêu sau:

1. Giúp người dùng nhận biết sớm khi họ đang có xu hướng chi tiêu vượt mức theo ngày, đồng thời cho họ thấy nếu tiếp tục chi tiêu như hiện tại thì ngân sách còn lại cho các ngày sau sẽ bị ảnh hưởng như thế nào.

2. Giúp người dùng duy trì các mục tiêu tiết kiệm cá nhân thông qua hai cơ chế tiết kiệm:
   - Chế độ nhẹ nhàng: người dùng có thể rút tiền tiết kiệm bất cứ lúc nào.
   - Chế độ quyết tâm: người dùng cần chờ 2 tiếng trước khi rút tiền, nhằm hạn chế hành vi rút tiền tiết kiệm do cảm xúc nhất thời.

3. Tạo động lực duy trì thói quen tài chính lành mạnh thông qua Pig Pig Copilot, Saving Streak, điểm thưởng và cơ chế đổi voucher từ các thương hiệu ăn uống hoặc vui chơi.

Thành công của PACE không chỉ được đo bằng số tiền người dùng tiết kiệm được, mà còn bằng việc người dùng duy trì được thói quen kiểm soát chi tiêu đều đặn mỗi ngày.

## 4. Product Vision

PACE hướng tới trở thành người bạn đồng hành tài chính đáng tin cậy của sinh viên, giúp họ xây dựng thói quen quản lý chi tiêu chủ động và đưa ra quyết định đúng đắn ngay từ những năm đầu đại học.

Bằng cách hỗ trợ người dùng nhận biết và kiểm soát chi tiêu trước khi vượt quá khả năng tài chính, PACE mong muốn giảm tình trạng chi tiêu cảm tính, hạn chế vòng lặp thiếu tiền – vay mượn và tạo nền tảng tài chính bền vững cho thế hệ trẻ.

Về dài hạn, PACE không chỉ là một ứng dụng quản lý tài chính cá nhân mà còn là nền tảng giúp sinh viên hình thành tư duy tài chính lành mạnh, biến việc quản lý tiền bạc từ nhiệm vụ khó khăn thành thói quen đơn giản, tích cực và duy trì mỗi ngày.

## Target Users

### Primary Users

PACE được thiết kế dành cho sinh viên đại học (18–24 tuổi) có nguồn thu nhập cố định theo tháng từ gia đình hoặc công việc làm thêm, nhưng chưa hình thành thói quen quản lý tài chính cá nhân.

Nhóm người dùng này thường chi tiêu theo cảm xúc hoặc thói quen, khó nhận biết tốc độ sử dụng ngân sách theo thời gian thực và dễ rơi vào tình trạng thiếu tiền vào cuối tháng.

### Secondary Users

Trong tương lai, PACE có thể mở rộng sang nhóm người mới đi làm (22–26 tuổi) có thu nhập ổn định nhưng mong muốn xây dựng thói quen quản lý tài chính ngay từ giai đoạn đầu sự nghiệp.

## Solution Overview

PACE giải quyết bài toán chi tiêu cảm tính của sinh viên thông qua bốn trụ cột chính.

**1. Daily Budget Planning**

PACE phân bổ ngân sách theo từng ngày dựa trên ngân sách tháng của người dùng, giúp họ luôn biết giới hạn chi tiêu phù hợp thay vì chỉ theo dõi số dư còn lại.

**2. Pre-Spending Decision Support**

PACE hỗ trợ người dùng đưa ra quyết định trước khi chi tiêu bằng cách phân tích tác động của mỗi khoản chi tới ngân sách trong những ngày còn lại.

AI Copilot Pig Pig sẽ chủ động đưa ra các cảnh báo và dự báo nếu người dùng có nguy cơ vượt quá kế hoạch tài chính.

**3. Goal-driven Saving**

PACE giúp người dùng xây dựng và duy trì các mục tiêu tiết kiệm thông qua hai cơ chế tiết kiệm linh hoạt, đồng thời hỗ trợ theo dõi tiến độ để hạn chế việc rút tiền tiết kiệm theo cảm xúc.

**4. Habit Reinforcement**

PACE sử dụng Budget Streak, Gamification, hệ thống phần thưởng và AI Copilot Pig Pig để tạo động lực, duy trì hành vi quản lý tài chính tích cực và từng bước hình thành thói quen chi tiêu bền vững.

## MVP Scope

### Must Have (MVP)

#### 1. User Onboarding

- Thiết lập ngân sách theo tháng.
- Thiết lập ngày nhận tiền.
- Thiết lập mục tiêu tiết kiệm đầu tiên.

#### 2. Dashboard

- Hiển thị ngân sách còn lại trong tháng.
- Hiển thị ngân sách được phép chi tiêu trong ngày.
- Hiển thị Budget Streak.
- Hiển thị mục tiêu tiết kiệm hiện tại.
- Hiển thị thông điệp Daily Check-in từ Pig Pig.

#### 3. Expense Tracking

- Thêm khoản chi.
- Chỉnh sửa và xóa khoản chi.
- Phân loại khoản chi theo danh mục.
- Xem lịch sử chi tiêu.

#### 4. Daily Budget Engine

- Tự động tính ngân sách chi tiêu theo ngày.
- Cập nhật ngân sách còn lại sau mỗi giao dịch.
- Điều chỉnh ngân sách cho những ngày tiếp theo khi người dùng chi tiêu vượt hoặc thấp hơn kế hoạch.

#### 5. Pig Pig AI Copilot

- Chủ động cảnh báo khi người dùng có nguy cơ vượt ngân sách.
- Phân tích tác động của mỗi khoản chi tới ngân sách trong những ngày còn lại.
- Gửi Daily Check-in hằng ngày.
- Trả lời các câu hỏi liên quan đến dữ liệu tài chính của người dùng.

#### 6. Saving Goal

- Tạo và quản lý mục tiêu tiết kiệm.
- Hỗ trợ hai chế độ tiết kiệm:
    - Nhẹ nhàng (có thể rút ngay).
    - Quyết tâm (cần thời gian chờ trước khi rút).

#### 7. Budget Streak

- Theo dõi số ngày liên tiếp người dùng duy trì chi tiêu trong giới hạn ngân sách.
- Tự động cập nhật và hiển thị Budget Streak trên Dashboard.

### Future Enhancements (Post MVP)

Các tính năng dưới đây không nằm trong phạm vi MVP nhưng được định hướng phát triển trong các phiên bản tiếp theo:

Weekly Financial Insight.
Rewards & Voucher Marketplace.
AI Recommendation.
Liên kết tài khoản ngân hàng.
OCR hóa đơn.
Widget màn hình chính.
Báo cáo tài chính nâng cao.

## User Journey

Hành trình của người dùng trong PACE được thiết kế xoay quanh việc từng bước thay đổi hành vi chi tiêu, từ nhận thức vấn đề cho đến hình thành thói quen quản lý tài chính bền vững.

### Stage 1. Onboarding

Người dùng cài đặt ứng dụng, thiết lập ngân sách theo tháng, ngày nhận tiền và mục tiêu tiết kiệm đầu tiên. Dựa trên những thông tin này, PACE tự động tính toán ngân sách chi tiêu phù hợp cho từng ngày.

### Stage 2. Daily Budget Awareness

Mỗi ngày, người dùng mở ứng dụng để xem ngân sách còn lại, Budget Streak, mục tiêu tiết kiệm và thông điệp Daily Check-in từ Pig Pig nhằm nắm được kế hoạch chi tiêu trong ngày.

### Stage 3. Expense Recording

Khi phát sinh một khoản chi, người dùng ghi nhận giao dịch vào ứng dụng.

PACE ngay lập tức cập nhật ngân sách và Pig Pig phân tích tác động của khoản chi đối với những ngày còn lại trong tháng.

Nếu khoản chi có nguy cơ làm vượt kế hoạch, Pig Pig sẽ chủ động đưa ra cảnh báo trước khi người dùng xác nhận giao dịch.

### Stage 4. Saving Progress

Song song với việc quản lý chi tiêu, người dùng theo dõi tiến độ các mục tiêu tiết kiệm và duy trì Budget Streak để hình thành thói quen quản lý tài chính tích cực.

### Stage 5. Habit Reinforcement

Thông qua Budget Streak, Gamification, hệ thống phần thưởng và những lời nhắc chủ động từ Pig Pig, người dùng dần xây dựng được thói quen kiểm soát chi tiêu hằng ngày và giảm tình trạng chi tiêu cảm tính.

### **Flow journey:**

Nhận ngân sách → Thiết lập PACE → Theo dõi ngân sách hằng ngày → Phát sinh khoản chi → Pig Pig phân tích & cảnh báo → Điều chỉnh quyết định chi tiêu → Duy trì Budget Streak → Đạt mục tiêu tiết kiệm → Hình thành thói quen tài chính

## Core Features

### 1. Dashboard

Dashboard là màn hình trung tâm của ứng dụng, giúp người dùng nhanh chóng nắm bắt tình trạng tài chính hiện tại, bao gồm:

- **Ngân sách còn lại** trong tháng
- **Hạn mức chi tiêu** trong ngày
- **Budget Streak**
- **Mục tiêu tiết kiệm**
- **Các thông báo từ Pig Pig**

### 2. Expense Tracking

Cho phép người dùng ghi nhận, quản lý và theo dõi các khoản chi tiêu hằng ngày. Mỗi giao dịch được cập nhật vào hệ thống để tính toán lại ngân sách và phục vụ cho việc phân tích hành vi chi tiêu.

### 3. Daily Budget Engine

Hệ thống tự động phân bổ ngân sách theo từng ngày dựa trên ngân sách tháng và liên tục điều chỉnh giới hạn chi tiêu sau mỗi giao dịch nhằm giúp người dùng luôn biết mình còn bao nhiêu ngân sách để sử dụng.

### 4. Pig Pig AI Copilot

Pig Pig là AI Copilot đồng hành cùng người dùng trong suốt quá trình quản lý tài chính. Thay vì chỉ trả lời câu hỏi, Pig Pig chủ động theo dõi dữ liệu chi tiêu, phân tích ngân sách và đưa ra các cảnh báo, lời nhắc cũng như gợi ý phù hợp tại từng thời điểm nhằm giúp người dùng đưa ra quyết định tài chính tốt hơn.

### 5. Saving Goal

Cho phép người dùng thiết lập các mục tiêu tiết kiệm và theo dõi tiến độ hoàn thành. PACE hỗ trợ hai cơ chế tiết kiệm nhằm phù hợp với mức độ cam kết của từng người dùng và hạn chế việc rút tiền tiết kiệm theo cảm xúc.

### 6. Budget Streak

Theo dõi số ngày liên tiếp người dùng duy trì chi tiêu trong giới hạn ngân sách hằng ngày. Đây là chỉ số phản ánh mức độ duy trì thói quen quản lý tài chính và cũng là North Star Metric của sản phẩm.

### 7. Gamification & Rewards

PACE sử dụng hệ thống điểm thưởng, thành tích và phần thưởng nhằm tạo động lực cho người dùng duy trì Budget Streak và hoàn thành các mục tiêu tiết kiệm. Đây là yếu tố giúp việc quản lý tài chính trở nên thú vị và dễ duy trì hơn.

## Functional Requirements

### 1. Dashboard

- Hiển thị ngân sách còn lại trong tháng.
- Hiển thị ngân sách được phép chi tiêu trong ngày.
- Hiển thị Budget Streak hiện tại.
- Hiển thị mục tiêu tiết kiệm đang theo dõi.
- Hiển thị thông báo và lời nhắc từ Pig Pig.

### 2. Expense Tracking

- Thêm khoản chi mới.
- Chỉnh sửa hoặc xóa khoản chi.
- Phân loại khoản chi theo danh mục.
- Lưu lịch sử giao dịch.
- Cập nhật ngân sách sau mỗi giao dịch.

### 3. Daily Budget Engine

- Tự động tính ngân sách chi tiêu theo ngày.
- Điều chỉnh ngân sách còn lại sau mỗi khoản chi.
- Cập nhật ngân sách cho các ngày tiếp theo khi người dùng chi tiêu vượt hoặc thấp hơn kế hoạch.

### 4. Pig Pig AI Copilot

- Phân tích dữ liệu chi tiêu của người dùng.
- Chủ động cảnh báo khi có nguy cơ vượt ngân sách.
- Dự báo ảnh hưởng của khoản chi tới ngân sách trong những ngày còn lại.
- Gửi Daily Check-in.
- Trả lời các câu hỏi liên quan đến dữ liệu tài chính của người dùng.

### 5. Saving Goal

- Tạo và quản lý mục tiêu tiết kiệm.
- Theo dõi tiến độ hoàn thành mục tiêu.
- Hỗ trợ hai chế độ tiết kiệm: Nhẹ nhàng và Quyết tâm.

### 6. Budget Streak

- Theo dõi số ngày liên tiếp người dùng duy trì chi tiêu trong giới hạn ngân sách.
- Tự động cập nhật hoặc đặt lại Budget Streak khi cần.

### 7. Gamification & Rewards

- Ghi nhận điểm thưởng khi người dùng hoàn thành các thử thách.
- Hiển thị thành tích và huy hiệu.
- Hỗ trợ đổi điểm lấy phần thưởng hoặc voucher (trong các phiên bản tiếp theo).