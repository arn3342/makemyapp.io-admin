import { Player } from "@lottiefiles/react-lottie-player"
import React, {useState} from "react"
import { Card, Spacer, SubTitle, Title } from "../../components/global"
import AppDevAnim from '../../assets/gifs/appDev-anim.json'
import { getNumberKMBT } from '../../misc/logics'
import { Handle, Position } from 'react-flow-renderer'
import TeamOverview from '../../components/team/teamOverview'
import { DropDown } from "../../components/form"
const CostScreen = () => {
    const [mvpPrice, setMvpPrice] = useState(15000)
    const [finalPrice, setFinalPrice] = useState(35000)

    function performPriceChange (type, region) {
      if (type === 'mvp') {
        switch (region) {
          case 'United States':
            setMvpPrice(40000)
            return
          case 'Australia':
            setMvpPrice(35000)
            return
          case 'Canada':
            setMvpPrice(37000)
            return
          case 'India':
            setMvpPrice(15000)
            return
        }
      } else if (type === 'final') {
        switch (region) {
          case 'United States':
            setFinalPrice(40000)
            return
          case 'Australia':
            setFinalPrice(35000)
            return
          case 'Canada':
            setFinalPrice(37000)
            return
          case 'India':
            setFinalPrice(15000)
            return
        }
      }
    }

    const CostRegion = ['United States', 'India', 'Australia', 'Canada']

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
                placeholder=''
                options={CostRegion}
                onValueChange={val => performPriceChange('mvp', val)}
              />
              <Spacer size={'medium'} />
              <Title
                size='large-3'
                content={`$${getNumberKMBT(mvpPrice)}`}
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
                options={CostRegion}
                onValueChange={val => performPriceChange('final', val)}
              />
              <Spacer size={'medium'} />
              <Title
                size='large-3'
                content={`$${getNumberKMBT(finalPrice)}`}
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

  export default CostScreen;