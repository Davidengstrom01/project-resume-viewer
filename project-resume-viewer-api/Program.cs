var builder = WebApplication.CreateBuilder(args);

// --- Services ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

const string FrontendCors = "FrontendCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCors, policy =>
    {
        policy.WithOrigins("https://gray-river-079a4881e.1.azurestaticapps.net",
        "http://127.0.0.1:65043",
        "https://www.engstromdavid.se",
        "https://engstromdavid.se")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(FrontendCors);

app.MapControllers();

app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();
