import React from 'react'
import { Card, Spacer, SubTitle, Title } from '../../components/global'
import { Player } from '@lottiefiles/react-lottie-player'
import RocketAnim from '../../assets/gifs/rocket-anim.json'
import IconParser from '../../misc/iconParser'
import { useDispatch, useSelector } from 'react-redux'
import { ProfileActions } from '../../data/actions/userActions'

const ProfileScreen = ({}) => {
  const projectData = useSelector(state => state.user.profile.projects[0])
  const dispatch = useDispatch()

  const userProfile = useSelector(state => state.user.profile)
  // function performUpdate (values) {
  //   dispatch({
  //     type: ProfileActions.UPDATE_PROFILE,
  //     data: {...userProfile, ...values}
  //   })
  // }

  return (
    <div className='container'>
      <Spacer size='large' />
      <div className='row'>
        <Title content='Your Dashboard' size='large-2' fontType='light' />
        <Spacer size='medium' />
      </div>
      <div className='row cols-2'>
        <div className='col col-xxl-7'>
          <Card animateScale={false} theme={'light'}>
            <div className='row'>
              <div className='col col-xxl-8'>
                <Title content={projectData.appName} fontType='bold' />
                <SubTitle
                  content={projectData.appDesc}
                  fontType='light'
                  size='regular'
                />
              </div>
              <div
                className='col col-xxl-4'
                style={{ overflow: 'hidden', maxHeight: '120px' }}
              >
                <Player
                  style={{ marginTop: '-30%', width: '80%' }}
                  src={RocketAnim}
                  autoplay
                  loop
                />
              </div>
            </div>
          </Card>
        </div>
        <div className='col'>
          <Card theme='light' animateScale={false}>
            <Title content='Platforms' fontType='bold' />
            <SubTitle
              content='Your app will be available on the following platforms:'
              fontType='light'
              size='regular'
            />
            <div className='row'>
              <Spacer />
              {projectData.platformTypes?.map(platform => {
                return (
                  <div className='col col-sm-2 icon_regular'>
                    <IconParser itemId={platform} />
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
      <Spacer size={'medium'} />
      {/* <DashboardDetail /> */}
    </div>
  )
}

export default ProfileScreen