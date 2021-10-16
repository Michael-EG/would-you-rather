import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Radio, Row, Tabs } from 'antd'
// import { _getQuestions, _getUsers, _saveQuestionAnswer } from '../_DATA'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../Actions/UserActions'
import { fetchAllQuestions, saveQuestionAnswer } from '../Actions/QuestionActions'

function QuestionsDashboard() {
  const { TabPane } = Tabs
  const history = useHistory()
  const dispatch = useDispatch()
  const userSignin = useSelector((state) => state.userSignin)
  const users = useSelector((state) => state.allUsers.users)
  const usersInit = useSelector((state) => state.allUsers.usersInit)
  const questionsOrg = useSelector((state) => state.questions.questionsOrg)
  // const answeredQuestions = useSelector((state) => state.questions.answeredQuestions)
  // const unansweredQuestions = useSelector((state) => state.questions.unansweredQuestions)

  // const [users, setUsers] = useState([])
  // const [questionsOrg, setQuestionsOrg] = useState([])
  const [activeTabKey, setActiveTabKey] = useState('1')
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [unansweredQuestions, setUnansweredQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  // const [rerender, setRerender] = useState(true)
  // const [usersInit, setUsersInit] = useState(false)
  const [questionsInit, setQuestionsInit] = useState(false)
  const handleFetchQuestions = async () => {
    // _getQuestions().then((res) => {
    //   const questionsEntries = Object.entries(res)
    //   const questionsArray = questionsEntries.map((question) => question[1])
    //   setQuestionsOrg(questionsArray)
    //   // setQuestionsInit(true)
    // })
    dispatch(fetchAllQuestions())
  }
  const getUserAnsweredQuestion = () => {
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
    // sorting
    tempAnsweredQuestions.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return 1
      } else {
        return - 1
      }
    })
    tempUnansweredQuestions.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return 1
      } else {
        return - 1
      }
    })
    setUnansweredQuestions(tempUnansweredQuestions)
    setAnsweredQuestions(tempAnsweredQuestions)
    if (tempUnansweredQuestions.length > 0) {
      console.log('some un answered question')
      setActiveTabKey('1')
    } else {
      console.log('no unanswered questions')
      setActiveTabKey('2')
    }
    setQuestionsInit(true)
  }
  const handleFetchUsers = async () => {
    // _getUsers().then((res) => {
    //   const usersEnteries = Object.entries(res)
    //   const usersArray = usersEnteries.map((entry) => entry[1])
    //   setUsers(usersArray)
    //   setUsersInit(true)
    // })
    dispatch(fetchAllUsers())
  }
  const handleOptionSelectedChanged = (event, questionData) => {
    const questionIndex = unansweredQuestions.findIndex((x) => x.id === questionData.id)
    let questions = unansweredQuestions
    questions[questionIndex].optionSelected = event.target.value
    setUnansweredQuestions(questions)
    let tempAnswers = answers
    let tempIndex = tempAnswers.findIndex((x) => x.questionID === questionData.id)
    if (tempIndex === -1) {
      tempAnswers.push({ questionID: questionData.id, answerValue: event.target.value })
    } else {
      tempAnswers[tempIndex].answerValue = event.target.value
    }
    setAnswers(tempAnswers)
  }
  const handleSaveAnswerToQuestion = async (event, questionData) => {
    event.preventDefault()
    // let questionAnswered = unansweredQuestions.find((x) => x.id === questionData.id)
    let questionAnswered = answers.find((x) => x.questionID === questionData.id)
    let answerText = ''
    // if (questionAnswered.answerValue === 0) {
    //   // fire an error
    // }
    console.log(questionAnswered)
    if (questionAnswered.answerValue === 1) {
      answerText = 'optionOne'
    }
    if (questionAnswered.answerValue === 2) {
      answerText = 'optionTwo'
    }
    if (answerText !== '') {
      const isSaved = dispatch(saveQuestionAnswer(questionData, answerText))
      if (isSaved) {
        handleFetchQuestions()
      }
    }

  }
  useEffect(() => {
    getUserAnsweredQuestion()
    // getUserUnansweredQuestion()
  }, [questionsOrg])
  useEffect(() => {
    handleFetchQuestions()
    handleFetchUsers()
  }, [])
  return (
    <div>
      <Tabs activeKey={activeTabKey} centered>
        <TabPane tab={<div onClick={(event) => { setActiveTabKey('1') }}>Un-Answered Questions</div>} key='1'>
          <div className='QuestionsDashboard__TabLayout'>
            {usersInit && questionsInit && unansweredQuestions.map((questionData) => {
              let authorData = users.find((x) => x.id === questionData.author)
              return (
                <div key={questionData.id}>
                  <Row justify='center'>
                    <Card title={
                      <div
                        className='QuestionsDashboard__CardTitle'
                        onClick={
                          (event) => {
                            history.push(`/questions/${questionData.id}`)
                          }}
                      >
                        {`${authorData.name} Asks`}
                      </div>
                    }
                      extra={(<button type='button' onClick={(event) => { handleSaveAnswerToQuestion(event, questionData,) }}>Submit</button>)}
                      style={{ width: '60vw', minWidth: '60vw' }}>
                      {/* <p>Card content</p>
                      <p>Card content</p>
                      // <p>Card content</p> */}
                      <p>Would You Rather?</p>
                      <Radio.Group onChange={(event) => { handleOptionSelectedChanged(event, questionData) }} defaultValue={0}>
                        <Radio value={1}>{questionData.optionOne.text}</Radio>
                        <br />
                        <Radio value={2}>{questionData.optionTwo.text}</Radio>
                      </Radio.Group>
                    </Card>
                  </Row>
                  <br />
                </div>
              )
            })}
          </div>
        </TabPane>
        <TabPane tab={<div onClick={(event) => { setActiveTabKey('2') }}>Answered Questions</div>} key='2'>
          <div className='QuestionsDashboard__TabLayout'>
            {usersInit && questionsInit && answeredQuestions.map((questionData) => {
              let authorData = users.find((x) => x.id === questionData.author)
              // console.log(questionData)
              let optionOneCheck = questionData.optionOne.votes.findIndex((x) => x === userSignin.userInfo.id)
              let optionTwoCheck = questionData.optionTwo.votes.findIndex((x) => x === userSignin.userInfo.id)
              return (
                <div key={questionData.id}>
                  <Row justify='center'>
                    <Card title={
                      <div
                        className='QuestionsDashboard__CardTitle'
                        onClick={
                          (event) => {
                            history.push(`/questions/${questionData.id}`)
                          }}
                      >
                        {`${authorData.name} Asks`}
                      </div>
                    } style={{ width: '60vw', minWidth: '60vw' }}>
                      <p>Would You Rather?</p>
                      <Radio.Group onChange={(event) => { handleOptionSelectedChanged(event, questionData) }} defaultValue={optionOneCheck !== -1 ? 1 : optionTwoCheck !== -1 ? 2 : 0}>
                        <Radio value={1} disabled={true}>{questionData.optionOne.text}</Radio>
                        <br />
                        <Radio value={2} disabled={true}>{questionData.optionTwo.text}</Radio>
                      </Radio.Group>
                    </Card>
                  </Row>
                  <br />
                </div>
              )
            })}
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default QuestionsDashboard
