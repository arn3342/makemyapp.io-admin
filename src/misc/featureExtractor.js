import FeatureList from '../assets/jsons/masterStep.json'

export function extractFeatures () {
  const parentFeatures = FeatureList[2].options
  let subFeatures = []

  parentFeatures.map(parent => {
    // if (parent.options) {
      parent.options?.map(sub => {
        const subFeature = { ...sub }
        subFeature.parent = {...parent}
        delete subFeature.parent.options
        subFeatures.push(subFeature)
      })
    // } else {
    //   subFeatureList.push(parent)
    // }
  })

  // for (var i = 0; i < parentFeatures.length - 1; i++) {
  //   if (parentFeatures[i].options) {
  //     parentFeatures[i].options?.map(sub => {
  //       const subFeature = { ...sub }
  //       subFeature.parent = { ...parentFeatures[i] }
  //       delete subFeature.parent.options
  //       subFeatureList.push(subFeature)
  //     })
  //   } else {
  //     subFeatureList.push(parentFeatures[i])
  //   }
  // }
  return {
    parentFeatures,
    subFeatures
  }
}

export function extractFeature (featureId = []) {
  const features = extractFeatures().subFeatures
  if (Array.isArray(featureId)) {
    return features.filter(x =>
      featureId.some(id => id == x.id)
    )
  } else {
    return features.find(x => x.id == featureId)
  }
}

export function extractFeaturesAsIs () {
  return FeatureList[2].options
}
