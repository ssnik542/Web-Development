import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../Context/cartContext';
export default function Header() {
    const { cart } = useCartContext();
    return (
        <header className="flex justify-between items-center px-3 bg-gray-700 text-cyan-50 h-[10vh]">
            <Link to={'/'}>
                <h1 className='text-xl cursor-pointer hover:text-pink-100 hover:transition-all'>Thrift Store</h1>
            </Link>
            <Link to={'cart'}>
                <div className='flex flex-col items-center justify-center relative cursor-pointer'>
                    <span className='absolute bottom-6'>{cart.cart.length}</span>
                    <div className='text-3xl' >
                        <AiOutlineShoppingCart />
                    </div>
                </div>
            </Link>
        </header>
    );
}
