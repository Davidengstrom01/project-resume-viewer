namespace project_resume_viewer_api.Models;

public class GitHubRepo
{
    public string Name { get; set; } = string.Empty;
    public string HtmlUrl { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Language { get; set; }
    public int StargazersCount { get; set; }
    public int ForksCount { get; set; }
    public DateTime UpdatedAt { get; set; }
}
