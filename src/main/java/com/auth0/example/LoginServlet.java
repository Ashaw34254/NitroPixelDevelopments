@Override
protected void doGet(final HttpServletRequest req, final HttpServletResponse res) throws ServletException, IOException {
    // Build the dynamic redirect URI based on the current server context
    String redirectUri = req.getScheme() + "://" + req.getServerName();
    
    // Handle non-standard ports
    if ((req.getScheme().equals("http") && req.getServerPort() != 80) || 
        (req.getScheme().equals("https") && req.getServerPort() != 443)) {
        redirectUri += ":" + req.getServerPort();
    }
    
    // Append the callback endpoint
    redirectUri += "/callback";
    
    // Generate the Auth0 authorize URL and redirect
    String authorizeUrl = authenticationController.buildAuthorizeUrl(req, res, redirectUri)
        .build();
    res.sendRedirect(authorizeUrl);
}
