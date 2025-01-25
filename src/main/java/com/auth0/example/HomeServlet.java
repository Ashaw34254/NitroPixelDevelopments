protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // Retrieve tokens from session
    final String accessToken = (String) SessionUtils.get(req, "accessToken");
    final String idToken = (String) SessionUtils.get(req, "idToken");

    // Set user identifier based on available tokens
    if (accessToken != null) {
        req.setAttribute("userId", accessToken);
    } else if (idToken != null) {
        req.setAttribute("userId", idToken);
    }

    // Forward to JSP view
    req.getRequestDispatcher("/WEB-INF/jsp/home.jsp").forward(req, res);
}
