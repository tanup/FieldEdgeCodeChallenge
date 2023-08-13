namespace FieldEdgeCodeChallenge.Services
{
    public class ApiHttpClientService
    {

        private readonly IHttpClientFactory _httpClientFactory;

        public ApiHttpClientService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<T> GetAsync<T>(string endpoint)
        {
            var client = _httpClientFactory.CreateClient("AzureApi");
            HttpResponseMessage response = await client.GetAsync(endpoint);

            if (response.IsSuccessStatusCode)
            {
                T? content = await response.Content.ReadFromJsonAsync<T>();
                return content ?? throw new Exception("Response content is null.");
            }

            throw new HttpRequestException($"Request failed with status code: {response.StatusCode}");
        }

        public async Task PostAsync<T>(string endpoint, T data)
        {
            var client = _httpClientFactory.CreateClient("AzureApi");

            HttpResponseMessage response = await client.PostAsJsonAsync(endpoint, data);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Request failed with status code: {response.StatusCode}");
            }
        }

        public async Task PutAsync<T>(string endpoint, T data)
        {
            var client = _httpClientFactory.CreateClient("AzureApi");
            HttpResponseMessage response = await client.PutAsJsonAsync(endpoint, data);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Request failed with status code: {response.StatusCode}");
            }
        }


        public async Task DeleteAsync(string endpoint)
        {
            var client = _httpClientFactory.CreateClient("AzureApi");
            HttpResponseMessage response = await client.DeleteAsync(endpoint);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Request failed with status code: {response.StatusCode}");
            }
        }


    }
}
