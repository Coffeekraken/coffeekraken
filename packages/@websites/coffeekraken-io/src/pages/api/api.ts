export default [
  {
    slugs: ['/api'],
    views: ['pages.api.index'],
  },
  {
    slugs: ['/api/:namespace'],
    views: [
      {
        data: 'docmapApi',
        path: 'pages.api.api',
      },
    ],
  },
];
