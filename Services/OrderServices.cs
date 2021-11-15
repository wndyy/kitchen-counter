using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.GridFS;
using kitchen_counter.Models;

namespace kitchen_counter.Services
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> orders;

        public OrderService (IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDB"));
            
            var database = client.GetDatabase("kitchen-counter");

            orders = database.GetCollection<Order>("Orders");
        }

        public string Create(Order order)
        {
            var orderID = ObjectId.GenerateNewId();
            order.Id = orderID.ToString();
            orders.InsertOne(order);
            
            return order.Id;

        }

        public Order GetOrder(string id) => orders.Find<Order>(order => order.Id == id).FirstOrDefault();

        public List<Order> GetOrders() => orders.Find(order => true).ToList();
    }
}