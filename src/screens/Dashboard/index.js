import React, { useEffect, useState } from 'react'
import { Card, Spacer, SubTitle, Title } from '../../components/global'
import { ExtendedButton } from '../../components/form'
import { Player } from '@lottiefiles/react-lottie-player'
import RocketAnim from '../../assets/gifs/rocket-anim.json'
import IconParser from '../../misc/iconParser'
import { ScreenSelector } from './components'
import { getRandomInteger } from '../../misc/logics'
import { useSelector } from 'react-redux'
import { extractFeature } from '../../misc/featureExtractor'

const DashboardScreen = ({}) => {
  const projectData = useSelector(state => state.user.profile.projects[0])

  useEffect(() => {
    // console.log('Current project:', projectData)
    // console.log('Feature deets:', getEstimations())
  }, [])

  function getEstimations () {
    let devTime = 0
    projectData.features?.map(featureId => {
      devTime += extractFeature(featureId).estDevTime
    })
    return devTime
  }
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
              <div className='col col-sm-2 icon_regular'>
                <IconParser itemId={1212} />
              </div>
              <Spacer />
              <div className='col col-sm-2 icon_regular'>
                <IconParser itemId={1511} />
              </div>
              <Spacer />
              <div className='col col-sm-2 icon_regular'>
                <IconParser itemId={1211} />
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
        <div>
          <Spacer />
          <Title content='Quick Overview' />
          <Spacer />
        </div>
        <ButtonGroup
          data={dummyData}
          selectItemId={selectItem}
          onItemClick={id => setSelectedItem(id)}
        />
        <ScreenSelector screenId={selectItem} />
      </div>
      <Spacer size='large' />
    </div>
  )
}
