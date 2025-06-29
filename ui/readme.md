# BiteBrief UI Module

## Purpose

The UI module provides a user-friendly web interface for BiteBrief, allowing users to subscribe to personalized newsletters by submitting their preferences.

## User Interface

- Responsive landing page
- Subscription form collecting:
  - Full Name
  - Email Address
  - Category of Interest
- Real-time validation and feedback

## Interaction with Google Sheet

- On form submission, user data is written to the `Submissions` sheet in the configured Google Spreadsheet.
- Available categories are dynamically loaded from the `Categories` sheet.

## File Structure

- `index.html` — Main UI and form
- `app.js` — Apps Script backend for form handling and data storage
- `appsscript.json` — Project manifest
- `.env.json` — Set environment variables in script properties under setting

## Example Usage Flow

1. User visits the BiteBrief landing page.
2. User fills out the subscription form and selects a category.
3. On submit, data is validated and saved to the Google Sheet.
4. User receives a confirmation message.

## How to Run or Deploy

- Deploy as a web app via Google Apps Script:
  - Open the project in Apps Script Editor.
  - Click **Deploy > New deployment**.
  - Set access to "Anyone" or as required.
- Ensure script properties are set.

## Setup Notes

- The Google Sheet must have a `Submissions` sheet (created automatically if missing).
- Categories should be listed in the `Categories` sheet, column B.
