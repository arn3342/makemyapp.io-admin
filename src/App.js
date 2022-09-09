import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Logo from './logo-trans.png'
import CompanyLogo from './comapny_thumb.png'
import { Slider, Spacer, SubTitle, Title } from './components/global'
import { getRoutes, SiteRoutes } from './misc/routes'
import { Menu, MenuItem, ProfileMenu } from './components/menu'
import { Provider, useDispatch } from 'react-redux'
import store from './data/reducers'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Constants } from './data/constants'
import { FirebaseActions } from './data/actions'
import { AuthActions, ProfileActions } from './data/actions/userActions'
import { Button, DropDown, ExtendedButton, Input } from './components/form'
import { Formik } from 'formik'
import { StringHelper } from './data/extensions/stringHelper'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FcVip } from 'react-icons/fc'
import { getProfileInitials } from './misc/logics'
import { FaCentercode } from 'react-icons/fa'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'


function App () {
  //#region Setting site metadata
  useEffect(() => {
    document.title = Constants.Site.title
  }, [])
  useEffect(() => {
    ChartJS.register(ArcElement, Tooltip, Legend)
  }, [])
  //#endregion

  return (
    <Provider store={store}>
      <div className='App'>
        <ScreenRenderer />
      </div>
    </Provider>
  )
}

export default App

const LogOutScreen = ({ onHideRequest = () => {} }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function performLogOut () {
    onHideRequest()
    setTimeout(() => {
      dispatch({
        type: AuthActions.PERFORM_SIGNOUT
      })
    }, 200)
    navigate(SiteRoutes.Onboarding.Init.path)
  }
  return (
    <>
      <Title content='You will be logged out' />
      <SubTitle
        content={
          <>
            Are you sure you want to log out? This will remove any pre-saved
            cookies from your browser
          </>
        }
      />
      <div className='row'>
        <div className='col'>
          <Button
            label='Log Out'
            theme='dark'
            isExtraSmall
            onClick={() => performLogOut()}
          />
        </div>
        <div className='col'>
          <Button label='Cancel' isExtraSmall onClick={onHideRequest} />
        </div>
      </div>
    </>
  )
}

const ProfileScreen = ({ onHideRequest = () => {} }) => {
  const dispatch = useDispatch()
  const userProfile = useSelector(state => state.user.profile)
  function performUpdate (values) {
    dispatch({
      type: ProfileActions.UPDATE_PROFILE,
      data: { ...userProfile, ...values }
    })
  }
  return (
    <>
      {/* <Title content='Profile' />
      <Spacer size='small' /> */}
      <div className='slider_profile_header'>
        <div className='slider_profile'>
          <div className='profile_img shadow_light'>
            <Title
              content={getProfileInitials(userProfile)}
              className='no_margin'
              size='large-2'
            />
          </div>
          <Spacer size='small' />
          <div className='profile_name'>
            <SubTitle
              className={'font_gradient no_margin'}
              content={`${userProfile.firstName} ${userProfile.lastName}`}
              size='large'
            />
          </div>
        </div>
      </div>
      <Spacer size='large' />
      <div>
        <Formik
          initialValues={{
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            errMessage: ''
          }}
          validate={values => {
            const errors = {}
            if (StringHelper.isPropsEmpty(values, 'errMessage'))
              errors.errMessage = 'Please fill in all details.'
            return errors
          }}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            if (StringHelper.isEmpty(values.errMessage)) {
              setSubmitting(true)
              console.log('Should try updating profile now...')
              const val = { ...values }
              delete val.errMessage
              performUpdate(val)
              setTimeout(() => {
                setSubmitting(false)
              }, 1200)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
            <>
              <div className='container'>
                <div className='row'>
                  <Input
                    className={`col margin_xs ${isSubmitting && 'disabled'}`}
                    placeholder='First Name'
                    onValueChange={handleChange('firstName')}
                    value={values.firstName}
                  />
                  <Spacer size='small' />
                  <Input
                    className={`col margin_xs ${isSubmitting && 'disabled'}`}
                    placeholder='Last Name'
                    onValueChange={handleChange('lastName')}
                    value={values.lastName}
                  />
                </div>
              </div>
              <Spacer size='small' />
              <div className='col col-sm-3'>
                <Button
                  label='Update Profile'
                  theme='dark'
                  isExtraSmall
                  animateIcon
                  animateScale
                  icon={faCheck}
                  hasShadow
                  disabled={
                    values.firstName === userProfile.firstName &&
                    values.lastName === userProfile.lastName
                  }
                  onClick={handleSubmit}
                  isBusy={isSubmitting}
                />
              </div>
              <Spacer size={'medium'} />
              <SubTitle size={'medium'} content='Subscription' />
              <ExtendedButton
                className='col col-sm-6'
                title='Plus Plan'
                description='You have unlimited access to all features.'
                theme='light'
                itemSize={'compact'}
                extraLabel='Browse Other Plans'
                icon={<FcVip size={20} />}
                isSelected
                // onClick={() => onItemClick(item.id)}
              />
              <Button label='Close' onClick={onHideRequest} />
            </>
          )}
        </Formik>
      </div>
    </>
  )
}

