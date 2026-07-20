using Microsoft.AspNetCore.Mvc;

namespace Nella.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new { status = "Healthy", service = "Nella API" });
}
