import Addresmodel from '../models/address.model.js';
import UserModel from '../models/user.model.js';

export const addAddressController = async (request, response) => {
    try {
        const { address_line, city, state, pincode, country, mobile, status } = request.body;
        const userId = request.userId;
        console.log(userId)
        const address = new Addresmodel({
            address_line,
            city,
            state,
            pincode,
            country,
            mobile,
            status,
            userId
        });

        const savedAddress = await address.save();

        const updateCartUser = await UserModel.updateOne({
            _id: userId
        },{
            $push: {
                shopping_cart: address._id
            }
        })

        response.status(200).json({
            data: address,
            success: true,
            message: "Address added successfully",
            address
        })
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAddressController = async (request, response) => {
    try {
        const address = await Addresmodel.find({userId: request?.query?.userId});
        if(!address){
            return response.status({
                error: true,
                success: false,
                message: "Address not found"
            })
        }

        return response.status(200).json({
            error: false, 
            succes: true,
            message:"Address found ",
            address: address
        })

    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const deleteAddressController = async ( request, response) => {
    try {
        const userId = request.userId;
        const _id = request.params.id;

        if(!_id){
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            })
        }

        const deleteItem = await Addresmodel.deleteOne({_id: _id, userId: userId});

        if(!deleteItem){
            return response.status(404).json({
                message: "The Address not found",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Address deleted successfully",
            error: false,
            success: true,
            data: deleteItem
        })

    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message
        })
    }
}