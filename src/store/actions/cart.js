export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product, amount, name) => {
  return {
    type: ADD_TO_CART,
    product: product,
    amount: amount,
    name: name,
  };
};

export const removeFromCart = propductId => {
  return {
    type: REMOVE_FROM_CART,
    pid: propductId,
  };
};
