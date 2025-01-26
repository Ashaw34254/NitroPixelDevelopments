const auth0Config = {
    domain: 'dev-noj5favwv6tb54ne.us.auth0.com',
    client_id: 'ia2ueRzjk5OPdGTkzCn1Ssx55iuOi62A',
    audience: 'c-9yodAq7Xgg46hFpkH1ArBJYMTDUjA4dUCuvF55KkPrxyOgsmU-uv2C5LzJ9yJv',
    redirectUri: 'http://127.0.0.1:5500/admin-editor.html'
};

let auth0Client = null;

// Global login function
window.login = async function() {
    try {
        if (!auth0Client) {
            await initializeAuth0();
        }
        await auth0Client.loginWithRedirect();
    } catch (error) {
        console.error('Login failed:', error);
    }
}

async function initializeAuth0() {
    auth0Client = await auth0.createAuth0Client({
        domain: auth0Config.domain,
        client_id: auth0Config.client_id,
        audience: auth0Config.audience,
        redirect_uri: auth0Config.redirectUri
    });
    return auth0Client;
}