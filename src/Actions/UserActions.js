import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCESS, USER_SIGNOUT } from '../Constants/UserConstants'
import { _getUsers } from '../_DATA'

export const signin = (userId) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { userId } })
  try {
    // now i need to implement logic for user login
    _getUsers().then((users) => {
      const userEntries = Object.entries(users)
      const usersObj = userEntries.map((entry) => entry[1])
      // console.log(usersObj)
      const activeUser = usersObj.find((x) => x.id === userId)
      if (activeUser) {
        dispatch({ type: USER_SIGNIN_SUCESS, payload: activeUser })
      } else {
        dispatch({ type: USER_SIGNIN_FAIL, payload: 'User Not Found !!' })
      }
    })
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userSignOut = (history) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNOUT })
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}