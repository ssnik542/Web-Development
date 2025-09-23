import React from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { MdDeleteOutline } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { removeFromWish } from '../store/wishlist'
export default function Wishlist({ product }) {
    const dispatch = useDispatch();
    const router = useRouter()
    const addTocart = () => {
        dispatch(
            addToCart({
                ...product,
                selectedSize: product.selectedSize,
                oneQuantityPrice: product.price,
            })
        );
        dispatch(removeFromWish({
            id: product._id
        }))
        router.push('/cart')
    }

    const removeWish = () => {
        dispatch(removeFromWish({
            id: product._id
        }))
    }
    return (

        <div className='flex flex-col items-center border border-black my-1 justify-between p-1 rounded-lg cursor-pointer w-64 text-center'>
            <Link
                href={`/product/${product?._id}`}
            >
                <img src={product.image[0].url} alt={product.name} className='w-32 h-56' />
            </Link>
            <h1 className='font-bold text-sm'>{product.name}</h1>
            <div className='flex gap-6 my-2'>
                <MdAddShoppingCart size={20} className='hover:text-green-800' onClick={addTocart} />
                <MdDeleteOutline size={20} className='hover:text-red-800' onClick={removeWish} />
            </div>
        </div >

    )
}
