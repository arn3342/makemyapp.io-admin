import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './components/global/global.css'
import Logo from './logo-trans.png'
import { Spacer } from './components/global'
import { getRoutes, SiteRoutes } from './misc/routes'
import { Menu } from './components/menu'
import { Provider, useDispatch } from 'react-redux'
import store from './data/reducers'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Constants } from './data/constants'
import { FirebaseActions } from './data/actions'
import { AuthActions } from './data/actions/userActions'

function App () {
  //#region Setting site metadata
  useEffect(() => {
    document.title = Constants.Site.title
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

function ScreenRenderer () {
  const userState = useSelector(state => state.user)
  const firebaseApp = useSelector(state => state.firebaseApp)
  const navigate = useNavigate()
  const routes = getRoutes()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: FirebaseActions.INIT,
      data: {}
    })
    // console.log('User profile:', userProfile)
    if (userState.profile.userId) {
      navigate(SiteRoutes.Engine.Dashboard.path, true)
    }
    // console.log('Routes:', routes.Engine)
  }, [userState.profile?.userId])

  useEffect(() => {
    dispatch({
      type: AuthActions.PERFORM_SIGNIN_LOCAL,
      data: {}
    })
  }, [firebaseApp.instance])

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
      userState.profile.userId
    ) {
      return (
        <div className='main row cols-2'>
          <div className='col-sm-2 shadow_light menu_container'>
            <Spacer size='medium' />
            <img src={Logo} className='site_logo_main' alt='site-logo' />
            <Spacer size='large' />
            <Menu data={routes.Engine} />
          </div>
          <div
            id='route_container'
            className='col'
            style={{ overflow: 'scroll' }}
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
