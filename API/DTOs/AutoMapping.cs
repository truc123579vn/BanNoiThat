using API.DTOs;
using API.Models;
using AutoMapper;
using DTOs;
using Models;

public class AutoMapping : Profile
{
    public AutoMapping()
    {
        CreateMap<Product, ProductDTO>(); // means you want to map from Product to ProductDTO
        CreateMap<ProductDTO,Product>();

        CreateMap<Category, CategoryDTO>();
        CreateMap<CategoryDTO, Category>();

        CreateMap<AppUser, AppUserDTO>();
        CreateMap<AppUserDTO, AppUser>();


    }
}