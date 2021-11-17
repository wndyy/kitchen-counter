using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Bson;
using kitchen_counter.Models;
using MongoDB.Driver.Linq;

namespace kitchen_counter.Services
{
    public class StoreService
    {
        private readonly IMongoCollection<Store> stores;

        public StoreService (IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDB"));
            
            var database = client.GetDatabase("kitchen-counter");

            stores = database.GetCollection<Store>("Stores3");
        }

        public string Create(Store store)
        {
            var storeID = ObjectId.GenerateNewId();
            store.Id = storeID.ToString();
            store.Menu = new MenuItem[0];
            store.Orders = new string[0];
            stores.InsertOne(store);
            return store.Id;
        }

        public Store GetStore(string id) {
            return stores.Find<Store>(store => store.Id == id).FirstOrDefault();
        }    

        public List<Store> GetStores() {
            Console.WriteLine(stores.Find(store => true).ToList());
            return stores.Find(store => true).ToList();
        }    

        public void AddOrder(string storeID, string orderID)
        {
            var query = Builders<Store>.Filter.Eq("_id", storeID);
            var update = Builders<Store>.Update.Push("Orders", orderID);
            stores.UpdateOneAsync(query, update);

        }

        public void AddMenuItem(string id, MenuItem item)
        {
            Console.WriteLine("menuitem");
            Console.WriteLine(item.Name);
            var query = Builders<Store>.Filter.Eq("_id", ObjectId.Parse(id));
            var update = Builders<Store>.Update.AddToSet<MenuItem>("Menu", item);
            var res = stores.UpdateOneAsync(query, update);

        }
    }
}