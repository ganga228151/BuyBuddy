import express from "express"
import { getUserById, login, register } from "../controllers/user.controller.js";
import { addToCart, deleteCartProduct, getCartProducts } from "../controllers/customer.controller.js";
import { isAutehnticated } from "../middelware/isAuthenticated.js";
import { createOrder } from "../controllers/oreder.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", isAutehnticated, getUserById);
router.post("/add-to-cart/:id", isAutehnticated, addToCart);
router.delete("/delete-from-cart/:id", isAutehnticated, deleteCartProduct);
router.get("/cart-products", isAutehnticated, getCartProducts);
router.post("/place-order", isAutehnticated, createOrder);
// router.post("/:id", login);

export const userRouter = router;