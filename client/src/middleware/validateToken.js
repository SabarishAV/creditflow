const validateToken = (token) => {
    if(!token){
        return;
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    const expirationDate = new Date(decodedToken.exp * 1000); // Convert exp to Date
    return expirationDate > new Date();
};

export default validateToken;