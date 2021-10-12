import { Avatar, PageHeader, Row } from 'antd'
import React from 'react'
import { SwapLeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userSignOut } from '../Actions/UserActions'

function NavBar() {
  const history = useHistory()
  const dispatch = useDispatch()
  const userSignin = useSelector((state) => state.userSignin)

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
              //   window.history.pushState('/')
              history.push('/admin/dashboard')
            }}
            style={{ color: 'white', fontSize: '1.5rem' }}
          >
            WYD?!
          </button>
        }
        // breadcrumb={{ routes, itemRender }}
        // subTitle={
        //   <span style={{ color: 'white' }}>
        //     {window.innerWidth > 500 ? 'Tracking Portal' : ''}
        //   </span>
        // }
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
                // backgroundColor: 'red',
                display: 'flex',
                justifyItems: 'flex-end',
                alignItems: 'flex-end',
                // position: 'absolute',
                width: '100%',
              }}
            >
              {/* <p>hi</p> */}
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
