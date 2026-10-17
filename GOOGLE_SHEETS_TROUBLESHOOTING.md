# Google Sheets Integration - Troubleshooting 403 Error

## ⚠️ Current Status
Your webhook returned: **403 Forbidden**

This is a **permissions issue** with your Google Apps Script deployment.

---

## 🔧 Quick Fix Checklist

Follow these steps **in order**:

### ☐ Step 1: Verify Apps Script Code
- [ ] Open your Google Sheet
- [ ] Go to **Extensions** → **Apps Script**
- [ ] Confirm you have both `doPost(e)` and `doGet(e)` functions
- [ ] Code should match the version in `GOOGLE_SHEETS_SETUP.md`

### ☐ Step 2: Check Deployment Settings
- [ ] Click **Deploy** → **Manage deployments**
- [ ] Click the ✏️ **Edit** icon
- [ ] Verify **Execute as:** is set to **Me** (your email)
- [ ] **CRITICAL:** Verify **Who has access:** is **Anyone** (not "Anyone with Google account")
- [ ] Click **Deploy**

### ☐ Step 3: Authorize the Script
- [ ] If you see "Authorize access", click it
- [ ] If you see "Google hasn't verified this app", click **Advanced**
- [ ] Click **Go to [Your Project Name] (unsafe)**
- [ ] Review permissions and click **Allow**

### ☐ Step 4: Verify Deployment URL
- [ ] After deployment, copy the **Web app URL**
- [ ] Make sure it ends with `/exec`
- [ ] Your current URL is:
  ```
  https://script.google.com/macros/s/AKfycbzq5NwfVkEFLmbq-NVGyjBD5ydQ7pbDJa68KdQCAi0kqtiiLkLY_cLAiPJnN2N6rS9M/exec
  ```

### ☐ Step 5: Test the Integration
```bash
node test-google-sheets.js
```

**Expected output:**
```
✅ SUCCESS! Test registration added to Google Sheet
```

### ☐ Step 6: Check Google Sheet
- [ ] Open your Google Sheet
- [ ] You should see a new row with test data
- [ ] Headers should be formatted in green (#23C48E)

### ☐ Step 7: Restart Dev Server
```bash
npm run dev
```

### ☐ Step 8: Test Real Registration
- [ ] Go to your website
- [ ] Submit a registration
- [ ] Check browser console for: `✓ Registration successfully added to Google Sheets`
- [ ] Verify the data appears in your Google Sheet

---

## 🔍 Common Issues & Solutions

### Issue: "403 Forbidden" Error
**Cause:** Incorrect deployment permissions  
**Fix:** Make sure "Who has access" is set to **Anyone** (not "Anyone with Google account")

### Issue: "Authorization Required" in Script
**Cause:** Script hasn't been authorized  
**Fix:** Click the authorization link and complete the OAuth flow

### Issue: No Rows Appearing in Sheet
**Cause:** Script might have errors  
**Fix:** Check Apps Script → **Executions** tab for error logs

### Issue: Headers Not Created
**Cause:** Sheet already has content  
**Fix:** Delete all rows and let the script create headers automatically

### Issue: Wrong Timezone in Dates
**Cause:** Timezone is hardcoded to Africa/Lagos  
**Fix:** Edit the `formatDate` function in Apps Script if you need a different timezone

---

## 🆘 Nuclear Option: Start Fresh

If nothing works, create a completely new deployment:

1. Delete the old deployment:
   - Apps Script → Deploy → Manage deployments
   - Click trash icon 🗑️ next to old deployment
   
2. Create new deployment:
   - Deploy → New deployment
   - Click gear icon ⚙️ → Select **Web app**
   - Description: "UGEGBE Registration Webhook"
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**

3. Update `.env` with the new URL

4. Test again with `node test-google-sheets.js`

---

## 📊 What Should Happen When It Works

1. User registers on your website
2. Registration is saved to Firestore ✅
3. Registration is sent to Google Sheets ✅
4. New row appears in your sheet **instantly** ✅
5. No errors in browser console ✅

---

## 🎯 Success Indicators

When working correctly, you'll see:

**In Browser Console:**
```
Sending registration to Google Sheets: user@example.com
✓ Registration successfully added to Google Sheets
```

**In Google Sheet:**
- New row with formatted data
- Dates in Africa/Lagos timezone
- Green header row (#23C48E)
- Auto-resized columns

**In Apps Script Executions Tab:**
- Status: "Completed"
- No errors

---

## 📞 Need More Help?

1. Check the **Executions** tab in Apps Script for detailed error logs
2. Try the test script: `node test-google-sheets.js`
3. Share the error messages from either of the above

Your webhook URL is already configured in `.env` - once you fix the 403 error, everything should work automatically!
