const __ipAddress = require('../src/node/network/ipAddress');
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
   * @default           __ipAddress()
   *
   * Specify the hostname to use for the frontend server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  hostname: __ipAddress(),

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
   * @name              staticDirs
   * @namespace         config.sugar-ui.modules.frontendServer.settings
   * @type              Object<String>
   * @default           '/dist': '${__packageRoot()}/dist'
   *
   * Specify a directory that will be served as static files
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  staticDirs: {
    '/dist': `${__packageRoot()}/dist`
  },

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
    resolveExtensionFreePath: {
      path: `${__dirname}/../src/node/server/frontend/middleware/resolveExtensionFreePath`,
      settings: {
        extensions: [
          'js',
          'jsx',
          'json',
          'ts',
          'tsx',
          'mjs',
          'cjs',
          'css',
          'scss',
          'sass',
          'jpg',
          'jpeg',
          'png',
          'gif',
          'svg',
          'html',
          'htm'
        ]
      }
    },
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
     * @name            homepage
     * @namespace       config.frontend.handlers
     * @type            Object
     *
     * Store all the "homepage" configuration access like the slug, the title, etc...
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    homepage: {
      /**
       * @name          slug
       * @namespace     config.frontend.handlers.homepage
       * @type          String
       * @default       /homepage
       *
       * Specify the url slug to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      slug: '/homepage',

      /**
       * @name          title
       * @namespace     config.frontent.pages.homepage
       * @type          String
       * @default       homepage | [title]
       *
       * Specify the page title wanted. Accessible tokens:
       * - [title]: Name of the view
       *
       * @since       2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'homepage | [title]',

      /**
       * @name            handler
       * @namespace       config.frontend.handlers.homepage
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../src/node/server/frontend/handlers/homepage`
    },

    /**
     * @name            js
     * @namespace       config.frontend.handlers
     * @type            Object
     *
     * Handler for .js files
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    js: {
      /**
       * @name          extension
       * @namespace     config.frontend.handlers.sugar
       * @type          String
       * @default       .js
       *
       * Specify the url slug to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      extension: '.js',

      /**
       * @name            handler
       * @namespace       config.frontend.handlers.sugar
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../src/node/server/frontend/handlers/js`
    },

    /**
     * @name            scss
     * @namespace       config.frontend.handlers
     * @type            Object
     *
     * Handler for .scss files
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    scss: {
      /**
       * @name          extension
       * @namespace     config.frontend.handlers.sugar
       * @type          String
       * @default       .scss
       *
       * Specify the url slug to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      extension: '.scss',

      /**
       * @name            handler
       * @namespace       config.frontend.handlers.sugar
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../src/node/server/frontend/handlers/scss`
    },

    /**
     * @name            sugar
     * @namespace       config.frontend.handlers
     * @type            Object
     *
     * Store all the "sugar" configuration access like the slug, the title, etc...
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sugar: {
      /**
       * @name          slug
       * @namespace     config.frontend.handlers.sugar
       * @type          String
       * @default       /sugar
       *
       * Specify the url slug to use for this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      slug: '/sugar',

      /**
       * @name          title
       * @namespace     config.frontent.pages.sugar
       * @type          String
       * @default       sugar | [title]
       *
       * Specify the page title wanted. Accessible tokens:
       * - [title]: Name of the view
       *
       * @since       2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'Sugar | [title]',

      /**
       * @name            handler
       * @namespace       config.frontend.handlers.sugar
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../src/node/server/frontend/handlers/sugar`
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
