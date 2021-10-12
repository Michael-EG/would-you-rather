import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Alert, AutoComplete, Card, Divider, Select } from 'antd'
import { useEffect } from 'react'
import { _getUsers } from '../_DATA'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../Actions/UserActions'
import { USER_SIGNIN_FAIL } from '../Constants/UserConstants'

function SignInComponent() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const userSignin = useSelector((state) => state.userSignin)
  const [users, setUsers] = useState([])
  // const [loading]
  const [selectedUser, setSelectedUser] = useState({ currValue: '', user: {} })
  const onSelectedUserChange = (event) => {
    // event.preventDefault()
    // setSelectedUser({ ...selectedUser, currValue: event })
    const userFound = users.find((x) => x.id === event)
    if (userFound) {
      setSelectedUser({ currValue: event, user: userFound })
    } else {
      setSelectedUser({ currValue: event, user: {} })
    }
  }
  const onClearUserSelection = () => {
    // console.log(event)
    // event.preventDefaults()
    setSelectedUser({ currValue: '', user: {} })
  }
  const onLoginClicked = (event) => {
    event.preventDefault()
    // check if a valid user is available
    if (selectedUser.user.id) {
      dispatch(signin(selectedUser.user.id))
    } else {
      dispatch({ type: USER_SIGNIN_FAIL, payload: 'Invalid User-name' })
    }
    // now i need to log user in
    // add login data to redux store
    // navigate user to HomePage
  }
  const handleFetchUsers = async () => {
    _getUsers().then((res) => {
      const usersEntries = Object.entries(res)
      // console.log(usersEntries)
      var usersArray = []
      usersEntries.map((userEntry) => {
        usersArray.push(userEntry[1])
      })
      // console.log(usersArray)
      setUsers(usersArray)
    })
    // setUsers()
    // console.log(await _getUsers())
  }
  useEffect(() => {
    // if user is signed in
    // if there is a redirect then do it, if no redirect go to '/'
    if (userSignin.userInfo != null) {
      // console.log(userSignin.userInfo)
      // console.log(location.search.split('?'))
      if (location.search === '') {
        history.push('/')
      } else {
        history.push(location.search.split('?')[1])
      }
    }
  }, [userSignin])
  // useEffect(() => { console.log(selectedUser) }, [selectedUser])
  useEffect(() => {
    handleFetchUsers()
    // console.log(_getUsers())
  }, [])
  return (
    <div>
      <Card title='Sign In'>
        {userSignin.loading === false && userSignin.success === true && (
          <Alert
            message={userSignin.message}
            type='success'
            showIcon
            closable
            style={{ marginBottom: '0.5rem' }}
          />
        )}
        {userSignin.loading === false && userSignin.error === true && (
          <Alert
            message={userSignin.message}
            type='error'
            showIcon
            closable
            style={{ marginBottom: '0.5rem' }}
          />
        )}
        <div>
          <AutoComplete
            allowClear={true}
            dropdownClassName="certain-category-search-dropdown"
            style={{ width: '100%', }}
            dropdownMatchSelectWidth='100%'
            placeholder="Select User"
            onChange={(event) => { onSelectedUserChange(event) }}
            value={selectedUser.user.name ? selectedUser.user.name : selectedUser.currValue}
            onClear={onClearUserSelection}
          // autoClearSearchValue
          >
            {users.map((user) => (
              <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
            ))}
          </AutoComplete>
        </div>
        <Divider />
        <div>
          <button type='button' onClick={(event) => { onLoginClicked(event) }}>Login</button>
        </div>
      </Card>
    </div>
  )
}

export default SignInComponent
