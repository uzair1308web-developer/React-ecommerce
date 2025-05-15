import mongoose from "mongoose";

const homeSliderSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const HomeSliderModel = mongoose.model("homeSlider", homeSliderSchema);

export default HomeSliderModel;
