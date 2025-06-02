import {Router} from "express";
import auth from "../middleware/auth.js";
import {addtoWishlistController, getAllWishlistItem, removeFromWishlistController,} from "../controllers/wishlist.controller.js";

const wishlistRouter = Router();

wishlistRouter.post('/add', auth, addtoWishlistController)
wishlistRouter.post('/remove', auth, removeFromWishlistController)
wishlistRouter.get('/get', auth, getAllWishlistItem)


// wishlistRouter.delete('/:id', auth, deleteWishlistController)
// wishlistRouter.get('/', auth, getWishlistController)

export default wishlistRouter