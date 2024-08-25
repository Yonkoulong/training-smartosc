Starter React, Redux và Ant Design

I. Lưu ý khi cài đặt:
    1. Bộ starter làm việc tốt nhất với yarn. Dùng yarn để cài các package mới nhất của ant và craco (Thư viện được Ant sử dụng để customize theme).
    Dùng Yarn sẽ không gây lỗi khi càiHạn chế lỗi khi cài package
    2. Nếu sử dụng npm, Khi chạy npm install mà xảy ra lỗi Error, thì chạy như sau: npm install --force hoặc npm instal --legacy-peer-deps
    3. Sau khi cài thành công, chạy lệnh yarn dev hoặc npm run dev để chạy project
II. Tùy chỉnh theme:
    1. Nếu muốn tùy chỉnh màu sắc hay các thông số mặc định của Ant Design,
    Có thể thay đổi giá trong ở trong file src/styles/variables.js
    2. Khuyên dùng cách chỉnh sửa variables thay vì ghi đè css
III. Đường dẫn rút gọn
    Sử dụng đường dẫn rút gọn: Ví dụ "@/componens", "@/styles",...
    Khi tạo 1 thư mục mới trong src, sẽ tự động sinh ra đường dẫn có dạng "@/tên_thư_mục"