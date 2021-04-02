using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public class Category
    {
        public int Id { get; set; }
        
        public string Name { get; set; }


        //Xay dung quan he 1 -n , tuc la 1 loai san pham thuoc nhieu san pham
        [JsonIgnore]
        public virtual ICollection<Product> Products { get; set; }


    }
}