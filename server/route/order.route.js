import { Router } from "express";
import { createOrder, deleteMultipleOrders, getAllOrderController, getOrderByOrderId, getOrderController, updateOrderStatus } from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";

const orderRouter = Router();

orderRouter.post('/create', auth, createOrder)
orderRouter.get('/get', auth, getOrderController)
orderRouter.get('/get-all-orders', auth, getAllOrderController)
orderRouter.post('/deleteMultiple', auth, deleteMultipleOrders)
orderRouter.post('/status', auth, updateOrderStatus)
orderRouter.get('/:id', auth, getOrderByOrderId)

export default orderRouter
