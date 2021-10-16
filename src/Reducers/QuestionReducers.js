import { QUESTION_FETCH_ALL_FAIL, QUESTION_FETCH_ALL_REQUEST, QUESTION_FETCH_ALL_SUCCESS, QUESTION_SAVE_ANSWER_FAIL, QUESTION_SAVE_ANSWER_REQUEST, QUESTION_SAVE_ANSWER_SUCCESS, QUESTION_SAVE_NEW_FAIL, QUESTION_SAVE_NEW_REQUEST, QUESTION_SAVE_NEW_SUCCESS } from "../Constants/QuestionConstants"

export const fetchQuestionsReducer = (state = {
  loading: false, success: false, error: false, message: '', questionsOrg: [], answeredQuestions: [], unansweredQuestions: [], questionsInit: false
}, action) => {
  switch (action.type) {
    case QUESTION_FETCH_ALL_REQUEST:
      return { loading: true, success: false, error: false, message: '', questionsOrg: [], questionsInit: false, }
    case QUESTION_FETCH_ALL_SUCCESS:
      return { loading: false, success: true, error: false, message: 'Users Fetched Successfully', questionsOrg: action.payload.questionsOrg, questionsInit: true }
    case QUESTION_FETCH_ALL_FAIL:
      return { loading: false, success: false, error: true, message: action.payload, questionsOrg: [], questionsInit: false }
    default:
      return state
  }
}

export const saveQuestionReducer = (state = { loading: false, success: false, error: false, message: '', questionData: {}, answer: '' }, action) => {
  switch (action.type) {
    case QUESTION_SAVE_ANSWER_REQUEST:
      return { loading: true, success: false, error: false, message: '', questionData: action.payload.questionData, answer: action.payload.answer, }
    case QUESTION_SAVE_ANSWER_SUCCESS:
      return { loading: false, success: true, error: false, message: 'Users Fetched Successfully', questionData: action.payload.questionData, answer: action.payload.answer }
    case QUESTION_SAVE_ANSWER_FAIL:
      return { loading: false, success: false, error: true, message: action.payload, questionData: [], answer: false }
    default:
      return state
  }
}

export const saveNewQuestionReducer = (state = { loading: false, success: false, error: false, message: '', questionData: {} }, action) => {
  switch (action.type) {
    case QUESTION_SAVE_NEW_REQUEST:
      return { loading: true, success: false, error: false, message: '', questionData: action.payload.questionData }
    case QUESTION_SAVE_NEW_SUCCESS:
      return { loading: false, success: true, error: false, message: 'Users Fetched Successfully', questionData: action.payload.questionData }
    case QUESTION_SAVE_NEW_FAIL:
      return { loading: false, success: false, error: true, message: action.payload, questionData: {} }
    default:
      return state
  }
}