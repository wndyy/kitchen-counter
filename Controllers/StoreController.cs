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

        public StoreController(StoreService _service)
        {
            service = _service;
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<List<Store>> GetStores()
        {
            return service.GetStores();
        }

        [AllowAnonymous]
        [HttpGet("{id:length(24)}")]
        public ActionResult<Store> GetStore(string id)
        {
            var user = service.GetStore(id);

            return Json(user);
        }

        [HttpPost]
        public ActionResult<Store> Create (Store store) 
        {
            service.Create(store);

            return Json(store);
        }

    }
}