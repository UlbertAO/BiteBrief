function sendEmail(unsentArticles) {
  const spreadsheetId =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  const usersSheet = spreadsheet.getSheetByName("Users");
  const data = usersSheet.getDataRange().getValues();
  const headers = data[0];
  const users = data.slice(1);

  let mailSentTo = [];
  users.forEach((row, index) => {
    const userName = row[0].trim();
    const userEmail = row[1].trim();
    const userCategory = row[2].trim();

    const userArticles = unsentArticles.filter(
      (article) => article.category === userCategory
    );

    if (userArticles.length > 0) {
      mailSentTo.push(userEmail);
      const subject = `Your Daily ${userCategory} Newsletter`;
      const htmlContent = buildNewsletterHTML(
        userName,
        userCategory,
        userArticles
      );
      const textContent = buildNewsletterText(
        userName,
        userCategory,
        userArticles
      );

      GmailApp.sendEmail(userEmail, subject, textContent, {
        htmlBody: htmlContent,
        name: "BiteBrief",
      });
    }
  });

  Logger.log("Newsletter sent to: " + mailSentTo);
}
