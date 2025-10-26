document.getElementById('access-status').innerText = 'App Loaded';
document.getElementById('access-status').className = 'status-verified';
document.getElementById('data-display').classList.remove('hidden');

function fetchInternalData() {
    // In a real app, this would be an AJAX call to a secured API.
    // For our simulation, the *security* is enforced by Cloudflare Access 
    // BEFORE this page is even visible.
    const confidentialData = 
        `User: Verified by Auth0\n` +
        `Device Posture: Healthy (Checked by Cloudflare)\n` +
        `Access Time: ${new Date().toLocaleTimeString()}\n\n` +
        `FINANCIAL DATA: Q3 Revenue $5.1M (CONFIDENTIAL)`;

    document.getElementById('data-output').innerText = confidentialData;
    alert('Secure Data Displayed! Access was granted based on Identity + Policy.');
}