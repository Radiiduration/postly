const $ = (s) => document.querySelector(s);
const show = (ready) => { $('#empty').classList.toggle('hidden', ready); $('#ready').classList.toggle('hidden', !ready); };
async function init() {
  const { profile = {}, status = 'Waiting for your weekly check-in', serverUrl = '' } = await chrome.storage.local.get(['profile', 'status', 'serverUrl']);
  const ready = Boolean(profile.email && profile.name);
  show(ready);
  if (!ready) return;
  $('#name').textContent = profile.name + '’s workflow';
  $('#statusTitle').textContent = status;
  $('#linkedinState').textContent = serverUrl ? 'Ready to connect through server' : 'Server not connected yet';
}
$('#settings').onclick = () => chrome.runtime.openOptionsPage();
$('#openSettings').onclick = () => chrome.runtime.openOptionsPage();
$('#start').onclick = () => chrome.runtime.openOptionsPage();
$('#sendTest').onclick = async () => {
  const { serverUrl = '' } = await chrome.storage.local.get('serverUrl');
  if (!serverUrl) { await chrome.storage.local.set({ status: 'Add the private server before sending email' }); init(); return; }
  chrome.runtime.sendMessage({ type: 'SEND_CHECKIN' }, (response) => {
    chrome.storage.local.set({ status: response?.ok ? 'Test check-in sent — check your email' : 'Could not send test check-in' }, init);
  });
};
init();
