using Microsoft.AspNetCore.Mvc;
using SurveyApi.Models;

namespace SurveyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RespuestasController : ControllerBase
    {
        private static List<Respuesta> respuestas = new();

        [HttpGet]
        public IActionResult Obtener()
        {
            return Ok(respuestas);
        }

        [HttpPost]
        public IActionResult Guardar([FromBody] Respuesta data)
        {
            respuestas.Add(data);
            return Ok(new { mensaje = "Guardado correctamente" });
        }
    }
}