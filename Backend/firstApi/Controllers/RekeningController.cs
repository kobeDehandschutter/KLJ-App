using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Office.Interop.Excel;

namespace firstApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RekeningController : ControllerBase
{

    public RekeningController()
    {
    }

    [HttpGet("{name}", Name = "GetrekeningByName")]
    public IEnumerable<IEnumerable<object>> Get(string name)
    {
        System.Console.WriteLine(name);
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
        string sheetName = name;

        // Specify the range you want to read
        string range = $"{sheetName}";

        // Read data from the specified range
        var request = sheetsService.Spreadsheets.Values.Get(spreadsheetId, range);
        var response = request.Execute();
        var values = response.Values;

        var result = new List<List<string>>();

        foreach (var row in values)
        {
            var formattedRow = row.Select(cell => cell.ToString()).ToList();
            result.Add(formattedRow);
        }

        return result;

    }
}

