function app() {
  const tobeSendArticles = fetchArticlesFromSheet();
  const htmlContent = buildNewsletterHTML(tobeSendArticles);
  sendEmail(htmlContent);
}
