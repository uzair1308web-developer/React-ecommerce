import { Button, Rating } from "@mui/material"
import { Link } from "react-router-dom";
import { AiOutlineFullscreen } from "react-icons/ai";
import { IoGitCompareOutline } from "react-icons/io5";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useContext } from "react";
import { MyContext } from "../../App";
import AddToCartButton from "../AddToCartButton";
import { postData } from "../../utils/api";

const ProductItem = ({ product, setRefetch = () => {} }) => {

  const context = useContext(MyContext)
  const handleWishList = () => {
    if (!context.userData?._id) {
      context.openAlertBox('error', 'Please login first')
      return
    }
    postData(`/api/wishlist/add`, { userId: context?.userData?._id, productId: product?._id }).then((res) => {
      if (!res.error) {
        context.openAlertBox('success', res.message);
        context.setWishlist(res?.wishlist?.products);
        setRefetch(!refetch)
      } else {
        context.openAlertBox('error', res.message || 'Some error occured');
      }
    })
  }

  const removeProductFromWishlist = () => {
    postData(`/api/wishlist/remove`, { userId: context?.userData?._id, productId: product?._id }).then((res) => {
      if (!res.error) {
        context.openAlertBox('success', res.message);
        context.setWishlist(res?.wishlist?.products);
        setRefetch(!refetch)
      } else {
        context.openAlertBox('error', res.message || 'Some error occured');
        
      }
    })
  }



  return (
    <div className="productItem flex flex-col justify-between shadow-lg rounded-xl my-4 overflow-hidden lg:h-[400px]">
      <div className="group imgWrapper w-[100%]  overflow-hidden relative">
        <Link to={`/product/${product?._id}`}>
          <div className="img h-[200px] overflow-hidden">
            {product.images.length > 0 ? <img src={product?.images} alt="" className="h-full w-full object-cover" /> : <img src="https://picsum.photos/400/400" alt="" className=" w-full object-cover" />}
            <img src={product?.images ?? "https://picsum.photos/id/324"} alt="" className=" w-full object-cover transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105" />

          </div>
        </Link>
        <div className="discount absolute top-2 left-2 bg-[#ff5252] px-2 py-1 rounded-full flex items-center">
          <span className="text-white font-semibold text-sm">{product?.discount}%</span>
        </div>
        <div className="absolute top-[-20px] right-[5px]  group-hover:top-[15px] w-[50px] transition-all duration-300 opacity-0 group-hover:opacity-100  flex flex-col items-center gap-2">
          <Button className=" !bg-white  !rounded-full !w-[35px] !h-[35px] !min-w-[35px] flex items-center justify-center group">
            <span className="text-black text-2xl"><AiOutlineFullscreen /></span>
          </Button>

          <Button className=" !bg-white  !rounded-full !w-[35px] !h-[35px] !min-w-[35px] flex items-center justify-center group">
            <span className="text-black text-2xl"><IoGitCompareOutline /></span>
          </Button>

          <Button className=" !bg-white  !rounded-full !w-[35px] !h-[35px] !min-w-[35px] flex items-center justify-center group">
            {context?.wishlist?.includes(product?._id) ? <span onClick={removeProductFromWishlist} className="text-red-500 text-2xl"><IoIosHeart /></span> :
              <span className="text-black text-2xl" onClick={handleWishList}><IoIosHeartEmpty /></span>}
          </Button>
        </div>
      </div>
      <Link to={`/product/${product?._id}`} className="prodInfo px-2 py-4 flex-1 flex flex-col justify-between">
        <h4 className="brandName lg:text-lg text-sm font-light uppercase">{product?.brand}</h4>
        <p className="prodTitle text-black font-semibold line-clamp-2 text-sm"> {product?.name} </p>
        <span className=""><Rating name="size-small" defaultValue={product?.rating} size="small" /></span>
        <p className="flex justify-between items-center">
          <span className="oldprice line-through text-zinc-500 font-semibold text-lg">₹{product?.oldPrice}</span>
          <span className="price font-semibold text-lg text-primary">₹{product?.price}</span></p>
        {/* Add to Cart */}


      </Link>
    </div>
  )
}

export default ProductItem
