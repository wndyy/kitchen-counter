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
            var token = service.Authenticate(user.Email, user.Password);

            if(token == null)
                return Unauthorized();

            return Ok(new {token, user});
        }
    }
}