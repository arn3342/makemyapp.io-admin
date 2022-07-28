import React, { useEffect } from 'react'
import { DropDown, Button } from '../../components/form'
import { Spacer, SubTitle, Title } from '../../components/global'
import { randomColorSelector } from '../../misc/logics'
import { CollabInvite } from './components'
import { Constants} from '../../data/constants'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import { ProfileActions } from '../../data/actions/userActions'
import Dummy from '../../data/dummyGenerator'

export default ({}) => {
  const dispatch = useDispatch()
  const teamState = useSelector(state => state.user.team)
  useEffect(() => {
    teamState?.length <= 0 && dispatch({
      type: ProfileActions.GET_TEAM,
      data: Dummy.teamMember(2)
    })
  }, [])

  function performAddMember (values) {
    const member = {
      ...Dummy.user(),
      ...values,
      activeStatus: Constants.ActivityStatus[1]
    }
    dispatch({
      type: ProfileActions.ADD_TEAM_MEMBER,
      data: member
    })
  }
  return (
    <div className='container'>
      <Spacer size='large' />
      <div className='row'>
        <Title content='Collaborators' size='large-2' fontType='light' />
        <Spacer />
        <SubTitle
          size='medium'
          content='Manage and invite your team-members to access MakeMyApp. Your team-members can see, manage features, roadmaps, cloud functionalities and more, based on their role.'
        />
      </div>
      <CollabInvite onSubmitValues={values => performAddMember(values)} />
      <Spacer size='medium' />
      <div className='table_container shadow_light'>
        <table>
          <thead className='shadow_light'>
            <tr className='team_table_header'>
              <th
                style={{
                  width: '40px',
                  paddingRight: '0px !important'
                }}
              />
              <th
                style={{
                  width: '250px'
                }}
              >
                Name
              </th>
              <th
                style={{
                  width: '250px'
                }}
              >
                Email
              </th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Logged In</th>
            </tr>
          </thead>
          <tbody>
            {teamState?.map((member, index) => {
              return (
                <tr className='table_row' key={index}>
                  <td>
                    <div
                      className='teamMember_avatar shadow_light'
                      style={randomColorSelector()}
                    >
                      <SubTitle
                        size='large'
                        className='no_margin'
                        content={member.fullName.charAt(0).toUpperCase()}
                      />
                    </div>
                  </td>
                  <td>
                    <SubTitle className='no_margin' content={member.fullName} />
                  </td>
                  <td>
                    <SubTitle className='no_margin' content={member.email} />
                  </td>
                  <td>
                    <DropDown
                      options={Constants.TeamMemberTypes}
                      defaultValue={member.role}
                      isExtraSmall
                    />
                  </td>
                  <td>
                    <SubTitle
                      className='no_margin'
                      content={member.activeStatus}
                    />
                  </td>
                  <td>
                    <SubTitle
                      className='no_margin'
                      content={moment(member.lastLoggedIn).format('DD-MM-YYYY')}
                    />
                  </td>
                  <td>
                    <Button label='Remove' className='small_button' isExtraSmall />
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
