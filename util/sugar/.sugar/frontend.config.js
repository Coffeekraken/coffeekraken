module.exports = {
  pages: {
    /**
     * @name            views
     * @namespace       sugar.config.frontend
     * @type            Object
     *
     * Store all the "views" configuration access like the slug, the title, etc...
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    views: {
      /**
       * @name          slug
       * @namespace     sugar.config.frontend.pages.views
       * @type          String
       * @default       /views
       *
       * Specify the url slug to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      slug: '/views',

      /**
       * @name          title
       * @namespace     sugar.config.frontent.pages.views
       * @type          String
       * @default       Views | {name}
       *
       * Specify the page title wanted. Accessible tokens:
       * - {name}: Name of the view
       *
       * @since       2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'Views | {name}',

      /**
       * @name            handler
       * @namespace       sugar.config.frontend.pages.views
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: require('../src/node/server/frontend/handlers/views')
    },

    /**
     * @name            doc
     * @namespace       sugar.config.frontend.pages
     * @type            Object
     *
     * Store all the accessible pages of the frontend development website
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    doc: {
      /**
       * @name            slug
       * @namespace       sugar.config.frontend.pages.doc
       * @type            String
       * @default         /doc
       *
       * Specify the url slug to use for this "section"
       *
       * @since           2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      slug: '/doc',

      /**
       * @name            title
       * @namespace       sugar.config.frontend.pages.doc
       * @type            String
       * @default         Documentation | {name}
       *
       * Specify the title to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'Documentation | {name}',

      /**
       * @name            handler
       * @namespace       sugar.config.frontend.pages.doc
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: require('../src/node/server/frontend/handlers/doc')
    }
  },

  express: {}
};
