function app() {
  try {
    // fetch news articles from newsapi or newsdata.io and save them in Google Sheet
    fetchNewsArticlesFromNewsAPILatest();

    // fetch articles from Google Sheets and summarize them usin gemini, openai, deepseek
    // assuming articles tht are not sent are not summarised
    const spreadsheetId =
      PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    const sheet = spreadsheet.getSheetByName("Articles");

    const unsentArticles = fetchArticlesFromSheet();
    unsentArticles.forEach((article) => {
      const newSummary = geminiSummarizer(article);

      article.summary = newSummary;
      sheet.getRange(article.rowIndex + 1, 6).setValue(newSummary);
    });

    // build HTML content for newsletter per user filter with category
    // send email with the HTML content
    sendEmail(unsentArticles);
  } catch (e) {
    console.error("Error in app function:", e);
  }
}
