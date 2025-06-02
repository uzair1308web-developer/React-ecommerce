import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import CategoryCollapse from '../CategoryCollapse';


const CategoryPanel = ({ openCategoryPanel, setIsOpenCatPanel }) => {
    // const [open, setOpen] = React.useState(openCategoryPanel);


    const toggleDrawer = (newOpen) => () => {
        // setOpen(newOpen)
        setIsOpenCatPanel(newOpen);
    };

    

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <h3 className='p-3 text-[16px] font-[500] flex items-center justify-between'>
                Shop By Categories
                <IoCloseSharp onClick={toggleDrawer(false)} className='cursor-pointer text-2xl' />
            </h3>
            <CategoryCollapse openCategoryPanel={openCategoryPanel} setIsOpenCatPanel={setIsOpenCatPanel}/>
        </Box>
    );

    return (
        // console.log(openCategoryPanel),
        <div>
            {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
            <Drawer open={openCategoryPanel} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
}

export default CategoryPanel
