import { Button } from '@mui/material'
import React from 'react'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'

const QuantityBox = () => {
    const [Quantity, setIsQuantity] = React.useState(1)

    const  handleIncrement = () => {
        setIsQuantity(Quantity + 1)
    }

    const  handleDecrement = () => {
        if(Quantity > 1) {
            setIsQuantity(Quantity - 1)
        }
    }

    return (
        <div>
            <div className="inline-block" data-hs-input-number="">
                <div className="flex items-center ">
                    <Button type="button" className="!min-w-0 !text-gray-800 !border !border-zinc-300 !rounded-none" aria-label="Decrease" onClick={handleDecrement}>
                        <FiMinus />
                    </Button>
                    <input className="py-0 w-6 text-sm bg-transparent text-gray-800 border-zinc-300 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" type="number" value={Quantity} aria-roledescription="Number field" data-hs-input-number-input="" />
                    <Button type="button" className="!min-w-0 !text-gray-800 !border !border-zinc-300 !rounded-none" aria-label="Increase" onClick={handleIncrement}>
                        <GoPlus />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default QuantityBox
