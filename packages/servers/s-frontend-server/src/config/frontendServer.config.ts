import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __sugarConfig from '@coffeekraken/s-sugar-config';

export default {
  assets: '[config.assets]',

  /**
   * @name              port
   * @namespace         config.frontendServer
   * @type              Number
   * @default           8888
   *
   * Specify the port to use for the frontend server
   *
   * @since             2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  port: 8888,

  /**
   * @name              hostname
   * @namespace         config.frontendServer
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
   * @namespace         config.frontendServer
   * @type              String
   * @default           [config.storage.rootDir]
   *
   * Specify the root directory to use for the frontend server
   *
   * @since             2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: `[config.storage.rootDir]`,

  /**
   * @name              staticDirs
   * @namespace         config.frontendServer
   * @type              Object<String>
   * @default           { '/dist': '[config.storage.distDir]' }
   *
   * Specify a directory that will be served as static files
   *
   * @since             2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  staticDirs: {
    '/dist/*': `[config.storage.distDir]`
    // '/node_modules': '[config.storage.rootDir]/node_modules'
  },

  /**
   * @name            viewsDir
   * @namespace       config.frontendServer
   * @type            String
   * @default         [config.storage.srcDir]/views
   *
   * Specify the views directory path
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  viewsDir: `[config.storage.srcDir]/views`,

  /**
   * @name          logLevel
   * @namespace     config.frontendServer
   * @type          String
   * @values        silent,error,warn,debug,info,verbose,silly
   * @default       info
   *
   * Specify which log level you want for your server.
   *
   * @since             2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  logLevel: 'info',

  proxy: {
    assets: {
      route: __sugarConfig('vite.publicDir').replace(
        __sugarConfig('storage.rootDir'),
        ''
      ),
      settings: {
        target: '[config.vite.server.hostname]',
        changeOrigin: true
      }
    },
    vitePing: {
      route: '/__vite_ping',
      settings: {
        target: '[config.vite.server.hostname]',
        changeOrigin: true
      }
    }
  },

  middlewares: {
    // resolveExtensionFreePath: {
    //   path: `${__dirname}/../node/middleware/resolveExtensionFreePath`,
    //   settings: {
    //     exclude: ['/docMap'],
    //     rootDir: '[config.frontendServer.rootDir]',
    //     extensions: [
    //       'js',
    //       'jsx',
    //       'json',
    //       'ts',
    //       'tsx',
    //       'mjs',
    //       'cjs',
    //       'css',
    //       'scss',
    //       'sass',
    //       'jpg',
    //       'jpeg',
    //       'png',
    //       'gif',
    //       'svg',
    //       'html',
    //       'htm'
    //     ]
    //   }
    // },
    frontspec: {
      path: `${__dirname}/../node/middleware/frontspecMiddleware`,
      settings: {}
    },
    // defaultAssets: {
    //   path: `${__dirname}/../node/middleware/defaultAssetsMiddleware`,
    //   settings: {}
    // },
    env: {
      path: `${__dirname}/../node/middleware/envMiddleware`,
      settings: {}
    },
    packageJson: {
      path: `${__dirname}/../node/middleware/packageJsonMiddleware`,
      settings: {}
    }
  },

  handlers: {
    /**
     * @name            index
     * @namespace       config.frontendServer.handlers
     * @type            Object
     *
     * Store all the "index" configuration access like the route, the title, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    index: {
      /**
       * @name          route
       * @namespace     config.frontendServer.handlers.index
       * @type          String
       * @default       /
       *
       * Specify the url route to use for this "section"
       *
       * @since         2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      route: '/',
      /**
       * @name          title
       * @namespace     config.frontendServer.handlers.index
       * @type          String
       * @default       indexs | [title]
       *
       * Specify the page title wanted. Accessible tokens:
       * - [title]: Name of the index
       *
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'Welcome | [title]',
      /**
       * @name            handler
       * @namespace       config.frontendServer.handlers.index
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../node/handlers/index`
    },

    /**
     * @name            view
     * @namespace       config.frontendServer.handlers
     * @type            Object
     *
     * Store all the "view" configuration access like the route, the title, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    view: {
      /**
       * @name          route
       * @namespace     config.frontendServer.handlers.view
       * @type          String
       * @default       /view
       *
       * Specify the url route to use for this "section"
       *
       * @since         2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      route: '/view/*',
      /**
       * @name          title
       * @namespace     config.frontendServer.handlers.view
       * @type          String
       * @default       Views | [title]
       *
       * Specify the page title wanted. Accessible tokens:
       * - [title]: Name of the view
       *
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: 'View | [title]',
      /**
       * @name            handler
       * @namespace       config.frontendServer.handlers.view
       * @type            Function
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../node/handlers/view`
    },
    /**
     * @name            doc
     * @namespace       config.frontendServer.handlers
     * @type            Object
     *
     * Store all the "doc" configuration access like the route, the title, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    doc: {
      /**
       * @name          route
       * @namespace     config.frontendServer.handlers.doc
       * @type          String
       * @default       /doc/*
       *
       * Specify the url route to use for this "section"
       *
       * @since         2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      route: '/doc/*',
      /**
       * @name          title
       * @namespace     config.frontendServer.handlers.doc
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
       * @namespace       config.frontendServer.handlers.doc
       * @type            Function
       * @default         ${__dirname}/../node/handlers/view
       *
       * Specify the handler function that will take care of responding to this "section"
       *
       * @since         2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      handler: `${__dirname}/../node/handlers/doc`
    }
    // /**
    //  * @name            docMap
    //  * @namespace       config.frontendServer.handlers
    //  * @type            Object
    //  *
    //  * Store all the "docMap" configuration access like the route, the title, etc...
    //  *
    //  * @since         2.0.0
    //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //  */
    // docMap: {
    //   /**
    //    * @name          route
    //    * @namespace     config.frontendServer.handlers.docMap
    //    * @type          String
    //    * @default       /docMap
    //    *
    //    * Specify the url route to use for this "section"
    //    *
    //    * @since         2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   route: '/docMap',
    //   /**
    //    * @name          title
    //    * @namespace     config.frontendServer.handlers.docMap
    //    * @type          String
    //    * @default       docMap | [title]
    //    *
    //    * Specify the page title wanted. Accessible tokens:
    //    * - [title]: Name of the view
    //    *
    //    * @since       2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   title: 'docMap.json',
    //   /**
    //    * @name            handler
    //    * @namespace       config.frontendServer.handlers.docMap
    //    * @type            Function
    //    *
    //    * Specify the handler function that will take care of responding to this "section"
    //    *
    //    * @since         2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   handler: `${__dirname}/../node/server/frontend/handlers/docMap`
    // },
    // /**
    //  * @name            doc
    //  * @namespace       config.frontendServer.handlers
    //  * @type            Object
    //  *
    //  * Store all the accessible pages of the frontend development website
    //  *
    //  * @since         2.0.0
    //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //  */
    // doc: {
    //   /**
    //    * @name            route
    //    * @namespace       config.frontendServer.handlers.doc
    //    * @type            String
    //    * @default         /doc
    //    *
    //    * Specify the url route to use for this "section"
    //    *
    //    * @since           2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   route: '/doc',
    //   /**
    //    * @name            title
    //    * @namespace       config.frontendServer.handlers.doc
    //    * @type            String
    //    * @default         Documentation | [title]
    //    *
    //    * Specify the title to use for this "section"
    //    *
    //    * @since         2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   title: 'Documentation | [title]',
    //   /**
    //    * @name            handler
    //    * @namespace       config.frontendServer.handlers.doc
    //    * @type            Function
    //    *
    //    * Specify the handler function that will take care of responding to this "section"
    //    *
    //    * @since         2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   handler: `${__dirname}/../node/server/frontend/handlers/doc`
    // },
    // /**
    //  * @name            search
    //  * @namespace       config.frontendServer.handlers
    //  * @type            Object
    //  *
    //  * Store all the accessible pages of the frontend development website
    //  *
    //  * @since         2.0.0
    //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //  */
    // search: {
    //   /**
    //    * @name            route
    //    * @namespace       config.frontendServer.handlers.search
    //    * @type            String
    //    * @default         /search
    //    *
    //    * Search handler that handle the response to search requests
    //    *
    //    * @since           2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   route: '/search',
    //   /**
    //    * @name            title
    //    * @namespace       config.frontendServer.handlers.search
    //    * @type            String
    //    * @default         Search | [title]
    //    *
    //    * Specify the title to use for this "section"
    //    *
    //    * @since         2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   title: 'Search | [title]',
    //   /**
    //    * @name            handler
    //    * @namespace       config.frontendServer.handlers.search
    //    * @type            Function
    //    *
    //    * Specify the handler function that will take care of responding to this "section"
    //    *
    //    * @since         2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   handler: `${__dirname}/../node/server/frontend/handlers/search`,
    //   /**
    //    * @name        settings
    //    * @namespace   config.frontendServer.handlers.search
    //    * @type        Object
    //    *
    //    * Specify the settings passes to the handle function.
    //    * For more documentation about these settings, please see the
    //    * handler function documentation.
    //    *
    //    * @since           2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   settings: {
    //     rules: {
    //       docMap: {
    //         keyword: 'doc',
    //         handler: `${__dirname}/../node/search/handlers/docMap`,
    //         settings: {
    //           filePath: `${__packageRoot()}/docMap.json`
    //         }
    //       }
    //     }
    //   }
    // }
  }
};
