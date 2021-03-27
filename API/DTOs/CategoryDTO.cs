using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Models;

namespace DTOs
{
    //Class DTO này là class chứa các thuộc tính sẽ được hiện lên trên Client, mục đích sử dụng
    // là đưa những dữ liệu cần đưa lên client, tránh đưa những dữ liệu nhạy cảm. 
    public class CategoryDTO
    {

        //những cái ["giá trị"] được gọi là DataAnnotations, mục đích chỉ là tạo thêm điều kiện, ràng buộc cho thuộc tính

        [Key]
        public int Id {get;set;}
        [MaxLength(50,ErrorMessage="Tên loại sản phẩm không quá 50 ký tự")]  
        [Required(ErrorMessage="Vui lòng nhập tên loại")]
        public string Name { get; set; }


        //Xay dung quan he 1 -n , tuc la 1 loai san pham thuoc nhieu san pham
        public virtual ICollection<Product> Products { get; set; }
    }
}