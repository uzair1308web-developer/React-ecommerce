import { Router } from "express";
import auth from "../middleware/auth.js"
import { createBanner, deleteBanner, getBanner, removeImageFromCloudinary, uploadBannerImage } from "../controllers/banner.controller.js";
import upload from "../middleware/multer.js";

const bannerRouter = Router();

bannerRouter.post('/upload', auth, upload.array("images"), uploadBannerImage)
bannerRouter.post('/create', auth, createBanner)
bannerRouter.delete('/deleteImage', auth, removeImageFromCloudinary)
bannerRouter.get('/get', getBanner)
bannerRouter.delete('/:id', auth, deleteBanner)

export default bannerRouter

// bannerRouter.get('/get', auth, getBannerController)
// bannerRouter.delete('/:id', auth, deleteBannerController)