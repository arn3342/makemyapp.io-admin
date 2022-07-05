import React, { useState, useEffect } from 'react'
import { Spacer, SubTitle, Title } from '../../components/global'
import FeatureList from '../../assets/jsons/masterStep.json'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { filterData, getRandomInteger } from '../../misc/logics'
import { CodeOwnerBox } from './components'
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Input, SimpleChoiceList } from '../../components/form'
import { constructRoute, SiteRoutes } from '../../misc/routes'
import { extractFeatures } from '../../misc/featureExtractor'
import dummyGenerator from '../../data/dummyGenerator'

const MarketplaceScreen = () => {
  const [snippetList, setSnippetList] = useState(dummyGenerator.codeSnippet(4))
  const [parentFeatureList, setParentFeatureList] = useState(
    extractFeatures().parentFeatures
  )
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    // console.log('Snippets are:', snippetList)
    const parentContainer = document.getElementById('route_container')
    parentContainer.style.height = 'auto'
    parentContainer.style.overflow = 'scroll'
  }, [])

  function performNavigate (code) {
    const snippetRoute = constructRoute(
      SiteRoutes.Engine.Resources.Screens().CodeSnippet.path,
      code.id
    )
    navigate(snippetRoute, {
      state: code
    })
  }

  return (
    <div className='container'>
      <Spacer size='large' />
      <div className='row'>
        <Title content='Marketplace' size='large-2' fontType='light' />
        <Spacer />
        <SubTitle
          size='medium'
          content='Save hundreds of development hours for your project by grabbing code-snippets for different features from our massive library of 10,000+ code-bases, submitted by 400+ certified developers.'
        />
      </div>
      <Spacer size='medium' />
      <div className='container row'>
        <Input
          className='col col-sm-4'
          placeholder='Search snippets...'
          fontAwesomeIcon={faSearch}
          // onValueChange={val => performFilter(val)}
        />
      </div>
      <Spacer size='medium' />
      <div className='container row d-flex'>
        <SimpleChoiceList
          data={parentFeatureList}
          title='Filter By Category :'
          // onChoiceChange={val => performParentFilter(val)}
        />
      </div>
      <div className='table_container shadow_light'>
        <table>
          <thead className='shadow_light'>
            <tr className='table_header'>
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Available On</th>
            </tr>
          </thead>
          <tbody>
            {snippetList?.map((code, index) => {
              return (
                <tr
                  className='table_row'
                  key={index}
                  onClick={() => performNavigate(code)}
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  <td>
                    <AiOutlineHeart size={20} />
                  </td>
                  <td>
                    <div>
                      <SubTitle
                        className='font_link font_xs no_margin'
                        fontType='bold'
                        content={code.parentCategory.title}
                        link='#'
                      />
                      <SubTitle
                        fontType='bold'
                        content={code.title}
                        className='margin_xs'
                      />
                      <div
                        className='d-flex'
                        style={{
                          alignItems: 'center'
                        }}
                      >
                        <AiFillStar
                          color='#fcba03'
                          size={15}
                          className='margin_xs'
                        />
                        <Spacer size='xs' />
                        <SubTitle
                          content={code.reviews.avgRating}
                          className='font_link margin_xs'
                          fontType='bold'
                        />
                        <Spacer size='xs' />
                        <SubTitle
                          content={`- Reviewed by ${code.reviews.totalReviewCount} others`}
                          className='margin_xs font_xs'
                        />
                      </div>
                      <CodeOwnerBox size='compact' data={code.owner} />
                    </div>
                  </td>
                  <td>
                    <SubTitle
                      content={`${code.description.substring(0, 120)}...`}
                      className='font_xs lineHeight_s'
                    />
                    <div className='container row'>
                      {code.techStack.map((stack, index) => {
                        return (
                          <SubTitle
                            className='card_option_bg card_option_bg_small shadow_light margin_right'
                            fontType='bold'
                            content={stack}
                            key={index}
                          />
                        )
                      })}
                    </div>
                  </td>
                  <td
                    style={{
                      verticalAlign: 'baseline'
                    }}
                  >
                    <div className='container row'>
                      <SubTitle
                        className='font_xs margin_xs'
                        style={{
                          padding: 0
                        }}
                        content='The code spinnet should work on:'
                      />
                      {code.platforms.map(platform => {
                        return (
                          <SubTitle
                            className='card_option_bg card_option_bg_small shadow_light margin_right'
                            fontType='bold'
                            content={platform.title}
                            key={getRandomInteger(999, 98998)}
                          />
                        )
                      })}
                      <SubTitle
                        className='font_xs no_margin'
                        style={{
                          padding: 0
                        }}
                        content='Code set-up requires:'
                      />
                      <SubTitle
                        className='no_margin font_link'
                        style={{
                          padding: 0
                        }}
                        fontType='bold'
                        content={`${code.setupSteps?.length} Basic Steps`}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Spacer size={'large'} />
    </div>
  )
}

export default MarketplaceScreen
