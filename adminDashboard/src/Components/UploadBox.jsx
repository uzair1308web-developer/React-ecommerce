import { Button, styled, CircularProgress } from '@mui/material'
import { PiImagesThin } from "react-icons/pi";

import React, { useContext, useState } from 'react'
import { uploadImage, uploadImages } from '../utils/api';
import { MyContext } from '../App';

const UploadBox = (props) => {
    const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const context = useContext(MyContext)
    let selectedImages = []
    const formData = new FormData();
    const onchangeFile = async (e, apiEndPoint) => {
        try {
            setPreviews([]);
            const files = e.target.files;
            setUploading(true);
            console.log(files)
            for (var i = 0; i < files.length; i++) {
                if (files[i] &&
                    (files[i].type === "image/jpg" ||
                        files[i].type === "image/jpeg" ||
                        files[i].type === "image/png" ||
                        files[i].type === "image/webp")
                ) {
                    const file = files[i];
                    selectedImages.push(file);
                    formData.append("images", file)

                } else {
                    context.openAlertBox('error', 'Please select only jpg, jpeg, png & webp file ')
                    setUploading(false);
                    return false;
                }
            }

            uploadImages(apiEndPoint, formData).then((res) => {
                setUploading(false);
                props.setPreviewsFun(res?.data?.images);

            })


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='uploadbox p-3 rounded-md overflow-hidden  border border-dashed border-zinc-700 flex justify-center'>
            {/* <div className='uploadbox p-3 rounded-md w-[120px] overflow-hidden border border-dashed border-zinc-700 flex justify-center'>
            </div> */}
            <div className='py-2'>
                {uploading === true ? <div className='flex flex-col justify-center items-center text-black py-5'> <CircularProgress /> <h4 className='text-center'>Uploading...</h4> </div> :

                    <Button
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        color="neutral">
                        <div className='text-zinc-500 flex flex-col justify-center items-center'>
                            <PiImagesThin className='text-7xl' />
                            <h4>Image Upload</h4>
                        </div>
                        <VisuallyHiddenInput type="file" accept='image/*'
                            multiple={props.multiple !== undefined ? props.multiple : false}
                            onChange={(e) => onchangeFile(e, props?.url)} name="images"
                        />
                    </Button>
                }
            </div>
        </div>
    )
}

export default UploadBox
