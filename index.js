// Example usage
checkAuth().then(user => {
    if (user) {
        console.log('Logged in as:', user.email);
    }
});
