import { Button, Rating } from "@mui/material"
import { Link } from "react-router-dom";
import { AiOutlineFullscreen } from "react-icons/ai";
import { IoGitCompareOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { useContext } from "react";
import { MyContext } from "../../App";
import AddToCartButton from "../AddToCartButton";





const ProductItem = ({ product }) => {


  return (
    <div className="productItem shadow-lg rounded-xl my-4 overflow-hidden">
      <div className="group imgWrapper w-[100%]  overflow-hidden relative">
        <Link to={`/product/${product?._id}`}>
          <div className="img h-[200px] overflow-hidden">
            <img src={product?.images} alt="" className=" w-full object-cover" />
            <img src={product?.images} alt="" className=" w-full object-cover transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105" />

          </div>
        </Link>
        <div className="discount absolute top-2 left-2 bg-[#ff5252] px-2 py-1 rounded-full flex items-center">
          <span className="text-white font-semibold text-sm">20%</span>
        </div>
        <div className="absolute top-[-20px] right-[5px]  group-hover:top-[15px] w-[50px] transition-all duration-300 opacity-0 group-hover:opacity-100  flex flex-col items-center gap-2">
          <Button className=" !bg-white  !rounded-full !w-[35px] !h-[35px] !min-w-[35px] flex items-center justify-center group">
            <span className="text-black text-2xl"><AiOutlineFullscreen /></span>
          </Button>

          <Button className=" !bg-white  !rounded-full !w-[35px] !h-[35px] !min-w-[35px] flex items-center justify-center group">
            <span className="text-black text-2xl"><IoGitCompareOutline /></span>
          </Button>

          <Button className=" !bg-white  !rounded-full !w-[35px] !h-[35px] !min-w-[35px] flex items-center justify-center group">
            <span className="text-black text-2xl"><IoIosHeartEmpty /></span>
          </Button>
        </div>
      </div>
      <div className="prodInfo px-2 py-4">
        <h4 className="brandName text-lg font-light uppercase">{product?.brand}</h4>
        <p className="prodTitle text-black font-semibold">{product?.name}</p>
        <span className=""><Rating name="size-small" defaultValue={product?.rating} size="small" /></span>
        <p className="flex justify-between items-center">
          <span className="oldprice line-through text-zinc-500 font-semibold text-lg">₹{product?.oldPrice}</span>
          <span className="price font-semibold text-lg text-primary">₹{product?.price}</span></p>
        {/* Add to Cart */}


        <AddToCartButton product={product} />

      </div>
    </div>
  )
}

export default ProductItem
