import { Button, Menu, MenuItem } from '@mui/material'
import React, { use, useContext, useEffect, useState } from 'react'
import { IoGridSharp } from 'react-icons/io5'
import { LuMenu } from 'react-icons/lu'
import ProductItem from '../../components/ProductItem'
import { MyContext } from '../../App'
import { fetchDataFromApi } from '../../utils/api'

const Search = () => {
    const context = useContext(MyContext);
    const [isItemView, setIsItemView] = React.useState('grid');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [prodData, setProdData] = useState([]);

    useEffect(()=> {
        fetchDataFromApi(`/api/product/getProductsByCategoryName?query=${context.query}`).then((res) => {
            if (!res?.error) {
                setProdData(res?.products)
            }
        })
    }, [context.query])


    return (
        <section className="py-6">
            <div className='container flex gap-3'>
                {/* <div className="sidebarWrapper w-[20%] bg-white p-3">
                    <Sidebar priceRange={priceRange} setPriceRange={setPriceRange} discount={discount} setDiscount={setDiscount} />
                </div> */}

                <div className="rightContent w-full bg-white p-3">
                    <div className="bg-[#f1f1f1] p-2 w-full flex rounded-md justify-between items-center mb-3 px-4">
                        <div className="col1 flex items-center gap-3">
                            <div className="text-xl text-zinc-600 cursor-pointer" onClick={() => setIsItemView('list')}>
                                <LuMenu />
                            </div>
                            <div className="text-xl text-zinc-600 cursor-pointer" onClick={() => setIsItemView('grid')}>
                                <IoGridSharp />
                            </div>
                            <div>
                                <span className="text-zinc-600">There are 5 products</span>
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

                    <div className="grid grid-cols-4 gap-4">
                        {
                            prodData?.map((item, index) => (
                                <ProductItem key={index} product={item} />
                            ))
                        }
                        {/* <ProductItem /> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Search