using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using kitchen_counter.Models;
using kitchen_counter.Services;

namespace kitchen_counter.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : Controller
    {
        private readonly StoreService service;
        private readonly UserService userService;

        public StoreController(StoreService _service, UserService user_service)
        {
            service = _service;
            userService = user_service;
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<List<Store>> GetStores()
        {
            var stores = service.GetStores();
            return Json(stores);
        }

        [AllowAnonymous]
        [HttpGet("{id:length(24)}")]
        public ActionResult<Store> GetStore(string id)
        {
            var user = service.GetStore(id);

            return Json(user);
        }

        [HttpPost("{id:length(24)}")]
        public ActionResult<Store> AddMenuItem(string id, [FromBody]MenuItem item)
        {
            service.AddMenuItem(id, item);

            return Json(item);
        }

        [HttpPost]
        public ActionResult<Store> Create (Store store) 
        {
            var storeID = service.Create(store);
            userService.AddStore(store.UserID, storeID);

            return Json(store);
        }

    }
}