import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import { sendEmail } from "../config/emailService.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import CategoryModel from "../models/category.model.js";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_Key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

export async function registerUserController(request, response) {
  try {
    let user;

    const { name, email, password } = request.body;
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    user = await UserModel.findOne({ email });
    if (user) {
      return response.json({
        message: "User already register",
        error: true,
        success: false,
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 9000000).toString();

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    user = new UserModel({
      email: email,
      password: hashPassword,
      name: name,
      otp: verifyCode,
      otpExpires: Date.now() + 600000,
    });

    await user.save();

    const html = VerificationEmail(name, verifyCode);

    await sendEmail(email, "User verification mail", html);

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JSON_WB_TOKEN_SECRET_KEY
    );

    return response.status(200).json({
      success: true,
      error: false,
      message: "User registered successfully! Plese verify your email.",
      token: token,
      email: email,
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
  const imageName = urlArr[urlArr.length - 1].split(".")[0];
  if (imageName) {
    const res = await cloudinary.uploader.destroy(
      imageName,
      (error, result) => {}
    );
    if (res) {
      return response.status(200).send(res);
    }
  }
}

export async function verifyEmailController(request, response) {
  try {
    const { email, otp } = request.body;

    const user = await UserModel.findOne({ email }).select("+otp");
    if (!user) {
      return response
        .status(400)
        .json({ error: true, success: false, message: "User not found" });
    }

    const isCodeValid = user.otp === otp;
    const isNotExpired = user.otpExpires > Date.now();

    if (isCodeValid && isNotExpired) {
      user.verify_email = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return response.status(200).json({
        error: false,
        success: true,
        message: "Email verified successfully",
      });
    } else if (!isCodeValid) {
      return response
        .status(400)
        .json({ error: true, success: false, message: "Invalid OTP" });
    } else {
      return response
        .status(400)
        .json({ error: true, success: false, message: "OTP Expired" });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function loginUserController(request, response) {
  try {
    const { email, password } = request.body;

    console.log(request.body);

    const user = await UserModel.findOne({ email }).select("+status");

    if (!user) {
      return response.status(400).json({
        message: "User not register",
        error: true,
        success: false,
      });
    }
    console.log(user);

    if (user.verify_email !== true) {
      return response.status(400).json({
        message: "Your email is not verified",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      console.log("wrong password")
      return response.status(400).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", accessToken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);

    return response.status(200).json({
      success: true,
      error: false,
      message: "User logged in successfully",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function logoutController(request, response) {
  try {
    const userId = request.userId;
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return response.json({
      message: "Logout successfully",
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

var imagesArr = [];
export async function userAvatarController(request, response) {
  try {
    imagesArr = [];
    const userId = request.userId;
    const image = request.files;

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return response.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const imgUrl = user.avatar;
    const urlArr = imgUrl.split("/");
    const imageName = urlArr[urlArr.length - 1].split(".")[0];

    if (imageName) {
      const res = await cloudinary.uploader.destroy(
        imageName,
        (error, result) => {}
      );
    }

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      try {
        const cloudResponse = await cloudinary.uploader.upload(
          image[i].path,
          options
        );

        if (!cloudResponse || cloudResponse.error) {
          return response.status(400).json({
            message: "Image not uploaded",
            error: true,
            success: false,
          });
        }
        imagesArr.push(cloudResponse.secure_url);
        console.log(imagesArr);
      } catch (error) {
        return response.status(400).json({
          message: error.message || "Image not uploaded",
          error: true,
          success: false,
        });
      }
    }

    user.avatar = imagesArr[0];
    await user.save();

    console.log(imagesArr);
    return response.status(200).json({
      _id: userId,
      avatar: imagesArr,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId;
    const { name, email, mobile, password } = request.body;

    const userExist = await UserModel.findById(userId);

    if (!userExist)
      return response.status(400).send("The user cannot be updated");

    let verifyCode = "";
    if (email !== userExist.email) {
      verifyCode = Math.floor(100000 + Math.random() * 9000000).toString();
    }

    let hashPassword = "";

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    } else {
      hashPassword = userExist.password;
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name,
        mobile: mobile,
        email: email,
        verify_email: email !== userExist.email ? false : true,
        password: hashPassword,
        otp: verifyCode !== "" ? verifyCode : null,
        otpExpires: verifyCode !== "" ? Date.now() + 600000 : "",
      },
      { new: true }
    );

    if (email !== userExist.email) {
      await sendEmail({
        sendTo: email,
        subject: "Verify email from Ecommerce App",
        text: "",
        html: VerificationEmail(name, verifyCode),
      });
    }

    return response.json({
      message: "User updated successfully",
      error: false,
      success: true,
      user: {
        name: updateUser.name,
        _id: updateUser._id,
        email: updateUser.email,
        mobile: updateUser.mobile,
        avatar: updateUser.avatar,
      }
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    let verifycode = Math.floor(100000 + Math.random() * 9000000).toString();

    user.otp = verifycode;
    user.otpExpires = Date.now() + 600000;

    await user.save();

    await sendEmail(
      email,
      "Reset password",
      VerificationEmail(user.name, verifycode)
    );

    if (!sendEmail) {
      return response.status(400).json({
        message: "Email not sent",
        error: true,
        success: false,
      });
    } else {
      return response.json({
        message: "Please check your email",
        error: false,
        success: true,
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

export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email, otp } = request.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (!email || !otp) {
      return response.status(400).json({
        message: "Please provide email and otp",
        error: true,
        success: false,
      });
    }

    if (otp !== user.otp) {
      return response.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expires < currentTime) {
      return response.status(400).json({
        message: "Otp is expired",
        error: true,
        success: false,
      });
    }

    (user.otp = ""), (user.otpExpires = ""), await user.save();

    return response.status(200).json({
      message: "OTP verified",
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

export async function resetPassword(request, response) {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = request.body;
    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "provide email, new password, confirm password",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "Email is not available",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(oldPassword, user.password);
    if(!checkPassword){
      return response.status(400).json({
        message: "Your old password is incorrect",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "Password and confirm password does not match",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(confirmPassword, salt);

    const update = await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });

    return response.json({
      message: "Password reset successfully",
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

export async function refreshToken(request, response) {
  try {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      return response.status(400).json({
        message: "Please provide refresh token",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESHMENT_TOKEN
    );

    if (!verifyToken) {
      return response.status(400).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken._id;
    const newAccessToken = await generatedAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", newAccessToken, cookiesOption);

    return response.json({
      message: "New access token generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function userDetails(request, response) {
  try {
    const userId = request.userId;

    const user = await UserModel.findById(userId).select(
      "-password -refresh_token"
    );

    if(!user){
      return response.status(400).json({
        message: "user not found",
        error: true,
        success: false,
      })
    }

    return response.json({
      message: "user details",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}



