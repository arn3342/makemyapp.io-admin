import React, { useState } from 'react'
import { Button, DropDown } from '../../../components/form'
import { InfoBox, Spacer } from '../../../components/global'
import { Formik } from 'formik'
import { Constants } from '../../../data/constants'
import { faker } from '@faker-js/faker'

export const AddTeamBox = ({ onSubmitValues, team }) => {
  const [sendSuccess, setSendSuccess] = useState(false)

  function getTeamNames () {
    const members = []
    if (team) {
      team.map((member, index) => {
        members.push({
          id: index,
          title: member.fullName
        })
      })
    }
    return members
  }
  return (
    <>
      <Formik
        initialValues={{ fullName: '', role: '' }}
        onSubmit={values => {
          const data = {
            id: faker.datatype.uuid(),
            fullName: values.fullName,
            role: values.role,
            rate: {
              hourly: 0,
              fixed: 0
            }
          }
          onSubmitValues(data)
          console.log(data)
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col col-sm-3'>
                {/* <Input
                      name='fullName'
                      placeholder='Name of member'
                      onValueChange={handleChange('fullName')}
                      value={values.fullName}
                    /> */}
                <DropDown
                  options={getTeamNames(team)}
                  label='Member:'
                  labelProps={{
                    className: 'font_xs line_s no_margin'
                  }}
                  containerProps={{
                    className: 'col'
                  }}
                  isExtraSmall
                  onValueChange={handleChange('fullName')}
                />
              </div>
              <div className='col col-sm-3'>
                <DropDown
                  options={Constants.MemberRoles}
                  label='Select Role:'
                  labelProps={{
                    className: 'font_xs line_s no_margin'
                  }}
                  containerProps={{
                    className: 'col'
                  }}
                  isExtraSmall
                  onValueChange={handleChange('role')}
                />
              </div>
              <div className='col col-sm-2 m-auto'>
                <Button
                  label='Add To Team'
                  theme='dark'
                  hasShadow
                  animateScale
                  onClick={handleSubmit}
                />
              </div>
              <div className='col' />
            </div>
            <Spacer />
          </form>
        )}
      </Formik>
      <Spacer />
      <InfoBox
        type='success'
        content='The invitation email was sent successfully!'
        visible={sendSuccess}
        onHide={() => setSendSuccess(false)}
      />
    </>
  )
}
