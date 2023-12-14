using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Emit;
using Microsoft.Extensions.DependencyInjection;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});
//var connectionString = "Server=tcp:crap.database.windows.net,1433;Initial Catalog=crapDb;Persist Security Info=False;User ID=crapAdmin;Password=abcd.1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
var connectionString = "Server=tcp:LAPTOP-BJSR469K,1433;Initial Catalog=KLJ;Persist Security Info=False;User ID=crapAdmin;Password=abcd.1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.WriteIndented = true;
});
builder.Services.AddDbContext<PersonenContext>(options =>
{
    options.UseSqlServer(connectionString);
    options.EnableSensitiveDataLogging();
    options.LogTo(Console.WriteLine, LogLevel.Information);
});


var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
app.UseCors();
app.MapControllers();

//app.MapGet("/", () => "Hello World!");
//app.MapPost("/factuur", async (PersonenContext context, Factuur factuur, CancellationToken ct) =>
//{
//    var klant = factuur.Persoon.PersoonId == 0 ? null : await context.Personen.FindAsync(factuur.Persoon.PersoonId);
//    klant ??= context.Personen.FirstOrDefault(p => p.Voornaam == factuur.Persoon.Voornaam && p.Achternaam == factuur.Persoon.Achternaam);
//    if (klant == null)
//    {
//        klant = factuur.Persoon;
//        context.Personen.Add(klant);
//        await context.SaveChangesAsync(ct);
//    }

//    factuur.PersoonId = klant.PersoonId;
//    context.Set<Factuur>().Add(factuur);
//    await context.SaveChangesAsync(ct);
//    return factuur;
//});

app.MapGet("/", (PersonenContext context) =>
{
    Console.WriteLine("here");
    //var klant = await context.Personen.FirstOrDefaultAsync(p => p.Voornaam == voornaam, ct);
    //if (klant == null) return Results.NotFound($"Klant with voornaam {voornaam} was not found");
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
    // var  klanten = await context.Leiding.ToListAsync();
    return Results.Ok(leiding);

    //var idList = klanten.Select(k => k.PersoonId).ToList();
    //var facturen = await context.Set<Factuur>().Where(f => idList.Contains(f.PersoonId)).ToListAsync(ct);
    //var facturen = await context.Set<Factuur>().Where(f => klanten.Any(k => k.PersoonId == f.PersoonId)).ToListAsync(ct); //Error in EF6, "works" in older versions
    // return Results.Ok('klanten');

});
app.Run();

public class PersonenContext : DbContext
{
    public PersonenContext(DbContextOptions options) : base(options)
    {

    }
    public DbSet<Leiding> Leiding { get; set; }

    //override protected void OnModelCreating(ModelBuilder modelBuilder)
    //{
    //    modelBuilder.Entity<Factuur>();
    //}
    //public DbSet<Factuur> Facturen { get; set; }
}

//[Table("Factuur", Schema = "bootcamp")]
//public class Factuur
//{
//    public int FactuurId { get; set; }
//    public int PersoonId { get; set; }
//    public string Desc { get; set; }
//    public decimal Bedrag { get; set; }

//    [NotMapped]
//    public Leiding Leiding { get; set; }
//}

[Table("Leiding", Schema = "KLJ")]
public class Leiding
{
    public int id { get; set; }
    public string? Firstname { get; set; }
    public string? Lastname { get; set; }

}