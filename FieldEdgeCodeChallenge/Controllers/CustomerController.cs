using FieldEdgeCodeChallenge.Models;
using FieldEdgeCodeChallenge.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FieldEdgeCodeChallenge.Controllers
{
    // [Route("api/[controller]")]

    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private readonly ApiHttpClientService _apiHttpClientService;
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(ApiHttpClientService apiHttpClientService, ILogger<CustomerController> logger)
        {
            _apiHttpClientService = apiHttpClientService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                string endpoint = "Customers";
                var customers = await _apiHttpClientService.GetAsync<List<Customer>>(endpoint);
                return Ok(customers);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError($"An error occurred: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpGet("GetCustomerById/{id}")]
        public async Task<IActionResult> GetCustomerById(string id)
        {
            try
            {
                string endpoint = $"Customer/{id}";
                var customer = await _apiHttpClientService.GetAsync<Customer>(endpoint);
                return Ok(customer);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError($"An error occurred: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost("CreateCustomer")]
        public async Task<IActionResult> CreateCustomer([FromBody] Customer customer)
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    string apiUrl = "https://getinvoices.azurewebsites.net/api/Customer/";
                    // Set the Content-Type header to indicate JSON
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var response = await httpClient.PostAsJsonAsync(apiUrl, customer);

                    if (response.IsSuccessStatusCode)
                    {
                        Console.WriteLine("API call successful.");
                    }
                    else
                    {
                        Console.WriteLine($"API call failed. Status code: {response.StatusCode}");
                    }
                }


                return Ok();
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError($"An error occurred: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPut("UpdateCustomer/{id}")]
        public async Task<IActionResult> UpdateCustomer(string id, [FromBody] Customer customer)
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    string apiUrl = "https://getinvoices.azurewebsites.net/api/Customer/" + id;
                    // Set the Content-Type header to indicate JSON
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var response = await httpClient.PostAsJsonAsync(apiUrl, customer);

                    if (response.IsSuccessStatusCode)
                    {
                        Console.WriteLine("API call successful.");
                    }
                    else
                    {
                        Console.WriteLine($"API call failed. Status code: {response.StatusCode}");
                    }
                }


                return Ok();
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError($"An error occurred: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("DeleteCustomer/{id}")]
        public async Task<IActionResult> DeleteCustomer(string id)
        {
            try
            {
                string endpoint = $"Customer/{id}";
                await _apiHttpClientService.DeleteAsync(endpoint);
                return Ok();
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError($"An error occurred: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}
