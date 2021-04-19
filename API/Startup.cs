using API.Interfaces;
using API.Models;
using API.Services;
using Data;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Reflection;
using System.Text;

namespace ProductApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            // Gọi Auto mapper
            services.AddAutoMapper(typeof(Startup));

            services.AddControllersWithViews(config =>
             {
                 var policy = new AuthorizationPolicyBuilder()
                                  .RequireAuthenticatedUser()
                                  .Build();
                 config.Filters.Add(new AuthorizeFilter(policy));
             }).AddFluentValidation(fv => { fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly()); });


            services.AddAuthorization(options =>
                      {
                          options.AddPolicy("Admin",
                              policy => policy.RequireClaim("Role", "Admin"));
                          options.AddPolicy("Manager",
                              policy => policy.RequireClaim("Role", "Manager"));
                          options.AddPolicy("Customer",
                              policy => policy.RequireClaim("Role", "Customer"));
                      });


            //Ket noi vao SQLite theo connecstring
            services.AddDbContext<SellingFurnitureContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("SellingFurnitureContext")));

            //Cấu hình Identity
            services.AddIdentity<AppUser, IdentityRole<int>>().AddEntityFrameworkStores<SellingFurnitureContext>().AddDefaultTokenProviders();

            //Cấu hình đặt password
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 4;
            });

            services.AddCors();
            //Jwt Authentication
            var key = Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:JWT_secret"].ToString());
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });



            services.AddScoped<IJwtService, JwtService>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin",
                     policy => policy.RequireClaim("Role", "Admin"));
                options.AddPolicy("Manager",
                    policy => policy.RequireClaim("Role", "Manager"));
                options.AddPolicy("Customer",
                    policy => policy.RequireClaim("Role", "Customer"));
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(x => x
           .AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader());
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
