function buildNewsletterText(userName, userCategory, articles) {
  const greetingName = userName ? `Hello ${userName},` : "Hello,";
  let text = `${greetingName}\n\n`;
  text += `Your daily ${userCategory} digest\n`;
  text += `Stay informed with today's top ${userCategory} headlines curated just for you.\n\n`;

  articles.forEach((article, index) => {
    const title = article.title;
    const summary =
      article.summary?.trim() ||
      article.description?.trim() ||
      "No summary available.";
    const url = article.url;

    text += `${index + 1}. Title: ${title}\n`;
    text += `   Summary: ${summary}\n`;
    text += `   Read more: ${url}\n\n`;
  });

  text += `Got a tip or feedback? Just reply to this email — we’d love to hear from you!\n`;
  text += `You're receiving this email because you're subscribed to our daily ${userCategory.toLowerCase()} newsletter.\n`;

  return text;
}
