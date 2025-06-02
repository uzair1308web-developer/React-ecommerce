import CategoryModel from "../models/category.model.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

var imagesArr = [];
export async function uploadImages(request, response) {
  try {
    imagesArr = [];

    const image = request.files;
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.secure_url);
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

export async function createCategory(request, response) {
  try {
    let category = new CategoryModel({
      name: request.body.name,
      images: imagesArr,
      parentId: request.body.parentId,
      parentCatName: request.body.parentCatName,
    });

    if (!category) {
      return response.status(500).json({
        message: "category not created",
        error: true,
        success: false,
      });
    }

    category = await category.save();
    imagesArr = [];
    return response.status(200).json({
      message: "category created successfully",
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCategories(request, response) {
  try {
    const {priceRange} = request.query
    const matchQuery = {  };
    if(priceRange){
      matchQuery.price = { $lt: +priceRange[0] };
      matchQuery.price = { $gt: +priceRange[1] }; 
    } 
    const categories = await CategoryModel.find(matchQuery);
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat._doc, children: [] };
    });
    const rootCategories = [];
    categories.forEach((cat) => {
      if (cat.parentId) {
        categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });
    return response.status(200).json({
      message: "Categories fetched successfully",
      error: false,
      success: true,
      data: rootCategories,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCategoriesCount(request, response) {
  try {
    const categoryCount = await CategoryModel.countDocuments({
      parentId: undefined,
    });
    if (!categoryCount) {
      response.status(500).json({
        success: false,
        se,
        error: true,
      });
    } else {
      response.send({
        categoryCount: categoryCount,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getSubCategoriesCount(request, response) {
  try {
    const categories = await CategoryModel.find();
    if (!categories) {
      response.status(500).json({});
    } else {
      const subcatArr = [];
      for (let cat of categories) {
        if (cat.parentId !== undefined) {
          subcatArr.push(cat);
        }
      }
      response.send({ subCategoryCount: subcatArr.length });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCategory(request, response) {
  try {
    const category = await CategoryModel.findById(request.params.id);
    if (!category) {
      return response.status(500).json({
        message: "The category with the given ID was not found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "category fetched successfully",
      error: false,
      success: true,
      category: category,
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
  const imgUrl = request.query.imgUrl;
  const urlArr = imgUrl.split("/");
  const imageName = urlArr[urlArr.length - 1].split(".")[0];
  if (imageName) {
    const res = await cloudinary.uploader.destroy(
      imageName,
      (error, result) => {}
    );
    if (res) {
      return response.status(200).json({
        message: "Image deleted successfully",
        error: false,
        success: true,
      });
    }
  }
}

export async function deleteCategory(request, response) {
  try {
    const category = await CategoryModel.findById(request.params.id);
  const images = category.images;
  for (const img of images) {
    const urlArr = img.split('/');
    const image = urlArr[urlArr.length - 1];
    const imageName = image.substring(0, image.lastIndexOf('.'));
  
    try {
      const result = await cloudinary.uploader.destroy(imageName);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }  

  const subCategory = await CategoryModel.find({
    parentId: request.params.id,
  });

  for (let i = 0; i < subCategory.length; i++) {
    const thirdsubCategory = await CategoryModel.find({
      parentId: subCategory[i]._id,
    });

    for (let i = 0; i < thirdsubCategory.length; i++) {
      const deletedThirdSubCat = await CategoryModel.findByIdAndDelete(
        thirdsubCategory[i]._id
      );
    }

    const deletedSubCat = await CategoryModel.findByIdAndDelete(
      subCategory[i]._id
    );
  }

  const deletedCat = await CategoryModel.findByIdAndDelete(request.params.id);
  if (!deletedCat) {
    return response.status(404).json({
      message: "Category not found!",
      success: false,
    });
  }

  return response.status(200).json({
    success: true,
    error: false,
    message: "category deleted",
  });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    })
  }
}

export async function updateCategory(request, response){

  const category = await CategoryModel.findById(request.params.id);
  const updateData = request.body;
  if(!category){
    return response.status(500).json({
      message: "category not found",
      error: true,
      success: false,
    })
  }

  if(request.body.images){
    updateData.images = request.body.images
  }

  if(request.body.name){
    category.name = request.body.name
  }
  if(request.body.parentId){
    category.parentId = request.body.parentId
  }
  if(request.body.parentCatName){
    category.parentCatName = request.body.parentCatName
  }
  console.log(imagesArr)
  if(imagesArr.length > 0){
    category.images = imagesArr
  }
  await category.save();

  imagesArr = [];
  return response.status(200).json({
    error: false,
    success: true,
    category: category,
    message: 'Category updated successfully' 
  })
}


