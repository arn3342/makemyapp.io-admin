import React, { useEffect, useState } from 'react'
import { DropDown, Button, Input } from '../../components/form'
import { Spacer, SubTitle, Title } from '../../components/global'
import { randomColorSelector } from '../../misc/logics'
import { AddTeamBox } from './components'
import { Constants } from '../../data/constants'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import { ProfileActions } from '../../data/actions/userActions'
import Dummy from '../../data/dummyGenerator'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

export default ({}) => {
  const dispatch = useDispatch()
  const teamState = useSelector(state => state.user.team)
  const [members, setMembers] = useState([])
  useEffect(() => {
    teamState?.length <= 0 &&
      dispatch({
        type: ProfileActions.GET_TEAM,
        data: Dummy.teamMember(2)
      })
  }, [])

  function performAddMember (member) {
    setMembers(prevState => [...prevState, member])
    // dispatch({
    //   type: ProfileActions.ADD_TEAM_MEMBER,
    //   data: member
    // })
  }
  return (
    <div className='container'>
      <Spacer size='large' />
      <div className='row'>
        <Title content='Your Team' size='large-2' fontType='light' />
        <Spacer />
        <SubTitle
          size='medium'
          content='Assign roles to your collaborators and make the development journey easier.'
        />
      </div>
      <AddTeamBox
        team={teamState}
        onSubmitValues={values => performAddMember(values)}
      />
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
              <th>Role</th>
              <th style={{
                      width: '150px'
                    }}>Hourly Rate</th>
              <th style={{
                      width: '150px'
                    }}>Fixed Rate</th>
              <th>Assigned Tasks</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {members && members?.length > 0 && members?.map((member, index) => {
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
                    <DropDown
                      options={Constants.MemberRoles}
                      defaultValue={member.role}
                      isExtraSmall
                    />
                  </td>
                  <td>
                    {/* <SubTitle
                      className='no_margin'
                      content={member.activeStatus}
                    /> */}
                    <Input value={member.rate?.hourly || 0} fontAwesomeIcon={faDollarSign} className='padding_xs' />
                  </td>
                  <td>
                    <Input value={member.rate?.fixed || 0} fontAwesomeIcon={faDollarSign} className='padding_xs' />
                  </td>
                  <td>
                    <SubTitle
                      className='no_margin'
                      content={member.assignedTasks || 'No tasks assigned'}
                    />
                  </td>
                  <td>
                    <Button
                      label='Remove'
                      className='small_button'
                      isExtraSmall
                    />
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
