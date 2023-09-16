export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || [];

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

//Update localstorage with state for cart
export const updateLocalStorage = (state) => {
    window.localStorage.setItem('cart', JSON.stringify(state));
}

export const reducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action;

    switch (actionType) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id);
            
            if (productInCartIndex >= 0) {
                //Una forma usando structuredClone
                const newCart = structuredClone(state);
                newCart[productInCartIndex].quantity++;
                updateLocalStorage(newCart);
                return newCart;
            }

    
            //If the product is not in the cart, add it
            const newState =  [
                ...state, 
                {
                    ...actionPayload, //Product
                    quantity: 1
                }
            ]

            updateLocalStorage(newState);

            return newState
        }
        case CART_ACTION_TYPES.REMOVE_FROM_CART: { 
            const { id } = actionPayload
            const newState = state.filter(item => item.id !== id)
            updateLocalStorage(newState); state.filter(item => item.id !== id)
            return newState
        }
        case CART_ACTION_TYPES.CLEAR_CART:
            updateLocalStorage(cartInitialState);
            return cartInitialState
    }
}