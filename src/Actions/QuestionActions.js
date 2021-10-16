import { QUESTION_FETCH_ALL_FAIL, QUESTION_FETCH_ALL_REQUEST, QUESTION_FETCH_ALL_SUCCESS, QUESTION_SAVE_ANSWER_REQUEST, QUESTION_SAVE_ANSWER_FAIL, QUESTION_SAVE_ANSWER_SUCCESS, QUESTION_SAVE_NEW_REQUEST, QUESTION_SAVE_NEW_SUCCESS, QUESTION_SAVE_NEW_FAIL } from "../Constants/QuestionConstants"
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../_DATA"

const getUserAnsweredQuestion = (questionsOrg, userSignin) => {
  // const userSignin = useSelector((state) => state.userSignin)
  let tempAnsweredQuestions = []
  let tempUnansweredQuestions = []
  for (let i = 0; i < questionsOrg.length; i++) {
    questionsOrg[i].optionSelected = 0
    let allVotes = []
    for (let j = 0; j < questionsOrg[i].optionOne.votes.length; j++) {
      allVotes.push(questionsOrg[i].optionOne.votes[j])
    }
    for (let k = 0; k < questionsOrg[i].optionTwo.votes.length; k++) {
      allVotes.push(questionsOrg[i].optionTwo.votes[k])
    }
    const voteFound = allVotes.find((x) => x === userSignin.userInfo.id)
    if (voteFound) {
      tempAnsweredQuestions.push(questionsOrg[i])
    } else {
      tempUnansweredQuestions.push(questionsOrg[i])
    }
  }
  return { unansweredQuestions: tempUnansweredQuestions, answeredQuestions: tempAnsweredQuestions, questionsOrg: questionsOrg, }
}

export const fetchAllQuestions = () => async (dispatch, getState) => {
  try {
    const { userSignin } = getState()
    console.log(userSignin)
    dispatch({ type: QUESTION_FETCH_ALL_REQUEST })
    _getQuestions().then((res) => {
      const questionsEntries = Object.entries(res)
      const questionsArray = questionsEntries.map((question) => question[1])
      const questionData = getUserAnsweredQuestion(questionsArray, userSignin)
      dispatch({ type: QUESTION_FETCH_ALL_SUCCESS, payload: questionData })
      // setQuestionsOrg(questionsArray)
      // setQuestionsInit(true)
    }).catch((error) => {
      dispatch({ type: QUESTION_FETCH_ALL_FAIL })
    })
  }
  catch (error) {
    dispatch({
      type: QUESTION_FETCH_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const saveQuestionAnswer = (questionData, answerText) => async (dispatch, getState) => {
  // try {
  const { userSignin } = getState()
  console.log(userSignin)
  dispatch({ type: QUESTION_SAVE_ANSWER_REQUEST, payload: { questionData, answer: answerText } })
  _saveQuestionAnswer({
    authedUser: userSignin.userInfo.id,
    qid: questionData.id,
    answer: answerText,
  }).then((res) => {
    dispatch({ type: QUESTION_SAVE_ANSWER_SUCCESS, payload: { questionData, answer: answerText } })
    // console.log(res)
    // handleFetchQuestions()
    return true
  }).catch((error) => {
    dispatch({ type: QUESTION_SAVE_ANSWER_FAIL, payload: 'Error Occured updating answer.' })
    return false
  })
  // }
  // catch (error) {
  //   return false
  //   dispatch({
  //     type: QUESTION_SAVE_ANSWER_FAIL,
  //     payload:
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message,
  //   })
  // }
}

export const saveNewQuestion = (questionData) => async (dispatch, getState) => {
  // try {
  const { userSignin } = getState()
  console.log(userSignin)
  // if()
  dispatch({ type: QUESTION_SAVE_NEW_REQUEST, payload: questionData })
  _saveQuestion(questionData).then((res) => {
    dispatch({ type: QUESTION_SAVE_NEW_SUCCESS, payload: questionData })
    return true
  }).catch((error) => {
    dispatch({ type: QUESTION_SAVE_NEW_FAIL, payload: 'Error Occured creating poll.' })
    return false
  })
  // }
  // catch (error) {
  //   return false
  //   dispatch({
  //     type: QUESTION_SAVE_ANSWER_FAIL,
  //     payload:
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message,
  //   })
  // }
}
