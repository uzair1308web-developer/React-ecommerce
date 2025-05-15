import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import { addToCartItemController, deleteCartItemController, getCartItemController, updateCartController } from "../controllers/cart.controller.js";

const cartRouter = Router()

cartRouter.post('/create', auth, addToCartItemController)
cartRouter.get('/get', auth, getCartItemController)
cartRouter.put('/update-qty', auth, updateCartController)
cartRouter.delete('/delete', auth, deleteCartItemController)

export default cartRouter
