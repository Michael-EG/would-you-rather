import { Avatar, Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllQuestions } from '../Actions/QuestionActions'
import { fetchAllUsers } from '../Actions/UserActions'
import NavBar from '../Components/NavBar'

function LeaderboardScreen() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.allUsers.users)
  const questionsOrg = useSelector((state) => state.questions.questionsOrg)
  const [usersScore, setUsersScore] = useState([])
  // const [users, setUsers] = useState([])
  // const [questions,setQuestions]
  const calculateScores = () => {
    try {
      // console.log(users, questionsOrg)
      let tempUsersScore = []
      for (let i = 0; i < users.length; i++) {
        let userScore = 0
        let numberOfQuestions = 0
        let numberOfAnswers = 0
        for (let j = 0; j < questionsOrg.length; j++) {
          // consolse.log('hi')
          if (questionsOrg[j].author === users[i].id) {
            userScore++
            numberOfQuestions++
          }
          if ((questionsOrg[j].optionOne.votes.findIndex((x) => x === users[i].id) !== -1) || (questionsOrg[j].optionTwo.votes.findIndex((x) => x === users[i].id) !== -1)) {
            userScore++
            numberOfAnswers++
          }
          // if (questionsOrg[j].optionTwo.votes.findIndex((x) => x === users[i].id) != -1) {
          //   userScore++
          // }
        }
        let tempUser = { ...users[i], score: userScore, numberOfAnswers, numberOfQuestions }
        // console.log(tempUser)
        tempUsersScore.push(tempUser)
      }
      tempUsersScore.sort((a, b) => {
        if (a.score < b.score) {
          return 1
        } else {
          return -1
        }
        // return 0
      })
      setUsersScore(tempUsersScore)
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleFetchQuestions = async () => {
    dispatch(fetchAllQuestions())
  }
  const handleFetchUsers = async () => {
    dispatch(fetchAllUsers())
  }
  // useEffect(() => { console.log(usersScore) }, [usersScore])
  useEffect(() => {
    // now i need to fetch all users
    handleFetchQuestions()
    handleFetchUsers()
  }, [])
  useEffect(() => { calculateScores() }, [users, questionsOrg])
  return (
    <div className='HomeScreen__MainDiv'>
      <div className='HomeScreen__navigationArea'><NavBar /></div>
      <div className='HomeScreen__mainArea'>
        <Row justify='center' style={{ marginTop: '3vh' }}>
          {usersScore.map((userData) => (
            <div key={`div-${userData.id}`} style={{ marginBottom: '1vh' }}>
              <Card title={userData.name} style={{ width: '60vw' }} extra={<Avatar size={40} className='Leaderboard__AvatarIcon'>{userData.score}</Avatar>}>
                <Row justify='space-between'>
                  <Col className='Leaderboard__AvatarCol' >
                    <div className='Leaderboard__AvatarHolder'><img className='Leaderboard__UserAvatar' alt='user-avatar' src={userData.avatarURL} /></div>
                  </Col>
                  <Col className='Leaderboard__DetailsCol'>
                    <Row justify='space-around'>
                      <Col>
                        <h5>Number Of Questions:</h5>
                        <h5>numberOfAnswers:</h5>
                      </Col>
                      <Col>
                        <h5>{userData.numberOfQuestions}</h5>
                        <h5>{userData.numberOfAnswers}</h5>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default LeaderboardScreen

// images to use 
//https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_1280.png
//https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png
//https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png
//https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png
//https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png
