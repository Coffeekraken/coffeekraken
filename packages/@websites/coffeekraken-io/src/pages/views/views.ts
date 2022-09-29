export default {
  slugs: ['/views/*', '/package/:organisation/:package/views/*'],
  params: {
    path: '*',
  },
  views: [
    {
      data: {
        handler: 'docmap',
        settings: {},
        params: {
          path({ req }) {
            return `/views/${req.params.path}`;
          },
        },
      },
      path: 'pages.views.views',
    },
  ],
};
