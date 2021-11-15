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

            stores = database.GetCollection<Store>("Stores");
        }

        public Store Create(Store store)
        {
            var storeID = ObjectId.GenerateNewId();
            store.Id = storeID.ToString();
            stores.InsertOne(store);
            return store;
        }

        public Store GetStore(string id) => stores.Find<Store>(store => store.Id == id).FirstOrDefault();

        public List<Store> GetStores() => stores.Find(store => true).ToList();

        public void AddOrder(string storeID, string orderID)
        {
            var query = Builders<Store>.Filter.Eq("_id", storeID);
            var update = Builders<Store>.Update.Push("Orders", orderID);
            stores.UpdateOneAsync(query, update);

        }
    }
}