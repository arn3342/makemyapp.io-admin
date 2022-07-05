import React from 'react'
import CostScreen from '../costScreen'
import TeamScreen from '../teamScreen'
import TimelineScreen from '../timelineScreen'

export const ScreenSelector = ({ screenId }) => {
  switch (screenId) {
    case 188:
      return <TimelineScreen />
    case 189:
      return <CostScreen />
    case 190:
      return <TeamScreen />
    default:
      return <TimelineScreen />
  }
}
