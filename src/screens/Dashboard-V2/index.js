import React, { useEffect, useState } from 'react'
import {
  Card,
  Info,
  PageTitle,
  Slider,
  Spacer,
  SubTitle,
  Title
} from '../../components/global'
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
import { AiOutlineFieldTime } from 'react-icons/ai'
import Chart from '../../components/chart'
import { TiInputChecked } from 'react-icons/ti'
import { RiCheckboxCircleFill, RiCheckDoubleFill } from 'react-icons/ri'
import { BiRightArrowAlt, BiRun } from 'react-icons/bi'
import { GiProgression } from 'react-icons/gi'
import { MdSpaceDashboard } from 'react-icons/md'
import { BsFillHandThumbsUpFill } from 'react-icons/bs'
import { HiThumbUp } from 'react-icons/hi'

const DashboardV2Screen = ({}) => {
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
      <PageTitle title={'Dashboard'} icon={<MdSpaceDashboard size={20} />} />
      <div className='row cols-2'>
        <div className='col col-xxl-4'>
          <Card
            animateScale={false}
            theme={'dark'}
            style={{
              paddingBottom: 0
            }}
            className='shadow_light'
            clickable={false}
          >
            <div className='row'>
              <div
                className='col'
                style={{
                  paddingRight: 0
                }}
              >
                <SubTitle
                  content={
                    <div
                      style={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <AiOutlineFieldTime
                        size={20}
                        style={{
                          marginRight: 5
                        }}
                      />
                      Development Timeline
                    </div>
                  }
                  fontType='bold'
                  size='small'
                />
                <div className='container'>
                  <div className='row cols-2'>
                    <div
                      className='col col-sm-2'
                      style={{
                        background: '#5356E3',
                        borderRadius: 10
                      }}
                    >
                      <Spacer times={1.1} />
                      <Title
                        fontType='light'
                        content={4}
                        className='no_margin m-auto'
                        size='large-2'
                        style={{
                          textAlign: 'center'
                        }}
                      />
                      <Spacer times={1.1} />
                    </div>

                    <div className='col'>
                      <Spacer times={0.15} />
                      <SubTitle
                        size='large'
                        className='no_margin'
                        content={'Weeks'}
                        fontType='light'
                      />
                      <SubTitle
                        size='small'
                        className='no_margin'
                        content={'40 hrs per week'}
                        fontType='light'
                      />
                    </div>
                  </div>
                  <Spacer size='medium' />
                  <div className='row'>
                    <div
                      className='d-flex'
                      style={{
                        paddingLeft: 0
                      }}
                    >
                      <Info
                        link={false}
                        style={{ background: '#5356E3' }}
                        content={
                          <>
                            Last Progres: <b>Deployed To Production</b>
                          </>
                        }
                      />
                    </div>
                  </div>
                  <Spacer />
                  <div className='row'>
                    <div
                      className='d-flex'
                      style={{
                        paddingLeft: 0
                      }}
                    >
                      <Info
                        style={{ background: '#233869' }}
                        icon={<RiCheckDoubleFill size={14} />}
                        content={<b>14 Features Completed</b>}
                        animateScale
                      />
                      <Spacer />
                      <Info
                        style={{ background: '#fff', color: '#16ab65' }}
                        icon={<BiRun size={14} />}
                        content={<b>7 In-Progress</b>}
                        animateScale
                      />
                    </div>
                    <Spacer />
                    <Button
                      label={'Show Detailed Progress'}
                      theme='dark'
                      animateIcon
                      isExtraSmall
                      isFontAwesomeIcon={false}
                      icon={<BiRightArrowAlt size={20} color='#fff' />}
                      style={{
                        justifyContent: 'left'
                      }}
                      className='card_button d-flex'
                    />
                  </div>
                </div>
                {/* <Chart /> */}
              </div>
              {/* <div
                className='col col-xxl-4'
                style={{ overflow: 'hidden', maxHeight: '120px' }}
              >
                <Player
                  style={{ marginTop: '-30%', width: '80%' }}
                  src={RocketAnim}
                  autoplay
                  loop
                />
              </div> */}
            </div>
          </Card>
        </div>
        <div className='col col-xxl-4'>
          <Card
            animateScale={false}
            theme={'light'}
            className='shadow_light'
            clickable={false}
          >
            <div className='d-flex'>
              <SubTitle
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: 5
                }}
                content={
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      color: '#663651'
                    }}
                  >
                    <HiThumbUp
                      size={20}
                      style={{
                        marginRight: 5
                      }}
                    />
                    Awesome Progress On
                  </div>
                }
                fontType='bold'
                size='small'
                className='no_margin'
              />
              <Info
                link={false}
                style={{ background: '#ff668c', borderRadius: 30 }}
                contentStyle={{
                  color: '#fff'
                }}
                content={
                  <>
                    <b>Front-End</b>
                  </>
                }
              />
            </div>
            <Spacer />
            <SubTitle
              size='medium'
              className='font_s'
              fontType='light'
              style={{
                fontWeight: '500',
                fontSize: '.9rem'
              }}
              content={<>Your Front-End progress is sky-rocketing!</>}
            />
            <div className='d-flex'>
              <Info
                className='info_success'
                content={
                  <>
                    <b style={{
                      fontSize: '.8rem'
                    }}>6 Features Completed -</b> in last 7 days!
                  </>
                }
                style={{
                  color: '#fff',
                }}
              />
            </div>
          </Card>
        </div>
      </div>
      <Spacer size={'medium'} />
    </div>
  )
}

export default DashboardV2Screen

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
