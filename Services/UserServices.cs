using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using kitchen_counter.Database;
using kitchen_counter.Models;

namespace kitchen_counter.Services
{
    public class UserService
    {
        
        private readonly IMongoCollection<User> users;
        private readonly string key;

        public UserService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDB"));
            
            var database = client.GetDatabase("kitchen-counter");

            users = database.GetCollection<User>("Users");
            
            this.key = configuration.GetSection("JWTKey").ToString();
        }

        public List<User> GetUsers() => users.Find(user => true).ToList();

        public User GetUser(string id) => users.Find<User>(user => user.Id == id).FirstOrDefault();

        public User Create(User user)
        {
            users.InsertOne(user);

            return user;
        }

        public string Authenticate (string email, string password)
        {
            var user = this.users.Find(x => x.Email == email && x.Password == password).FirstOrDefault();

            if(user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenKey = Encoding.ASCII.GetBytes(key);

            var tokenDescriptor = new SecurityTokenDescriptor() {

                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.Email, email),
                }),

                Expires = DateTime.UtcNow.AddHours(1),

                SigningCredentials = new SigningCredentials (
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}