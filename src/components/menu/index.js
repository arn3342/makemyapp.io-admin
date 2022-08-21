import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import IconParser from '../../misc/iconParser'
import { colorCodes, getProfileInitials } from '../../misc/logics'
import { Spacer, SubTitle } from '../global'
import './index.css'
import { DropDown } from '../form'
import { Constants } from '../../data/constants'
import { useSelector } from 'react-redux'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

export const MenuItem = ({
  id,
  label,
  performSelection,
  selected,
  isBeta,
  onClick,
  icon
}) => {
  return (
    <div>
      <div
        className={`row cols-2 menu_item ${selected && 'menu_item_selected'}`}
        onClick={() => onClick()}
      >
        <div className={`col ${label ? 'col-sm-2 d-flex' : ''}`}>
          <div
            className={`icon_regular icon_dark d-flex icon_small`}
            style={{
              justifyContent: !label ? 'center' : 'inherit'
            }}
          >
            {!icon ? <IconParser itemId={id} size={20} /> : icon}
          </div>
        </div>
        {label && (
          <div className='col m-auto'>
            <SubTitle
              content={
                <div
                  style={{
                    display: 'flex'
                  }}
                >
                  {label}
                  {isBeta && <span className='font_xs beta_label'>Beta</span>}
                </div>
              }
              fontType='bold'
              className='m-auto font-xs'
              style={{
                fontSize: 12
              }}
            />
          </div>
        )}
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
    <div>
      {/* <div
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
      </div> */}
      {/* <Spacer size={'medium'} /> */}
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
              {menuItem.screens &&
                menuItem.screens.map(subMenu => {
                  return (
                    !subMenu.ignoreRendering && (
                      <>
                        <MenuItem
                          key={subMenu.id}
                          onClick={() => performNavigation(subMenu.path)}
                          selected={location.pathname === subMenu.path}
                          label={subMenu.label}
                          id={subMenu.id}
                          isBeta={subMenu.isBeta}
                        />
                      </>
                    )
                  )
                })}
              {/* {!menuItem.ignoreRendering && (
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
                        isBeta={subMenu.isBeta}
                      />
                    )
                  )
                })} */}
            </div>
          )
        }
      })}
      <ProfileMenu onItemClick={item => onItemClick(item)} />
    </div>
  )
}

export const ProfileMenu = ({ onItemClick = ({ item = '' }) => {} }) => {
  const userProfile = useSelector(state => state.user.profile)
  const [isExpanded, setExpanded] = useState(false)
  const containerRef = useRef()

  // useEffect(() => {
  //   containerRef.current.focus()
  // }, [isExpanded])
  return (
    <div className={`menu_item_profile ${isExpanded && 'no_rad_bottom'}`}>
      
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
