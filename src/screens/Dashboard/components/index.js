import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import { BsCodeSlash, BsHourglassSplit } from 'react-icons/bs'
import { DropDown, SimpleChoiceList } from '../../../components/form'
import { Card, Spacer, SubTitle, Title } from '../../../components/global'
import CostScreen from '../costScreen'
import TeamScreen from '../teamScreen'
import TimelineScreen from '../timelineScreen'
import DevPayAnim from '../../../assets/gifs/dev_payment-anim.json'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { extractFeature } from '../../../misc/featureExtractor'
import { ProfileActions } from '../../../data/actions/userActions'
import {
  getCostRateData,
  getDevelopmentCost
} from '../../../data/featureHelper'
import { Constants } from '../../../data/constants'
import { getNumberKMBT, getWeeksFromHours } from '../../../misc/logics'

/**
 * Component to render build-phase details
 * @param {object} props Component props
 * @param {'mvp' | 'v1'} props.phase Defines the size of the component, affecting `padding`, `border` etc. properties. Defaults to `small`.
 */
export const PhaseDetails = ({ phase }) => {
  const userProfile = useSelector(state => state.user.profile)
  const currentProject = useSelector(state => state.user.profile.projects[0])
  const firebaseApp = useSelector(state => state.firebaseApp.instance)
  const [phaseData, setPhaseData] = useState()
  const [costStateIndex, setCostStateIndex] = useState(0)
  const [costData, setCostData] = useState([
    {
      currency: '',
      currencySymbol: '',
      name: '',
      rate: 0
    }
  ])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    let mvpFeatureIDs = currentProject.buildPhases.mvp?.features
    let v1FeatureIDs = currentProject.buildPhases.v1?.features
      ? currentProject.buildPhases.v1.features
      : []
    if (!currentProject.buildPhases.v1) {
      v1FeatureIDs = [...mvpFeatureIDs]
      mvpFeatureIDs = v1FeatureIDs.filter((feature, index) => {
        if (index <= (v1FeatureIDs.length - 1) / 2) {
          return feature
        }
      })

      let updatedProfile = { ...userProfile }
      userProfile.projects[0].buildPhases.mvp.features = mvpFeatureIDs
      userProfile.projects[0].buildPhases.v1 = { features: v1FeatureIDs }

      dispatch({
        type: ProfileActions.UPDATE_PROFILE,
        data: updatedProfile
      })
    }

    const phaseFeatureIDs = currentProject.buildPhases[phase.toLowerCase()]?.features
    const phaseFeatures = extractFeature(phaseFeatureIDs)

    setPhaseData(prevState => ({
      ...prevState,
      devTime: phaseFeatures?.reduce((a, b) => {
        return a + b.estDevTime
      }, 0)
    }))
  }, [phase])

  useEffect(() => {
    getCostRateData(firebaseApp).then(result => setCostData(result))
  }, [])

  function handleRegionChange (stateIndex) {
    setCostStateIndex(stateIndex)
    if (costData && phaseData?.devTime) {
      setPhaseData(prevState => ({
        ...prevState,
        devCost: getDevelopmentCost(costData[stateIndex].rate, prevState.devTime)
      }))
    }
  }

  useEffect(() => {
    handleRegionChange(costStateIndex);
  }, [phase])

  return (
    <div className='row'>
      <div className='col col-sm-3'>
        <Card theme='dark' clickable={false}>
          <div className='d-flex'>
            <div
              className='icon_regular padding_s'
              style={{
                width: 'max-content',
                marginRight: '10px'
              }}
            >
              <BsHourglassSplit size={20} />
            </div>
            <div
              style={{
                display: 'block'
              }}
            >
              <SubTitle
                className='no_margin font_xs line_xs'
                fontType='bold'
                content={'Estimated'}
                style={{
                  paddingTop: '8px'
                }}
              />
              <SubTitle
                className='no_margin'
                fontType='bold'
                content={'Development Time'}
              />
            </div>
          </div>
          <Spacer size='medium' />
          <SubTitle
            className='margin_xs'
            content={'With 40hr/week contribution,'}
            fontType='bold'
          />
          <Title
            content={`${getWeeksFromHours(phaseData?.devTime)} Weeks`}
            isLoading={!phaseData}
            size='large-2'
            style={{
              borderBottom: 'solid 1px #c4c4c4',
              paddingBottom: '20px'
            }}
          />
          <SubTitle
            className='margin_xs line_s'
            content={
              'Development time is estimated based on feature and team selection.'
            }
          />
        </Card>
      </div>
      <div className='col'>
        <div className='custom_card'>
          <div className='row'>
            <div className='col col-sm-4'>
              <Title
                content={
                  <>
                    Agile Team, <br />
                    Lesser Cost!
                  </>
                }
                size='large'
                className='font_gradient'
              />
              <SubTitle
                content='Estimated Cost:'
                fontType='bold'
                className='font_gradient no_padding no_margin neg_margin'
              />
              <Title
                content={`$ ${getNumberKMBT(phaseData?.devCost)}`}
                size='large-2'
                className='font_gradient font_pad'
                isLoading={!phaseData || phaseData?.devCost == 0}
              />
              <SubTitle
                content={
                  <>
                    Development cost has been estimated based on{' '}
                    <b>
                      <i>Development Region</i>
                    </b>{' '}
                    and{' '}
                    <b>
                      <i>Team</i>
                    </b>{' '}
                    selection. Switch selections to see other results.
                  </>
                }
                className='font_xs line_s margin_xs'
              />
            </div>
            <div
              className='col'
              style={{
                position: 'relative',
                paddingRight: 0
              }}
            >
              <div className='d-flex'>
                {/* <SubTitle
              content='Suggestions'
              fontType='bold'
              className='font_xs no_padding margin_xs'
            /> */}
                <DropDown
                  label={'Suggested Team:'}
                  options={['6 People']}
                  labelProps={{
                    className: 'font_xs line_s no_margin'
                  }}
                  containerProps={{
                    className: 'col col-sm-5'
                  }}
                />
                <Spacer />
                <DropDown
                  label={'Development Region:'}
                  options={costData?.map(rate => {
                    return rate.name
                  })}
                  onValueChange={(val, index) =>
                    handleRegionChange(index)
                  }
                  containerProps={{
                    className: 'col col-sm-5'
                  }}
                  labelProps={{
                    className: 'font_xs line_s no_margin'
                  }}
                />
              </div>
              <Spacer />
              <SimpleChoiceList
                data={[
                  {
                    icon: <BsCodeSlash size={14} />,
                    title: '2 Front-End Engineers'
                  },
                  {
                    icon: <BsCodeSlash size={14} />,
                    title: '2 Front-End Engineers'
                  },
                  {
                    icon: <BsCodeSlash size={14} />,
                    title: '2 Front-End Engineers'
                  },
                  {
                    icon: <BsCodeSlash size={14} />,
                    title: '2 Front-End Engineers'
                  }
                ]}
                choiceProps={{
                  className: 'shadow_light custom_choice'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '50%',
                  top: '-50px',
                  right: '-30px',
                  zIndex: -1,
                  opacity: 0.5
                }}
              >
                <Player src={DevPayAnim} autoplay loop />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
