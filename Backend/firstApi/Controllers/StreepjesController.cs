using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Office.Interop.Excel;

namespace firstApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StreepjesController : ControllerBase
{


    private readonly PersonenContext _context;

    public StreepjesController(PersonenContext context)
    {
        _context = context;
    }

    // [HttpGet(Name = "GetLeiding")]
    // public IEnumerable<Leiding> Get()
    // {
    //     string credentialsPath = "../klj-app-408112-5dd80f3e0960.json";

    //     // Replace with the ID of your Google Sheets document
    //     string spreadsheetId = "1bTQciQO-VBC007SxG3gqrmKY2Zv51VVvKgcZ_Qif_JM";

    //     // Authenticate using credentials JSON file
    //     var credential = GoogleCredential.FromFile(credentialsPath)
    //         .CreateScoped(SheetsService.Scope.Spreadsheets);

    //     // Create Google Sheets API service
    //     var sheetsService = new SheetsService(new BaseClientService.Initializer()
    //     {
    //         HttpClientInitializer = credential,
    //         ApplicationName = "KLJ-APP",
    //     });

    //     // Replace with the name of your sheet
    //     string sheetName = "KLJ-APP";

    //     // Specify the range you want to read
    //     string range = $"{sheetName}!A4:D27";

    //     // Read data from the specified range
    //     var request = sheetsService.Spreadsheets.Values.Get(spreadsheetId, range);
    //     var response = request.Execute();
    //     var values = response.Values;
    //     var Leiding = new List<Leiding>();

    //     if (values != null && values.Count > 0)
    //     {
    //         foreach (var row in values)
    //         {
    //             if (row[0] != null)
    //             {
    //                 try
    //                 {
    //                     Leiding.Add(new Leiding() { Id = row[0].ToString(), Firstname = row[1].ToString(), Lastname = row[2].ToString(), Image = row[3]?.ToString() });
    //                 }
    //                 catch (Exception e)
    //                 {
    //                     System.Console.WriteLine(e.Message);
    //                 }
    //             }
    //         }
    //         return Leiding.ToArray();
    //     }
    //     else
    //     {
    //         Console.WriteLine("No data found.");
    //         return Leiding.ToArray();
    //     }
    // }

    [HttpGet("{id:int}", Name = "GetStreepjesPerMonthById")]
    public List<string> Get(string id)
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
        string sheetName = "KLJ-APP";

        // Specify the range you want to read
        string range = $"{sheetName}!J{id}:U{id}";

        // Read data from the specified range
        var request = sheetsService.Spreadsheets.Values.Get(spreadsheetId, range);
        var response = request.Execute();
        var values = response.Values;

        if (values != null && values.Count > 0)
        {
            var amounts = new List<string>();
            foreach (var amount in values[0])
            {
                amounts.Add(amount.ToString() ?? "0");
            }
            return amounts;
        }
        else
        {
            Console.WriteLine("No data found.");
        }
        throw new FileNotFoundException();
    }

    [HttpPost("{id:int}", Name = "CreateStreepjeById")]
    public void Post(string id)
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
        string sheetName = "KLJ-APP";

        var month = DateTime.Now.Month;

        char initialChar = 'H';

        char letter = (char)(initialChar + month);
        if (int.TryParse(id as string, out int number))
        {
            id = (number + 3).ToString();
        }


        // Specify the range you want to read
        string range = $"{sheetName}!{letter}{id}:{letter}{id}";

        var request = sheetsService.Spreadsheets.Values.Get(spreadsheetId, range);
        var response = request.Execute();
        var values = response.Values;

        if (values == null || values.Count == 0)
        {
            throw new FileNotFoundException();
        }

        if (int.TryParse(values[0][0] as string, out int streepjesDezeMaand))
        {
            values[0][0] = (streepjesDezeMaand + 1).ToString();
        }
        else
        {
            throw new FileNotFoundException();
        }

        // Read data from the specified range
        var updateRequest = sheetsService.Spreadsheets.Values.Update(new ValueRange { Values = values }, spreadsheetId, range);
        updateRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.RAW;

        var updateResponse = updateRequest.Execute();

        if (updateResponse.UpdatedCells == 0)
        {
            throw new FileNotFoundException();
        }

    }
}

