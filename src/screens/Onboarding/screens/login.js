import React, { useEffect, useState } from 'react'
import { Spacer, SubTitle, Title } from '../../../components/global'
import '../components/index.css'
import { Button, Input } from '../../../components/form'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { AuthActions } from '../../../data/actions/userActions'
import { SignUpBanner } from '../components'
import { Formik } from 'formik'
import { StringHelper } from '../../../data/extensions/stringHelper'
import { Constants } from '../../../data/constants'

export default ({ onSwitchRequest = () => {} }) => {
  const [globalLoading, setGlobalLoading] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  function performLogin (values) {
    dispatch({
      type: AuthActions.PERFORM_SIGNIN,
      data: {
        email: values.email,
        password: values.password
      }
    })
  }

  useEffect(() => {
    const { loadingState } = user
    if (loadingState == Constants.LoadingState.LOADING) {
      setGlobalLoading(true)
      dispatch({
        type: AuthActions.PERFORM_SIGNIN_LOCAL,
        data: {}
      })
    } else {
      setGlobalLoading(false)
    }
  }, [user.loadingState])

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
      <SignUpBanner onClick={onSwitchRequest} />
      <div
        className='form_container'
        style={{
          position: 'relative'
        }}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
            errMessage: ''
          }}
          validate={values => {
            const errors = {}
            if (StringHelper.isPropsEmpty(values, 'errMessage'))
              errors.errMessage = 'Please fill in all details.'
            return errors
          }}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            if (StringHelper.isEmpty(values.errMessage)) {
              // console.log('Should try SignIn now...')
              setSubmitting(true)
              performLogin(values)
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
              {globalLoading && (
                <div className='spinner-fullScreen'>
                  <div className='spinner-border text-primary' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                </div>
              )}
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
                content='Log-in and start building your app now!'
              />
              <Spacer size='large' />
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
                    label='Log In'
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
                        <b className='font_link'>Log In</b>
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
