import FeatureList from '../assets/jsons/masterStep.json'

export function extractFeatures () {
  const parentFeatures = FeatureList[2].options
  let subFeatureList = []

  parentFeatures.map(parent => {
    // if (parent.options) {
      parent.options && console.log('Should add sub')
      parent.options?.map(sub => {
        const subFeature = { ...sub }
        subFeature.parent = {...parent}
        delete subFeature.parent.options
        subFeatureList.push(subFeature)
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
    subFeatures: subFeatureList
  }
}

export function extractFeature (featureId = []) {
  const features = extractFeatures().subFeatures
  console.log('Features:', features.length)
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
