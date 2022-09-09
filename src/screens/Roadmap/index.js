import React, { useState, useEffect, useCallback, useMemo } from 'react'
import ReactFlow, { applyEdgeChanges } from 'react-flow-renderer'
import './index.css'
import { Slider, Spacer, SubTitle, Title } from '../../components/global'
import {
  FeatureSelector,
  PlaceholderNode,
  ScreenBuilderWidget,
  ScreenNode
} from './components'
import { DropDown } from '../../components/form'
import { extractFeaturesAsIs } from '../../misc/featureHelper'
import { useDispatch, useSelector } from 'react-redux'
import { RoadmapActions } from '../../data/actions/roadmapActions'
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
      onAddFeatureClick: openModal,
      onDeleteClick: deleteNode
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

  function deleteNode (screenId) {
    dispatch({
      type: RoadmapActions.MVP.REMOVE_SCREEN,
      data: {
        id: screenId
      }
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
          key={modalProps.screenId}
          onSubmit={features => {
            updateScreenFeatures(features)
          }}
          options={extractFeaturesAsIs()}
          prevOptions={getScreenFeatures(modalProps.screenId)}
          btnSubmitLabel='Assign Features'
          screenFeatures={getScreenFeatures(modalProps.screenId)}
        />
      </Slider>
      <div
        className='row'
        style={{
          height: '100%'
        }}
      >
        <div className='col col-sm-3 option_container'>
          <Spacer size='medium' />
          <SubTitle
            className='margin_xs'
            fontType='bold'
            content='Select Roadmap'
          />
          <DropDown options={Constants.BuildPhases} isExtraSmall />
          <Spacer size='medium' />
          <ScreenBuilderWidget
            onAddScreenNode={addNewNode}
            currentNodes={mvpScreens}
          />
        </div>
        <div
          className='col flow_container'
          style={{
            position: 'relative'
          }}
        >
          {mvpScreens?.length <= 0 && <PlaceholderNode />}
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
            defaultEdgeOptions={{
              animated: true,
              style: {
                strokeWidth: '2px',
                stroke: 'blue'
              }
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              zIndex: 999
            }}
          >
            <SubTitle
              size='small'
              theme='dark'
              fontType='bold'
              content='• Scroll or pinch to zoom'
              className={'no_margin font_xs'}
              style={{
                color: 'var(--bs-gray-700)'
              }}
            />
            <SubTitle
              size='small'
              theme='dark'
              fontType='bold'
              className={'no_margin font_xs'}
              content='• Click and hold on any empty gray space to drag the canvas.'
              style={{
                color: 'var(--bs-gray-700)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
