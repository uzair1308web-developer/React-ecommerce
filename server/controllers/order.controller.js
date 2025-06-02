import { request } from "express";
import OrderModel from "../models/order.model.js";

export const createOrder = async (request, response) => {
  try {
    const order = new OrderModel(request.body);
    await order.save();
    return response.status(200).json({
      message: "order created successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: error.message, error: true, success: false });
  }
};

export const getOrderController = async (request, response) => {
  try {
    const order = await OrderModel.find({
      userId: request?.query?.userId,
    }).populate("products.product");
    if (!order) {
      return response.status({
        error: true,
        success: false,
        message: "Order not found",
      });
    }

    return response.status(200).json({
      error: false,
      succes: true,
      message: "Order found ",
      order: order,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message, error: true, success: false });
  }
};

export const getOrderByOrderId = async (request, response) => {
  try {
    const order = await OrderModel.findById(request.params.id).populate(
      "products.product"
    );
    if (!order) {
      return response.status({
        error: true,
        success: false,
        message: "Order not found",
      });
    }

    return response.status(200).json({
      error: false,
      succes: true,
      message: "Order found ",
      order: order,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export const getAllOrderController = async (request, response) => {
  try {
    const order = await OrderModel.find()
      .populate("products.product")
      .populate("userId");
    if (!order) {
      return response.status({
        error: true,
        success: false,
        message: "Order not found",
      });
    }

    return response.status(200).json({
      error: false,
      succes: true,
      message: "Order found ",
      order: order,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message, error: true, success: false });
  }
};

export const deleteMultipleOrders = async (request, response) => {
  try {
    const { ids } = request.body;
    if (!ids || !Array.isArray(ids)) {
      return response.status(404).json({
        message: "ids not found",
        error: true,
        success: false,
      });
    }
    const order = await OrderModel.deleteMany({ _id: { $in: ids } });
    if (!order) {
      return response.status(404).json({
        message: "order not found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "order deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message, error: true, success: false });
  }
};

export const updateOrderStatus = async (request, response) => {
  try {
    const { orderId, status } = request.body;
    if (!orderId || !status) {
      return response.status(404).json({
        message: "orderId or status not found",
        error: true,
        success: false,
      });
    }
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      { status: status },
      { new: true }
    );
    if (!updatedOrder) {
      return response.status(404).json({
        message: "order not found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "order updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message, error: true, success: false });
  }
};
