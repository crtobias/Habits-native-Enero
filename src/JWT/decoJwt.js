import { jwtDecode } from "jwt-decode";


const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token: ", decoded);
    return decoded;
  } catch (error) {
    console.error("Error decoding token", error);
  }
};

export default decodeToken