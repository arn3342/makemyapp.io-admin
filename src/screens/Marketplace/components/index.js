import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Button } from '../../../components/form'
import { Spacer, SubTitle } from '../../../components/global'
import './index.css'
import { faAngleRight, faDownload } from '@fortawesome/free-solid-svg-icons'

export const CodeOwnerBox = ({ size, data }) => {
  return size === 'compact' || size === 'small' ? (
    <div className='owner_profile_box_small d-flex shadow_light'>
      <img alt='user-img' src={data.photoUrl} />
      <SubTitle
        className='font_link font_xs no_margin'
        fontType='bold'
        content={data.userName}
        link='#'
      />
    </div>
  ) : (
    <div className='owner_profile_box shadow_light codeowner_box misc_item_container'>
      <div className='row'>
        <div className='col col-sm-2 code_owner_img_container'>
          <img className='code_owner_img' alt='user-img' src={data.photoUrl} />
        </div>
        <div
          className='col col-sm-8'
          style={{
            padding: 0
          }}
        >
          <SubTitle
            fontType='bold'
            className='no_margin'
            content={`${data.firstName} ${data.lastName}`}
          />
          <SubTitle
            fontType='bold'
            className='margin_xs font_link font_xs lineHeight_xs'
            content={`@${data.userName}`}
          />
        </div>
      </div>
    </div>
  )
}

export const CodeMiscBox = ({ data }) => {
  return (
    <div className='code_misc_box'>
      <div className='misc_item_container'>
        <SubTitle
          content='Technologies'
          className='margin_xs font_bold font_xs font_placeholder'
        />
        <div className='container row'>
          {data.techStack.map((stack, index) => {
            return (
              <SubTitle
                className='card_option_bg card_option_bg_small shadow_light margin_right'
                fontType='bold'
                content={stack}
                key={index}
              />
            )
          })}
        </div>
      </div>
      <div className='misc_item_container'>
        <SubTitle
          content='Available On'
          className='margin_xs font_bold font_xs font_placeholder'
        />
        <div className='container row'>
          {data.platforms.map((platform, index) => {
            return (
              <SubTitle
                className='card_option_bg card_option_bg_small shadow_light margin_right'
                fontType='bold'
                content={platform.title}
                key={index}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const ModifyRequestBox = ({ code, onRequestSliderOpen }) => {
  return (
    <>
      <div className='code_misc_box mod_container' style={{
        paddingTop: '10px'
      }}>
        <SubTitle
          content={`Request Modfication`}
          size='medium'
          fontType='bold'
          className='margin_xs font_gradient'
          style={{
            padding: 0
          }}
        />
        <SubTitle
          content={
            <>
              You can ask the developer to add/edit the code snippet according
              to your requirements.
            </>
          }
        />
        <Button
          label='Modify Now'
          theme='dark'
          isExtraSmall
          icon={faAngleRight}
          animateIcon
          onClick={onRequestSliderOpen && onRequestSliderOpen}
        />
        <Spacer/>
      </div>
    </>
  )
}

const StepSelector = ({ data, index, selected, onClick }) => {
  return (
    <div
      className={`d-flex step_selector ${!selected &&
        'step_selector_inactive'}`}
      onClick={onClick && onClick}
    >
      <div className='col col-sm-10'>
        <SubTitle
          className={`no_margin`}
          fontType={selected && 'bold'}
          content={`Step ${index}`}
        />
      </div>
      <div
        className='col col-sm-2'
        style={{
          display: 'flex',
          justifyContent: 'end'
        }}
      >
        <FiArrowRight
          className={`step_selector_icon ${!selected &&
            'step_selector_icon_inactive'}`}
        />
      </div>
    </div>
  )
}

export const StepsContainer = ({ steps }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <div>
      <div className='container step_container'>
        <div className='row step_row'>
          <div className='col col-sm-3 step_selector_container'>
            {/* <Spacer /> */}
            {steps?.map((step, index) => {
              return (
                <StepSelector
                  data={step}
                  index={index + 1}
                  selected={index == selectedIndex}
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                />
              )
            })}
            {/* <Spacer /> */}
          </div>
          <div className='col step_content'>
            <div className='content_text_container'>
              <Spacer />
              <SubTitle
                fontType='bold'
                size='large'
                content={steps[selectedIndex].title}
              />

              <SubTitle content={steps[selectedIndex].content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const FileDownloadBox = ({ files }) => {
  return (
    <div className='container step_download_container'>
      <SubTitle content={`Download Files`} size='medium' fontType='bold' />
      <SubTitle
        content={
          <>
            This code-snippet includes{' '}
            <strong className='font_link'>
              {files.length} downloadable files
            </strong>
          </>
        }
        className='no_margin lineHeight_s'
      />
      <Spacer />
      <Button
        theme='dark'
        label='Download Files'
        icon={faDownload}
        animateIcon
        isExtraSmall
        className='small_button'
      />
    </div>
  )
}
