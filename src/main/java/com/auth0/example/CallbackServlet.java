@Override
public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
    handle(req, res);
}

@Override
public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
    handle(req, res);
}

private void handle(HttpServletRequest req, HttpServletResponse res) throws IOException {
    try {
        Tokens tokens = authenticationController.handle(req, res);
        SessionUtils.set(req, "accessToken", tokens.getAccessToken());
        SessionUtils.set(req, "idToken", tokens.getIdToken());
        res.sendRedirect(redirectOnSuccess);
    } catch (IdentityVerificationException e) {
        e.printStackTrace();
        res.sendRedirect(redirectOnFail);
    }
}
