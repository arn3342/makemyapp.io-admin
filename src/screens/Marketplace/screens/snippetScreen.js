import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Slider, Spacer, SubTitle, Title } from '../../../components/global'
import './index.css'
import {
  CodeMiscBox,
  CodeOwnerBox,
  FileDownloadBox,
  ModifyRequestBox,
  StepsContainer
} from '../components'
import { Button, Input } from '../../../components/form'

export default ({}) => {
  const params = useParams()
  const location = useLocation()
  const [currentSnippet, setCurrentSnippet] = useState()
  const [showModifySlider, setShowModifySlider] = useState(false)
  useEffect(() => {
    getSnippetData()
    const parentContainer = document.getElementById('route_container')
    parentContainer.style.height = '100%'
    parentContainer.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    return () => {
      const parentContainer = document.getElementById('route_container')
      parentContainer.style.height = '100%'
      parentContainer.style.overflow = 'scroll'
    }
  }, [])

  function getSnippetData () {
    const { snippetId } = params
    // console.log('State is:', location.state)
    setCurrentSnippet(location.state)
  }
  function performModifyRequest () {}
  return (
    <div
      className='container'
      style={{
        height: '100%'
      }}
    >
      <Slider isOpen={showModifySlider}>
        <Title
          size='large'
          content='Request modficaiton as per your requirement'
        />
        <SubTitle
          content={
            <>
              If the code-quality is good and serves most of your purpose, you
              can request the developer to modify the code as per your
              requirements.
            </>
          }
          size='medium'
        />
        <Spacer />
        <Input placeholder="Explain the problem you're facing..." isMultiLine />
        <Spacer />
        <Input placeholder='What are you expecting...' isMultiLine />
        <Spacer size='medium' />
        <Button
          theme='dark'
          label='Submit Request'
          onClick={performModifyRequest}
          isExtraSmall
        />
        <Spacer />
        <Button
          label='Cancel'
          isExtraSmall
          onClick={() => setShowModifySlider(false)}
        />
      </Slider>
      <Spacer size='large' />
      {currentSnippet && (
        <div
          className='row'
          style={{
            height: '100%'
          }}
        >
          <div
            className='col col-lg-8'
            style={{
              height: '100%',
              overflow: 'scroll',
              scrollbarWidth: 'thin',
              paddingRight: '30px'
            }}
          >
            <Title
              content={currentSnippet.title}
              size='large'
              fontType='bold'
            />
            <Spacer />
            <div className='container row'>
              {currentSnippet.tags.map((tag, index) => {
                return (
                  <SubTitle
                    className='card_option_bg card_option_bg_small shadow_light margin_right'
                    fontType='bold'
                    content={tag}
                    key={index}
                  />
                )
              })}
            </div>
            <div>
              <Spacer size='medium' />
              <SubTitle
                size='large'
                fontType='bold'
                content='About this snippet'
              />
              <SubTitle content={currentSnippet.description} />
            </div>
            <div>
              <Spacer />
              <SubTitle
                size='medium'
                fontType='bold'
                className={'margin_xs'}
                content='How To Use'
              />
              <SubTitle
                content={
                  <>
                    You can use this snippet by following{' '}
                    <strong className='font_link'>
                      {currentSnippet.setupSteps?.length} Simple Steps
                    </strong>
                    . <br />
                    Before you get started, you may need to download the
                    relavant files.
                  </>
                }
                className='margin_xs'
              />
              <Spacer />
              <StepsContainer steps={currentSnippet.setupSteps} />
              <Spacer />
            </div>
            <div>
              <Spacer />
              <SubTitle
                size='medium'
                fontType='bold'
                className={'margin_xs'}
                content='Working Example Screenshots'
              />
              <div className='row'>
                {currentSnippet.exampleImages.map(url => {
                  return (
                    <div
                      className='col col-sm-3'
                      style={{
                        marginTop: '10px'
                      }}
                    >
                      <img src={url} alt='exm-img' className='exm_image' />
                    </div>
                  )
                })}
              </div>
              <Spacer />
            </div>
            <Spacer size='large' />
            <Spacer size='large' />
          </div>
          <div className='col col-lg-4'>
            <CodeOwnerBox data={currentSnippet.owner} />
            <Spacer size='medium' />
            <CodeMiscBox data={currentSnippet} />
            <Spacer />
            <FileDownloadBox files={currentSnippet.files} />
            <Spacer />
            <ModifyRequestBox
              onRequestSliderOpen={() => setShowModifySlider(true)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
