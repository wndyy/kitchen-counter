using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace kitchen_counter.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("CustomerID")]
        public string CustomerID { get; set; }

        [BsonElement("OrderDateTime")]
        public DateTime OrderDateTime { get; set; }

        [BsonElement("StoreID")]
        public string StoreID { get; set; }

        [BsonElement("OrderItems")]
        public string[] OrderItems { get; set; }

        [BsonElement("OrderStatus")]
        public string OrderStatus { get; set; }
    }
}