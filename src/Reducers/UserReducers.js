import { USER_SET_ERROR, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCESS, USER_SIGNOUT } from "../Constants/UserConstants"

export const signinReducer = (state = {
  loading: false, sucess: false, error: false, message: '', userInfo: null,
}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true, success: false, error: false, message: '', userInfo: null }
    case USER_SIGNIN_SUCESS:
      return { loading: false, success: true, error: false, message: 'Sign in Successfull', userInfo: action.payload }
    case USER_SIGNIN_FAIL:
      return { loading: false, success: false, error: true, message: action.payload, userInfo: null }
    // case USER_SET_ERROR:
    //     return { loading: false, success: false, error: true, message: action.payload, userInfo: null }
    case USER_SIGNOUT:
      return { loading: false, success: false, error: false, message: '', userInfo: null, }
    default:
      return state
  }
}
