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