function ScreenRenderer () {
  const userState = useSelector(state => state.user)
  const firebaseApp = useSelector(state => state.firebaseApp)
  const navigate = useNavigate()
  const routes = getRoutes()
  const dispatch = useDispatch()
  const [sliderProps, setSliderProps] = useState({
    screen: ({ onHideRequest }) => <></>,
    isOpen: false
  })

  useEffect(() => {
    dispatch({
      type: FirebaseActions.INIT,
      data: {}
    })
    if (userState.profile?.userId) {
      navigate(SiteRoutes.Engine.Dashboard.path, true)
    }
  }, [userState.profile?.userId])

  useEffect(() => {
    dispatch({
      type: AuthActions.PERFORM_SIGNIN_LOCAL,
      data: {}
    })
  }, [firebaseApp.instance])

  function switchParentScroll (type) {
    document.getElementById('site_parent').style.overflow =
      type === 'hide' ? 'hidden' : 'auto'
  }

  if (firebaseApp.instance) {
    if (userState.loadingState == Constants.LoadingState.LOADING) {
      return (
        <>
          <div className='main spinner-fullScreen'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        </>
      )
    } else if (
      (userState.loadingState == Constants.LoadingState.SUCCESS ||
        userState.loadingState == Constants.LoadingState.ERROR) &&
      userState.profile?.userId
    ) {
      return (
        <div id='site_parent' className='main row cols-2'>
          <Slider
            isOpen={sliderProps.isOpen}
            onOpen={() => switchParentScroll('hide')}
            onClose={() => switchParentScroll()}
          >
            {sliderProps.screen({
              onHideRequest: () =>
                setSliderProps(prevState => ({
                  ...prevState,
                  isOpen: false
                }))
            })}
          </Slider>

          <div className='row'>
            <div
              className='menu_container'
              style={{
                width: '60px',
                paddingRight: 0
              }}
            >
              <Spacer />
              <div
                className='row'
                style={{
                  padding: 10
                }}
              >
                <img src={CompanyLogo} />
              </div>

              <MenuItem
                // onClick={() => performNavigation(menuItem.path)}
                selected
                icon={<FaCentercode size={22} color='#fff' />}
              />
              {/* <img src={Logo} alt='site-logo-min' /> */}
            </div>
            <div className='col-sm-2 shadow_light menu_container'>
              {/* <Spacer /> */}
              {/* <DropDown
                options={[
                  {
                    title: 'Trofeed Web'
                  },
                  {
                    title: 'Trofeed Android'
                  }
                ]}
                isExtraSmall
                theme='dark'
                label={'Project -'}
                labelProps={{
                  className: 'font_xs line_s no_margin'
                }}
              /> */}
              {/* <ProfileMenu /> */}

              <Spacer times={0.6}/>
              <SubTitle
                size='small'
                content='Project:'
                theme='light'
                fontType='light'
                className='font_xs no_margin'
              />
              <SubTitle
                size='medium'
                content='Trofeed Web'
                theme='light'
                fontType='light'
                className='margin_xs'
              />
              <Menu
                data={routes.Engine}
                onItemClick={item =>
                  setSliderProps({
                    screen: ({ onHideRequest }) =>
                      item === 'logout' ? (
                        <LogOutScreen onHideRequest={onHideRequest} />
                      ) : item === 'profile' ? (
                        <ProfileScreen onHideRequest={onHideRequest} />
                      ) : (
                        <></>
                      ),
                    isOpen: true
                  })
                }
              />
            </div>
            <div
              className='col'
              id='route_container'
              style={{
                overflow: 'scroll',
                position: 'relative',
                height: '100%'
              }}
            >
              <Routes>
                {routes.Engine.map((route, index) => {
                  return !route.screens ? (
                    <Route index={index == 0} {...route} key={route.id} />
                  ) : (
                    route.screens.map(subRoute => {
                      return <Route {...subRoute} key={subRoute.id} />
                    })
                  )
                })}
              </Routes>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Routes>
          {routes.Onboarding.map(route => {
            return !route.screens ? (
              <Route {...route} key={route.id} />
            ) : (
              route.screens.map(subRoute => {
                return <Route {...subRoute} key={subRoute.id} />
              })
            )
          })}
        </Routes>
      )
    }
  }
}
