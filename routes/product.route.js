import express from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../middelware/upload.js";
import { isAutehnticated } from "../middelware/isAuthenticated.js";
const router = express.Router();


router.post("/add", isAutehnticated, upload.single("image"), addProduct);
router.get("/all", getProducts);
router.get("/:id", getProductById);
router.put("/:id", isAutehnticated, upload.single("image"), updateProduct);
router.delete("/:id", isAutehnticated, deleteProduct);

export const productRouter = router;