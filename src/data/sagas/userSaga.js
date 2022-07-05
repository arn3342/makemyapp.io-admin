import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { ProfileActions, AuthActions } from '../actions/userActions'
import { setLoadingState, setProfile, setTeamData } from '../reducers/userReducer'
import {
  ref,
  getDatabase,
  set,
  push,
  update,
  get,
  child
} from 'firebase/database'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithCustomToken
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { StorageHelper } from '../storage'
import {Constants} from '../constants'

function * performGetTeam (payload) {
  // console.log('Data is:', data)
  yield put(setTeamData(payload.data))
}

function * performSignUp (payload) {
  const { data } = payload
  const firebaseApp = yield select(state => state.firebaseApp.instance)
  const auth = getAuth(firebaseApp)
  try {
    const signup = yield call(
      createUserWithEmailAndPassword,
      auth,
      data.email,
      data.password
    )
    if (signup.user) {
      console.log('SignUp Result:', signup.user.uid)
      const database = yield call(getDatabase, firebaseApp)
      try {
        const profileRef = ref(database, 'users/' + signup.user.uid)
        yield call(set, profileRef, {
          email: data.email,
          firstName: 'Your',
          lastName: 'Name',
          userId: signup.user.uid,
          projects: data.projects
        })
        const profileResult = yield call(
          get,
          child(ref(database), 'users/' + signup.user.uid)
        )
        yield put(setProfile(profileResult.val()))
        yield call(StorageHelper.SaveItem, signup.user.accessToken, 'auth')
      } catch (ex) {
        console.log('Something went wrong while creating profile.', ex)
      }
    }
  } catch (ex) {
    let error = new FirebaseError()
    error = { ...ex }
    console.log('Error is:', error)
  }
}

function * performSignIn (payload) {
  const { data } = payload
  const firebaseApp = yield select(state => state.firebaseApp.instance)
  const userProfile = yield select(state => state.user.profile)
  const auth = getAuth(firebaseApp)
  try {
    const signIn = yield call(
      signInWithEmailAndPassword,
      auth,
      data.email,
      data.password
    )
    if (signIn.user) {
      const database = yield call(getDatabase, firebaseApp)
      const token = yield call(getIdToken, signIn.user)
      console.log('ID Token:', token)
      const profileResult = yield call(
        get,
        child(ref(database), 'users/' + signIn.user.uid)
      )
      yield put(setProfile(profileResult.val()))
      yield call(
        StorageHelper.SaveItem,
        { email: data.email, password: data.password },
        'auth'
      )
      // yield put(setToken(signIn.user.refreshToken))
    }
  } catch (ex) {
    let error = new FirebaseError()
    error = { ...ex }
    console.log('Error is:', ex)
  }
}

function * performLocalSignIn (payload) {
  const firebaseApp = yield select(state => state.firebaseApp.instance)
  const auth = getAuth(firebaseApp)
  try {
    const localAuth = yield call(StorageHelper.GetItem, 'auth')
    if (localAuth) {
      const signIn = yield call(
        signInWithEmailAndPassword,
        auth,
        localAuth.email,
        localAuth.password
      )
      if (signIn.user) {
        console.log('SignIn Result:', signIn.user)
        const database = yield call(getDatabase, firebaseApp)
        const profileResult = yield call(
          get,
          child(ref(database), 'users/' + signIn.user.uid)
        )
        yield put(setProfile(profileResult.val()))
        yield call(
          StorageHelper.SaveItem,
          { email: localAuth.email, password: localAuth.password },
          'auth'
        )
        yield put(setLoadingState(Constants.LoadingState.SUCCESS))
      }
    } else {
      yield put(setLoadingState(Constants.LoadingState.ERROR))
    }
  } catch (ex) {
    let error = new FirebaseError()
    error = { ...ex }
    console.log('Error is:', ex)
    yield call(StorageHelper.Remove, 'auth')
    yield put(setLoadingState(Constants.LoadingState.ERROR))
  }
}

export default function * userSaga () {
  yield takeEvery(ProfileActions.GET_TEAM, performGetTeam)
  yield takeLatest(AuthActions.PERFORM_SIGNUP, performSignUp)
  yield takeLatest(AuthActions.PERFORM_SIGNIN, performSignIn)
  yield takeLatest(AuthActions.PERFORM_SIGNIN_LOCAL, performLocalSignIn)
}
