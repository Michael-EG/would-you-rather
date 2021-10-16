import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../Components/NavBar'
import { Avatar, Card, Col, Row } from 'antd'
import { fetchAllUsers } from '../Actions/UserActions'
import { fetchAllQuestions } from '../Actions/QuestionActions'

function PollViewScreen() {
  // useEffect
  const dispatch = useDispatch()
  const location = useLocation()
  // const users = useSelector((state) => state.allUsers.users)
  const userSignin = useSelector((state) => state.userSignin)
  const questionsOrg = useSelector((state) => state.questions.questionsOrg)
  const users = useSelector((state) => state.allUsers.users)
  const [question, setQuestion] = useState({})
  const [userAsking, setUserAsking] = useState({})
  const [userAnswer, setUserAnswer] = useState(0)
  // const [questionNotFound]
  useEffect(() => {
    // if (question != {}) {
    // let optionOneFound = false
    try {
      if (question.optionOne.votes.findIndex((x) => x === userSignin.userInfo.id) !== -1) {
        setUserAnswer(1)
      }
      if (question.optionTwo.votes.findIndex((x) => x === userSignin.userInfo.id) !== -1) {
        setUserAnswer(2)
      }
    }
    catch (error) { console.log(error) }
    // }
  }, [question, userSignin])
  useEffect(() => {
    // if (question !== {}) {
    try {
      console.log(question)
      for (let i = 0; i < users.length; i++) {
        if (question.author === users[i].id) {
          setUserAsking(users[i])
          break
        }
      }
    } catch (error) { console.log(error) }
    // }
  }, [question, users])
  useEffect(() => {
    let tempQuestion = {}
    for (let i = 0; i < questionsOrg.length; i++) {
      if (questionsOrg[i].id === location.pathname.split('/')[2]) {
        tempQuestion = questionsOrg[i]
        break
      }
    }
    console.log(tempQuestion)
    setQuestion(tempQuestion)
  }, [questionsOrg, userSignin, location])
  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(fetchAllQuestions())
  }, [])
  return (
    <div>
      <div className='HomeScreen__MainDiv'>
        <div className='HomeScreen__navigationArea'><NavBar /></div>
        <div className='HomeScreen__mainArea'>
          <Row justify='center' style={{ marginTop: '4vh' }}>
            {question !== {} ? (<div>Question Not Found!!!!</div>) : (
              <div key={`div-${userAsking.id}`} style={{ marginBottom: '1vh' }}>
                <Card title={`${userAsking.name} Asks`} style={{ width: '80vw', borderWidth: '2px', borderColor: 'red' }} bordered>
                  <Row justify='space-between'>
                    <Col className='Leaderboard__AvatarCol' span={6}>
                      <div className='Leaderboard__AvatarHolder'><img className='Leaderboard__UserAvatar2' alt='user-avatar' src={userAsking.avatarURL} /></div>
                    </Col>
                    <Col className='Leaderboard__DetailsCol' span={18}>
                      <Row justify='space-between'>
                        <Col span={24}>
                          <h5>Would you rather?</h5>
                          {question.optionOne && (
                            <Row justify='space-between'>
                              <Col span={20}>
                                <h5 prefix={1} className={question.optionOne && question.optionOne.votes.findIndex((x) => x === userSignin.userInfo.id) != -1 ? 'highlight align-text' : 'align-text'}>1. {question.optionOne.text}</h5>
                              </Col>
                              {/* {question.optionOne.votes.findIndex((x) => x === userSignin)} */}
                              {userAnswer !== 0 && (
                                <Col span={4}>
                                  <h5 className={question.optionOne && question.optionOne.votes.findIndex((x) => x === userSignin.userInfo.id) != -1 ? 'highlight align-text' : 'align-text'}>
                                    {parseFloat((question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))).toFixed(4) * 100}%</h5>
                                </Col>
                              )}
                            </Row>
                          )}


                          {question.optionTwo && (
                            <Row justify='start'>
                              <Col span={20}>
                                <h5 prefix={2} className={question.optionTwo && question.optionTwo.votes.findIndex((x) => x === userSignin.userInfo.id) != -1 ? 'highlight align-text' : 'align-text'}>2. {question.optionTwo.text}</h5>
                              </Col>
                              {userAnswer !== 0 && (
                                <Col span={4}>
                                  <h5 className={question.optionTwo && question.optionTwo.votes.findIndex((x) => x === userSignin.userInfo.id) != -1 ? 'highlight align-text' : 'align-text'}>
                                    {parseFloat((question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))).toFixed(4) * 100}%</h5>
                                </Col>
                              )}

                            </Row>
                          )}

                        </Col>

                        {/* <Col>
                        <h5>{userSignin.userInfo.numberOfQuestions}</h5>
                        <h5>{userSignin.userInfo.numberOfAnswers}</h5>
                      </Col> */}
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </div>
            )}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default PollViewScreen
