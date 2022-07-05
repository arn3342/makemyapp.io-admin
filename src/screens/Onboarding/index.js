import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import LoginScreen from './screens/login'
import SignUpScreen from './screens/signUp'
import Logo from '../../logo-trans.png'
import LoginAnim from '../../assets/gifs/login-anim.json'
import { Spacer } from '../../components/global'
import { SiteRoutes } from '../../misc/routes'

export default ({}) => {
  const navigate = useNavigate()
  const [stepType, setStepType] = useState('signUp')
  const { type } = useParams()
  useEffect(() => {
    // navigate(SiteRoutes.Onboarding.Login.path)
    // if(type === 'welcome'){
    //   setStepType('signUp')
    // }
  }, [])
  return (
    <div className='main onboarding_main'>
      <div className='container_main shadow_dark'>
        <div className='row'>
          <div className='col col-lg-6'>
            <Player className='anim_wrapper' src={LoginAnim} loop autoplay />
            <img
              src={Logo}
              className='site_logo_main site_logo'
              alt='site-logo'
            />
          </div>
          <Spacer />
          <div className='col col-lg-5 d-flex form_container'>
            {/* <SignUpBanner /> */}
            {stepType === 'signIn' ? (
              <LoginScreen onSwitchRequest={() => setStepType('signUp')} />
            ) : (
              <SignUpScreen onSwitchRequest={() => setStepType('signIn')} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
