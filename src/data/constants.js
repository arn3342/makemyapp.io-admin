export const Constants = {
  Site: {
    title: 'Engine | MakeMyApp.io'
    // icon:
  },
  TeamMemberTypes: [
    {
      title: 'Admin',
      description:
        'Admins have access to most features with the ability to make changes'
    },
    {
      title: 'Developer',
      description:
        'Developers can see roadmaps, dashboard and suggest features to admins'
    }
  ],
  ActivityStatus: ['Active', 'Pending Invite'],
  ApplicationFormats: ['Client App', 'Admin App', 'Super Admin App'],
  BuildPhases: ['MVP', 'V1'],
  PlatformTypes: [
    { id: 0, title: 'Web' },
    { id: 1, title: 'Android' },
    { id: 2, title: 'iOS' },
    { id: 3, title: 'watchOS' },
    { id: 2, title: 'tvOS' }
  ]
}