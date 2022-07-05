import React from "react"
import { ExtendedButton } from "../../components/form";
import { Card, Spacer, SubTitle, Title } from "../../components/global"

const TimelineScreen = () => {
    return (
      <Card
        theme='light'
        animateScale={false}
        style={{
          cursor: 'default'
        }}
      >
        <div className='row'>
          <div className='col col-lg-4 m-auto'>
            <SubTitle content='MVP should take' fontType='bold' />
            <Title size='large-3' content='4 Weeks' className='font_gradient' />
            <Spacer size='medium' />
            <div className='col'>
              <ExtendedButton
                title='15 Features Suggested'
                id={1090}
                description='15 Major Features, 7 Sub-Features suggested for your initial release.'
                itemSize='compact'
                theme='light'
              />
            </div>
          </div>
          <div className='col col-lg-4 m-auto'>
            <SubTitle content='V1 Should Take' fontType='bold' />
            <Title
              size='large-3'
              content='12 Weeks'
              className='font_gradient'
            />
            <Spacer size='medium' />
            <div className='col'>
              <ExtendedButton
                title='25 Features Suggested'
                id={1090}
                description='25 Major Features, 10 Sub-Features suggested for your initial release.'
                itemSize='compact'
                theme='light'
              />
            </div>
          </div>
          <div className='col col-lg-4 m-auto'>
            <ExtendedButton
              title='Detailed Report'
              description='Get the detailed project plan for Facebook.io, including timeline, '
              id={1092}
              className='m-auto'
              theme='light'
              extraLabel='See Full Report'
            />
          </div>
        </div>
      </Card>
    )
  }

  export default TimelineScreen;