import { child, get, getDatabase, ref } from 'firebase/database'
import React from 'react'
import { useSelector } from 'react-redux'
import { Constants } from './constants'

export async function getCostRateData (firebaseInstance) {
  const database = getDatabase(firebaseInstance)
  return get(child(ref(database), `devRates/`)).then(result => {
    if (result.exists()) {
      const rateObj = result.val()
      let rateList = []
      Object.keys(rateObj).map(parent => {
        rateList.push(rateObj[parent])
      })
      return rateList
    }
  })
}
export function getDevelopmentCost (rate) {
  if (rate > 0) {
    return rate * 10
  }
}
/**
 *
 * @param {*} feature The feature
 * @param {Constants.BuildPhase} buildPhase
 */
export function addFeatureToPhase (feature, buildPhase) {
  switch (buildPhase) {
    case Constants.BuildPhase.MVP:
      break
  }
}
