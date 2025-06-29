function app() {
  try {
    // fetch news articles from newsapi or newsdata.io and save them in Google Sheet
    fetchNewsArticlesFromNewsAPILatest();

    // fetch articles from Google Sheets and summarize them usin gemini, openai, deepseek
    // assuming articles tht are not sent are not summarised
    const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
      "NEWSLETTER_SPREADSHEET_ID"
    );
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    const sheet = spreadsheet.getSheetByName("Articles");

    const unsentArticles = fetchArticlesFromSheet();
    if (unsentArticles.length === 0) {
      Logger.log(
        "No unsent articles found. Exiting without processing further."
      );
      return;
    }
    unsentArticles.forEach((article) => {
      const newSummary = geminiSummarizer(article);

      article.summary = newSummary;
      sheet.getRange(article.rowIndex, 6).setValue(newSummary);

      Logger.log(`Summary fetched for ${article.url}, waiting for 10 sec now`);
      Utilities.sleep(10000); // if there is rate limiting
    });

    // build HTML content for newsletter per user filter with category
    // send email with the HTML content
    sendEmail(unsentArticles);

    // after mail is sent set flag to true
    unsentArticles.forEach((article) => {
      article.isMailSent = true;
      sheet.getRange(article.rowIndex, 8).setValue(true);
    });
  } catch (e) {
    console.error("Error in app function:", e);
  }
}
