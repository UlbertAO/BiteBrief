function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("BiteBrief")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function saveFormData(formData) {
  try {
    const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
      "USER_SPREADSHEET_ID"
    );
    const ss = SpreadsheetApp.openById(spreadsheetId);
    let sheet = ss.getSheetByName("Submissions");

    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet("Submissions");
      sheet.appendRow(["Timestamp", "Name", "Email", "Categories"]);
    }

    const allCategories = getCategories().map((cat) => cat.toLowerCase());

    // Prepare data for writing
    const timestamp = new Date();
    const categories = Array.isArray(formData.categories)
      ? formData.categories.map((cat) => cat.toLowerCase())
      : [formData.categories.toLowerCase()];

    const finalCategories = categories
      .filter((cat) => allCategories.includes(cat))
      .join(", ");

    const newRow = [
      timestamp,
      formData.name.trim(),
      formData.email.trim(),
      finalCategories,
    ];

    // Append to sheet
    sheet.appendRow(newRow);

    return {
      success: true,
      message: "Thank you for your submission!",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred: " + error.message,
    };
  }
}

function getCategories() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
    "NEWSLETTER_SPREADSHEET_ID"
  );
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  const allCategories = spreadsheet
    .getSheetByName("Categories")
    .getRange("B2:B")
    .getValues()
    .flat()
    .map((value) => {
      value = value.trim();
      return value.charAt(0).toUpperCase() + value.slice(1);
    })
    .filter((value) => typeof value === "string" && value.length > 0);

  return allCategories;
}
