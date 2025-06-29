# BiteBrief Background Worker

## Purpose

The background worker automates the process of fetching news articles, summarizing them using AI, and sending personalized newsletters to subscribers.

## How It Works

- Reads user preferences from the `Submissions` sheet.
- Fetches the latest news articles for each category from external APIs (NEWSAPI).
- Summarizes articles using Gemini.
- Builds personalized newsletter content (HTML and plain text).
- Sends emails to users via GmailApp.
- Marks articles as "sent" to avoid duplicates.

## Triggers

- Can be run manually from the Apps Script Editor.
- Recommended: Set up a **time-based trigger** (e.g., daily) for automated operation.

## Expected Google Sheet Structure

- **Submissions Sheet** (user data)
  - `Timestamp`, `Name`, `Email`, `Categories`
- **Categories Sheet**
  - Column B: List of available categories
- **Articles Sheet**
  - `URL`, `Title`, `Description`, `ImageURL`, `PublishedAt`, `Summary`, `Category`, `IsMailSent`

## Logging & Status Tracking

- Uses Apps Script `Logger.log()` for process tracking.
- Articles are marked as sent by setting `IsMailSent` to `TRUE` in the sheet.

## Email Templates & Logic

- Email content is generated in `buildNewsletterHTML.js` and `buildNewsletterText.js`.
- Templates can be customized by editing these files.
