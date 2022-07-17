import React, { useState } from 'react'
import { Card, Slider, Spacer, SubTitle, Title } from '../../components/global'
import { Button, DropDown, SimpleChoiceList } from '../../components/form'
import { Player } from '@lottiefiles/react-lottie-player'
import RocketAnim from '../../assets/gifs/rocket-anim.json'
import IconParser from '../../misc/iconParser'
import { useSelector } from 'react-redux'
import HiringAnim from '../../assets/gifs/hiring-anim.json'
import './index.css'
import { faListAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { Constants } from '../../data/constants'
import { PhaseDetails } from './components'
import { InlineWidget } from 'react-calendly'

const DashboardScreen = ({}) => {
  const projectData = useSelector(state => state.user.profile.projects[0])
  const [showCalender, setShowCalender] = useState(false)

  function constructPlatformOptions () {
    const platformOptions = []
    projectData.platformTypes?.map((id, index) => {
      platformOptions.push({
        id: index,
        title: id == 12101 ? 'Web' : id == 12102 ? 'Mobile' : 'Desktop',
        icon: <IconParser itemId={id} size={16} />
      })
    })
    return platformOptions
  }

  return (
    <div className='container'>
      <Slider isOpen={showCalender}>
        <Title content='Sit with our talented team of engineers and collaborators.'/>
        <InlineWidget url='https://calendly.com/byteslack/15minsession'/>
        <Button
          theme='light'
          isExtraSmall
          label='Close'
          onClick={() => setShowCalender(false)}
        />
      </Slider>
      <Spacer size='large' />
      <div className='row'>
        <Title content='Your Dashboard' size='large-2' fontType='light' />
        <Spacer size='medium' />
      </div>
      <div className='row cols-2'>
        <div className='col col-xxl-6'>
          <Card
            animateScale={false}
            theme={'light'}
            style={{
              height: '100%'
            }}
          >
            <div className='row'>
              <div className='col col-xxl-8'>
                <Title content={projectData.appName} fontType='bold' />
                <SubTitle
                  content={
                    projectData.appDesc || (
                      <>
                        Write a few lines about your app/idea. This helps us
                        make suggestions.
                      </>
                    )
                  }
                  fontType='light'
                  size='regular'
                />
                <SubTitle
                  content='Targeted Platforms:'
                  fontType='bold'
                  size='small'
                  className='margin_xs'
                />
                <div
                  className='custom'
                  style={{
                    display: 'flex'
                  }}
                >
                  {/* {projectData.platformTypes?.map((platform, index) => {
                    return (
                      <div key={index} className='icon_regular icon_platform'>
                        <IconParser itemId={platform} />
                      </div>
                    )
                  })} */}
                  <SimpleChoiceList
                    data={constructPlatformOptions()}
                    choiceProps={{
                      className: 'shadow_light custom_choice custom_platform'
                    }}
                    disableSelect
                  />
                </div>
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
          <Card
            animateScale={false}
            theme='light'
            style={{
              height: '100%',
              paddingTop: 0,
              paddingLeft: 0,
              paddingBottom: 0
            }}
            clickable={false}
          >
            <div className='row'>
              <div className='col'>
                <Player
                  style={{ width: '80%' }}
                  src={HiringAnim}
                  autoplay
                  loop
                />
              </div>
              <div className='col'>
                <Spacer size='medium' />
                <Title
                  content='Hire Your'
                  className='font_gradient no_margin'
                  style={{
                    paddingBottom: 0,
                    padding: 0
                  }}
                />
                <Title
                  content='Dream Team!'
                  className='font_gradient no_margin'
                  size='large-2'
                  fontType='bold'
                  style={{
                    paddingTop: '10px',
                    paddingBottom: '10px'
                  }}
                />
                <SubTitle
                  className='margin_xs line_m'
                  content={
                    <>
                      Hire our talented team of developers, with 10+ years of
                      industry experience, in building scalable applications.
                    </>
                  }
                />
                <Button
                  label='Book A Session Now'
                  animateIcon
                  icon={faPhoneAlt}
                  isExtraSmall
                  theme='dark'
                  onClick={() => setShowCalender(true)}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Spacer size={'medium'} />
      <DashboardDetail />
    </div>
  )
}

export default DashboardScreen

const DashboardDetail = ({}) => {
  const [currentPhase, setCurrentPhase] = useState(Constants.BuildPhases[0])
  function handlePhaseChage (value) {
    setCurrentPhase(value)
  }

  return (
    <div>
      <div className='row'>
        <div className='col col-sm-3'>
          <DropDown
            options={Constants.BuildPhases}
            isExtraSmall
            theme='dark'
            label='Quick Overview:'
            icon={faListAlt}
            onValueChange={value => handlePhaseChage(value)}
          />
        </div>
        {/* <ButtonGroup
          data={dummyData}
          selectItemId={selectItem}
          onItemClick={id => setSelectedItem(id)}
        /> */}
      </div>
      <Spacer />
      <PhaseDetails phase={currentPhase} />

      <Spacer size='large' />
    </div>
  )
}
