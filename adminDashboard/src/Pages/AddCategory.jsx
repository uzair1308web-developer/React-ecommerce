import { Button, CircularProgress, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import UploadBox from '../Components/UploadBox'
import { IoMdClose } from 'react-icons/io'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { deleteImages, postData } from '../utils/api';
import { MyContext } from '../App';

const AddCategory = () => {
  const context = useContext(MyContext)
  const [formData, setFormData] = useState({
    name: "",
    images: [],
  })
  const [previews, setPreviews] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr)
    formData.images = previewsArr
  }
  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImages(`/api/category/deleteImage?imgUrl=${image}`).then((res) => {
      console.log(res)
      imageArr.splice(index, 1);
      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        formData.images = imageArr
        context.openAlertBox('success', 'Image deleted successfully')
      }, 1000);
    })
  }
  const validValue = Object.values(formData).every(el => el)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.name) {
      context.openAlertBox('error', 'Please fill all the fields');
      return;
    }
    if (previews?.length === 0) {
      context.openAlertBox('error', 'Please select category image');
      return false;
    }
    postData("/api/category/create", formData).then((res) => {
      console.log(res)
      if (res?.success === true) {
        context.openAlertBox('success', res?.message)
        setFormData({
          name: "",
          images: [],
        })
        setPreviews([])
      } else {
        context.openAlertBox('error', res?.message)
      }
      setIsLoading(false);
    })
  }

  return (
    <div className='w-full border-zinc-200 rounded-xl shadow-md p-4'>
      <div className='py-4 border-b border-zinc-200'>
        <h2 className='text-xl font-semibold'>Add Category</h2>
      </div>

      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 max-md:grid-cols-1 gap-4'>
            <div className='py-2'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input type="text" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="" value={formData.name} onChange={onChangeInput} />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 mt-2'>
            <label className='text-zinc-500 text-lg'>Category Image</label>
            <div className='grid grid-cols-6 max-md:grid-cols-1 gap-4'>
              {
                previews.length !== 0 && previews.map((image, index) => {
                  return (
                    <div className='uploadBoxWrapper relative' key={index}>
                      <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeImg(image, index)}>
                        <IoMdClose className='text-white text-[17px]' />
                      </span>

                      <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-zinc-700 flex justify-center h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 items-center flex-col relative'>
                        <LazyLoadImage className="w-full h-full object-cover" alt={"image"} effect="" wrapperProps={{ style: { transitionDelay: "1s" }, }} src={image} />
                      </div>
                    </div>
                  )
                }
                )}
              <UploadBox multiple={true} name="images" url="/api/category/upload" setPreviewsFun={setPreviewsFun} />
            </div>
          </div>
          <div className='w-full mt-4'>
            <Button type='submit' disabled={!validValue} className="!bg-indigo-600 w-full
                                              hover:!bg-gray-900 !text-white !font-medium !py-2.5 !rounded-lg !transition-colors">
              {
                isLoading === true ?
                  <CircularProgress color='inherit' /> :
                  'Add Category'
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategory