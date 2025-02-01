export const authenticate = (data, next) => {
    if (window !== 'undefined'){
        sessionStorage.setItem('token', JSON.stringify(data.token));
        sessionStorage.setItem('user', JSON.stringify(data.user));
    }
    next();
}