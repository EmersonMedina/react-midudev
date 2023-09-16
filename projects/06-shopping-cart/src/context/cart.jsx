import { createContext, useReducer } from "react";
import { reducer, cartInitialState, CART_ACTION_TYPES } from "../reducers/cart";

//1. Crear contecto
export const CartContext = createContext();

function useCartReducer() {
    const [state, dispatch] = useReducer(reducer, cartInitialState);

    const addToCart = product => {
        dispatch({ type: CART_ACTION_TYPES.ADD_TO_CART, payload: product })
    }

    const removeFromCart = product => {
        dispatch({ type: CART_ACTION_TYPES.REMOVE_FROM_CART, payload: product })
    }

    const clearCart = () => {
        dispatch({ type: CART_ACTION_TYPES.CLEAR_CART })
    }

    const checkProductInCart = product => state.some(item => item.id === product.id)

    return { state, addToCart, removeFromCart, clearCart, checkProductInCart  }
}

//2. Crear proveedor
export function CartProvider({ children }) {
    
    const { state, addToCart, removeFromCart, clearCart, checkProductInCart  } = useCartReducer()

    console.log(state)

    return (
        <CartContext.Provider value={{ cart: state, addToCart, removeFromCart, clearCart, checkProductInCart}}>
            {children}
        </CartContext.Provider>
    )

}