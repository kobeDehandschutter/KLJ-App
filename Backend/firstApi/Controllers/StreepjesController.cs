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

        char charForHistory = 'H';
        char charForOverview = 'H';

        char letterForOverview = (char)(charForOverview + month);
        char letterForHistory = 'G';
        if (int.TryParse(id as string, out int number))
        {
            letterForHistory = (char)(charForHistory + number);
            id = (number + 3).ToString();

        }


        // Specify the range you want to read
        string range = $"{sheetName}!{letterForOverview}{id}:{letterForOverview}{id}";

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



        range = $"{sheetName}!H:H";
        request = sheetsService.Spreadsheets.Values.Get(spreadsheetId, range);
        response = request.Execute();
        values = response.Values;

        var lastRow = values.Count;
        var lastDate = values[lastRow - 1][0].ToString();
        var today = DateTime.Now.ToString("dd/MM/yyyy");

        if (lastDate == today)
        {
            range = $"{sheetName}!{letterForHistory}{lastRow}:{letterForHistory}{lastRow}";
            request = sheetsService.Spreadsheets.Values.Get(spreadsheetId, range);
            response = request.Execute();
            values = response.Values;

            if (values == null || values.Count == 0)
            {
                values = new List<IList<object>> { new List<object> { "0" } };
            }

            if (int.TryParse(values[0][0] as string, out int streepjesVandaag))
            {
                values[0][0] = (streepjesVandaag + 1).ToString();
            }
            else
            {
                throw new FileNotFoundException();
            }

            // Read data from the specified range
            updateRequest = sheetsService.Spreadsheets.Values.Update(new ValueRange { Values = values }, spreadsheetId, range);
            updateRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.RAW;

            updateResponse = updateRequest.Execute();

            if (updateResponse.UpdatedCells == 0)
            {
                throw new FileNotFoundException();
            }
        }
        else
        {
            range = $"{sheetName}!H{lastRow + 1}:H{lastRow + 1}";
            IList<IList<object>> valuesList = new List<IList<object>> { new List<object> { today } };
            updateRequest = sheetsService.Spreadsheets.Values.Update(new ValueRange { Values = valuesList }, spreadsheetId, range);
            updateRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.RAW;

            updateResponse = updateRequest.Execute();

            if (updateResponse.UpdatedCells == 0)
            {
                throw new FileNotFoundException();
            }

            range = $"{sheetName}!{letterForHistory}{lastRow + 1}:{letterForHistory}{lastRow + 1}";
            valuesList = new List<IList<object>> { new List<object> { 1 } };
            updateRequest = sheetsService.Spreadsheets.Values.Update(new ValueRange { Values = valuesList }, spreadsheetId, range);
            updateRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.RAW;

            updateResponse = updateRequest.Execute();

            if (updateResponse.UpdatedCells == 0)
            {
                throw new FileNotFoundException();
            }


        }


    }
}

