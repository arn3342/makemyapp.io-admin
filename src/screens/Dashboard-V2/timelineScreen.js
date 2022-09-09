import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ExtendedButton } from '../../components/form'
import { Card, Spacer, SubTitle, Title } from '../../components/global'
import { ProfileActions } from '../../data/actions/userActions'
import { extractFeature } from '../../misc/featureHelper'
import { getWeeksFromHours } from '../../misc/logics'
import { SiteRoutes } from '../../misc/routes'

const TimelineScreen = () => {
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

  function goToFeatureList(){
    navigate(SiteRoutes.Engine.Builder.Screens().FeatureList.path);
  }

  return (
    <Card
      theme='light'
      animateScale={false}
      style={{
        cursor: 'default'
      }}
    >
      <div className='row'>
        <div className='col col-lg-4 m-auto'>
          <SubTitle content='MVP should take' fontType='bold' />
          <Title size='large-3' isLoading={!timeData} content={`${getWeeksFromHours(timeData?.mvpTime)} Weeks`} className='font_gradient' />
          <Spacer size='medium' />
          <div className='col'>
            <ExtendedButton
              title={`${currentProject.buildPhases.mvp?.features?.length} Features Suggested`}
              id={1090}
              description={`${currentProject.buildPhases.mvp?.features?.length} Major Features suggested by our AI, you can always modify them.`}
              itemSize='compact'
              theme='light'
            />
          </div>
        </div>
        <div className='col col-lg-4 m-auto'>
          <SubTitle content='V1 Should Take' fontType='bold' />
          <Title size='large-3' isLoading={!timeData} content={`${getWeeksFromHours(timeData?.v1Time)} Weeks`} className='font_gradient' />
          <Spacer size='medium' />
          <div className='col'>
            <ExtendedButton
              title={`${currentProject.buildPhases.v1?.features?.length} Features Suggested`}
              id={1090}
              description={`${currentProject.buildPhases.v1?.features?.length} Major Features, that includes all your feature selections.`}
              itemSize='compact'
              theme='light'
            />
          </div>
        </div>
        <div className='col col-lg-4 m-auto'>
          <ExtendedButton
            title='Assign Features'
            description='Browse our feature list and assign features to your MVP and Version 1 of your app.'
            id={1092}
            className='m-auto'
            theme='light'
            extraLabel='Browse Features'
            onClick={goToFeatureList}
          />
        </div>
      </div>
    </Card>
  )
}

export default TimelineScreen
