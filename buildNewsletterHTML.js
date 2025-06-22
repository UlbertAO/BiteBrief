function buildNewsletterHTML(userName, userCategory, articles) {
  const greetingName = userName ? `Hello ${userName},` : "Hello,";

  let html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <p style="font-size: 1.1em; color: #333; margin-bottom: 10px;">${greetingName}</p>
      <h2 style="color: #333; text-align: center; margin-bottom: 5px;">Your daily ${userCategory} digest</h2>
      <p style="text-align: center; color: #666; font-size: 1em; margin-top: 0;">
        Stay informed with today's top ${userCategory} headlines curated just for you.
      </p>
  `;

  articles.forEach((article) => {
    html += `
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border-collapse: collapse;">
        <tr>
          <td style="width: 35%; padding: 0;">
            <img src="${article.imageUrl}" alt="${
      article.title
    }" style="width: 100%; height: auto; display: block; object-fit: cover;">
          </td>
          <td style="padding: 15px; vertical-align: top;">
            <a href="${
              article.url
            }" style="font-size: 1.1em; font-weight: bold; text-decoration: none; color: #1a0dab;">${
      article.title
    }</a>
            <p style="margin-top: 10px; color: #555; font-size: 0.95em; line-height: 1.5;">${
              article.summary ?? article.document
            }</p>
          </td>
        </tr>
      </table>
    `;
  });

  html += `
      <p style="text-align: center; font-size: 0.95em; color: #444; margin-top: 30px;">
        Got a tip or feedback? Just reply to this email — we’d love to hear from you!
      </p>
      <p style="text-align: center; font-size: 0.85em; color: #888; margin-top: 20px;">
        You're receiving this email because you're subscribed to our daily tech newsletter.
      </p>
    </div>
  `;

  return html;
}
