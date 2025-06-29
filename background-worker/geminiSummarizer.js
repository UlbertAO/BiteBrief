function geminiSummarizer(article) {
  const API_KEY =
    PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
  if (!API_KEY) {
    Logger.log("API Key not found in Script Properties. Please set it up.");
    // return "Error: API Key missing.";
  }

  const API_ENDPOINT =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
    API_KEY;

  const prompt = `You are a news summarization assistant. Given the title, brief description, and URL of a news article, write a clear and objective summary of the article in no more than 100 words. Do not assume or fabricate any information not present in the title or description.

If both the title and description are provided, base the summary strictly on that information.

If the description is missing or empty, generate a short summary using the latest information known to you based on the title and URL.

Title: ${article.title}
Description: ${article.description}
URL: ${article.url}`;

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  try {
    const response = UrlFetchApp.fetch(API_ENDPOINT, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();

    if (responseCode === 200) {
      const jsonResponse = JSON.parse(responseText);
      if (
        jsonResponse.candidates &&
        jsonResponse.candidates[0] &&
        jsonResponse.candidates[0].content &&
        jsonResponse.candidates[0].content.parts &&
        jsonResponse.candidates[0].content.parts[0]
      ) {
        return jsonResponse.candidates[0].content.parts[0].text;
      } else {
        Logger.log("Unexpected Gemini API response structure:", jsonResponse);
        throw new Error(
          "Unexpected Gemini API response structure:",
          jsonResponse
        );
        // return "Error: Could not extract summary.";
      }
    } else {
      Logger.log("Error calling Gemini API. Response Code: " + responseCode);
      Logger.log("Response Text: " + responseText);
      throw new Error(
        "Error calling Gemini API. Response Code: " + responseCode
      );

      //   return `Error: API call failed with code ${responseCode}. Check logs for details.`;
    }
  } catch (e) {
    Logger.log("Error during API call: " + e.toString());
    // throw e;
    // return "Error: Exception during API call.";
  }
}
