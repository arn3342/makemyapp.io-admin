import { ProfileActions } from '../actions/userActions'
import { Constants } from '../constants'

export const setTeamData = data => ({
  type: ProfileActions.SET_TEAM,
  data
})

export const getTeamData = data => ({
  type: ProfileActions.GET_TEAM,
  data
})

export const setProfile = data => ({
  type: ProfileActions.SET_PROFILE,
  data
})

// export const updateProfile = data => ({
//   type: ProfileActions.UPDATE_PROFILE,
//   data
// })

export const setLoadingState = data => ({
  type: ProfileActions.SET_LOADING_STATE,
  data
})

const initialState = {
  profile: {},
  team: [],
  loadingState: Constants.LoadingState.LOADING
}

export default (state = initialState, action) => {
  let { data } = action
  let profile = { ...state.profile }
  let team = [...state.team]

  switch (action.type) {
    case ProfileActions.SET_TEAM:
      team = data
      return { ...state, team } || state
    case ProfileActions.ADD_TEAM_MEMBER:
      if (Array.isArray(data)) {
        team.push(...data)
      } else {
        team.push(data)
      }
      return { ...state, team } || state

    case ProfileActions.SET_PROFILE:
      profile = data
      return { ...state, profile } || state
    // case ProfileActions.UPDATE_PROFILE:
    //   profile = data
    //   return { ...state, profile } || state

    case ProfileActions.SET_LOADING_STATE:
      let loadingState = data
      return { ...state, loadingState } || state

    default:
      return state
  }
}
