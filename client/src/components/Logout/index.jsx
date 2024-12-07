import Cookie from "js-cookie";

const Logout = () => {
  try{
    Cookie.remove("token");
    throw new Error()
  }catch{
    window.location="/login";
  }
};

export default Logout;
