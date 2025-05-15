import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import HomeSliderModel from "../models/homeSlider.model.js";
import mongoose from "mongoose";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

var imagesArr = [];
export async function uploadBannerImage(request, response) {
  try {
    imagesArr = [];

    const image = request.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };
    for (let i = 0; i < image.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.url);
          fs.unlinkSync(`uploads/${request.files[i].filename}`);
        }
      );
    }
    return response.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export async function createBanner(request, response) {
  try {
    const { link, image } = request.body;
    if (!link || !image) {
      return response.status(500).json({
        message: "href or image not found",
        error: true,
        success: false,
      });
    }

    const slider = new HomeSliderModel(request.body);
    await slider.save();
    if (!slider) {
      return response.status(500).json({
        message: "slider not created",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "slider added successfully",
      error: false,
      success: true,
      product: slider,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function removeImageFromCloudinary(request, response) {
  console.log(request.query);
  const { imgUrl } = request.query;
  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];

  const imageName = image.split(".")[0];

  if (imageName) {
    const res = await cloudinary.uploader.destroy(
      imageName,
      (error, result) => {
        // console.log(error, result)
      }
    );

    if (response) {
      response.status(200).send(res);
    }
  }ha
}

export async function getBanner(request, response) {
  try {
    const slider = await HomeSliderModel.find();

    return response.status(200).json({
      message: "slider fetched successfully",
      error: false,
      success: true,
      slider,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteBanner(request, response) {
  try {

    const { id } = request.params;
    // if(mongoose.Types.ObjectId.isValid(id)){
    //   return response.status(500).json({
    //     message: "invalid id",
    //     error: true,
    //     success: false,
    //   })
    // }
    const homeSlider = await HomeSliderModel.findById(id);
    if(!homeSlider){
      return response.status(500).json({
        message: "slider not found",
        error: true,
        success: false,
      })
    }

    const imgUrl = homeSlider.image;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if (imageName) {
      const res = await cloudinary.uploader.destroy(
        imageName,

        (error, result) => {
          // console.log(error, result)
        }
      );
      if(!res){
        return response.status(500).json({
          message: "image not deleted",
          error: true,
          success: false,
        })
      }
    }

    await homeSlider.deleteOne();
    return response.status(200).json({
      message: "slider deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
