import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    products: [
      {
        type: String,
        required: true,
      },
    ],
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WishlistModel = mongoose.model("Wishlist", wishlistSchema);

export default WishlistModel;
