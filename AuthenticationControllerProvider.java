private static volatile AuthenticationController INSTANCE;
private AuthenticationControllerProvider() {} // Private constructor prevents direct instantiation

static AuthenticationController getInstance(ServletConfig config) throws UnsupportedEncodingException {
    if (INSTANCE == null) {
        synchronized (AuthenticationControllerProvider.class) {
            if (INSTANCE == null) {
                String domain = config.getServletContext().getInitParameter("com.auth0.domain");
                String clientId = config.getServletContext().getInitParameter("com.auth0.clientId");
                String clientSecret = config.getServletContext().getInitParameter("com.auth0.clientSecret");
                
                if (domain == null || clientId == null || clientSecret == null) {
                    throw new IllegalArgumentException("Missing domain, clientId, or clientSecret. Did you update src/main/webapp/WEB-INF/web.xml?");
                }
                
                JwkProvider jwkProvider = new JwkProviderBuilder(domain).build();
                INSTANCE = AuthenticationController.newBuilder(domain, clientId, clientSecret)
                    .withJwkProvider(jwkProvider)
                    .build();
            }
        }
    }
    return INSTANCE;
}