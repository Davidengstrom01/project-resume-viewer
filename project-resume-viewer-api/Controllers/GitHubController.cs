using Microsoft.AspNetCore.Mvc;
using project_resume_viewer_api.Models;
using System.Text.Json;

namespace project_resume_viewer_api.Controllers;
[ApiController]
[Route("api/[controller]")]
public class GithubController : ControllerBase
{
    private readonly HttpClient _http;
    private readonly JsonSerializerOptions _jsonOptions;

    public GithubController(HttpClient http)
    {
        _http = http;
        _http.DefaultRequestHeaders.UserAgent.ParseAdd("project_resume_viewer_api"); // Required by GitHub API
        _jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    }

    /// <summary>
    /// Fetches all public repositories for a given username from GitHub API.
    /// Example: GET /api/github/DavidEngstrom/repos
    /// </summary>
    [HttpGet("{username}/repos")]
    public async Task<IActionResult> GetRepos(string username)
    {
        var url = $"https://api.github.com/users/{username}/repos";
        var response = await _http.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode, "GitHub API error");

        var content = await response.Content.ReadAsStringAsync();
        var repos = JsonSerializer.Deserialize<List<GitHubRepo>>(content, _jsonOptions);
        return Ok(repos);
    }

    /// <summary>
    /// Example endpoint to test Angular integration without calling GitHub API.
    /// Example: GET /api/github/example
    /// </summary>
    [HttpGet("example")]
    public IActionResult GetExampleRepos()
    {
        var repos = new List<GitHubRepo>
        {
            new GitHubRepo
            {
                Name = "ResumeViewer",
                HtmlUrl = "https://github.com/DavidEngstrom/ResumeViewer",
                Description = "A personal resume viewer built with Angular + ASP.NET Core.",
                Language = "TypeScript",
                StargazersCount = 10,
                ForksCount = 2,
                UpdatedAt = DateTime.UtcNow
            },
            new GitHubRepo
            {
                Name = "GameTime",
                HtmlUrl = "https://github.com/DavidEngstrom/GameTime",
                Description = "A Blazor hybrid app for managing tournaments.",
                Language = "C#",
                StargazersCount = 25,
                ForksCount = 4,
                UpdatedAt = DateTime.UtcNow.AddDays(-5)
            },
            new GitHubRepo
            {
                Name = "TransactionManager",
                HtmlUrl = "https://github.com/DavidEngstrom/TransactionManager",
                Description = "An Angular + ASP.NET Core app for tracking transactions.",
                Language = "C#",
                StargazersCount = 5,
                ForksCount = 1,
                UpdatedAt = DateTime.UtcNow.AddDays(-15)
            }
        };

        return Ok(repos);
    }
}