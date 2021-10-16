import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { fetchQuestionsReducer } from './Reducers/QuestionReducers'
import { fetchUsersReducer, signinReducer } from './Reducers/UserReducers'

const initialState = {
  userSignin: {
    loading: false, success: false, error: false, message: '', userInfo: null,
  },
  allUsers: { loading: false, success: false, error: false, message: '', users: null, usersInit: false },
  questions: { loading: false, sucess: false, error: false, message: '', questionsOrg: [], questionsInit: false, qa: {} },
}
const reducer = combineReducers({
  userSignin: signinReducer,
  allUsers: fetchUsersReducer,
  questions: fetchQuestionsReducer,
})

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  initialState,
  composeEnhanser(applyMiddleware(thunk))
)

export default store
