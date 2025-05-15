import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js"
import { deleteMultipleProducts, deleteProduct, getAllProductsByPrice, getAllProductsByRating, getProduct, getProducts, getProductsByCatId, getProductsByCatName, getProductsBySubCatId, getProductsBySubCatName, getProductsByThirdSubCatId, getProductsByThirdSubCatName, getProductsCounts, removeImageFromCloudinary, updateProduct, uploadImages} from "../controllers/product.controller.js";
import { createProduct } from "../controllers/product.controller.js";

const productRouter = Router();
productRouter.post("/uploadImages", auth, upload.array("images"),uploadImages);
productRouter.post("/create", auth, createProduct);
productRouter.get("/getProducts", getProducts);
productRouter.get("/getProductsByCategoryId/:id", getProductsByCatId);
productRouter.get("/getProductsByCategoryName", getProductsByCatName);
productRouter.get("/getProductsBySubCategoryId/:id", getProductsBySubCatId);
productRouter.get("/getProductsBySubCategoryName",  getProductsBySubCatName);
productRouter.get("/getProductsByThirdSubCategoryId/:id",  getProductsByThirdSubCatId);
productRouter.get("/getProductsByThirdSubCategoryName",  getProductsByThirdSubCatName);
productRouter.get("/getProductsByPrice",  getAllProductsByPrice);
productRouter.get("/getAllProductsByRating",  getAllProductsByRating);
productRouter.get("/getProductsCounts",  getProductsCounts);
productRouter.post("/deleteMultiple", deleteMultipleProducts);                                                                                                                                     
productRouter.delete("/:id",  deleteProduct);
productRouter.get("/:id", getProduct);
productRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
productRouter.put('/updateProduct/:id', auth, updateProduct);


export default productRouter;
