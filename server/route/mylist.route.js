import { Router } from "express";
import auth from "../middleware/auth.js";
import { addtoMyListController, deleteMyListcontroller, getMyListController } from "../controllers/myList.controller.js";

const myListRouter = Router();

myListRouter.post('/add', auth, addtoMyListController)
myListRouter.delete('/:id', auth, deleteMyListcontroller)
myListRouter.get('/', auth, getMyListController)

export default myListRouter