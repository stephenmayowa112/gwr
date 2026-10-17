/**
 * Test script for Google Sheets integration
 * Run with: node test-google-sheets.js
 */

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzq5NwfVkEFLmbq-NVGyjBD5ydQ7pbDJa68KdQCAi0kqtiiLkLY_cLAiPJnN2N6rS9M/exec";

const testRegistration = {
  id: "test_" + Date.now(),
  fullName: "Test User",
  email: "test@example.com",
  phone: "+234 800 000 0000",
  attendeesCount: 1,
  attendanceType: "in_person",
  hearAbout: "Test - Manual Integration Check",
  checkedIn: false,
  checkedInAt: "",
  utmSource: "test",
  utmMedium: "manual",
  utmCampaign: "integration_test",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

console.log("🧪 Testing Google Sheets Integration...\n");
console.log("📤 Sending test registration:", testRegistration.email);
console.log("🔗 Webhook URL:", WEBHOOK_URL);
console.log("");

fetch(WEBHOOK_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(testRegistration),
})
  .then((response) => {
    console.log("📡 Response Status:", response.status, response.statusText);
    return response.json();
  })
  .then((data) => {
    console.log("📥 Response Data:", data);
    
    if (data.success) {
      console.log("\n✅ SUCCESS! Test registration added to Google Sheet");
      console.log("👉 Check your Google Sheet to see the new row");
    } else {
      console.log("\n❌ FAILED:", data.error || "Unknown error");
    }
  })
  .catch((error) => {
    console.error("\n❌ ERROR:", error.message);
    console.log("\n💡 Troubleshooting:");
    console.log("   1. Make sure the webhook URL is correct");
    console.log("   2. Check that the Apps Script is deployed as 'Anyone' can access");
    console.log("   3. Verify the deployment is active in Google Apps Script");
  });
