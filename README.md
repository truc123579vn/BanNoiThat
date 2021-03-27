# BanNoiThat

1/ Tai Folder Angular, Lí do không chạy được vì thiếu folder node_module. Cho nên hay thu hien cac buoc sau day

B1: clone your repository

B2: Mo source code = vscode, tao folder node_module bang 2 lenh: 
cd angular  ,
npm install

B3: chay CT dung lenh ng serve -o

2/ De chay duoc template Admin trong Angular can lam cac buoc sau 

B1: tai va giai nen template nay https://drive.google.com/drive/folders/1XnC34MMk7lJuZQms5Ehsy_BVepj89eXx?usp=sharing

B2: copy folder template đã tải xuống, paste vào đường dẫn của project như sau: \BanNoiThat\angular\node_modules

B3: Chạy ng serve -o, để hiện trang web

B4: Nhấn vào URL của trang web, gõ http://localhost:4200/admin => sẽ điều hướng sang trang admin 

3/ De chay được Folder API can làm các bước như sau: 
B1: Tại file Appsetting.json: chỉnh đường dẫn đến SellingFurniture.db (lưu ý phải chỉnh là đường dẫn tuyệt đối)

B2: Dowload các Pakage: 

AutoMapper.Extensions.Microsoft.DependencyInjection Version="8.1.1"; 

Microsoft.Data.Sqlite" Version="5.0.4;

Microsoft.EntityFrameworkCore" Version="5.0.4;

"Microsoft.EntityFrameworkCore.Design" Version="5.0.4";

"Microsoft.EntityFrameworkCore.InMemory" Version="5.0.4";

"Microsoft.EntityFrameworkCore.Sqlite.Core" Version="5.0.4" 

B3: Cài đặt Migration ( một class dùng để TỰ ĐỘNG lưu lại dữ liệu, cũng như lịch sử cập nhật dữ liệu)

Nhập dotnet ef migrations add InitialCreate

Nhập dotnet ef database update

!!! Trường Hợp muốn thay đổi thuộc tính của bảng, hoặc tạo bảng mới thì: XÓA DATABASE => Thực hiện lại bước 3

B4: nhâp dotnet watch run
