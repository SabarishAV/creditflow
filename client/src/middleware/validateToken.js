const validateToken = (token) => {
  try {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      const expirationDate = new Date(decodedToken.exp * 1000); // Convert exp to Date
      return expirationDate > new Date();
    } else {
      throw new Error("No token");
    }
  } catch {
    return new Error("Invalid token");
  }
};

export default validateToken;
