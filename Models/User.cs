using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace kitchen_counter.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("Password")]
        public string Password { get; set; }

        [BsonElement("FirstName")]
        public string FirstName { get; set; }

        [BsonElement("LastName")]
        public string LastName { get; set; }

        [BsonElement("Phone")]
        public string Phone { get; set; }

        [BsonElement("StoreID")]
        public string StoreID { get; set; }

        [BsonElement("Orders")]
        public string[] Orders { get; set; }
    }
}