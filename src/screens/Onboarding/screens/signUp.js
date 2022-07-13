import React, { useState } from 'react'
import { Spacer, SubTitle, Title } from '../../../components/global'
import '../components/index.css'
import { Button, Input } from '../../../components/form'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { AuthActions } from '../../../data/actions/userActions'
import { SignInBanner } from '../components'
import { Formik } from 'formik'
import { StringHelper } from '../../../data/extensions/stringHelper'

export default ({ onSwitchRequest = () => {}, projectMetaData }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  function performSignUp (values) {
    dispatch({
      type: AuthActions.PERFORM_SIGNUP,
      data: {
        email: values.email,
        password: values.password,
        projects: [projectMetaData]
      }
    })
  }

  function isBusy (isSubmitting) {
    if (isSubmitting) {
      if (user.error?.message) {
        return false
      }
      return true
    }
    return isSubmitting
  }

  return (
    <div>
      <SignInBanner onClick={onSwitchRequest} />
      <div className='form_container'>
        <Formik
          initialValues={{
            email: '',
            password: '',
            rePassword: '',
            errMessage: ''
          }}
          validate={values => {
            const errors = {}
            if (StringHelper.isPropsEmpty(values, 'errMessage'))
              errors.errMessage = 'Please fill in all details.'
            else if (!StringHelper.isSame([values.password, values.rePassword]))
              errors.errMessage = 'Your passwords do not match.'
            return errors
          }}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            if (StringHelper.isEmpty(values.errMessage)) {
              console.log('Should try signup now...')
              setSubmitting(true)
              performSignUp(values)
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            errors
          }) => (
            <>
              <Title
                className='font_gradient no_margin'
                content="Let's Make Your App!"
                size='large-2'
                fontType='bold'
                style={{
                  paddingBottom: '10px'
                }}
              />
              <SubTitle
                size='medium'
                fontType='light'
                content="Set up your account in a minute and let's start building!"
              />
              <Spacer size='medium' />
              <Input
                className={`col col-lg-9 margin_xs ${isBusy(isSubmitting) &&
                  'disabled'}`}
                placeholder='Email Address'
                onValueChange={handleChange('email')}
              />
              <Spacer />
              <Input
                className={`col col-lg-9 margin_xs ${isBusy(isSubmitting) &&
                  'disabled'}`}
                placeholder='Password'
                isPassword
                onValueChange={handleChange('password')}
              />
              <Spacer />
              <Input
                className={`col col-lg-9 margin_xs ${isBusy(isSubmitting) &&
                  'disabled'}`}
                placeholder='Confirm Password'
                isPassword
                onValueChange={handleChange('rePassword')}
              />
              {errors.errMessage || user.error?.message ? (
                <>
                  <SubTitle
                    content={errors.errMessage || user.error.message}
                    className='font_xs no_margin font_error margin_xs col col-lg-9'
                    fontType={'bold'}
                  />
                  <Spacer size='small' />
                </>
              ) : (
                <Spacer size='medium' />
              )}
              <div className='row'>
                <div className='col col-sm-5'>
                  <Button
                    hasShadow
                    isRounded
                    theme='dark'
                    label='Sign Up'
                    icon={faArrowRight}
                    animateIcon
                    onClick={handleSubmit}
                    isBusy={isBusy(isSubmitting)}
                    animateScale
                  />
                </div>
              </div>
              <Spacer size={'medium'} />
              <div className='row'>
                <SubTitle
                  className='col col-lg-12 font_xs'
                  content={
                    <>
                      By clicking{' '}
                      <i>
                        <b className='font_link'>Sign Up</b>
                      </i>
                      , you agree to our{' '}
                      <i className='font_link'>Terms and Conditions</i>. And you
                      also agree to allow us to save cookies in your local
                      browser.
                    </>
                  }
                />
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  )
}
