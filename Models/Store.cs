using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

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
        public byte[] Image { get; set; }

        [BsonElement("Phone")]
        public string Phone { get; set; }
    }
}