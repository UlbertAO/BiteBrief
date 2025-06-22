function sendEmail(unsentArticles) {
  const spreadsheetId =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  const usersSheet = spreadsheet.getSheetByName("Users");
  const data = usersSheet.getDataRange().getValues();
  const headers = data[0];
  const users = data.slice(1);

  users.forEach((row, index) => {
    const userName = row[0].trim();
    const userEmail = row[1].trim();
    const userCategory = row[2].trim();

    const subject = `Your Daily ${userCategory} Newsletter`;
    const htmlContent = buildNewsletterHTML(
      userName,
      userCategory,
      unsentArticles.filter((article) => article.category === userCategory)
    );
    const textContent = buildNewsletterText(
      userName,
      userCategory,
      unsentArticles.filter((article) => article.category === userCategory)
    );

    GmailApp.sendEmail(userEmail, subject, textContent, {
      htmlBody: htmlContent,
      name: "BiteBrief",
    });
  });

  Logger.log("Newsletter sent to: " + users.map((user) => user[1].trim()));
}
