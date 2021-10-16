import { USER_FETCH_ALL_USERS_FAIL, USER_FETCH_ALL_USERS_REQUEST, USER_FETCH_ALL_USERS_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCESS, USER_SIGNOUT } from '../Constants/UserConstants'
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

export const fetchAllUsers = () => async (dispatch, getSate) => {
  try {
    dispatch({ type: USER_FETCH_ALL_USERS_REQUEST })
    _getUsers().then((res) => {
      const usersEnteries = Object.entries(res)
      // const usersArray = usersEnteries.map((entry) => entry[1])
      let usersArray = []
      for (let i = 0; i < usersEnteries.length; i++) {
        usersArray.push(usersEnteries[i][1])
      }
      dispatch({ type: USER_FETCH_ALL_USERS_SUCCESS, payload: usersArray })
      // setUsers(usersArray)
      // setUsersInit(true)
    }).catch((error) => {
      dispatch({ type: USER_FETCH_ALL_USERS_FAIL, payload: 'Users not Fetched' })
    })
  }
  catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}