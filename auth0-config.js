// Auth0 configuration
const auth0Config = {
    domain: 'dev-noj5favwv6tb54ne.us.auth0.com',
    clientId: 'ia2ueRzjk5OPdGTkzCn1Ssx55iuOi62A',
    audience: 'c-9yodAq7Xgg46hFpkH1ArBJYMTDUjA4dUCuvF55KkPrxyOgsmU-uv2C5LzJ9yJv',
    redirectUri: window.location.origin + '/admin-editor.html'
};

// Initialize Auth0 client
const auth0Client = new Auth0Client({
    domain: auth0Config.domain,
    client_id: auth0Config.clientId,
    audience: auth0Config.audience,
    redirect_uri: auth0Config.redirectUri
});

async function checkAuth() {
    try {
        // Check if user is authenticated
        const isAuthenticated = await auth0Client.isAuthenticated();
        
        if (!isAuthenticated) {
            // If not authenticated, initiate login
            await auth0Client.loginWithRedirect();
        }
        
        // Get user info if authenticated
        if (isAuthenticated) {
            const user = await auth0Client.getUser();
            return user;
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        return null;
    }
}
