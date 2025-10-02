using Microsoft.AspNetCore.Mvc;
using project_resume_viewer_api.Models;
using System.Text.Json;

namespace project_resume_viewer_api.Controllers;
[ApiController]
[Route("api/[controller]")]
public class GithubController : ControllerBase
{
    private readonly IHttpClientFactory _httpFactory;
    private readonly JsonSerializerOptions _jsonOptions;

    private readonly IConfiguration _configuration;

    public GithubController(IHttpClientFactory httpFactory, IConfiguration configuration)
    {
        _httpFactory = httpFactory;
        _configuration = configuration;
        _jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    }

    /// <summary>
    /// Fetches all public repositories for a given username from GitHub API.
    /// Example: GET /api/github/DavidEngstrom01/repos
    /// </summary>
    [HttpGet("{username}/repos")]
    public async Task<IActionResult> GetRepos(string username)
    {
        var client = _httpFactory.CreateClient();
        client.DefaultRequestHeaders.Accept.Clear();
        client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/vnd.github+json"));
        client.DefaultRequestHeaders.Add("X-GitHub-Api-Version", "2022-11-28");
        
        client.DefaultRequestHeaders.UserAgent.ParseAdd("project-resume-viewer-app");

        var token = _configuration["GitHub:Token"];
        if (!string.IsNullOrWhiteSpace(token))
        {
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var url = $"https://api.github.com/users/{username}/repos";
        var response = await client.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode, "GitHub API error");

        var content = await response.Content.ReadAsStringAsync();
        var repos = JsonSerializer.Deserialize<List<GitHubRepoResponse>>(content, _jsonOptions);
        return Ok(repos?.OrderByDescending(x => x.UpdatedAt));
    }

}