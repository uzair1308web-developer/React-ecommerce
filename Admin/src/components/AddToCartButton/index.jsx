import { useContext } from 'react'
import { MyContext } from '../../App'
import { Button } from '@mui/material'

// eslint-disable-next-line react/prop-types
const AddToCartButton = ({ product, size }) => {
  const context = useContext(MyContext)

  const addToCart = () => {

    context.setCart([...context.cart, { product: product._id, quantity: 1 }]);
    localStorage.setItem("cart", JSON.stringify([...context.cart, { product: product._id, quantity: 1 }]));
  }

  const updateQuantity = (direction) => {
    const existingQty = context.cart.find(item => item.product === product._id).quantity;
    let updatedCart;
    if (direction === "decrease") {
      if (existingQty === 1) {
        updatedCart = context.cart.filter(item => item.product !== product._id);
        context.setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return;
      }
      updatedCart = context.cart.map(item => {
        if (item.product === product._id) {
          return {
            ...item,
            quantity: existingQty - 1,
          };
        }
        return item;
      });
      context.setCart(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return;
    }

    updatedCart = context.cart.map(item => {
      if (item.product === product._id) {
        return {
          ...item,
          quantity: existingQty + 1,
        };
      }
      return item;
    })
    context.setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
  return (
    <>
      {
        context.cart.find((item) => item.product === product._id) ? (
          <div className='flex justify-between gap-4 w-full'>
            <div className="flex border w-full !border-[#ff5252] flex-1  !text-[#ff5252] !bg-white hover:!bg-[#ff5252] hover:!text-white !transition !duration-700 justify-between items-center">
              <Button className='!text-inherit' onClick={() => updateQuantity('decrease')}>-</Button>
              <div className=""  >
                {context.cart.find(item => item.product === product._id).quantity}
              </div>
              <Button className='!text-inherit' onClick={() => updateQuantity('increase')}>+</Button>
            </div>

            <div className='w-full'>
              <Button type='submit' className="!border w-full !border-[#ff5252] !text-[#ff5252] !bg-white hover:!bg-[#ff5252] hover:!text-white !transition !duration-700 " onClick={addToCart}>
                Buy Now
              </Button>
            </div>
          </div>
        ) : (
          <Button className="!border w-full !border-[#ff5252] !text-[#ff5252] !bg-white hover:!bg-[#ff5252] hover:!text-white !transition !duration-700 " onClick={addToCart}>
            Add to Cart
          </Button>
        )
      }

    </>
  )
}

export default AddToCartButton