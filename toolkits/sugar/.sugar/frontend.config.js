// const __docNav = require('../src/node/doc/docNav');
// const __namespaceSNav = require('../src/node/nav/namespaceSNav');
const __packageRoot = require('../node/path/packageRoot');

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

  handlers: {
    /**
     * @name            views
     * @namespace       config.frontend.handlers
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
       * @namespace     config.frontend.handlers.views
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
       * @namespace       config.frontend.handlers.views
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../src/node/server/frontend/handlers/views`
    },

    /**
     * @name            doc
     * @namespace       config.frontend.handlers
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
       * @namespace       config.frontend.handlers.doc
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
       * @namespace       config.frontend.handlers.doc
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
       * @namespace       config.frontend.handlers.doc
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../src/node/server/frontend/handlers/doc`
    },

    /**
     * @name            styleguide
     * @namespace       config.frontend.handlers
     * @type            Object
     *
     * Store all the accessible pages of the frontend development website
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    styleguide: {
      /**
       * @name            slug
       * @namespace       config.frontend.handlers.styleguide
       * @type            String
       * @default         /styleguide
       *
       * Specify the url slug to use for this "section"
       *
       * @since           2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      slug: '/styleguide',

      /**
       * @name            title
       * @namespace       config.frontend.handlers.styleguide
       * @type            String
       * @default         styleguideumentation | [title]
       *
       * Specify the title to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'Styleguide | [title]',

      /**
       * @name            handler
       * @namespace       config.frontend.handlers.styleguide
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../src/node/server/frontend/handlers/styleguide`
    },

    /**
     * @name            search
     * @namespace       config.frontend.handlers
     * @type            Object
     *
     * Store all the accessible pages of the frontend development website
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    search: {
      /**
       * @name            slug
       * @namespace       config.frontend.handlers.search
       * @type            String
       * @default         /search
       *
       * Search handler that handle the response to search requests
       *
       * @since           2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      slug: '/search',

      /**
       * @name            title
       * @namespace       config.frontend.handlers.search
       * @type            String
       * @default         Search | [title]
       *
       * Specify the title to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'Search | [title]',

      /**
       * @name            handler
       * @namespace       config.frontend.handlers.search
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../src/node/server/frontend/handlers/search`,

      /**
       * @name        settings
       * @namespace   config.frontend.handlers.search
       * @type        Object
       *
       * Specify the settings passes to the handle function.
       * For more documentation about these settings, please see the
       * handler function documentation.
       *
       * @since           2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      settings: {
        rules: {
          docMap: {
            keyword: 'doc',
            handler: `${__dirname}/../src/node/search/handlers/docMap`,
            settings: {
              filePath: `${__packageRoot()}/docMap.json`
            }
          }
        }
      }
    }
  },

  express: '@config.express'
};
