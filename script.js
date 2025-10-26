// Initial App Setup
document.getElementById('access-status').innerText = 'App Loaded';
document.getElementById('access-status').className = 'status-verified';

// Hide data display until login
document.getElementById('data-display').classList.add('hidden');

// Auth0 Initialization
var auth0 = new auth0.WebAuth({
  domain: 'dev-qlmmy3wsd6z2uizp.us.auth0.com',       // Replace with Auth0 domain
  clientID: 'A77mrh4iucqvshwOVUywjBGfkK3092sl',  // Replace with Auth0 client ID
  redirectUri: window.location.origin, 
  responseType: 'token id_token',
  scope: 'openid profile email'
});

// Login button
document.getElementById('login').onclick = function() {
  auth0.authorize();
};

// Logout button
document.getElementById('logout').onclick = function() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('idToken');
  document.getElementById('message').innerText = 'Logged out';
  document.getElementById('data-display').classList.add('hidden');
};

// Handle authentication response
window.addEventListener('load', function() {
  auth0.parseHash(function(err, authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      localStorage.setItem('accessToken', authResult.accessToken);
      localStorage.setItem('idToken', authResult.idToken);
      document.getElementById('message').innerText = 'Logged in as: ' + authResult.idTokenPayload.email;

      // Show secure data after successful login
      document.getElementById('data-display').classList.remove('hidden');
    }
  });
});

// Fetch Secure Data
function fetchInternalData() {
    const confidentialData = 
        `User: Verified by Auth0\n` +
        `Device Posture: Healthy (Simulated by Cloudflare)\n` +
        `Access Time: ${new Date().toLocaleTimeString()}\n\n` +
        `FINANCIAL DATA: Q3 Revenue $5.1M (CONFIDENTIAL)`;

    document.getElementById('data-output').innerText = confidentialData;
    alert('Secure Data Displayed! Access was granted based on Identity + Policy.');
}

