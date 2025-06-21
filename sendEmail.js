function sendEmail() {
  const tobeSendArticles = fetchArticlesFromSheet();
  const htmlContent = buildNewsletterHTML(tobeSendArticles);

  const subject = "Your Daily Tech Newsletter(TL;DR)";

  // TODO read recipients from sheet
  const recipients = [].join(",");

  GmailApp.sendEmail(
    recipients,
    subject,
    "This is a fallback plain text version of the newsletter.",
    {
      htmlBody: htmlContent,
    }
  );

  Logger.log("Newsletter sent to: " + recipients);
}
