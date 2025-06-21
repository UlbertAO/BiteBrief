function fetchNewsArticles() {
  const spreadsheetId =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName("Article");
  const keywords = spreadsheet
    .getSheetByName("Keywords")
    .getRange("A2:A")
    .getValues()
    .flat()
    .filter(String);
  const newsApiKey =
    PropertiesService.getScriptProperties().getProperty("NEWS_API_KEY");

  const query = keywords.map((k) => `"${k.trim()}"`).join(" OR ");

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query
  )}&sortBy=publishedAt&language=en&apiKey=${newsApiKey}&pageSize=100`;
  const response = UrlFetchApp.fetch(url);
  const data = JSON.parse(response.getContentText());
  data.articles.forEach((article) => {
    // Check for duplicates by URL
    const existingUrls = sheet.getRange("A2:A").getValues().flat();
    if (!existingUrls.includes(article.url)) {
      sheet.appendRow([
        article.url,
        article.title,
        article.description,
        article.urlToImage,
        article.publishedAt,
      ]);
    }
  });
}
