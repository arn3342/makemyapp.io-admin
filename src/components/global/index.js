import React, { createRef, useEffect, useRef, useState } from 'react'
import './global.css'
import Logo from '../../logo-trans.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faAngleRight,
  faCheck,
  faClose,
  faCross,
  faExclamation,
  faL,
  faLaptopHouse
} from '@fortawesome/free-solid-svg-icons'
import { getRandomInteger } from '../../misc/logics'
import '../global/global.css'
import IconParser from '../../misc/iconParser'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, SimpleChoice, SimpleChoiceList } from '../form'
import {
  extractFeature,
  extractFeatures,
  extractFeaturesAsIs
} from '../../misc/featureExtractor'

export const Header = ({ spacing }) => {
  return (
    <div className={`menu_sticky spacing_${spacing} d-flex`}>
      <div className='container m-auto'>
        <Spacer size='small' />
        <div className='row cols-2 menu_container'>
          <div className='col' style={{ textAlign: 'left' }}>
            <img src={Logo} className='site_logo' />
          </div>
        </div>
      </div>
    </div>
  )
}

export const Title = ({
  content,
  style,
  theme,
  size,
  link,
  fontType,
  className,
  animate,
  isLoading
}) => {
  return (
    <a
      href={link}
      style={{
        position: 'relative'
      }}
    >
      {isLoading && (
        <div className='main spinner-fullScreen'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      )}
      {size === 'small' ? (
        <h6
          className={`title theme_${theme} font_${fontType} ${className} ${animate &&
            'focus-in-expand'} ${isLoading && 'opacity_hidden'}`}
          style={style}
        >
          {content}
        </h6>
      ) : size === 'large' ? (
        <h4
          className={`title theme_${theme} font_${fontType} ${className} ${animate &&
            'focus-in-expand'} ${isLoading && 'opacity_hidden'}`}
          style={style}
        >
          {content}
        </h4>
      ) : size === 'large-2' ? (
        <h2
          className={`title theme_${theme} font_${fontType} ${className} ${animate &&
            'focus-in-expand'} ${isLoading && 'opacity_hidden'}`}
          style={style}
        >
          {content}
        </h2>
      ) : size === 'large-3' ? (
        <h1
          className={`title theme_${theme} font_${fontType} ${className}  ${animate &&
            'focus-in-expand'} large_3 ${isLoading && 'opacity_hidden'}`}
          style={style}
        >
          {content}
        </h1>
      ) : (
        <h5
          className={`title theme_${theme} font_${fontType} ${className}  ${animate &&
            'focus-in-expand'} ${isLoading && 'opacity_hidden'}`}
          style={style}
        >
          {content}
        </h5>
      )}
    </a>
  )
}

export const SubTitle = ({
  content,
  style,
  theme,
  size,
  link,
  onLinkClick,
  fontType,
  className,
  animate,
  id,
  tooltip
}) => {
  return size === 'large' ? (
    <h5
      id={id}
      className={`title font_${fontType} theme_${theme} ${className} ${animate &&
        'focus-in-expand'} ${link && 'font_link'}`}
      style={style}
      onClick={onLinkClick && onLinkClick}
    >
      {content}
      {tooltip}
    </h5>
  ) : size === 'medium' || size === 'regular' ? (
    <h6
      id={id}
      className={`title font_${fontType} theme_${theme} ${className} ${animate &&
        'focus-in-expand'} ${link && 'font_link'}`}
      style={style}
      onClick={onLinkClick && onLinkClick}
    >
      {content}
      {tooltip}
    </h6>
  ) : (
    <p
      id={id}
      className={`title font_${fontType} theme_${theme} ${className} ${animate &&
        'focus-in-expand'} ${link && 'font_link'}`}
      style={style}
      onClick={onLinkClick && onLinkClick}
    >
      {content}
      {tooltip}
    </p>
  )
}

export function Card ({
  children,
  theme,
  size,
  id,
  className,
  animateScale = true,
  fontTheme,
  style
}) {
  return (
    <div
      className={`card card_${theme} card_${size} ${className} ${animateScale &&
        'card_animate_scale'}`}
      style={style}
    >
      {children}
    </div>
  )
}

export const Spacer = ({ size, multiplier }) => {
  return <div className={`spacer_${size ? size : 'small'}`} />
}

export function Slider ({
  children,
  onClose = () => {},
  onOpen = () => {},
  isOpen
}) {
  const containerRef = useRef()
  useEffect(() => {
    !isOpen ? onClose() : onOpen()
  }, [isOpen])
  return (
    <div className={`modal_slider ${!isOpen && 'modal_hidden'}`}>
      <div className='row cols-3 bg_dim modal_main' style={{ height: '100%' }}>
        <div className='col' />
        <div className='col' />
        <div className='col col-sm-5 slider_container'>
          <div
          ref={containerRef}
            className={`modal_container shadow_light ${isOpen &&
              'modal_container_visible'}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export const InfoBox = ({ type, content, visible, onHide }) => {
  const infoboxRef = useRef()

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        infoboxRef && infoboxRef.current.classList.add('infobox_hidden')
      }, 2000)
      setTimeout(() => {
        onHide && onHide()
      }, 2500)
    }
  }, [visible])

  return (
    <div className={`infobox_parent`}>
      <div
        ref={infoboxRef}
        className={`infobox_container infobox_${type} ${!visible &&
          'infobox_hidden'}`}
      >
        <div className='row'>
          <div
            className='col col-sm-1'
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FontAwesomeIcon
              icon={type === 'success' ? faCheck : faExclamation}
              color='#fff'
            />
          </div>
          <div className='col'>
            <div>
              <Spacer />
              <SubTitle
                content={type[0].toUpperCase() + type.substring(1)}
                theme='light'
                size='medium'
                fontType='bold'
                className='margin_xs'
              />
              <SubTitle className='margin_xs' content={content} theme='light' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
