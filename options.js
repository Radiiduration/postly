const $ = (s) => document.querySelector(s);
async function load() { const { profile = {} } = await chrome.storage.local.get('profile'); ['name','email','audience','facts','topics','day','time'].forEach(k => { if (profile[k] !== undefined) $('#'+k).value = profile[k]; }); }
$('#form').onsubmit = async (event) => { event.preventDefault(); const profile = Object.fromEntries(new FormData(event.target)); await chrome.storage.local.set({ profile, status: 'Waiting for your weekly check-in' }); $('#saved').classList.remove('hidden'); setTimeout(() => $('#saved').classList.add('hidden'), 2000); };
load();
