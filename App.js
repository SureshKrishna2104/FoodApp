import React from 'react';
import ShopNavigator from './src/routes/ShopNavigator';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import cartReducer from './src/store/reducers/cart';

const rootReducer = combineReducers({
  cart: cartReducer,
});
const store = createStore(rootReducer);
export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
  //return <ShopNavigator />;
}
