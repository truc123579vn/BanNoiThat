3/ De chay được Folder API can làm các bước như sau: 

B1: Tại file Appsetting.json: chỉnh đường dẫn đến SellingFurniture.db 

B2: Dowload các Pakage:

AutoMapper.Extensions.Microsoft.DependencyInjection Version="8.1.1";

Microsoft.Data.Sqlite" Version="5.0.4;

Microsoft.EntityFrameworkCore" Version="5.0.4;

"Microsoft.EntityFrameworkCore.Design" Version="5.0.4";

"Microsoft.EntityFrameworkCore.InMemory" Version="5.0.4";

"Microsoft.EntityFrameworkCore.Sqlite.Core" Version="5.0.4"


B3: Cài đặt Migration ( một class dùng để TỰ ĐỘNG lưu lại dữ liệu, cũng như lịch sử cập nhật dữ liệu)

Nhập dotnet ef migrations add InitialCreate -o Data/Migrations

Nhập dotnet ef database update

!!! Trường Hợp muốn thay đổi thuộc tính của bảng, hoặc tạo bảng mới thì: XÓA DATABASE => TẠO MỚI DATABASE => Thực hiện lại bước 3


B4: nhâp dotnet watch run




4/ Tải thêm một số package cho Angular 

B1: Dùng Terminal nhập lệnh sau đây

npm install ngx-toastr --save

npm install @angular/animations --save

B2: Lúc này tại Node-Modules, folder template Admin-TLE sẽ bị mất, hãy copy paste foder Admin-TLE và đặt vào đó.  
