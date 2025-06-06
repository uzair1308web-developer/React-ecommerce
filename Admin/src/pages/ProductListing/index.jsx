
import React from "react";
import { IoGridSharp } from "react-icons/io5"
import ProductItem from "../../components/ProductItem"
import Sidebar from "../../components/Sidebar"
import { LuMenu } from "react-icons/lu"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductListing = () => {
  const [isItemView, setIsItemView] = React.useState('grid');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [refetch, setRefetch] = useState(false);
  const [prodData, setProdData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {name = '', subCat} = useParams()
  const [priceRange, setPriceRange] = useState([0, 10000]);
      const [discount, setDiscount] = useState("");

  useEffect(() => { 
    const urlEndpoint = `/api/product/getProductsByCategoryName?catName=${name}${subCat ? `&subCatName=${subCat}` : ''}&priceRange=${priceRange} &discount=${discount}`
    fetchDataFromApi(urlEndpoint).then((res) => {

      console.log(res) 
      if (!res?.error) {
        setProdData(res?.products)
      }
    })
  }, [name, subCat, priceRange, discount, refetch])

  return (
    <section className="py-6">
      <div className='container flex gap-3'>
        <div className="sidebarWrapper lg:w-[20%] hidden lg:block bg-white p-3">
          <Sidebar priceRange={priceRange} setPriceRange={setPriceRange} discount={discount} setDiscount={setDiscount} />
        </div>

        <div className="rightContent lg:w-[80%] bg-white p-3">
          <div className="bg-[#f1f1f1] p-2 w-full flex rounded-md lg:justify-between items-center mb-3 px-4">
            <div className="col1 flex items-center gap-3">
              <div className="text-xl text-zinc-600 cursor-pointer" onClick={() => setIsItemView('list')}>
                <LuMenu />
              </div>
              <div className="text-xl text-zinc-600 cursor-pointer" onClick={() => setIsItemView('grid')}>
                <IoGridSharp />
              </div>
              <div>
                <span className="text-zinc-600 text-sm hidden">There are 5 products</span>
              </div>
            </div>

            <div className="col2 ">
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="!text-black"
              >
                Sort By
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Newest</MenuItem>
                <MenuItem onClick={handleClose}>
                  Price: Low to High
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  Price: High to Low
                </MenuItem>
              </Menu>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                {
                  prodData?.map((item, index) => (
                    <ProductItem key={index} product={item} setRefetch={setRefetch} />
                  ))
                }
            {/* <ProductItem /> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListing
