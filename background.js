// The extension never contacts LinkedIn directly and never automates linkedin.com.
// Once a private backend exists, it sends the user profile to that server, which
// handles email, AI generation, OAuth tokens, and official API posting securely.
chrome.runtime.onInstalled.addListener(() => chrome.alarms.create('weekly-check', { periodInMinutes: 10080 }));
chrome.alarms.onAlarm.addListener(async (alarm) => { if (alarm.name === 'weekly-check') await sendCheckin(); });
chrome.runtime.onMessage.addListener((message, _, sendResponse) => { if (message.type === 'SEND_CHECKIN') { sendCheckin().then(sendResponse); return true; } });
async function sendCheckin() {
  const { serverUrl = '', profile = {} } = await chrome.storage.local.get(['serverUrl','profile']);
  if (!serverUrl || !profile.email) return { ok: false, reason: 'server-or-email-missing' };
  try { const response = await fetch(serverUrl.replace(/\/$/, '') + '/api/checkins/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ profile }) }); return { ok: response.ok }; }
  catch { return { ok: false, reason: 'network-error' }; }
}
