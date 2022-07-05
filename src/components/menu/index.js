import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import IconParser from '../../misc/iconParser'
import {
  colorCodes,
  getRandomInteger,
  randomColorSelector
} from '../../misc/logics'
import { Spacer, SubTitle } from '../global'
import './index.css'
import Dummy from '../../data/dummyGenerator'
import { DropDown } from '../form'
import { Constants } from '../../data/constants'

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

export const Menu = ({ data }) => {
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
      <div style={{
        paddingLeft: '10px'
      }}>
        <DropDown
          options={Constants.ApplicationFormats}
          isExtraSmall
          theme='dark'
        />
        <Spacer size={'medium'}/>
      </div>
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
              <Spacer />
              <SubTitle
                content={menuItem.label}
                fontType='bold'
                className={'menu_item_title'}
              />
              {menuItem.screens.map(subMenu => {
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

export const MenuProfileBox = ({ selected, profile, id, onClick }) => {
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
