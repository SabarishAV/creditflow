import Cookies from "js-cookie";

const getUserId = () => {
  const token = Cookies.get("token");
  const parts = token.split('.');
  const payload = parts[1];
  const decodedPayload = JSON.parse(atob(payload));
  const userId = decodedPayload.userId; 
  return userId;
};

export default getUserId;