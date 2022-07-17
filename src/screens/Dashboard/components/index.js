import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import { DropDown, SimpleChoiceList } from '../../../components/form'
import { Card, Spacer, SubTitle, Title } from '../../../components/global'
import DevPayAnim from '../../../assets/gifs/dev_payment-anim.json'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { extractFeature, getSuggestedTeam } from '../../../misc/featureHelper'
import { ProfileActions } from '../../../data/actions/userActions'
import {
  getCostRateData,
  getDevelopmentCost
} from '../../../data/featureHelper'
import { getNumberKMBT, getWeeksFromHours } from '../../../misc/logics'
import { HiOutlineClock, HiOutlineUserGroup } from 'react-icons/hi'
import { DiReact } from 'react-icons/di'
import './index.css'
import { BsCodeSlash, BsQuestion } from 'react-icons/bs'
import { BiCodeCurly } from 'react-icons/bi'
import { FaAws } from 'react-icons/fa'
import { AiFillQuestionCircle } from 'react-icons/ai'

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

    const phaseFeatureIDs =
      currentProject.buildPhases[phase.toLowerCase()]?.features
    const phaseFeatures = extractFeature(phaseFeatureIDs)

    const finalSuggestion = getSuggestedTeam(phaseFeatures)

    getCostRateData(firebaseApp).then(result => {
      setCostData(result)

      setPhaseData(prevState => ({
        ...prevState,
        devTime: finalSuggestion.devTime,
        team: finalSuggestion.team,
        teamSize: finalSuggestion.team.reduce((a, b) => {
          return a + b.devCount
        }, 0),
        devCost: getDevelopmentCost(
          result[costStateIndex].rate,
          finalSuggestion.devTime
        )
      }))
    })
  }, [phase])

  function handleRegionChange (stateIndex) {
    !costStateIndex && setCostStateIndex(stateIndex)
    if (costData && phaseData?.devTime) {
      setPhaseData(prevState => ({
        ...prevState,
        devCost: getDevelopmentCost(
          costData[stateIndex].rate,
          prevState.devTime
        )
      }))
    }
  }

  return (
    <div className='row'>
      <div className='col col-sm-3'>
        <TimeEstBanner totalTime={phaseData?.devTime} />
      </div>
      <div className='col'>
        <div className='custom_card custom'>
          <div className='row'>
            <div className='col col-sm-3'>
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
              <div
                style={{
                  display: 'flex',
                  overflow: 'visible',
                  maxWidth: 'max-content'
                }}
                className='tool_tip'
              >
                <Title
                  content={`$ ${getNumberKMBT(phaseData?.devCost)}`}
                  size='large-2'
                  className='font_gradient font_pad link_dashed no_margin'
                  isLoading={!phaseData || phaseData?.devCost == 0}
                />
                <BsQuestion size={16} />
                <span
                  className='tooltiptext font_xs'
                  style={{
                    maxWidth: '260px',
                    flexWrap: 'wrap',
                    bottom: '-80px'
                    // left: 0
                  }}
                >
                  Estimated based on{' '}
                  <b>
                    <i>Development Region</i>
                  </b>{' '}
                  and{' '}
                  <b>
                    <i>Team</i>
                  </b>{' '}
                  selection. Switch selections to see other results.
                </span>
                {/* <div>
                  
                </div> */}
              </div>
              <SubTitle
                content={<>Hover for details.</>}
                className='font_xs line_s margin_xs'
                fontType='bold'
              />
            </div>
            <div
              className='col'
              style={{
                position: 'relative',
                paddingRight: 0
              }}
            >
              <TeamEstBanner
                teamSize={phaseData?.teamSize}
                globalCosts={costData}
                teamData={phaseData?.team}
                onCostRegionChange={handleRegionChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TimeEstBanner = ({ totalTime }) => {
  return (
    <Card theme='dark' clickable={false}>
      <div className='d-flex'>
        <div
          className='icon_regular padding_s'
          style={{
            width: 'max-content',
            marginRight: '10px'
          }}
        >
          <HiOutlineClock size={20} />
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
        content={`${getWeeksFromHours(totalTime)} Weeks`}
        isLoading={!totalTime}
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
  )
}

const TeamEstBanner = ({
  teamData,
  teamSize,
  globalCosts,
  onCostRegionChange = () => {}
}) => {
  function constructTeamOptions () {
    const teamOptions = []
    if (teamData) {
      teamData.map((tm, index) => {
        const { role, devCount } = tm
        teamOptions.push({
          id: index,
          title: `${devCount} ${role[0].toUpperCase() +
            role.substring(1)} Engineers`,
          icon: () => {
            const roleName = role.toLowerCase()
            switch (roleName) {
              case 'front-end':
                return <DiReact size={16} />
              case 'back-end':
                return <BiCodeCurly size={16} />
              case 'full-stack':
                return <BsCodeSlash size={16} />
              case 'devops':
                return <FaAws size={16} />
              default:
                return <HiOutlineUserGroup size={16} />
            }
          }
        })
      })
    }
    return teamOptions
  }

  return (
    <>
      <div className='d-flex'>
        <DropDown
          label={'Suggested Team:'}
          options={[`${teamSize} Members`]}
          labelProps={{
            className: 'font_xs line_s no_margin'
          }}
          containerProps={{
            className: 'col col-sm-5'
          }}
          placeholder={`${teamSize} Members`}
        />
        <Spacer />
        <DropDown
          label={'Development Region:'}
          options={globalCosts?.map(rate => {
            return rate.name
          })}
          onValueChange={(val, index) => onCostRegionChange(index)}
          containerProps={{
            className: 'col col-sm-5'
          }}
          labelProps={{
            className: 'font_xs line_s no_margin'
          }}
        />
      </div>
      <Spacer />
      <SubTitle
        content='Suggested Team Structure:'
        className='font_xs margin_xs'
        fontType='bold'
      />
      {teamData && (
        <SimpleChoiceList
          data={constructTeamOptions()}
          choiceProps={{
            className: 'shadow_light custom_choice'
          }}
          disableSelect
        />
      )}
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
    </>
  )
}
