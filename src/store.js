import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { signinReducer } from './Reducers/UserReducers'
// import { data } from './data'
// import { cartReducer } from './reducers/CartReducers'
// import {
//   orderCreateReducer,
//   orderDetailsReducer,
//   orderMineListReducer,
//   orderPayReducer,
// } from './reducers/OrderReducers'
// import {
//   productDetailsReducer,
//   productListReducer,
// } from './reducers/ProductReducer'
// import {
//   registerReducer,
//   signinReducer,
//   userDetailsReducer,
//   userUpdateProfileReducer,
// } from './reducers/UserReducer'

const initialState = {
  // cart: {
  //   cartItems: localStorage.getItem('cartItems')
  //     ? JSON.parse(localStorage.getItem('cartItems'))
  //     : [],
  //   shippingAddress: localStorage.getItem('shippingAddress')
  //     ? JSON.parse(localStorage.getItem('shippingAddress'))
  //     : {},
  //   paymentMethod: 'PayPal',
  // },
  userSignin: {
    loading: false, success: false, error: false, message: '', userInfo: null,
    // userInfo: localStorage.getItem('userInfo')
    //   ? JSON.parse(localStorage.getItem('userInfo'))
    //   : null,
  },
  //   shippingAddress: {

  //   }
}
const reducer = combineReducers({
  // productList: productListReducer,
  // productDetails: productDetailsReducer,
  // cart: cartReducer,
  userSignin: signinReducer,
  // userRegister: registerReducer,
  // orderCreate: orderCreateReducer,
  // orderDetails: orderDetailsReducer,
  // orderPay: orderPayReducer,
  // orderMineList: orderMineListReducer,
  // userDetails: userDetailsReducer,
  // userUpdateProfile: userUpdateProfileReducer,
})

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  initialState,
  composeEnhanser(applyMiddleware(thunk))
)

export default store
