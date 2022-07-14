import React, { useState, useEffect } from 'react'
import { Spacer, SubTitle, Title } from '../../components/global'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { filterData, getRandomInteger } from '../../misc/logics'
import { Input, SimpleChoiceList, Button } from '../../components/form'
import { extractFeatures } from '../../misc/featureHelper'
import { Constants } from '../../data/constants'
import { useDispatch, useSelector } from 'react-redux'
import { ProjectActions } from '../../data/actions/userActions'
import { AssignButton } from './components'
import { useNavigate } from 'react-router-dom'
import { SiteRoutes } from '../../misc/routes'
import './index.css'

const FeatureScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [featureList, setFeatureList] = useState()
  const [initFeatureList, setInitFeatureList] = useState()
  const [parentFeatureList, setParentFeatureList] = useState([])
  const currentProject = useSelector(state => state.user.profile.projects[0])

  useEffect(() => {
    const features = extractFeatures()
    let parent = features.parentFeatures.map(feature => {
      delete feature.description;
      return feature
    })
    setParentFeatureList(parent)
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
    // console.log('Cat:', categoryIDs)
    console.log('Feat:', featureList)
    let filteredFeatures =
      categoryIDs.length > 0
        ? initFeatureList.filter(x => categoryIDs.some(id => x.parent.id == id))
        : initFeatureList
    setFeatureList(filteredFeatures)
  }

  function performPhaseFilter (phases = []) {
    let filteredFeatures =
      phases.length > 0
        ? initFeatureList.filter(x => {
            return phases.some(phase => isFeatureInPhase(x.id, phase))
          })
        : initFeatureList
    setFeatureList(filteredFeatures)
  }

  const isFeatureInPhase = (featureId, phase) => {
    return currentProject.buildPhases[phase.toLowerCase()].features?.some(
      id => id == featureId
    )
  }

  function updateFeature (featureId, phase, rowIndex) {
    const data = {
      action: isFeatureInPhase(featureId, phase) ? 'remove' : 'add',
      assignPhase: phase,
      featureId
    }

    dispatch({
      type: ProjectActions.PERFORM_FEATURE_CHANGE,
      data
    })
  }

  function navigateToMarketplace (featureId) {
    navigate(SiteRoutes.Engine.Resources.Screens().Marketplace.path, {
      state: { featureId }
    })
  }

  function getDevelopmentTime(devTimeArray){
    const maxDevTime = Math.max(...devTimeArray.map(single => single.hours))
    return maxDevTime;
  }

  return (
    <div className='container'>
      <Spacer size='large' />
      <div className='row'>
        <Title content='Features' size='large-2' fontType='light' />
        <Spacer />
        <SubTitle
          size='medium'
          content='List of 100+ indusrty standard features. Select the required 
          features and assign them to your MVP or Initial Public Release (V1).'
        />
      </div>
      {/* <Spacer size='small' /> */}
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
      <div
        className='container row d-flex'
        style={{
          position: 'relative'
        }}
      >
        <SimpleChoiceList
          data={Constants.BuildPhases.map((phase, index) => {
            return {
              id: phase,
              title: phase
            }
          })}
          title='Filter By Build Phase :'
          onChoiceChange={val => performPhaseFilter(val)}
        />
      </div>
      <div className='table_container shadow_light'>
        <table>
          <thead className='shadow_light'>
            <tr>
              <th className='font_link'>{featureList?.length} Feature</th>
              <th>Description</th>
              <th style={{ textAlign: 'center' }}>In MVP</th>
              <th style={{ textAlign: 'center' }}>In V1</th>
              <th>Code Marketplace</th>
            </tr>
          </thead>
          <tbody>
            {featureList?.map((feature, index) => {
              return (
                <tr className={`table_row`} key={index}>
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
                  <td
                    style={{
                      maxWidth: '220px'
                    }}
                  >
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
                        content={`${getDevelopmentTime(feature.estDevTime)} hour(s)`}
                        fontType='bold'
                        className='font_link no_margin'
                      />
                    </div>
                  </td>
                  <td>
                    <AssignButton
                      assigned={isFeatureInPhase(
                        feature.id,
                        Constants.BuildPhase.MVP
                      )}
                      onClick={() =>
                        updateFeature(
                          feature.id,
                          Constants.BuildPhase.MVP,
                          index
                        )
                      }
                    />
                  </td>
                  <td>
                    <AssignButton
                      assigned={isFeatureInPhase(
                        feature.id,
                        Constants.BuildPhase.V1
                      )}
                      onClick={() =>
                        updateFeature(feature.id, Constants.BuildPhase.V1)
                      }
                    />
                  </td>
                  <td>
                    <div
                      style={{
                        maxWidth: '220px'
                      }}
                    >
                      <SubTitle
                        content={`${getRandomInteger(2, 20) -
                          1}+ Snippets Available`}
                        fontType='bold'
                        className='font_xs margin_xs'
                        style={{
                          maxWidth: 'max-content'
                        }}
                        // onLinkClick={}
                      />
                      <Button
                        label='Browse Marketplace'
                        theme='dark'
                        animateScale
                        hasShadow
                        isExtraSmall
                        canBeBusy
                        className='small_button'
                        onClick={() => navigateToMarketplace(feature.id)}
                      />
                    </div>
                  </td>
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
