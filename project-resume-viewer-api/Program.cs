var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger/OpenAPI (Swashbuckle)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// HttpClient (om du behöver anropa andra API:er)
builder.Services.AddHttpClient();

// CORS
const string FrontendCors = "FrontendCors";
builder.Services.AddCors(o =>
{
    o.AddPolicy(FrontendCors, p =>
        p.WithOrigins(
            "http://localhost:65043",   // VS/IIS Express
            "http://localhost:4200",    // Angular dev
            "https://gray-river-079a4881e.1.azurestaticapps.net" // lägg till din riktiga SWA-URL här
        )
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

// Swagger endast i dev (valfritt att ha i prod också)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(FrontendCors);

app.UseAuthorization();

app.MapControllers();

app.Run();
