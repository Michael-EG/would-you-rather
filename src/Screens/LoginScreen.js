import React from 'react'
// import { useLocation } from 'react-router-dom'
import SignInComponent from '../Components/SignInComponent'

function LoginScreen() {
  // const location = useLocation()
  // useEffect(() => { console.log(location) }, [location])
  return (
    // <div className='HomeScreen'>
    <div>
      {/* <div className='HomeScreen__signInArea'> */}
      <SignInComponent />
      {/* </div> */}
      {/* <div className='HomeScreen__registerArea'>
                <p>Regsiter Area</p>
            </div> */}

    </div>
  )
}

export default LoginScreen
