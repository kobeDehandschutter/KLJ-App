using Microsoft.AspNetCore.Mvc;

namespace firstApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeidingController : ControllerBase
{


    private readonly PersonenContext _context;

    public LeidingController(PersonenContext context)
    {
        _context = context;
    }

    [HttpGet(Name = "GetLeiding")]
    public IEnumerable<Leiding> Get()
    {
        var kobe = new Leiding
        {
            id = 1,
            Firstname = "Kobe",
            Lastname = "Dehandschutter"

        };
        var joren = new Leiding
        {
            id = 2,
            Firstname = "Joren",
            Lastname = "Cleppe"
        };
        var leiding = new List<Leiding>
    {
        kobe,
        joren
    };

        return leiding.ToArray();
    }
}

