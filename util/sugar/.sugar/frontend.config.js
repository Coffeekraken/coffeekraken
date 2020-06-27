// const __docNav = require('../src/node/doc/docNav');
// const __namespaceSNav = require('../src/node/nav/namespaceSNav');

module.exports = {
  assets: '@config.assets',

  // menu: {
  //   /**
  //    * @name            doc
  //    * @namespace       config.frontend.menu
  //    * @type            Object
  //    *
  //    * List all the documentations views
  //    *
  //    * @since         2.0.0
  //    * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   doc: {
  //     /**
  //      * @name            generator
  //      * @namespace       config.frontend.menu.doc
  //      * @type            Function
  //      * @async
  //      *
  //      * Specify the generator function to use to generate the documentation menu tree. Has to return an SNav instance
  //      *
  //      * @since         2.0.0
  //      * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //      */
  //     generator: {
  //       // fn: __docNav,
  //       fn: () => {},
  //       directory: '@config.doc.rootDir'
  //     }
  //   },

  //   /**
  //    * @name            views
  //    * @namespace       config.frontend.menu
  //    * @type            Object
  //    *
  //    * List all the developed views
  //    *
  //    * @since         2.0.0
  //    * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   views: {
  //     /**
  //      * @name            generator
  //      * @namespace       config.frontend.menu.views
  //      * @type            Function
  //      * @async
  //      *
  //      * Specify the generator function to use to generate the views menu tree. Has to return an SNav instance
  //      *
  //      * @since         2.0.0
  //      * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //      */
  //     generator: {
  //       // fn: __namespaceSNav,
  //       fn: () => {},
  //       directory: '@config.views.rootDir'
  //     }
  //   }
  // },

  pages: {
    /**
     * @name            views
     * @namespace       config.frontend.pages
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
       * @namespace     config.frontend.pages.views
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
       * @namespace     config.frontent.pages.views
       * @type          String
       * @default       Views | [title]
       *
       * Specify the page title wanted. Accessible tokens:
       * - [title]: Name of the view
       *
       * @since       2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'Views | [title]',

      /**
       * @name            handler
       * @namespace       config.frontend.pages.views
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
     * @namespace       config.frontend.pages
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
       * @namespace       config.frontend.pages.doc
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
       * @namespace       config.frontend.pages.doc
       * @type            String
       * @default         Documentation | [title]
       *
       * Specify the title to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'Documentation | [title]',

      /**
       * @name            handler
       * @namespace       config.frontend.pages.doc
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

  express: '@config.express'
};
