function fetchNewsArticlesFromNewsAPILatest() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
    "NEWSLETTER_SPREADSHEET_ID"
  );
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  const sheet = spreadsheet.getSheetByName("Articles");

  // get all NEWSAPI categories
  const allCategories = spreadsheet
    .getSheetByName("Categories")
    .getRange("B2:B")
    .getValues()
    .flat()
    .map((value) => (typeof value === "string" ? value.trim() : value))
    .filter((value) => typeof value === "string" && value.length > 0);

  const userSpreadsheetId = PropertiesService.getScriptProperties().getProperty(
    "USER_SPREADSHEET_ID"
  );
  const userSpreadsheet = SpreadsheetApp.openById(userSpreadsheetId);

  const userSubscribedCategories = [
    ...new Set(
      userSpreadsheet
        .getSheetByName("Submissions")
        .getRange("D2:D")
        .getValues()
        .flat()
        .map((value) => (typeof value === "string" ? value.trim() : value))
        .filter((value) => typeof value === "string" && value.length > 0)
    ),
  ];
  const finalCategories = userSubscribedCategories.filter((category) =>
    allCategories.includes(category)
  );

  const newsApiKey =
    PropertiesService.getScriptProperties().getProperty("NEWS_API_KEY");

  finalCategories.forEach((category, index) => {
    const url = `https://newsapi.org/v2/top-headlines?apiKey=${newsApiKey}&category=${encodeURIComponent(
      category
    )}&pageSize=10`;

    try {
      const response = UrlFetchApp.fetch(url);
      const responseCode = response.getResponseCode();
      const data = JSON.parse(response.getContentText());
      if (responseCode === 200) {
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
              "",
              category,
              false,
            ]);
          }
        });
      } else {
        Logger.log("Error calling News API. Response Code: " + responseCode);
        Logger.log("Response Text: " + responseText);
        //   return `Error: API call failed with code ${responseCode}. Check logs for details.`;
      }
    } catch (e) {
      Logger.log("Error during News API call");
      throw e;
      // return "Error: API call failed.";
    }
  });
}
