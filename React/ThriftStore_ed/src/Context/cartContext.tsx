import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

type cartType = {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    quantity: number
}
type cartCOntextType = {
    cart: { cart: cartType[] };
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>;
    getTotal: () => number
}

const CartContext = createContext<cartCOntextType | null>(null);

const initailState: { cart: cartType[] } = {
    cart: []
}

const cartReducer = (state: any = initailState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'add':
            const { id, title, price, description, images, quantity } = action.payload
            const cartItem = state.cart.find((item: { id: any; }) => item.id === id)
            if (cartItem) {
                return {
                    ...state,
                    cart: state.cart.map((item: { id: any; quantity: number; }) => item.id === id ? { ...item, quantity: quantity } : item)
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { id, title, price, description, quantity: quantity, images }]
                }
            }

        case 'remove':
            return {
                ...state,
                cart: state.cart.filter((item: cartType) => item.id !== action.payload)
            }
        default:
            return state;

    }

}

export const CartProvider = ({ children }: { children: JSX.Element }) => {
    const [cart, dispatch] = useReducer(cartReducer, initailState)
    const getTotal = () => {
        const total = cart.cart.reduce((acc: number, item: cartType) => acc + (item.price * item.quantity), 0)
        return total
    }
    return (
        <CartContext.Provider value={{ cart, dispatch, getTotal }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext) as cartCOntextType