import ComingSoonScreen from '../screens/comingSoon'
import DashboardScreen from '../screens/Dashboard'
import MarketplaceScreen from '../screens/Marketplace'
import SnippetScreen from '../screens/Marketplace/screens/snippetScreen'
import RoadmapScreen from '../screens/Roadmap'
import TeamScreen from '../screens/Team'
import FeatureScreen from '../screens/Feature'
import LoginScreen from '../screens/Onboarding/screens/login'
import OnboardingScreen from '../screens/Onboarding'
import { Navigate } from 'react-router-dom'

export const SiteRoutes = {
  Onboarding: {
    NotFound: {
      id: 100,
      label: '404',
      path: '*',
      element: <Navigate to={'/'} />
    },
    Init: {
      id: 101,
      label: 'Onboarding',
      path: '/',
      element: <OnboardingScreen />
    },
    InitWithParams: {
      id: 102,
      label: 'Onboarding',
      path: '/welcomeProject/:projectId',
      element: <OnboardingScreen />
    }
  },
  Engine: {
    Dashboard: {
      id: 121,
      label: 'Dashboard',
      path: '/engine',
      element: <DashboardScreen />
    },
    Builder: {
      label: 'Builder',
      id: 123,
      Screens: () => {
        return {
          ScreenRoadmap: {
            id: 1221,
            label: 'Screen Roadmap',
            path: '/engine/screen-roadmap',
            element: <RoadmapScreen />
          },
          FeatureList: {
            id: 1231,
            label: 'Feature List',
            path: '/engine/feature-list',
            element: <FeatureScreen />
          },
          CloudHosting: {
            id: 1232,
            label: 'Cloud & Hosting',
            path: '/engine/cloud-config',
            element: <ComingSoonScreen />
          }
        }
      }
    },
    Resources: {
      label: 'Resources',
      id: 124,
      Screens: () => {
        return {
          Team: {
            id: 1241,
            label: 'Team',
            path: '/engine/team',
            element: <TeamScreen />
          },
          Marketplace: {
            id: 1242,
            label: 'Marketplace',
            path: '/engine/marketplace',
            element: <MarketplaceScreen />
          },
          CodeSnippet: {
            id: 1243,
            label: 'Buy Snippet',
            path: '/engine/marketplace/code-snippet/:snippetId',
            element: <SnippetScreen />,
            ignoreRendering: true
          }
        }
      }
    }
  }
}

/**
 *
 * @returns All the routes of the site
 */
export function getRoutes () {
  const onboardingRoutes = Object.keys(SiteRoutes.Onboarding).map(prop => {
    const initRoute = SiteRoutes.Onboarding[prop]
    if (initRoute.Screens) {
      initRoute.screens = Object.keys(initRoute.Screens()).map(screenProp => {
        return initRoute.Screens()[screenProp]
      })
    }
    return initRoute
  })

  const engineRoutes = Object.keys(SiteRoutes.Engine).map(prop => {
    const initRoute = SiteRoutes.Engine[prop]
    if (initRoute.Screens) {
      initRoute.screens = Object.keys(initRoute.Screens()).map(screenProp => {
        return initRoute.Screens()[screenProp]
      })
    }
    return initRoute
  })
  return {
    Onboarding: onboardingRoutes,
    Engine: engineRoutes
  }
}

/**
 * Returns the route with added parameters.
 *
 * @param {string} route The exact route of the screen.
 * @param {string} param Any value as string to be added at the end of the route or URL.
 */
export function constructRoute (path, param) {
  const noParamRoute = String(path).split(':')[0]
  return noParamRoute.at(-1) === '/'
    ? `${noParamRoute}${param}`
    : `${noParamRoute}/${param}`
}
