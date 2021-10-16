import { Avatar, PageHeader, Row } from 'antd'
import React from 'react'
import { SwapLeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userSignOut } from '../Actions/UserActions'

function NavBar() {
  const routes = [
    { path: '/', breadcrumbName: 'Dashboard' },
    { path: '/add', breadcrumbName: 'New Question' },
    { path: '/leaderboard', breadcrumbName: 'Leaderboard' },
  ]
  const history = useHistory()
  const dispatch = useDispatch()
  const userSignin = useSelector((state) => state.userSignin)
  function itemRender(route, params, routes, paths) {
    // const index = routes.indexOf(route)
    // console.log(route, 'end', params, 'end', routes, 'end', paths)
    return (
      <button
        className='AdminDashboardPageLink'
        onClick={(event) => {
          history.push(`${route.path}`)
        }}
        style={{ color: 'white' }}
      >
        {route.breadcrumbName}
      </button>
    )
  }
  return (
    <div>
      <PageHeader
        backIcon={
          <SwapLeftOutlined style={{ color: 'white', fontSize: '2rem' }} />
        }
        className='site-page-header'
        title={
          <button
            className='AdminDashboardPageLink'
            onClick={(event) => {
              history.push('/')
            }}
            style={{ color: 'white', fontSize: '1.5rem' }}
          >
            WYD?!
          </button>
        }
        breadcrumb={{ routes, itemRender }}
        onBack={() => {
          history.goBack()
        }}
        extra={
          <Row>
            <div>
              <Avatar
                style={{
                  backgroundColor: '#7265e6',
                  verticalAlign: 'middle',
                }}
                size='small'
                gap={1}
              >
                <span
                  className='AdminDashboardPageEmail'
                  style={{ color: 'white' }}
                >
                  {userSignin.userInfo.name.charAt(0).toUpperCase()}
                </span>
              </Avatar>

              <span
                style={{
                  marginRight: '1rem',
                  color: 'white',
                  fontSize: '1rem',
                }}
              >
                {userSignin.userInfo.name}
              </span>
            </div>,
          <div
              style={{
                display: 'flex',
                justifyItems: 'flex-end',
                alignItems: 'flex-end',
                width: '100%',
              }}
            >
              <Row justify='center' style={{ width: '100%' }}>
                <button
                  type='button'
                  className='AdminDashboardPageLink'
                  style={{ marginLeft: '0' }}
                  onClick={(event) => {
                    dispatch(userSignOut(history))
                  }}
                >
                  {' '}
                  Logout
                </button>
              </Row>
            </div>
          </Row>
        }
      />
    </div>
  )
}

export default NavBar
