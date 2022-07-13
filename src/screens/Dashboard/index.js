import React, { useState } from 'react'
import { Card, Spacer, SubTitle, Title } from '../../components/global'
import { Button, DropDown, ExtendedButton } from '../../components/form'
import { Player } from '@lottiefiles/react-lottie-player'
import RocketAnim from '../../assets/gifs/rocket-anim.json'
import IconParser from '../../misc/iconParser'
import { ScreenSelector } from './components'
import { getRandomInteger } from '../../misc/logics'
import { useSelector } from 'react-redux'
import HiringAnim from '../../assets/gifs/hiring-anim.json'
import './index.css'
import { faAngleRight, faListAlt } from '@fortawesome/free-solid-svg-icons'
import { Constants } from '../../data/constants'

const DashboardScreen = ({}) => {
  const projectData = useSelector(state => state.user.profile.projects[0])
  return (
    <div className='container'>
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
                  content={projectData.appDesc}
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
                  style={{
                    display: 'flex'
                  }}
                >
                  {projectData.platformTypes?.map(platform => {
                    return (
                      <div className='icon_regular icon_platform'>
                        <IconParser itemId={platform} />
                      </div>
                    )
                  })}
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
                  className='margin_xs'
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
                  icon={faAngleRight}
                  isExtraSmall
                  theme='dark'
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
  const [selectItem, setSelectedItem] = useState(188)
  // console.log('Selec:', selectItem)
  const dummyData = [
    {
      id: 188,
      title: 'Timeline Roadmap',
      description: 'The timeline for your project, from MVP to V1.',
      extraLabel: 'Click For Quick View'
    },
    {
      id: 189,
      title: 'Cost Estimates',
      description:
        'Cost estimation of your project, based on timeline and region.',
      extraLabel: 'Click For Quick View'
    },
    ,
    {
      id: 190,
      title: 'Get Your Team',
      description: 'Manage or hire team members and track the development.',
      extraLabel: 'Click For Quick View'
    }
  ]
  const ButtonGroup = ({ data, selectItemId, onItemClick }) => {
    return (
      <>
        {data.map(item => {
          return (
            <div className='col col-sm-3' key={getRandomInteger(10, 999)}>
              <ExtendedButton
                {...item}
                theme='light'
                itemSize={'compact'}
                isSelected={item.id == selectItemId}
                onClick={() => onItemClick(item.id)}
              />
            </div>
          )
        })}
      </>
    )
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
          />
        </div>
        {/* <ButtonGroup
          data={dummyData}
          selectItemId={selectItem}
          onItemClick={id => setSelectedItem(id)}
        /> */}
      </div>
      <Spacer />
      <ScreenSelector screenId={selectItem} />
      <Spacer size='large' />
    </div>
  )
}
