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

export const PhaseDetails = ({ screenId }) => {
  const userProfile = useSelector(state => state.user.profile)
  const currentProject = useSelector(state => state.user.profile.projects[0])
  const [timeData, setTimeData] = useState()
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
  
    const mvpFeatures = extractFeature(mvpFeatureIDs)
    const v1Features = extractFeature(v1FeatureIDs)
  
    // console.log("MVP ft:", mvpFeatureIDs)
    setTimeData({
      mvpTime: mvpFeatures?.reduce((a, b) => {
        return a + b.estDevTime
      }, 0),
      v1Time: v1Features?.reduce((a, b) => {
        return a + b.estDevTime
      }, 0)
    })
  }, [])

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
            content={'4 Weeks'}
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
                content={'$40K'}
                size='large-2'
                className='font_gradient font_pad'
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
              <div className='col col-sm-5'>
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
                />
                <Spacer />
                <DropDown
                  label={'Region:'}
                  options={['6 People']}
                  contentContainerProps={{
                    className: 'd-flex col'
                  }}
                  labelProps={{
                    style: {
                      paddingRight: '5px'
                    }
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
