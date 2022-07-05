import {
  faAngleDown,
  faAngleUp,
  faArrowUp,
  faCopy,
  faPencilAlt,
  faPlus,
  faTrash,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  DropDown,
  Input,
  SimpleChoice,
  SimpleChoiceList
} from '../../../components/form'
import { Slider, Spacer, SubTitle, Title } from '../../../components/global'
import ReactFlow, {
  Handle,
  Position,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges
} from 'react-flow-renderer'
import './index.css'
import { getRandomInteger } from '../../../misc/logics'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Constants } from '../../../data/constants'
import {
  extractFeature,
  extractFeaturesAsIs
} from '../../../misc/featureExtractor'

export const ScreenNode = ({ data }) => {
  const mvpScreens = useSelector(state => state.roadmap.mvp.screens)
  const [isHoverActive, setIsHoverActive] = useState(false)
  const onChange = useCallback(evt => {
    console.log(evt.target.value)
  }, [])

  const onAddFeatureClick = useCallback(screenId => {
    data.onAddFeatureClick(screenId)
  }, [])

  const onDeleteClick = useCallback(screenId => {
    data.onDeleteClick(screenId)
  }, [])

  const getScreenFeatures = () => {
    return mvpScreens.find(screen => screen.id === data.screenId).features
  }

  return (
    <>
      <Handle type='target' position={Position.Top} className='edge_handler' />
      <div className='node_container'>
        <div className='row'>
          <div
            className='col'
            onMouseEnter={() => setIsHoverActive(true)}
            onMouseLeave={() => setIsHoverActive(false)}
          >
            <SubTitle
              id={data.draggableId}
              className='no_margin screen_name'
              content={
                !isHoverActive ? data.screenName : 'Click and drag to move'
              }
            />
          </div>
          <div
            className='col col-sm-3 d-flex'
            style={{
              cursor: 'default',
              justifyContent: 'space-evenly'
            }}
          >
            <FontAwesomeIcon
              className='screen_button_icon'
              icon={faPencilAlt}
            />
            <FontAwesomeIcon
              className='screen_button_icon'
              icon={faTrashAlt}
              onClick={() => onDeleteClick(data.screenId)}
            />
          </div>
        </div>
        <div className='screen_container'>
          <div className='button_container shadow_light'>
            <div className='row'>
              <div className='col'></div>
              <div className='col col-sm-5'>
                <Button
                  label='Add Feature'
                  size='small'
                  hasShadow
                  className='small_button font_xs'
                  theme='dark'
                  isRounded
                  onClick={() => onAddFeatureClick(data.screenId)}
                />
              </div>
            </div>
          </div>
          <Spacer />
          <div className='container'>
            {getScreenFeatures()?.length > 0 && (
              <>
                {/* <div className='d-flex'>
                  <SubTitle
                    className='font_xs margin_xs'
                    fontType='bold'
                    link
                    content={`${getScreenFeatures().length} Features`}
                  />
                </div> */}
                <SimpleChoiceList data={getScreenFeatures()} disableSelect />
              </>
            )}
          </div>
        </div>
      </div>
      <Handle
        type='target'
        position={Position.Bottom}
        id='a'
        className='edge_handler'
      />
      <Handle
        type='source'
        position={Position.Left}
        id='c'
        className='edge_handler'
      />
      <Handle
        type='target'
        position={Position.Right}
        id='d'
        className='edge_handler'
      />
    </>
  )
}

