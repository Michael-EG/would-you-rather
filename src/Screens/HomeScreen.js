import React from 'react'
import NavBar from '../Components/NavBar'
import QuestionsDashboard from '../Components/QuestionsDashboard'
// import SignInComponent from '../Components/SignInComponent'

function HomeScreen() {
  return (
    <div className='HomeScreen__MainDiv'>
      <div className='HomeScreen__navigationArea'><NavBar /></div>
      <div className='HomeScreen__mainArea'>
        <QuestionsDashboard />
        {/* <p>here main area</p> */}
        {/* <div className='AdminDashboardSideNav'> */}

        {/* </div> */}
        {/* <div className={'AdminDashboardDataEntryArea'}>
        </div> */}
      </div>
    </div>
  )
}

export default HomeScreen
