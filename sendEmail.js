function sendEmail() {
  const subject = "Your Daily Tech Newsletter";

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
