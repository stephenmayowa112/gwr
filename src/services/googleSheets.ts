import { Registration } from '../types';

/**
 * Google Sheets Integration Service
 * 
 * This service sends registration data to a Google Sheet via Apps Script Web App.
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Google Sheet for registrations
 * 2. Open Extensions → Apps Script
 * 3. Paste the Apps Script code (see APPS_SCRIPT_CODE below)
 * 4. Deploy as Web App (Deploy → New deployment → Type: Web app)
 * 5. Set "Execute as: Me" and "Who has access: Anyone"
 * 6. Copy the Web App URL and add it to your .env as VITE_GOOGLE_SHEETS_WEBHOOK_URL
 * 7. The script will automatically create headers on first run
 */

const APPS_SCRIPT_CODE = `
/*
 * GOOGLE APPS SCRIPT CODE
 * Copy this entire code block into your Google Apps Script editor
 * 
 * This script receives POST requests and appends registration data to the sheet
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
`;

/**
 * Send registration data to Google Sheets
 * @param registration - The registration object to send
 * @returns Promise<boolean> - true if successful, false otherwise
 */
export async function sendToGoogleSheets(registration: Registration): Promise<boolean> {
  // Get the webhook URL from environment variables
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
  
  // If no webhook URL is configured, skip silently (don't break registration)
  if (!webhookUrl || webhookUrl === '') {
    console.info('Google Sheets webhook not configured. Skipping sheet export.');
    return false;
  }

  try {
    console.log('Sending registration to Google Sheets:', registration.email);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: registration.id,
        fullName: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        attendeesCount: registration.attendeesCount,
        attendanceType: registration.attendanceType,
        hearAbout: registration.hearAbout || '',
        checkedIn: registration.checkedIn,
        checkedInAt: registration.checkedInAt || '',
        utmSource: registration.utmSource || '',
        utmMedium: registration.utmMedium || '',
        utmCampaign: registration.utmCampaign || '',
        createdAt: registration.createdAt,
        updatedAt: registration.updatedAt,
      }),
    });

    if (!response.ok) {
      console.error('Google Sheets webhook returned error:', response.status, response.statusText);
      return false;
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('✓ Registration successfully added to Google Sheets');
      return true;
    } else {
      console.error('Google Sheets webhook error:', result.error);
      return false;
    }
  } catch (error) {
    // Log but don't throw - we don't want to break registration if sheets fails
    console.error('Failed to send to Google Sheets:', error);
    return false;
  }
}

/**
 * Export the Apps Script code for easy copy-paste
 */
export function getAppsScriptCode(): string {
  return APPS_SCRIPT_CODE;
}
