## Use CLASP (Command Line Apps Script Projects)

CLASP is the official Google tool for developing Apps Script projects locally with your favorite editor, and it integrates seamlessly with Git and GitHub.

Workflow: - Install CLASP (npm i -g @google/clasp). - Clone your Apps Script project locally using CLASP. - Use Git locally to manage versions and push to GitHub. - Use clasp push to sync changes from your local repo to your Google Drive Apps Script project, and clasp pull to fetch updates from Drive. - This allows you to use GitHub for version control and collaboration, and Google Drive remains the source for deployment and execution

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
