import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginScreen from './screens/login'
import SignUpScreen from './screens/signUp'
import Logo from '../../logo-trans.png'
import LoginAnim from '../../assets/gifs/login-anim.json'
import { Spacer } from '../../components/global'
import { useSelector } from 'react-redux'
import { getDatabase, get, child, ref } from 'firebase/database'

export default ({}) => {
  const [stepType, setStepType] = useState('signUp')
  const [projectMeta, setProjectMeta] = useState()
  const firebaseApp = useSelector(state => state.firebaseApp.instance)
  const params = useParams()
  useEffect(() => {
    if (params.projectId) {
      const database = getDatabase(firebaseApp)
      get(child(ref(database), `projectMeta/${params.projectId}`)).then(
        result => {
          if (result.exists()) {
            const data = result.val()
            setProjectMeta(data)
          }
        }
      )
    }
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
            {stepType === 'signIn' ? (
              <LoginScreen onSwitchRequest={() => setStepType('signUp')} />
            ) : (
              <SignUpScreen
                projectMetaData={projectMeta}
                onSwitchRequest={() => setStepType('signIn')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
