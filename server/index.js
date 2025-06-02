import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import bodyParser from "body-parser";
import categoryRouter from "./route/category.route.js";
import productRouter from "./route/product.route.js";
import cartRouter from "./route/cart.route.js";
import myListRouter from "./route/mylist.route.js";
import addressRouter from "./route/address.route.js";
import bannerRouter from "./route/banner.route.js";
import orderRouter from "./route/order.route.js";
import wishlistRouter from "./route/wishlist.route.js";

const app = express();
app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

connectDB();

app.get("/", (request, response) => {
  response.json({
    message: "Server is runnning" + process.env.PORT,
  });
});

app.use("/api/user", userRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/myList", myListRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/wishlist", wishlistRouter)

app.listen(process.env.PORT, () => {
  console.log("Server is running", process.env.PORT);
});
