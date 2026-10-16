# Google Sheets Integration Setup Guide

This guide will help you automatically export all registrations to a Google Sheet in real-time.

## 📋 Overview

Every successful registration will automatically appear as a new row in your Google Sheet, including:
- Registration Date
- Full Name, Email, Phone
- Attendance Type (In Person / Online)
- Check-in Status
- UTM tracking parameters
- And more...

---

## 🚀 Step-by-Step Setup (5 minutes)

### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it something like **"UGEGBE GWR Registrations"**
4. Leave it blank - the script will auto-create headers

### Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. You'll see a code editor with a default `myFunction()` - **delete everything**

### Step 3: Paste the Apps Script Code

Copy the entire code block below and paste it into the Apps Script editor:

```javascript
/**
 * UGEGBE GWR Registration Webhook
 * This script receives POST requests from your website and adds registrations to the sheet
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and first sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'ID',
        'Registration Date',
        'Full Name',
        'Email',
        'Phone',
        'Attendees Count',
        'Attendance Type',
        'How Did You Hear',
        'Checked In',
        'Checked In At',
        'UTM Source',
        'UTM Medium',
        'UTM Campaign',
        'Created At',
        'Updated At'
      ]);
      
      // Format header row
      sheet.getRange(1, 1, 1, 15).setFontWeight('bold');
      sheet.getRange(1, 1, 1, 15).setBackground('#23C48E');
      sheet.getRange(1, 1, 1, 15).setFontColor('#FFFFFF');
    }
    
    // Format dates nicely
    const formatDate = (isoString) => {
      if (!isoString) return '';
      const date = new Date(isoString);
      return Utilities.formatDate(date, 'Africa/Lagos', 'yyyy-MM-dd HH:mm:ss');
    };
    
    // Append the new row
    sheet.appendRow([
      data.id || '',
      formatDate(data.createdAt),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.attendeesCount || 1,
      data.attendanceType || '',
      data.hearAbout || '',
      data.checkedIn ? 'YES' : 'NO',
      formatDate(data.checkedInAt),
      data.utmSource || '',
      data.utmMedium || '',
      data.utmCampaign || '',
      formatDate(data.createdAt),
      formatDate(data.updatedAt)
    ]);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 15);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Registration added to sheet'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Google Sheets Integration is active. Use POST requests to add data.');
}
```

### Step 4: Deploy as Web App

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → Choose **Web app**
3. Configure the deployment:
   - **Description**: "UGEGBE GWR Registration Webhook"
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. You may need to authorize the script - click **Authorize access** and follow the prompts
6. **IMPORTANT**: Copy the **Web App URL** that appears (looks like `https://script.google.com/macros/s/AKfyc...`)

### Step 5: Add the Webhook URL to Your Environment

1. Create a `.env` file in your project root (if you don't have one already)
2. Add this line with YOUR webhook URL:

```env
VITE_GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_ACTUAL_URL_HERE/exec"
```

3. **Important**: Restart your dev server after adding the environment variable:
   ```bash
   # Stop the current server (Ctrl+C)
   # Then start it again
   npm run dev
   ```

---

## ✅ Testing

1. Go to your registration page
2. Fill out and submit a test registration
3. Check your Google Sheet - you should see the data appear automatically!
4. Check the browser console (F12) for the message: `"✓ Registration successfully added to Google Sheets"`

---

## 🔧 Troubleshooting

### "Google Sheets webhook not configured" in console
- Make sure you added `VITE_GOOGLE_SHEETS_WEBHOOK_URL` to your `.env` file
- Restart your dev server after adding it

### "Google Sheets webhook returned error: 403"
- The script needs to be re-authorized
- Go to Apps Script → Deploy → Manage deployments → Edit → Re-deploy

### Data not appearing in sheet
- Check the Apps Script logs: Apps Script Editor → Executions tab
- Make sure "Who has access" is set to "Anyone"
- Verify the webhook URL ends with `/exec`

### Wrong timezone in dates
- Dates are formatted in Africa/Lagos timezone
- You can change this in the Apps Script `formatDate` function

---

## 📊 Sheet Features

The integration automatically:
- ✅ Creates formatted headers on first run
- ✅ Adds new registrations in real-time
- ✅ Formats dates in Africa/Lagos timezone
- ✅ Auto-resizes columns for readability
- ✅ Color-codes the header row (green theme)
- ✅ Tracks UTM parameters for marketing analytics

---

## 🔒 Security Notes

- The webhook URL is public but only accepts POST requests
- No authentication is needed (registration is free/public anyway)
- The script runs under YOUR Google account
- Only data you explicitly send is stored
- The integration fails silently - won't break registration if there's an issue

---

## 🎉 You're Done!

Every new registration will now automatically appear in your Google Sheet. You can:
- Share the sheet with your team
- Create charts and analytics
- Export to Excel/CSV anytime
- Filter and sort registrations
- Track registrations in real-time during the event

---

## 💡 Pro Tips

1. **Freeze the header row**: View → Freeze → 1 row
2. **Add data validation**: Protect the header row from edits
3. **Create a summary tab**: Use formulas like `=COUNTIF(Sheet1!G:G, "in_person")` to count in-person attendees
4. **Set up email notifications**: Tools → Notification rules → When form responses are submitted
5. **Create a dashboard**: Use Google Data Studio to visualize your registration data

---

Need help? Check the browser console logs or the Apps Script Executions tab for detailed error messages.
