import { response } from "express";
import WishlistModel from "../models/wishlist.model.js";

export const addtoWishlistController = async (request, response) => {
    try {
        const {userId, productId} = request.body
        let wishlist ;
        wishlist = await WishlistModel.findOne({userId})
        if(wishlist){
            wishlist.products.push(productId)
            await wishlist.save()
            return response.status(200).json({
                message: "Product added to wishlist",
                wishlist,
                error: false,
                success: true,
            })
        }
        wishlist = new WishlistModel({
            userId,
            products: [productId]
        })
        await wishlist.save()
        return response.status(200).json({
            wishlist,
            error: false,
            success: true,
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const removeFromWishlistController = async (request, response) => {
    try {
        const {userId, productId} = request.body
        const wishlist = await WishlistModel.findOneAndUpdate({userId}, {$pull: {products: productId}}, {new: true})
        return response.status(200).json({
            wishlist,
            error: false,
            success: true,
            message: "Product removed from wishlist"
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const getAllWishlistItem = async (request, response) => {
    try {
        const wishlist = await WishlistModel.find().populate("products")
        if(wishlist.length === 0){
            return response.status(200).json({
                message: "Wishlist is empty",
                error: false,
                success: true,
            })
        }
        return response.status(200).json({
            wishlist,
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}