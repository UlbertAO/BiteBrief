function fetchArticlesFromSheet() {
  const spreadsheetId =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName("Article");

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const unsentArticles = [];

  rows.forEach((row, index) => {
    const isSent = row[5];

    if (isSent !== true && isSent !== "TRUE") {
      unsentArticles.push({
        rowIndex: index + 1,
        url: row[0],
        title: row[1],
        description: row[2],
        imageUrl: row[3],
        publishedAt: row[4],
        isSent: row[5],
      });
    }
  });

  Logger.log(unsentArticles);
  return unsentArticles;
}
