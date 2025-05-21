// utils/token.js

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem("authToken");
    return token || null;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};
