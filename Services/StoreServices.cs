using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using kitchen_counter.Models;

namespace kitchen_counter.Services
{
    public class StoreService
    {
        private readonly IMongoCollection<Store> stores;
        private GridFSBucket storeImages;

        public StoreService (IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDB"));
            
            var database = client.GetDatabase("kitchen-counter");

            stores = database.GetCollection<Store>("Stores");

            storeImages = new GridFSBucket(database);
        }

        public Store Create(Store store)
        {
            stores.InsertOne(store);

            return store;
        }

        public Store GetStore(string id) => stores.Find<Store>(store => store.Id == id).FirstOrDefault();

        public List<Store> GetStores() => stores.Find(store => true).ToList();
    }
}