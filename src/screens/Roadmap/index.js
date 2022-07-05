import React, { useState, useEffect, useCallback, useMemo } from 'react'
import ReactFlow, { addEdge, applyEdgeChanges } from 'react-flow-renderer'
import './index.css'
import {
  Slider,
  SliderFeatureSelector,
  Spacer,
  SubTitle,
  Title
} from '../../components/global'
import {
  FeatureSelector,
  FlowToolbox,
  ScreenBuilderWidget,
  ScreenNode
} from './components'
import { DropDown } from '../../components/form'
import { extractFeaturesAsIs } from '../../misc/featureExtractor'
import { useDispatch, useSelector } from 'react-redux'
import { RoadmapActions } from '../../data/actions/roadmapActions'
import { getRandomInteger } from '../../misc/logics'
import { Constants } from '../../data/constants'

export default ({}) => {
  const nodeTypes = useMemo(() => ({ screen: ScreenNode }), [])
  const [edges, setEdges] = useState([])
  const [modalProps, setModalProps] = useState({
    open: false
  })
  const dispatch = useDispatch()
  const mvpScreens = useSelector(state => state.roadmap.mvp.screens)
  const mvpEdges = useSelector(state => state.roadmap.mvp.edges)

  //#region ReactFlow callbacks & Node code
  const onNodesChange = useCallback(
    changes => {
      if (changes[0].position && changes[0].position.x) {
        const updatedNode = {
          id: changes[0].id,
          position: {
            x: changes[0].position?.x,
            y: changes[0].position?.y
          }
        }

        dispatch({
          type: RoadmapActions.MVP.UPDATE_SCREEN,
          data: updatedNode
        })
      }
    },
    [mvpScreens]
  )
  const onEdgesChange = useCallback(
    changes => {
      console.log('Chaning to:', changes)
      setEdges(eds => applyEdgeChanges(changes, eds))
    },
    [setEdges]
  )
  const onConnect = useCallback(
    connection => {
      // console.log('Edge changed to:', connection)
      // setEdges(eds => addEdge(connection, eds))
      dispatch({
        type: RoadmapActions.MVP.ADD_EDGE,
        data: connection
      })
    },
    [mvpEdges]
  )

  function addNewNode (node) {
    node.data = {
      ...node.data,
      onAddFeatureClick: openModal
    }
    dispatch({
      type: RoadmapActions.MVP.ADD_SCREEN,
      data: node
    })
  }
  //#endregion

  useEffect(() => {}, [])

  function openModal (screenId) {
    setModalProps({
      open: true,
      screenId: screenId
    })
  }

  function updateScreenFeatures (features) {
    setModalProps(prevState => ({
      ...prevState,
      open: false
    }))
    if (features) {
      const updatedNode = {
        id: modalProps.screenId,
        features
      }

      dispatch({
        type: RoadmapActions.MVP.UPDATE_SCREEN,
        data: updatedNode
      })
    }
  }

  function getScreenFeatures (screenId) {
    const currentScreen = mvpScreens.find(x => x.id === screenId)
    // console.log('Current scr is:', currentScreen?.features)
    return currentScreen?.features
  }
  // console.log('Screens is:', edges)
  return (
    <div
      className='container'
      style={{
        height: '100%'
      }}
    >
      <Slider isOpen={modalProps.open}>
        <FeatureSelector
          onSubmit={features => {
            updateScreenFeatures(features)
          }}
          options={extractFeaturesAsIs()}
          prevOptions={getScreenFeatures(modalProps.screenId)}
          btnSubmitLabel='Assign Features'
        />
      </Slider>
      <Spacer size='large' />
      <div
        className='row'
        style={{
          height: '100%'
        }}
      >
        <div className='col col-sm-3 option_container'>
          <SubTitle
            className='margin_xs'
            fontType='bold'
            content='Select Roadmap'
          />
          <DropDown options={Constants.BuildPhases} />
          <Spacer size='medium' />
          <ScreenBuilderWidget
            onAddScreenNode={addNewNode}
            currentNodes={mvpScreens}
          />
        </div>
        <div className='col flow_container'>
          {mvpScreens?.length <= 0 && (
            <Title
              size='large'
              theme='dark'
              fontType='light'
              content='Add screens to start building the roadmap'
              style={{
                position: 'absolute',
                marginTop: '20px',
                marginLeft: '15px',
                color: 'var(--bs-gray-500)'
              }}
            />
          )}
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={mvpScreens}
            edges={mvpEdges}
            // defaultEdges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineStyle={{
              stroke: 'blue',
              strokeWidth: '2px'
            }}
            zoomOnScroll={false}
            defaultEdgeOptions={{
              animated: true,
              style: {
                strokeWidth: '2px',
                stroke: 'blue'
              }
            }}
          />
          {/* <FlowToolbox/> */}
        </div>
      </div>
    </div>
  )
}
