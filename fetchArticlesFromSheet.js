function fetchArticlesFromSheet() {
  const spreadsheetId =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName("Articles");

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const unsentArticles = [];

  rows.forEach((row, index) => {
    const isMailSent = row[6];

    if (isMailSent !== true && isMailSent !== "TRUE") {
      unsentArticles.push({
        rowIndex: index + 1,
        url: row[0],
        title: row[1],
        description: row[2],
        imageUrl: row[3],
        publishedAt: row[4],
        summary: row[5],
        isMailSent: row[6],
      });
    }
  });
  Logger.log(unsentArticles);
  return unsentArticles;
}
