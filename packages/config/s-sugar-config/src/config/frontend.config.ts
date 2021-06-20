import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';

export default {
  assets: '[config.assets]',

  /**
   * @name              port
   * @namespace         config.sugar-ui.modules.frontendServer.settings
   * @type              Number
   * @default           8080
   *
   * Specify the port to use for the frontend server
   *
   * @since             2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  port: 8080,

  /**
   * @name              hostname
   * @namespace         config.sugar-ui.modules.frontendServer.settings
   * @type              String
   * @default           __ipAddress()
   *
   * Specify the hostname to use for the frontend server
   *
   * @since             2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  hostname: __ipAddress(),

  /**
   * @name              rootDir
   * @namespace         config.sugar-ui.modules.frontendServer.settings
   * @type              String
   * @default           [config.storage.package.rootDir]
   *
   * Specify the root directory to use for the frontend server
   *
   * @since             2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: `[config.storage.package.rootDir]`,

  /**
   * @name              staticDirs
   * @namespace         config.sugar-ui.modules.frontendServer.settings
   * @type              Object<String>
   * @default           [config.storage.package.rootDir]/dist
   *
   * Specify a directory that will be served as static files
   *
   * @since             2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  staticDirs: {
    '/dist': `[config.storage.package.rootDir]/dist`,
    '/node_modules': '[config.storage.package.rootDir]/node_modules'
  },

  /**
   * @name            viewsDir
   * @namespace       config.sugar-ui.modules.frontendServer.settings
   * @type            String
   * @default         [config.storage.package.rootDir]/views
   *
   * Specify the views directory path
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  viewsDir: `[config.storage.package.rootDir]/src/views`,

  middlewares: {
    resolveExtensionFreePath: {
      path: `${__dirname}/../node/server/frontend/middleware/resolveExtensionFreePath`,
      settings: {
        exclude: ['/docMap'],
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
      path: `${__dirname}/../node/server/frontend/middleware/frontspecMiddleware`,
      settings: {}
    },
    env: {
      path: `${__dirname}/../node/server/frontend/middleware/envMiddleware`,
      settings: {}
    },
    packageJson: {
      path: `${__dirname}/../node/server/frontend/middleware/packageJsonMiddleware`,
      settings: {}
    }
  },

  handlers: {
    /**
     * @name            views
     * @namespace       config.frontend.handlers
     * @type            Object
     *
     * Store all the "views" configuration access like the slug, the title, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      slug: '/views',
      /**
       * @name          title
       * @namespace     config.frontent.pages.views
       * @type          String
       * @default       Views | [title]
       *
       * Specify the page title wanted. Accessible tokens:
       * - [title]: Name of the view
       *
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'Views | [title]',
      /**
       * @name            handler
       * @namespace       config.frontend.handlers.views
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../node/server/frontend/handlers/views`
    },
    /**
     * @name            doc
     * @namespace       config.frontend.handlers
     * @type            Object
     *
     * Store all the "doc" configuration access like the slug, the title, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    doc: {
      /**
       * @name          slug
       * @namespace     config.frontend.handlers.views
       * @type          String
       * @default       /doc
       *
       * Specify the url slug to use for this "section"
       *
       * @since         2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      slug: '/doc',
      /**
       * @name          title
       * @namespace     config.frontent.pages.views
       * @type          String
       * @default       Views | [title]
       *
       * Specify the page title wanted. Accessible tokens:
       * - [title]: Name of the view
       *
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'Doc | [title]',
      /**
       * @name            handler
       * @namespace       config.frontend.handlers.views
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../node/server/frontend/handlers/doc`
    }
  }
};
