import axios from "axios";
// const API = axios.create({ baseURL: "http://localhost:5000/api" });
const API = axios.create({
  baseURL: "https://buyboddy-backend.onrender.com/api",
});



export const getAllproducts=async()=>{
   return await API.get("/product/all");
}
export const addToCart = (productId, token) =>
  API.post(`user/add-to-cart/${productId}`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const removeFromCart = (productId, token) =>
  API.delete(`/cart/delete/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getCart = (token) =>
  API.get(`/cart`, {
    headers: { Authorization: `Bearer ${token}` }
  });
