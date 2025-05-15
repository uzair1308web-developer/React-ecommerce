import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import {
  createCategory,
  getCategoriesCount,
  uploadImages,
  getCategories,
  getSubCategoriesCount,
  getCategory,
  removeImageFromCloudinary,
  deleteCategory,
  updateCategory
} from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post(
  "/upload",
  auth,
  upload.array("images"),
  uploadImages
);

categoryRouter.post("/create", auth, createCategory);
categoryRouter.get("/", getCategories); 
categoryRouter.get("/get/count", getCategoriesCount); 
categoryRouter.get("/get/count/subCat", getSubCategoriesCount); 
categoryRouter.get("/:id", getCategory); 
categoryRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
categoryRouter.delete("/:id", auth, deleteCategory )
categoryRouter.put('/:id', auth, updateCategory);

export default categoryRouter;


