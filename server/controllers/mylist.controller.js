import { request } from "express";
import MyListModel from "../models/myList.modal.js";
import myListRouter from "../route/mylist.route.js";

export const addtoMyListController = async (request, response) => {
  try {
    const userId = request.userId;
    const {
      productId,
      productTitle,
      image,
      rating,
      price,
      oldPrice,
      brand,
      discount,
    } = request.body;

    const item = await MyListModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (item) {
      return response.status(400).json({
        message: "Item already in my list",
      });
    }

    const myList = new MyListModel({
      productId,
      productTitle,
      image,
      rating,
      price,
      oldPrice,
      brand,
      discount,
      userId,
    });

    const save = await myList.save();

    return response.status(200).json({
      error: false,
      success: true,
      message: "Successfully added in my list",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteMyListcontroller = async (request, response) => {
  try {
    const myListItem = await MyListModel.findById(request.params.id);

    if (!myListItem) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "The item with this given id was not found",
      });
    }

    const deletedItem = await MyListModel.findByIdAndDelete(request.params.id);

    if (!deletedItem) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "The item is not deleted",
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      message: "The item removed from my list.",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getMyListController = async (request, response) => {
  try {
    const userId = request.userId;
    const
    
    myListItems = await MyListModel.find({
      userId : userId
    })

    return response.status(200).json({
      error: false,
      success: true,
      data : myListItems
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

