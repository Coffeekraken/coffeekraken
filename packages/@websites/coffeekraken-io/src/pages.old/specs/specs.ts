export default {
  slugs: ['/specs/*', '/package/:organisation/:package/specs/*'],
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
            return `/specs/${req.params.path}`;
          },
        },
      },
      path: 'pages.specs.specs',
    },
  ],
};
