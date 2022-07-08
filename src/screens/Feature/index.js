import React, { useState, useEffect } from 'react'
import { Spacer, SubTitle, Title } from '../../components/global'
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { filterData, getRandomInteger } from '../../misc/logics'
import {
  DropDown,
  Input,
  SimpleChoiceList,
  Button
} from '../../components/form'
import { extractFeatures } from '../../misc/featureExtractor'
import { Constants } from '../../data/constants'
import { FcShop } from 'react-icons/fc'
import './index.css'
import { useSelector } from 'react-redux'

const FeatureScreen = () => {
  const [featureList, setFeatureList] = useState()
  const [initFeatureList, setInitFeatureList] = useState()
  const [parentFeatureList, setParentFeatureList] = useState([])
  const currentProject = useSelector(state => state.user.profile.projects[0])

  useEffect(() => {
    const features = extractFeatures()
    setParentFeatureList(features.parentFeatures)
    setFeatureList(features.subFeatures)
    setInitFeatureList(features.subFeatures)
  }, [])

  function performFilter (val) {
    const filteredFeatures = filterData(featureList, val)
    setFeatureList(
      filteredFeatures.length > 0 ? filteredFeatures : initFeatureList
    )
  }

  function performParentFilter (categoryIDs = []) {
    let filteredFeatures =
      categoryIDs.length > 0
        ? initFeatureList.filter(x => categoryIDs.some(id => x.parent.id == id))
        : initFeatureList
    setFeatureList(filteredFeatures)
  }

  const isFeatureInPhase = (featureId, phase) => {
    return currentProject.buildPhases[phase.toLowerCase()].features?.some(
      id => id == featureId
    )
  }

  return (
    <div className='container'>
      <Spacer size='large' />
      <div className='row'>
        <Title content='Features' size='large-2' fontType='light' />
        <Spacer />
        <SubTitle
          size='medium'
          content='List of 200+ indusrty standard features. Select the required 
          features and assign them to your MVP or Initial Public Release (V1).'
        />
      </div>
      <Spacer size='medium' />
      <div className='container row'>
        <Input
          className='col col-sm-4'
          placeholder='Search features...'
          fontAwesomeIcon={faSearch}
          onValueChange={val => performFilter(val)}
        />
      </div>
      <Spacer size='medium' />
      <div className='container row d-flex'>
        <SimpleChoiceList
          data={parentFeatureList}
          title='Filter By Category :'
          onChoiceChange={val => performParentFilter(val)}
        />
      </div>
      <div className='table_container shadow_light'>
        <table>
          <thead className='shadow_light'>
            <tr>
              <th>Feature</th>
              <th>Description</th>
              <th>In MVP</th>
              <th>In V1</th>
              <th>Assign To</th>
              <th>{`${featureList?.length} Results`}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {featureList?.map((feature, index) => {
              return (
                <tr className='table_row' key={index}>
                  <td>
                    <div>
                      <SubTitle
                        className='font_link font_xs no_margin'
                        fontType='bold'
                        content={feature.parent.title}
                        link='#'
                      />
                      <SubTitle
                        className='margin_xs'
                        fontType='bold'
                        content={feature.title}
                      />
                      <SubTitle
                        className='margin_xs font_xs'
                        content='Available on:'
                      />
                      <div className='container row'>
                        {Constants.PlatformTypes.map((platform, index) => {
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
                  </td>
                  <td>
                    <SubTitle
                      content={feature.description}
                      className='margin_xs'
                    />
                    <div className='d-flex'>
                      <SubTitle
                        content='Est. development time:'
                        fontType='bold'
                        size='small'
                        className={'no_margin'}
                      />
                      <Spacer size='xs' />
                      <SubTitle
                        content={`${feature.estDevTime} hour(s)`}
                        fontType='bold'
                        className='font_link no_margin'
                      />
                    </div>
                    <div
                      className='d-flex market_clip'
                      style={{
                        alignItems: 'center'
                      }}
                    >
                      <FcShop
                        size={18}
                        style={{
                          marginRight: 5
                        }}
                      />
                      <SubTitle
                        content={`${getRandomInteger(2, 20) -
                          1}+ snippets available in Marketplace.`}
                        fontType='bold'
                        className='link_dashed font_xs no_margin'
                        style={{
                          maxWidth: 'max-content'
                        }}
                        link
                        // onLinkClick={}
                      />
                    </div>
                  </td>
                  <td>
                    {isFeatureInPhase(feature.id, Constants.BuildPhase.MVP) ? (
                      <FcCheckmark size={20} />
                    ) : (
                      <FcCancel size={20} />
                    )}
                    {/* <FcCancel size={20} /> */}
                  </td>
                  <td>
                    {/* <FcCheckmark size={20} /> */}
                    {isFeatureInPhase(feature.id, Constants.BuildPhase.V1) ? (
                      <FcCheckmark size={20} />
                    ) : (
                      <FcCancel size={20} />
                    )}
                  </td>
                  <td>
                    <DropDown
                      options={Constants.BuildPhases}
                      placeholder='Assign to...'
                    />
                  </td>
                  <td>
                    <Button
                      label='Approve'
                      theme='dark'
                      animateScale
                      hasShadow
                      isExtraSmall
                      canBeBusy
                    />
                  </td>
                  <td/>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Spacer size={'large'} />
    </div>
  )
}

export default FeatureScreen