export const ScreenBuilderWidget = ({ currentNodes = [], onAddScreenNode }) => {
  const [screenName, setScreenName] = useState('')
  const [screenDetails, setScreenDetails] = useState('')
  const [copyData, setCopyData] = useState({
    parent: Constants.ApplicationFormats[0],
    child: Constants.BuildPhases[0]
  })
  const screenWidth = 300
  const mvpScreens = useSelector(state => state.roadmap.mvp.screens)
  const [selectedScreenId, setSelectedScreenId] = useState()

  function performAddScreen () {
    if (onAddScreenNode) {
      const draggableId = `${screenName
        .replace(' ', '')
        .toLowerCase()}${getRandomInteger(10, 1000)}`
      const node = {
        id: draggableId,
        description: screenDetails,
        type: 'screen',
        position: {
          x:
            currentNodes.length > 0
              ? currentNodes[currentNodes.length - 1].position.x +
                screenWidth +
                50
              : 50,
          y: 40
        },
        dragHandle: `#${draggableId}`,
        data: {
          screenName: screenName.toLowerCase().includes('screen')
            ? screenName
            : screenName + ' Screen',
          features: [],
          draggableId,
          screenId: draggableId
        },
        draggable: true
      }
      onAddScreenNode(node)
    }
  }
  return (
    <>
      <SubTitle className='margin_xs' fontType='bold' content='Screens' />
      <Input
        placeholder='Screen name...'
        onValueChange={val => setScreenName(val)}
        className='margin_xs'
      />
      <Input
        placeholder='Screen description...'
        onValueChange={val => setScreenDetails(val)}
        className='margin_xs'
        isMultiLine
      />
      <Button
        label='Add Screen'
        theme='dark'
        icon={faPlus}
        animateIcon
        onClick={performAddScreen}
      />
      <Spacer size='medium' />
      <SubTitle
        className='margin_xs'
        fontType='bold'
        content='Copy Roadmap To'
      />
      <DropDown
        options={Constants.ApplicationFormats}
        className='margin_xs'
        defaultValue={copyData.parent}
        onValueChange={val => {
          setCopyData(prevState => ({
            ...prevState,
            parent: val
          }))
        }}
      />
      <DropDown
        options={Constants.BuildPhases}
        className='margin_xs'
        defaultValue={copyData.child}
        onValueChange={val => {
          setCopyData(prevState => ({
            ...prevState,
            child: val
          }))
        }}
      />
      <Button
        label={
          <>
            Copy To{' '}
            <i>
              "{copyData.parent}-{copyData.child}"
            </i>
          </>
        }
        theme='dark'
        icon={faCopy}
        animateIcon
        onClick={performAddScreen}
        isExtraSmall
      />
      <div className='screen_details_container'>
        {mvpScreens.map(screen => {
          return (
            <div
              className='container screen_details_container_single shadow_light'
              key={screen.id}
              onClick={() =>
                setSelectedScreenId(
                  screen.id === selectedScreenId ? '' : screen.id
                )
              }
            >
              <div className='row'>
                <div className='col'>
                  <SubTitle
                    className='no_margin font_xs'
                    fontType='bold'
                    content={screen.data.screenName}
                  />
                </div>
                <div className='col col-sm-2'>
                  <FontAwesomeIcon
                    className={`icon ${selectedScreenId === screen.id &&
                      'icon_rotated'}`}
                    icon={faAngleDown}
                  />
                </div>
              </div>
              {selectedScreenId === screen.id && (
                <div className='row details_conatiner'>
                  <SubTitle
                    className='font_xs'
                    content={screen.description || 'This is a new screen'}
                  />
                  {screen.features && (
                    <>
                      <SubTitle
                        className='font_xs margin_xs'
                        fontType='bold'
                        content={`${screen.features.length} Features Assigned`}
                      />
                      <SubTitle
                        className='font_xs font_link no_margin'
                        fontType='bold'
                        content={`Est. Development Time: ${screen.features.reduce(
                          (accumulator, feature) => {
                            return accumulator + feature.estDevTime
                          },
                          0
                        )} hour(s)`}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export const FeatureSelector = ({ onSubmit, options, btnSubmitLabel }) => {
  const [selectedChoices, setSelectedChoices] = useState([])
  function handleSubmit () {
    const features = selectedChoices.map(id => {
      return extractFeature(id)
    })
    onSubmit && onSubmit(features)
  }
  return (
    <>
      {options.map(opt => {
        return opt.options ? (
          <div key={opt.id}>
            <SubTitle
              className='margin_xs'
              fontType='bold'
              content={opt.title}
            />
            <SimpleChoiceList
              data={opt.options}
              onChoiceChange={choiceIds => setSelectedChoices(choiceIds)}
              itemProps={{
                className: 'font_xs'
              }}
              // comparingData={comparingOptions}
            />
          </div>
        ) : (
          <SimpleChoice title={opt.title} key={opt.id} />
        )
      })}
      <Spacer />
      <Button
        label={btnSubmitLabel || 'Add Features'}
        theme='dark'
        onClick={() => handleSubmit()}
      />
      <Spacer />
      <Button label='Close' onClick={onSubmit && onSubmit} />
    </>
  )
}