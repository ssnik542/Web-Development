import { useCartContext } from "../../Context/cartContext";

export default function cart() {
    const { cart: { cart }, dispatch, getTotal } = useCartContext();
    if (cart.length === 0) {
        return <div className="text-center mt-3 font-semibold italic text-orange-500 text-4xl">Please add items into bag</div>
    }

    return (
        <div className="flex overflow-y-auto h-full">
            <div className="flex justify-center items-center flex-col w-6/12">
                {cart.map(item => <div className="flex my-2 justify-between p-2" key={item.id}>
                    <div className='w-48'>
                        <img src={item.images[0]} alt={item.title} className='rounded-md' />
                    </div>
                    <div className="ml-2">
                        <p>{item.title}</p>
                        <span>Quantity : {item.quantity}</span>
                        <p>Price : {item.price}</p>
                        <button className='p-1 bg-yellow-300 rounded-md text-xl hover:bg-yellow-200' onClick={() => dispatch({ type: 'remove', payload: item.id })}>Remove</button>
                    </div>
                </div>)}
            </div>
            <section className="w-6/12 border-l-2 p-2">
                <p className="text-xl text-slate-600 font-semibold">Total : {getTotal()}</p>
                <button className='p-2 bg-yellow-300 rounded-md text-xl hover:bg-yellow-200 mt-2' >Place Order</button>
            </section>
        </div>
    )
}
