function sendEmail(unsentArticles) {
  const spreadsheetId =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  const usersSheet = spreadsheet.getSheetByName("Users");
  const data = usersSheet.getDataRange().getValues();
  const headers = data[0];
  const users = data.slice(1);

  users.forEach((row, index) => {
    const userName = row[0];
    const userEmail = row[1];
    const userCategory = row[2];

    const subject = `Your Daily ${userCategory} Newsletter`;
    const htmlContent = buildNewsletterHTML(
      userName,
      userCategory,
      unsentArticles.filter((article) => article.category === userCategory)
    );

    GmailApp.sendEmail(
      userEmail,
      subject,
      "This is a fallback plain text version of the newsletter.",
      {
        htmlBody: htmlContent,
      }
    );
  });

  Logger.log("Newsletter sent to: " + recipients);
}
