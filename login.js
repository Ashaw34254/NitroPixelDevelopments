// Handle login with Auth0
async function login() {
    try {
        await auth0Client.loginWithRedirect({
            redirect_uri: auth0Config.redirectUri
        });
    } catch (err) {
        console.error('Login failed:', err);
    }
}

// Handle authentication callback
async function handleAuth0Callback() {
    try {
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
            // Handle the redirect callback
            await auth0Client.handleRedirectCallback();
            // Get user info
            const user = await auth0Client.getUser();
            // Store user info or token as needed
            window.location.href = '/admin-editor.html';
        }
    } catch (err) {
        console.error('Error handling callback:', err);
    }
}

// Check authentication status
async function checkAuth() {
    try {
        const isAuthenticated = await auth0Client.isAuthenticated();
        if (!isAuthenticated) {
            window.location.href = '/';
        }
    } catch (err) {
        console.error('Auth check failed:', err);
    }
}
