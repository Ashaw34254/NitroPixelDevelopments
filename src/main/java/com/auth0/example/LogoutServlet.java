@Override
protected void doGet(final HttpServletRequest request, final HttpServletResponse response) 
    throws ServletException, IOException {
    // Session invalidation
    if (request.getSession() != null) {
        request.getSession().invalidate();
    }

    // Dynamic return URL construction
    String returnUrl = String.format("%s://%s", request.getScheme(), request.getServerName());
    
    // Port handling
    if ((request.getScheme().equals("http") && request.getServerPort() != 80) || 
        (request.getScheme().equals("https") && request.getServerPort() != 443)) {
        returnUrl += ":" + request.getServerPort();
    }
    returnUrl += "/login";

    // Auth0 logout URL construction
    String logoutUrl = String.format(
        "https://%s/v2/logout?client_id=%s&returnTo=%s",
        domain, clientId, returnUrl
    );
    
    response.sendRedirect(logoutUrl);
}
