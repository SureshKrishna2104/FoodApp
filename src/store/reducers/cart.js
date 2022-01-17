import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_FROM_TOTALCART,
  EMPTY_CART,
  LOGIN,
  JWT,
} from '../actions/cart';
import CartItem from '../../models/cart-item';
import {act} from 'react-test-renderer';
//import {FA5Style} from '@expo/vector-icons/build/FontAwesome5';
const initialState = {
  items: {},
  totalAmount: 0,
  check: false,
  jwt: '',

};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addProduct = action.product;
      const prodPrice = action.amount;

      const prodTitle = action.name;
      let updatedOrNewCartItem;
      if (state.items[addProduct]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addProduct].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addProduct].sum + prodPrice,
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: {...state.items, [addProduct]: updatedOrNewCartItem},
        totalAmount: state.totalAmount + prodPrice,
        check: false,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice,
        );
        updatedCartItems = {...state.items, [action.pid]: updatedCartItem};
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
        check: false,
      };

      case REMOVE_FROM_TOTALCART:
      const selectedCartItem1 = state.items[action.pid];
   
      let updatedCartItems1;
      
        updatedCartItems1 = {...state.items};
        delete updatedCartItems1[action.pid];
     
      return {
        ...state,
        items: updatedCartItems1,
        totalAmount: state.totalAmount - selectedCartItem1.sum,
        check: false,
      };
    case EMPTY_CART:
      return {
        ...state,
        items: {},
        totalAmount: 0,
        check: false,
      };
    case LOGIN:
      return {
        ...state,
        check: action.tf,
      };
    case JWT:
      return {
        ...state,
        jwt: action.token,
      };
  }
  return state;
};
