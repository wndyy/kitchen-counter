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
    public class UserController : Controller
    {
        private readonly UserService service;

        public UserController(UserService _service)
        {
            service = _service;
        }

        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            return service.GetUsers();
        }

        [HttpGet("{id:length(24)}")]
        public ActionResult<User> GetUser(string id)
        {
            var user = service.GetUser(id);

            return Json(user);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<User> Create (User user) 
        {
            service.Create(user);

            return Json(user);
        }

        [AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public ActionResult Login ( [FromBody] User user)
        {
            var res = service.Authenticate(user.Email, user.Password);

            if(res[0] == null)
                return Unauthorized();

            user.Id = res[1];
            user.StoreID = res[2];
            var token = res[0];

            return Ok(new {token, user});
        }
    }
}