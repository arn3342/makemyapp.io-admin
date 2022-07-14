import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import { Card, Spacer, SubTitle, Title } from '../../components/global'
import AppDevAnim from '../../assets/gifs/appDev-anim.json'
import { getNumberKMBT } from '../../misc/logics'
import { DropDown } from '../../components/form'
import { useSelector } from 'react-redux'
import { getDevelopmentCost, getCostRateData } from '../../data/featureHelper'
import { extractFeature, getSuggestedTeam } from '../../misc/featureHelper'
const CostScreen = () => {
  const [mvpPrice, setMvpPrice] = useState()
  const [v1Price, setV1Price] = useState()
  const firebaseApp = useSelector(state => state.firebaseApp.instance)
  const currentProject = useSelector(state => state.user.profile.projects[0])
  const [timeData, setTimeData] = useState({
    mvpTime: 0,
    v1Time: 0
  })
  const [costData, setCostData] = useState([
    {
      currency: '',
      currencySymbol: '',
      name: '',
      rate: 0
    }
  ])

  useEffect(() => {
    getCostRateData(firebaseApp).then(result => setCostData(result))

    let mvpFeatureIDs = currentProject.buildPhases.mvp.features
    let v1FeatureIDs = currentProject.buildPhases.v1?.features

    const mvpFeatures = mvpFeatureIDs?.map(id => {
      return extractFeature(id)
    })
    const v1Features = v1FeatureIDs?.map(id => {
      return extractFeature(id)
    })

    setTimeData({
      mvpTime: mvpFeatures?.reduce((a, b) => {
        return a + b.estDevTime
      }, 0),
      v1Time: v1Features?.reduce((a, b) => {
        return a + b.estDevTime
      }, 0)
    })

  }, [])

  function handleRegionChange (type, stateIndex) {
    switch (type) {
      case 'mvp':
        setMvpPrice(
          getDevelopmentCost(costData[stateIndex].rate, timeData.mvpTime)
        )
        return
      case 'v1':
        setV1Price(
          getDevelopmentCost(costData[stateIndex].rate, timeData.v1Time)
        )
        return
    }
  }

  return (
    <Card
      theme='light'
      animateScale={false}
      style={{
        cursor: 'default'
      }}
    >
      <div className='row'>
        <div className='col col-lg-4 m-auto'>
          <Player
            src={AppDevAnim}
            loop
            autoplay
            style={{
              left: '0%',
              top: '-15%',
              height: '450px',
              justifySelf: 'center',
              position: 'absolute',
              opacity: '0.4'
            }}
          />
        </div>
        <div className='col col-lg-4 m-auto'>
          <Card theme='light'>
            <SubTitle
              content='MVP development estimation (in USD)'
              fontType='bold'
            />
            <SubTitle
              content='Select a region to get a quick look at the cost est.'
              style={{
                marginBottom: '0'
              }}
            />
            <DropDown
              options={costData.map(rate => {
                return rate.name
              })}
              onValueChange={(val, index) => handleRegionChange('mvp', index)}
            />
            <Spacer size={'medium'} />
            <Title
              size='large-3'
              content={`$${getNumberKMBT(mvpPrice)}`}
              isLoading={getNumberKMBT(mvpPrice) <= 0}
              className='font_gradient'
            />
            <SubTitle
              content='For MVP, we have excluded paid and premium tools/APIs/SDKs for a much affordable development approach.'
              style={{
                marginBottom: '0'
              }}
            />
          </Card>
        </div>

        <div className='col col-lg-4 m-auto'>
          <Card theme='light' animateScale={false} className='no_border'>
            <SubTitle
              content='V1 development estimation (in USD)'
              fontType='bold'
            />
            <SubTitle
              content='Select a region to get a quick look at the cost est.'
              style={{
                marginBottom: '0'
              }}
            />
            <DropDown
              placeholder=''
              options={costData.map(rate => {
                return rate.name
              })}
              onValueChange={(val, index) => handleRegionChange('v1', index)}
            />
            <Spacer size={'medium'} />
            <Title
              size='large-3'
              content={`$${getNumberKMBT(v1Price)}`}
              isLoading={getNumberKMBT(v1Price) <= 0}
              className='font_gradient'
            />
            <SubTitle
              content='For final release, we mostly included free plugins/libraries and some premium yet affordable ones too, according to your feature seleciton.'
              style={{
                marginBottom: '0'
              }}
            />
          </Card>
        </div>
      </div>
    </Card>
  )
}

export default CostScreen
