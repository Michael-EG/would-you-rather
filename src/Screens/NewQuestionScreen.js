import { Card, Col, Input, Row } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveNewQuestion } from '../Actions/QuestionActions'
import NavBar from '../Components/NavBar'

function NewQuestionScreen() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const userSignin = useSelector((state) => state.userSignin)
  const handleSubmittingNewQuestion = (event) => {
    event.preventDefault()
    const res = dispatch(saveNewQuestion({ author: userSignin.userInfo.id, optionOneText: optionOne, optionTwoText: optionTwo }))
    // console.log(res)
    if (res) {
      // navigate to next page
      history.push('')
    } else { // do nothing currently
    }
  }
  return (
    <div className='HomeScreen__MainDiv'>
      <div className='HomeScreen__navigationArea'><NavBar /></div>
      <div className='HomeScreen__mainArea'>
        {/* <QuestionsDashboard /> */}
        <Card title='Ask new Question!!' cover={<Row justify='center'><img alt='puzzled-kid' className='NewQuestionScreen__CardCover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSkO6A9tc1uVcpUids8GYivooHHuKT359q5w&usqp=CAU' /></Row>}>
          <h5>Would you rather???</h5>
          <form id='new-question' key='new-question' onSubmit={(event) => { handleSubmittingNewQuestion(event) }}>
            <Col>
              <Row>
                <Input placeholder='First Option' required prefix={'1.'} value={optionOne} onChange={(event) => { event.preventDefault(); setOptionOne(event.target.value) }}></Input>
              </Row>
              <Row justify='center'>
                <h5>OR</h5>
              </Row>
              <Row>
                <Input placeholder='Second Option' required prefix={'2.'} value={optionTwo} onChange={(event) => { event.preventDefault(); setOptionTwo(event.target.value) }}></Input>
              </Row>
              <Row justify='center' style={{ marginTop: '2vh' }}>
                <button type='submit' >Submit</button>
              </Row>
            </Col>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default NewQuestionScreen
