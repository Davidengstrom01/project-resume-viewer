var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddHttpClient(); 

const string FrontendCors = "FrontendCors";
builder.Services.AddCors(o =>
{
    o.AddPolicy(FrontendCors, p =>
        p.WithOrigins(
            "http://localhost:65043", 
            "http://localhost:4200" 
        )
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors(FrontendCors);

app.UseAuthorization();

app.MapControllers();

app.Run();
