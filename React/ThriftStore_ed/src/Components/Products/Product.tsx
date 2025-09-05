import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCartContext } from '../../Context/cartContext';
function Product() {
    const [product, setProducts] = useState({ title: '', description: '', images: [] });
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const {  dispatch } = useCartContext();
    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`);
            const data = await response.json();
            setProducts(data)
            setLoading(false);
        })()
    }, [])
    const [count, setCount] = useState(1);
    if (loading) {
        return <div className='text-center pt-10'>Loading...</div>
    }
    return (
        <div className='flex pt-10 p-3 justify-center md:ml-96'>
            <div className='w-80'>
                <img src={product.images[0]} alt="" className='rounded-md' />
            </div>
            <div className='flex flex-col px-5 mt-3 w-full justify-between'>
                <p className='text-lg font-semibold'>{product.title}</p>
                <span className='w-[450px]'>{product.description}</span>
                <div>
                    <span className='mr-2'>Quantity :</span>
                    <button className='w-[25px] h-[25px] bg-slate-400 rounded-full text-center font-semibold disabled:bg-slate-200' onClick={() => setCount(prev => prev - 1)} disabled={!count}>-</button>
                    <span className='mx-3 font-semibold '>{count}</span>
                    <button className='w-[25px] h-[25px] bg-slate-400 rounded-full text-center font-semibold' onClick={() => setCount(prev => prev + 1)}>+</button>
                </div>
                <button className='w-full md:w-2/6 py-2 bg-yellow-300 rounded-md text-xl disabled:bg-yellow-100' onClick={() => dispatch({ type: 'add', payload: { ...product, quantity: count } })}>Add to Cart</button>
            </div>
        </div >
    )
}

export default Product