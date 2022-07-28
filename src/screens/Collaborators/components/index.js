import React, { useState } from 'react'
import { Button, DropDown, Input } from '../../../components/form'
import { InfoBox, Spacer } from '../../../components/global'
import { Formik } from 'formik'
import { Constants } from '../../../data/constants'

export const CollabInvite = ({onSubmitValues}) => {
  const [showAddBox, setShowAddBox] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  return (
    <>
      <Formik
        initialValues={{ email: '', fullName: '', role: '' }}
        // validate={values => {
        //   const errors = {}
        //   if (!values.email) {
        //     errors.email = 'Required'
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = 'Invalid email address'
        //   }
        //   return errors
        // }}
        onSubmit={(values, { setSubmitting }) => {
          if (!showAddBox) {
            setShowAddBox(true)
            setSubmitting(false)
          } else {
            setSubmitting(true)
            setTimeout(() => {
              setSubmitting(false)
              setShowAddBox(false)
              setSendSuccess(true)
              onSubmitValues && onSubmitValues(values)
            }, 2000)
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            {showAddBox && (
              <>
                <div className='row'>
                  <div className='col col-sm-3'>
                    <Input
                      name='fullName'
                      placeholder='Name of member'
                      onValueChange={handleChange('fullName')}
                      value={values.fullName}
                    />
                  </div>
                  <div className='col col-sm-3'>
                    <Input
                      name='email'
                      placeholder='Email address'
                      onValueChange={handleChange('email')}
                      value={values.email}
                    />
                  </div>
                  <div className='col col-sm-2'>
                    <DropDown
                      name='role'
                      options={Constants.TeamMemberTypes}
                      placeholder='Assign Role...'
                      defaultValue={values.role}
                      onValueChange={handleChange('role')}
                    />
                  </div>
                </div>
                <Spacer />
              </>
            )}

            <div className='row'>
              <div className='col col-sm-2'>
                <Button
                  label={showAddBox ? 'Send Invite' : 'Invite Collaborator'}
                  theme='dark'
                  hasShadow
                  animateScale={showAddBox}
                  onClick={handleSubmit}
                  isBusy={isSubmitting}
                />
              </div>
              {showAddBox && (
                <div className='col col-sm-1'>
                  <Button
                    disabled={isSubmitting}
                    label='Cancel'
                    onClick={() => setShowAddBox(false)}
                  />
                </div>
              )}
            </div>
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
