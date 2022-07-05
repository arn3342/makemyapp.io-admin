import { ProfileActions } from '../actions/userActions'

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

export const setToken = data => ({
  type: ProfileActions.SET_TOKEN,
  data
})

const initialState = {
  profile: {},
  team: [],
  token: 'token'
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

    case ProfileActions.SET_TOKEN:
      let token = data
      console.log('Setting token...', {...state, token})
      return { ...state, token } || state
    default:
      return state
  }
}
