// Initialize App
document.getElementById('access-status').innerText = 'App Loaded';
document.getElementById('access-status').className = 'status-pending';
document.getElementById('data-display').classList.add('hidden');

// Auth0 Initialization
var auth0 = new auth0.WebAuth({
  domain: 'dev-qlmmy3wsd6z2uizp.us.auth0.com',       // Replace with Auth0 domain
  clientID: 'A77mrh4iucqvshwOVUywjBGfkK3092sl',  // Replace with Auth0 client ID
  redirectUri: window.location.origin, 
  responseType: 'token id_token',
  scope: 'openid profile email'
});

// Login Button
document.getElementById('login').onclick = function() {
  auth0.authorize();
};

// Logout Button
document.getElementById('logout').onclick = function() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('idToken');
  document.getElementById('message').innerText = 'Logged out';
  document.getElementById('data-display').classList.add('hidden');
  document.getElementById('access-status').innerText = 'Access Pending...';
  document.getElementById('access-status').className = 'status-pending';
};

// Handle Auth0 Response
window.addEventListener('load', function() {
  auth0.parseHash(function(err, authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      localStorage.setItem('accessToken', authResult.accessToken);
      localStorage.setItem('idToken', authResult.idToken);

      // Simulate Zero Trust checks
      let deviceHealthy = true;  // Change to false to simulate blocked device
      let userEmail = authResult.idTokenPayload.email;

      if (deviceHealthy) {
        document.getElementById('message').innerText = `Logged in as: ${userEmail}`;
        document.getElementById('access-status').innerText = 'Access Verified ✅';
        document.getElementById('access-status').className = 'status-verified';
        document.getElementById('data-display').classList.remove('hidden');
      } else {
        alert('Access Denied: Device does not meet security requirements!');
        document.getElementById('access-status').innerText = 'Access Denied ❌';
        document.getElementById('access-status').className = 'status-pending';
      }
    }
  });
});

// Fetch Secure Data Function
function fetchInternalData() {
    const confidentialData = 
        `User: Verified by Auth0\n` +
        `Device Posture: Healthy (Simulated)\n` +
        `Access Time: ${new Date().toLocaleTimeString()}\n\n` +
        `FINANCIAL DATA: Q3 Revenue $5.1M (CONFIDENTIAL)`;

    document.getElementById('data-output').innerText = confidentialData;
    alert('Secure Data Displayed! Access granted based on Identity + Policy.');
}
