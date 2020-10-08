// const __docNav = require('../src/node/doc/docNav');
// const __namespaceSNav = require('../src/node/nav/namespaceSNav');
const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  assets: '@config.assets',

  /**
   * @name              port
   * @namespace         config.sugar-ui.modules.frontendServer.settings
   * @type              Number
   * @default           3000
   *
   * Specify the port to use for the frontend server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  port: 3000,

  /**
   * @name              hostname
   * @namespace         config.sugar-ui.modules.frontendServer.settings
   * @type              String
   * @default           127.0.0.1
   *
   * Specify the hostname to use for the frontend server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  hostname: '192.168.201.117',

  /**
   * @name              rootDir
   * @namespace         config.sugar-ui.modules.frontendServer.settings
   * @type              String
   * @default           ${__packageRoot()}
   *
   * Specify the root directory to use for the frontend server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: `${__packageRoot()}`,

  /**
   * @name              staticDir
   * @namespace         config.sugar-ui.modules.frontendServer.settings
   * @type              String
   * @default           ${__packageRoot()}/dist
   *
   * Specify a directory that will be served as static files
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  staticDir: `${__packageRoot()}/dist`,

  /**
   * @name            viewsDir
   * @namespace       config.sugar-ui.modules.frontendServer.settings
   * @type            String
   * @default         ${__packageRoot()}/views
   *
   * Specify the views directory path
   *
   * @since         2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  viewsDir: `${__packageRoot()}/src/views`,

  middlewares: {
    frontspec: {
      path: `${__dirname}/../src/node/server/frontend/middleware/frontspecMiddleware`,
      settings: {}
    },
    env: {
      path: `${__dirname}/../src/node/server/frontend/middleware/envMiddleware`,
      settings: {}
    },
    packageJson: {
      path: `${__dirname}/../src/node/server/frontend/middleware/packageJsonMiddleware`,
      settings: {}
    }
  },

  handlers: {
    /**
     * @name            index
     * @namespace       config.frontend.handlers
     * @type            Object
     *
     * Store all the "index" configuration access like the slug, the title, etc...
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    index: {
      /**
       * @name          slug
       * @namespace     config.frontend.handlers.index
       * @type          String
       * @default       /index
       *
       * Specify the url slug to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      slug: '/',

      /**
       * @name          title
       * @namespace     config.frontent.pages.index
       * @type          String
       * @default       index | [title]
       *
       * Specify the page title wanted. Accessible tokens:
       * - [title]: Name of the view
       *
       * @since       2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'Welcome | [title]',

      /**
       * @name            handler
       * @namespace       config.frontend.handlers.index
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../src/node/server/frontend/handlers/index`
    },

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
     * @name            dist
     * @namespace       config.frontend.handlers
     * @type            Object
     *
     * Store all the "dist" configuration access like the slug, the title, etc...
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    dist: {
      /**
       * @name          slug
       * @namespace     config.frontend.handlers.dist
       * @type          String
       * @default       /dist
       *
       * Specify the url slug to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      slug: '/dist',

      /**
       * @name            handler
       * @namespace       config.frontend.handlers.dist
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../src/node/server/frontend/handlers/dist`,

      /**
       * @name            directories
       * @namespace       config.frontend.handlers.dist
       * @type            String|Array<String>
       *
       * Specify some directory from where the dist will be served
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      directories: [
        `${__packageRoot()}/dist`,
        `${__packageRoot()}/node_modules`
      ]
    },

    /**
     * @name            docMap
     * @namespace       config.frontend.handlers
     * @type            Object
     *
     * Store all the "docMap" configuration access like the slug, the title, etc...
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    docMap: {
      /**
       * @name          slug
       * @namespace     config.frontend.handlers.docMap
       * @type          String
       * @default       /docMap
       *
       * Specify the url slug to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      slug: '/docMap',

      /**
       * @name          title
       * @namespace     config.frontent.pages.docMap
       * @type          String
       * @default       docMap | [title]
       *
       * Specify the page title wanted. Accessible tokens:
       * - [title]: Name of the view
       *
       * @since       2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'docMap.json',

      /**
       * @name            handler
       * @namespace       config.frontend.handlers.docMap
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../src/node/server/frontend/handlers/docMap`
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
  }
};
