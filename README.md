# reactjs-xskillstore

#Built by Front end [Reactjs], Backend [Nodejs-Expressjs], Database [Mongodb]

#Tutorial using server
- Folder server (Chạy server : **npm start**)
  + File .env chỉnh sửa để hoạt động
    + DTB_TEST=Tên database mongodb chạy localhost
    + DTB_PRIVATE= tên database atlas có thể đăng ký ở mongodb.com
  + Trước khi upload lên server cần chỉnh sửa trong file **package.json** _ _nodemon server.js_ _ thành _ _node server.js_ _
  + File app.js
    + Chỉnh sửa lại đường dẫn bên dưới trong file app.js
    - **mongoose.connect(process.env.DTB_PRIVATE (nếu dùng mongo atlas) hoặc process.env._TEST (mongodb local), {useNewUrlParser: true, useUnifiedTopology: true})**;
- Folder client (Chạy client : **npm start**)
  + Các file .env chỉnh sửa lại giá trị của**REACT_APP_API_ENDPOINT** thành Tên miền của **API** bạn dùng
  + **VD Localhost:** REACT_APP_API_ENDPOINT = http://localhost:8000 (Port server 8000 và đang chạy localhost)
  + **VD Đã up api lên host:** REACT_APP_API_ENDPOINT = DOMAIN của hosting đã up folder server api lên
