# BiteBrief

BiteBrief is an AI-powered, fully serverless newsletter service built on Google Apps Script. It enables users to subscribe to personalized, daily news digests delivered straight to their inbox, with content curated and summarized by AI.

## Technologies Used

- **Google Apps Script** (JavaScript, serverless backend)
- **Google Sheets** (data storage)
- **HTML/CSS/JavaScript** (frontend UI)
- **GmailApp** (email delivery)
- **External APIs** (NewsAPI, Gemini, etc.)

## Folder Structure

```
/
├── ui/                 # Frontend: UI and Apps Script handlers
├── background-worker/  # Backend: Data processing, summarization, and email sending
```

## Module Interaction

- The **UI module** collects user information (name, email, category) via a web form and writes it to a Google Sheet.
- The **background-worker module** retrieves user preferences from a Google Sheet, fetches the latest news matching those preferences, summarizes the articles using AI, and sends personalized newsletters to each user via GmailApp.

## Use Cases

- Automated, personalized news delivery for individuals or organizations
- Demonstration of serverless newsletter workflows using Google Apps Script
- Educational example for integrating Google Sheets, Apps Script, and external APIs

---

## Use CLASP (Command Line Apps Script Projects)

CLASP is the official Google tool for developing Apps Script projects locally with your favorite editor, and it integrates seamlessly with Git and GitHub.

Workflow:

- Install CLASP (npm i -g @google/clasp).
- Clone your Apps Script project locally using CLASP.
- Use Git locally to manage versions and push to GitHub.
- Use clasp push to sync changes from your local repo to your Google Drive Apps Script project, and clasp pull to fetch updates from Drive.
- This allows you to use GitHub for version control and collaboration, and Google Drive remains the source for deployment and execution

1. Authenticate CLASP with Your Google Account

   ```
   clasp login
   ```

   This will open a browser window for you to log in and authorize CLASP to access your Google Apps Script projects

2. Before using CLASP, ensure the Apps Script API is enabled for your account. Go to your Apps Script dashboard, open Settings, and enable the API if it’s not already active
3. Get Your Script ID, Open your Apps Script project in the browser. Go to Project Settings
4. Clone the Project Locally
   ```
   clasp clone <SCRIPT_ID>
   ```
5. Make Changes Locally
6. Push Changes Back to Apps Script
   ```
   clasp push
   ```
7. Use Git for Version Control
   ```
    git init
    git add .
    git commit -m "Initial commit"
   ```
