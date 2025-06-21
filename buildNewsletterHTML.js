function buildNewsletterHTML(articles) {
  let html = `
    <div style="font-family: Arial, sans-serif; padding: 10px;">
      <h2 style="color: #333;">📰 Your Weekly Tech Digest</h2>
  `;

  articles.forEach(article => {
    html += `
      <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
        <tr>
          <td style="width: 30%; vertical-align: top; padding-right: 10px;">
            <img src="${article.imageUrl}" alt="${article.title}" style="width: 100%; max-width: 200px; height: auto; border-radius: 5px;">
          </td>
          <td style="vertical-align: top;">
            <a href="${article.url}" style="font-size: 1.1em; font-weight: bold; text-decoration: none; color: #1a0dab;">${article.title}</a>
            <p style="margin-top: 8px; color: #555;">${article.description}</p>
          </td>
        </tr>
      </table>
    `;
  });

  html += `
      <p style="font-size: 0.9em; color: #999;">You're receiving this email because you're subscribed to our newsletter.</p>
    </div>
  `;
  return html;
}
