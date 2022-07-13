import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import ComingSoonAnim from '../assets/gifs/anim-comingSoon.json'
import { Spacer, Title } from '../components/global'
const ComingSoonScreen = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '15%',
        left: '40%',
        textAlign: 'center',
        justifyContent: 'center'
      }}
    >
      <Player
        src={ComingSoonAnim}
        loop
        autoplay
        style={{
          height: '350px'
        }}
      />
      <Spacer size='large'/>
      <Title
        size='large-2'
        fontType='light'
        content='Coming Soon'
        style={{
            marginLeft: '32%'
        }}
      />
    </div>
  )
}

export default ComingSoonScreen
