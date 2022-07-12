import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import IconParser from '../../misc/iconParser'
import { colorCodes, getProfileInitials } from '../../misc/logics'
import { Spacer, SubTitle } from '../global'
import './index.css'
import { Button, DropDown } from '../form'
import { Constants } from '../../data/constants'
import './index.css'
import { useSelector } from 'react-redux'
import { FaArrowDown } from 'react-icons/fa'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const MenuItem = ({
  id,
  label,
  performSelection,
  selected,
  theme,
  title,
  style,
  onClick
}) => {
  return (
    <div>
      <div
        className={`row cols-2 menu_item ${selected && 'menu_item_selected'}`}
        onClick={() => onClick()}
      >
        <div className='col col-sm-3 d-flex'>
          <div
            className={`icon_regular icon_dark d-flex icon_small ${!selected &&
              'shadow_light'}`}
          >
            <IconParser itemId={id} />
          </div>
        </div>
        <div className='col m-auto'>
          <SubTitle content={label} fontType='bold' className='m-auto' />
        </div>
      </div>
      <Spacer />
    </div>
  )
}

export const Menu = ({ data, onItemClick = ({ item = '' }) => {} }) => {
  const location = useLocation()
  const navigate = useNavigate()

  // console.log('MenuItem is:', data)

  function performNavigation (path) {
    navigate(path, {
      replace: true
    })
  }

  return (
    <div className='menu_container'>
      <div
        style={{
          paddingLeft: '10px'
        }}
      >
        <DropDown
          options={Constants.ApplicationFormats}
          isExtraSmall
          theme='dark'
        />
        <Spacer size={'medium'} />
      </div>
      <ProfileMenu onItemClick={item => onItemClick(item)} />
      <Spacer size={'medium'} />
      {data?.map(menuItem => {
        if (!menuItem.screens && !menuItem.ignoreRendering) {
          return (
            <MenuItem
              key={menuItem.id}
              onClick={() => performNavigation(menuItem.path)}
              selected={location.pathname === menuItem.path}
              label={menuItem.label}
              id={menuItem.id}
            />
          )
        } else {
          return (
            <div key={menuItem.id}>
              {!menuItem.ignoreRendering && (
                <>
                  <Spacer />
                  <SubTitle
                    content={menuItem.label}
                    fontType='bold'
                    className={'menu_item_title'}
                  />
                </>
              )}
              {menuItem.screens &&
                menuItem.screens.map(subMenu => {
                  return (
                    !subMenu.ignoreRendering && (
                      <MenuItem
                        key={subMenu.id}
                        onClick={() => performNavigation(subMenu.path)}
                        selected={location.pathname === subMenu.path}
                        label={subMenu.label}
                        id={subMenu.id}
                      />
                    )
                  )
                })}
            </div>
          )
        }
      })}
    </div>
  )
}

const ProfileMenu = ({ onItemClick = ({ item = '' }) => {} }) => {
  const userProfile = useSelector(state => state.user.profile)
  const [isExpanded, setExpanded] = useState(false)
  const containerRef = useRef()

  useEffect(() => {
    containerRef.current.focus()
  }, [isExpanded])
  return (
    <div className={`menu_item_profile ${isExpanded && 'no_rad_bottom'}`}>
      <div className='profile_container_main'>
        <SubTitle
          className='font_xs margin_xs'
          content='Profile'
          fontType='bold'
        />
        <div className='profile_name_container'>
          <SubTitle
            className='profile_img no_margin'
            content={<>{getProfileInitials(userProfile)}</>}
          />
          <Spacer size='small' />
          <SubTitle
            size='small'
            className='no_margin'
            content={`${userProfile.firstName}`}
            fontType='bold'
          />
          <div
            className='arrow_container'
            onClick={() => setExpanded(!isExpanded)}
          >
            <MdOutlineKeyboardArrowDown
              size={20}
              className={`arrow ${isExpanded && 'arrow_up'}`}
            />
          </div>
        </div>
      </div>
      <div
        className={`item_container ${!isExpanded && 'item_container_hidden'}`}
        tabIndex={0}
        onBlur={() => setExpanded(false)}
        ref={containerRef}
      >
        <div className='item' onClick={() => onItemClick('profile')}>
          <SubTitle
            size='small'
            className='no_margin'
            content='Go To Profile'
            fontType='bold'
          />
        </div>
        <div className='item' onClick={() => onItemClick('logout')}>
          <SubTitle
            size='small'
            className='no_margin'
            content='Log Out'
            fontType='bold'
          />
        </div>
      </div>
    </div>
  )
}

export const MenuProfileBox = ({ selected, profile, onClick }) => {
  return (
    <div>
      <div
        className={`row cols-2 menu_item_profile ${selected &&
          'menu_item_selected'}`}
        onClick={() => onClick()}
      >
        <div className='col col-sm-3 d-flex'>
          <div className='profile_img shadow_light' style={colorCodes[4]}>
            <SubTitle
              size='large'
              className='no_margin font_xs'
              content={profile.firstName.charAt(0).toUpperCase()}
            />
          </div>
        </div>
        <div className='col m-auto'>
          <SubTitle
            content={profile.firstName}
            fontType='bold'
            className='m-auto'
          />
        </div>
      </div>
      <Spacer />
    </div>
  )
}
