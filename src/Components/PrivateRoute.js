import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min'

function PrivateRoute({ component: Component, ...rest }) {
  const location = useLocation()
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  // useEffect(() => {
  //   console.log(location)
  // }, [location])
  // useEffect(() => { console.log(userInfo) }, [userInfo])
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          userInfo !== null ? (
            <Component {...props}></Component>
          ) : (
              <Redirect to={`/sign-in?${location.pathname}`}></Redirect>
            )
        }
      ></Route>
    </div>
  )
}

export default PrivateRoute
