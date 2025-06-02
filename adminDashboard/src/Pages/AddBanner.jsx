import { Button, CircularProgress, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import UploadBox from '../Components/UploadBox'
import { IoMdClose } from 'react-icons/io'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { deleteImages, postData } from '../utils/api';
import { MyContext } from '../App';

const AddBanner = () => {
  const context = useContext(MyContext)
  const [formData, setFormData] = useState({
    link: "",
    image: "",
  })
  const [preview, setPreview] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setPreviewsFun = (previewArr) => {
    setPreview(previewArr[0])
    formData.image = previewArr[0]
  }
  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = preview;
    deleteImages(`/api/banner/deleteImage?imgUrl=${image}`).then((res) => {
      console.log(res)
      //   imageArr.splice(index, 1);
      setPreview("");
      setTimeout(() => {
        setPreview('');
        context.openAlertBox('success', 'Image deleted successfully')
      }, 1000);
    })
  }
  const validValue = Object.values(formData).every(el => el)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.link) {
      context.openAlertBox('error', 'Please fill all the fields');
      return;
    }
    if (!preview) {
      context.openAlertBox('error', 'Please select banner image');
      return false;
    }

    postData("/api/banner/create", formData).then((res) => {
      console.log(res)
      if (res?.success === true) {
        context.openAlertBox('success', res?.message)
        setFormData({
          link: "",
          image: "",
        })
        setPreview('')
      } else {
        context.openAlertBox('error', res?.message)
      }
      setIsLoading(false);
    })
  }

  return (
    <div className='w-full border-zinc-200 rounded-xl shadow-md p-4'>
      <div className='py-4 border-b border-zinc-200'>
        <h2 className='text-xl font-semibold'>Add Slider Banner</h2>
      </div>

      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 max-md:grid-cols-1 gap-4'>
            <div className='py-2'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner Link</label>
              <input type="text" name="link" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="" value={formData.link} onChange={onChangeInput} />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 mt-2'>
            <label className='text-zinc-500 text-lg'>Banner Image</label>
            <div className='grid grid-cols-1 gap-4'>
              {

                preview &&
                <div className='uploadBoxWrapper relative'>
                  <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeImg(preview)}>
                    <IoMdClose className='text-white text-[17px]' />
                  </span>
                  <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-zinc-700 flex justify-center aspect-[16/6] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 items-center flex-col relative'>
                    <LazyLoadImage className="w-full h-full object-cover" alt={"image"} effect="" wrapperProps={{ style: { transitionDelay: "1s" }, }} src={preview} />
                  </div>
                </div>

              }
              {
                !preview &&
                <UploadBox multiple={false} name="image" url="/api/banner/upload" setPreviewsFun={setPreviewsFun} />
              }
            </div>
          </div>
          <div className='w-full mt-4'>
            <Button type='submit' disabled={!validValue} className="!bg-indigo-600 w-full
  hover:!bg-blue-800 !text-white !font-medium !py-2.5 !rounded-lg !transition-colors">
              {
                isLoading === true ?
                  <CircularProgress color='inherit' size={20} /> :
                  'Add Banner'
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBanner