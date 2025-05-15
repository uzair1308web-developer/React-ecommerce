import dotenv from 'dotenv';
dotenv.config();


import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    const token =
      request.cookies.accessToken ||
      request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({
        message: "Provide token",
      });
    }
    // console.log(token);
    const decode = jwt.verify(
      token,
      // "newnew123",
      process.env.SECRET_KEY_ACCESS_TOKEN,
    );

    if (!decode) {
      return response.status(401).json({
        message: "unauthorized access",
        error: true,
        success: false,
      });
    }

    request.userId = decode.id;
    next();
  } catch (error) {
    return response.status(500).json({
      message: error.message || "You have not login",
      error: true,
      success: false,
    });
  }
};

export default auth;
