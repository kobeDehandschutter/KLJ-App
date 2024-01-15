using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Emit;
using Microsoft.Extensions.DependencyInjection;
using Excel = Microsoft.Office.Interop.Excel;
using System.Runtime.InteropServices;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;


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

app.MapGet("/excel", () =>
{
    string credentialsPath = "../klj-app-408112-5dd80f3e0960.json";

    // Replace with the ID of your Google Sheets document
    string spreadsheetId = "1bTQciQO-VBC007SxG3gqrmKY2Zv51VVvKgcZ_Qif_JM";

    // Authenticate using credentials JSON file
    var credential = GoogleCredential.FromFile(credentialsPath)
        .CreateScoped(SheetsService.Scope.Spreadsheets);

    // Create Google Sheets API service
    var sheetsService = new SheetsService(new BaseClientService.Initializer()
    {
        HttpClientInitializer = credential,
        ApplicationName = "KLJ-APP",
    });

    // Replace with the name of your sheet
    string sheetName = "Dehandschutter Kobe";

    // Specify the range you want to read
    string range = $"{sheetName}";

    // Read data from the specified range
    var request = sheetsService.Spreadsheets.Values.Get(spreadsheetId, range);
    var response = request.Execute();
    var values = response.Values;

    if (values != null && values.Count > 0)
    {
        var result = new List<List<string>>();

        foreach (var row in values)
        {
            var formattedRow = row.Select(cell => cell.ToString()).ToList();
            result.Add(formattedRow);
        }

        return Results.Ok(result);
    }
    else
    {
        return Results.Ok("No data found.");
    }


    //     var con = @"Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\Users\KobeD\Dropbox\My PC (LAPTOP-BJSR469K)\Documents\KLJ\Financieel hoofdleiding\2023-2024\feestweekend\betalingen-inschrijvingen.xlsx;Extended Properties='Excel8.0;HDR=Yes;IMEX=1';";
    // #pragma warning disable CA1416 // Validate platform compatibility
    //     using (OleDbConnection connection = new(con))
    //     {
    //         connection.Open();
    //         OleDbCommand command = new("select * from [Sheet1$]", connection);
    //         using (OleDbDataReader dr = command.ExecuteReader())
    //         {
    //             while (dr.Read())
    //             {
    //                 var row1col0 = dr[0];
    //                 System.Console.WriteLine(row1col0);
    //             }
    //         }
    //     }
    // #pragma warning restore CA1416 // Validate platform compatibility

});
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
    var kobe = new Leiding
    {
        Id = "1",
        Firstname = "Kobe",
        Lastname = "Dehandschutter"

    };
    var joren = new Leiding
    {
        Id = "2",
        Firstname = "Joren",
        Lastname = "Cleppe"
    };
    var leiding = new List<Leiding>
    {
            kobe,
            joren
    };
    return Results.Ok(leiding);


});
app.Run();

public class PersonenContext : DbContext
{
    public PersonenContext(DbContextOptions options) : base(options)
    {

    }
    public DbSet<Leiding> Leiding { get; set; }
}


[Table("Leiding", Schema = "KLJ")]
public class Leiding
{
    public string? Id { get; set; }
    public string? Firstname { get; set; }
    public string? Lastname { get; set; }

}