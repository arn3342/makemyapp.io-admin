import React from "react"
import { Card, Spacer, SubTitle, Title } from "../../components/global"
import TeamOverview from "../../components/team/teamOverview"

const TeamScreen = () => {
    return (
      <Card
        theme='light'
        animateScale={false}
        style={{
          cursor: 'default'
        }}
      >
        <div className='row'>
          <div
            className='col col-lg-6 m-auto'
            style={{
              justifyContent: 'left'
            }}
          >
            <SubTitle content='Suggested ideal team for you' fontType='bold' />
            <Title
              size='large-3'
              content='6 People'
              className='font_gradient'
            />
            <Spacer size='medium' />
            <div className='row'>
              <TeamOverview
                className='col'
                roleTitle='Front-End'
                roleCount={2}
                iconId={9921}
              />
              <TeamOverview
                className='col team_overview_2'
                roleTitle='Back-End'
                roleCount={2}
                iconId={9922}
              />
            </div>
            <div className='row'>
              <TeamOverview
                className='col team_overview_3'
                roleTitle='DevOps'
                roleCount={1}
                iconId={9923}
              />
              <TeamOverview
                className='col team_overview_4'
                roleTitle='Unit-Testing'
                roleCount={1}
                iconId={9924}
              />
            </div>
          </div>
          <div className='col col-lg-5 m-auto'>
            <Card animateScale={false} theme='light'>
              <Title
                size='large-2'
                content='Hire Your'
                className='font_gradient'
                style={{
                  margin: 0,
                  zIndex: 10
                }}
              />
              <Title
                size='large-3'
                content='Dream Team!'
                className='font_gradient'
                style={{
                  zIndex: 10
                }}
              />
              <div className='container row'>
                <Card theme='dark' className='col col-lg-6' style={{
                  zIndex: 999
                }}>
                  <Title
                    size='large'
                    fontType='bold'
                    content='Hire Your Team Now'
                  />
                  <SubTitle
                    className='font_no_margin'
                    content='Hire the most afforable development team now.'
                  />
                </Card>
                <Card theme='light' className='col col-lg-6' animateScale={false}>
                  <Title
                    size='large'
                    fontType='bold'
                    content='Code Marketplace'
                  />
                  <SubTitle
                    className='font_no_margin'
                    content='Browse our marketplace to grab 10,000+ snippets.'
                  />
                </Card>
              </div>
            </Card>
          </div>
        </div>
        <Spacer />
      </Card>
    )
  }

  export default TeamScreen;