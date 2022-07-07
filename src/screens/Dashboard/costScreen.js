import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import { Card, Spacer, SubTitle, Title } from '../../components/global'
import AppDevAnim from '../../assets/gifs/appDev-anim.json'
import { getNumberKMBT } from '../../misc/logics'
import { DropDown } from '../../components/form'
import { child, get, getDatabase, ref } from 'firebase/database'
import { useSelector } from 'react-redux'
const CostScreen = () => {
  const [mvpPrice, setMvpPrice] = useState()
  const [v1Price, setV1Price] = useState()
  const firebaseApp = useSelector(state => state.firebaseApp.instance)
  const [costData, setCostData] = useState([
    {
      currency: '',
      currencySymbol: '',
      name: '',
      rate: 0
    }
  ])

  useEffect(() => {
    getCostRateData().then(result => setCostData(result))
  }, [])

  function handleRegionChange (type, stateIndex) {
    switch (type) {
      case 'mvp':
        setMvpPrice(getCost(costData[stateIndex].rate))
        return
      case 'v1':
        setV1Price(getCost(costData[stateIndex].rate))
        return
    }
  }

  const getCostRateData = () => {
    const database = getDatabase(firebaseApp)
    return get(child(ref(database), `devRates/`)).then(result => {
      if (result.exists()) {
        const rateObj = result.val()
        let rateList = []
        Object.keys(rateObj).map(parent => {
          rateList.push(rateObj[parent])
        })
        return rateList
      }
    })
  }

  function getCost (rate) {
    if (rate > 0) {
      return rate * 10
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
