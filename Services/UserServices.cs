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

        public UserService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDB"));
            
            var database = client.GetDatabase("kitchen-counter");

            users = database.GetCollection<User>("Users");
        }

        public List<User> GetUsers() => users.Find(user => true).ToList();

        public User GetUser(string id) => users.Find<User>(user => user.Id == id).FirstOrDefault();

        public User Create(User user)
        {
            users.InsertOne(user);

            return user;
        }
    }
}