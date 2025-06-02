import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { match } from "assert";

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

export async function createProduct(request, response) {
  try {
    const product = new ProductModel(request.body);

    await product.save();

    if (!product) {
      return response.status(500).json({
        message: "product not created",
        error: true,
        success: false,
      });
    }

    imagesArr = [];
    return response.status(200).json({
      message: "product created successfully",
      error: false,
      success: true,
      product: product,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get all products
export async function getProducts(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    const {tag} = request.query
    const matchQuery = {};
    if(tag){
      matchQuery.tag = tag
    }

    if (page > totalPages) {
      return response.status(404).json({
        message: "page not found",
        error: true,
        success: false,
      });
    }

    const products = await ProductModel.find(matchQuery)
      .populate("category", "name")
      .populate("subCategory", "name")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      return response.status(500).json({
        message: "products not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "products found successfully",
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get products by category id
export async function getProductsByCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "page not found",
        error: true,
        success: false,
      });
    }

    const products = await ProductModel.find({
      catId: request.params.id,
    })
      .populate("category")
      .populate("subCategory")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      return response.status(500).json({
        message: "products not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "products found successfully",
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getMultipleProducts(request, response) {
  try {
    const productIds = request.body.productIds;
    const products = await ProductModel.find({ _id: { $in: productIds } });
    if (!products) {
      return response.status(500).json({
        message: "products not found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "products found successfully",
      error: false,
      success: true,
      products: products,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get products by category name
export async function getProductsByCatName(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    const matchQuery = {};
    const { priceRange, subCatName, discount, query } = request.query;

    if (priceRange) {
      matchQuery.price = { $gt: priceRange.split(",")[0] };
      matchQuery.price = { $lt: priceRange.split(",")[1] };
    }

    if (discount) {
      matchQuery.discount = { $lte: discount };
    }

    if (query) {
      const searchQuery = { $regex: query, $options: "i" };
      matchQuery.$or = [
        { name: searchQuery },
        { description: searchQuery },
        { "category.name": searchQuery },
      ];
    }

    if (page > totalPages) {
      return response.status(404).json({
        message: "page not found",
        error: true,
        success: false,
      });
    }

    const category = await CategoryModel.findOne({
      name: request.query.catName,
    })
      .select("_id")
      .lean();
    if (category) {
      matchQuery.category = category._id;
    }

    if (subCatName) {
      const subCategory = await CategoryModel.findOne({ name: subCatName })
        .select("_id")
        .lean();
      if (subCategory) {
        matchQuery.subCategory = subCategory._id;
      }
    }

    const products = await ProductModel.find(matchQuery)
      .populate("category")
      .populate("subCategory")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      return response.status(500).json({
        message: "products not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "products found successfully",
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// get products by sub category id
export async function getProductsBySubCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "page not found",
        error: true,
        success: false,
      });
    }

    const products = await ProductModel.find({
      subCatId: request.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      return response.status(500).json({
        message: "products not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "products found successfully",
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get products by sub category name
export async function getProductsBySubCatName(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "page not found",
        error: true,
        success: false,
      });
    }

    const products = await ProductModel.find({
      subCat: request.query.subCat,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      return response.status(500).json({
        message: "products not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "products found successfully",
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// get products by third sub category id
export async function getProductsByThirdSubCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "page not found",
        error: true,
        success: false,
      });
    }

    const products = await ProductModel.find({
      thirdsubCatId: request.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      return response.status(500).json({
        message: "products not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "products found successfully",
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get products by third sub category name
export async function getProductsByThirdSubCatName(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "page not found",
        error: true,
        success: false,
      });
    }

    const products = await ProductModel.find({
      thirdsubCat: request.query.thirdsubCatId,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      return response.status(500).json({
        message: "products not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "products found successfully",
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllProductsByPrice(request, response) {
  let productList = [];

  if (request.query.catId !== "" && request.query.catId !== undefined) {
    const productListArr = await ProductModel.find({
      catId: request.query.catId,
    }).populate("category");
    productList = productListArr;
  }

  if (
    request.query.thirdsubCatId !== "" &&
    request.query.thirdsubCatId !== undefined
  ) {
    const productListArr = await ProductModel.find({
      thirdsubCatId: request.query.thirdsubCatId,
    }).populate("category");

    productList = productListArr;
  }

  const filteredProducts = productList.filter((product) => {
    if (
      request.query.minPrice &&
      product.price < parseInt(+request.query.minPrice)
    ) {
      return false;
    } else if (
      request.query.maxPrice &&
      product.price > parseInt(+request.query.maxPrice)
    ) {
      return false;
    }
    return true;
  });

  return response.status(200).json({
    error: false,
    success: true,
    products: filteredProducts,
    totalPages: 0,
    page: 0,
  });
}

export async function getAllProductsByRating(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10000;

    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    let products = [];

    if (request.query.catId !== undefined) {
      products = await ProductModel.find({
        rating: request.query.rating,
        catId: request.query.catId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }

    if (!products) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductsCounts(request, response) {
  try {
    const productsCount = await ProductModel.countDocuments();
    if (!productsCount) {
      return response.status(500).json({
        success: false,
        error: true,
      });
    }
    return response.status(200).json({
      productsCount: productsCount,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteProduct(request, response) {
  try {
    const product = await ProductModel.findById(request.params.id);
    if (!product) {
      return response.status(404).json({
        message: "product not found",
        error: true,
        success: false,
      });
    }

    const images = product.images;

    let img;
    for (img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];

      const imageName = image.split(".")[0];

      if (imageName) {
        cloudinary.uploader.destroy(imageName, (error, result) => {
          // console.log(error,result)
        });
      }
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(
      request.params.id
    );

    if (!deletedProduct) {
      return response.status(500).json({
        message: "product not deleted",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "product deleted successfully",
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

export async function deleteMultipleProducts(request, response) {
  console.log(request.body);
  const { ids } = request.body;

  if (!ids || !Array.isArray(ids)) {
    return response.status(404).json({
      message: "ids not found",
      error: true,
      success: false,
    });
  }

  try {
    for (let i = 0; i < ids.length; i++) {
      const product = await ProductModel.findById(ids[i]);
      if (!product) {
        return response.status(404).json({
          message: "product not found",
          error: true,
          success: false,
        });
      }

      const images = product.images;

      let img;
      for (img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if (imageName) {
          cloudinary.uploader.destroy(imageName, (error, result) => {
            // console.log(error,result)
          });
        }
      }

      const deletedProduct = await ProductModel.deleteMany({
        _id: { $in: ids },
      });

      if (!deletedProduct) {
        return response.status(500).json({
          message: "product not deleted",
          error: true,
          success: false,
        });
      }
    }

    return response.status(200).json({
      message: "products deleted successfully",
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

export async function getProduct(request, response) {
  try {
    const product = await ProductModel.findById(request.params.id)
      .populate("category")
      .populate("subCategory");
    if (!product) {
      return response.status(404).json({
        message: "product not found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "product found successfully",
      error: false,
      success: true,
      product: product,
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
  const imgUrl = request.body.imgUrl;
  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];

  const imageName = image.split(".")[0];

  if (imageName) {
    const response = await cloudinary.uploader.destroy(
      imageName,
      (error, result) => {
        // console.log(error, result)
      }
    );

    if (response) {
      response.status(200).send(response);
    }
  }
}

export async function updateProduct(request, response) {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );

    if (!product) {
      return response.status(404).json({
        message: "product not found",
        error: true,
        success: false,
      });
    }

    imagesArr = [];

    return response.status(200).json({
      message: "product updated successfully",
      error: false,
      success: true,
      product: product,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
