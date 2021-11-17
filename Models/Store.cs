using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace kitchen_counter.Models
{
    public class Store
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Image")]
        public string Image { get; set; }

        [BsonElement("Phone")]
        public string Phone { get; set; }

        [BsonElement("UserID")]
        public string UserID { get; set; }

        [BsonElement("Menu")]
        public MenuItem[] Menu { get; set; }

        [BsonElement("Orders")]
        public string[] Orders { get; set; }
    }

    public class MenuItem 
    {
        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Image")]
        public string Image { get; set; }
    }
}