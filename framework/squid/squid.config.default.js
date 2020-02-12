const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');
const __fs = require('fs');
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');

let __projectConfig = {};
if (__fs.existsSync(process.cwd() + '/squid.config.js')) {
	__projectConfig = require(process.cwd() + '/squid.config.js');
}

let config = __deepMerge({
	views: {

    folder: 'views',

    engines: {
      'blade.php': __dirname + '/src/node/express/views/engines/blade'
    },

		defaultRenderType: 'backend',

    defaultDataAdapter: 'viewsFolderJson',
    dataAdapters: {
      'viewsFolderJson': __dirname + '/src/node/express/views/dataAdapters/viewsFolderJson'
    }

  },

	app: {

		serve: {

			js: [
				`${__dirname}/dist/js/common.bundle.js`,
				`${process.cwd()}/dist/js/common.bundle.js`
			],

			css: [
				`${__dirname}/dist/css/style.bundle.css`,
				`${process.cwd()}/dist/css/style.bundle.css`
			]

		}

	},

  dist: {

		folder: 'dist',

		ts: {
			extensions: ['ts'],
			sources: '**/*.ts',
			sourcesFolder: ['src/js'],
			outputFolder: 'dist/js'
		},

		coffee: {
			extensions: ['coffee'],
			sources: '**/*.coffee',
			sourcesFolder: ['src/js'],
			outputFolder: 'dist/js'
		},

		css: {
			extensions: ['css','scss','sass'],
			sources: '**/*.bundle.{css,scss,sass}',
			sourcesFolder: ['views','src/css'],
			outputFolder: 'dist/css'
		},

    js: {
			extensions: ['js'],
			sources: '**/*.bundle.js',
			sourcesFolder: ['views','src/js'],
			outputFolder: 'dist/js'
    },

		css: {
			extensions: ['css','scss','sass'],
			sources: '**/*.bundle.{css,scss,sass}',
			sourcesFolder: ['views','src/css'],
			outputFolder: 'dist/css'
		},

		images: {
			extensions: ['jpg','jpeg','png','gif','svg','webp'],
			sources: '**/*.{jpg,jpeg,png,gif,svg,webp}',
			sourcesFolder: ['views','src/images'],
			outputFolder: 'dist/images'
		},

		jpg: {
			extensions: ['jpg', 'jpeg'],
			sources: '**/*.{jpg,jpeg}',
			sourcesFolder: ['views','src/images'],
			outputFolder: 'dist/images'
		}

  },

  log: {

    frontend: {

      transportsByType: {
				default: process.env.NODE_ENV === 'production' ? '' : 'console mail',
				error: process.env.NODE_ENV === 'production' ? 'squid' : 'console mail',
        warn: process.env.NODE_ENV === 'production' ? 'squid' : 'console',
        info: process.env.NODE_ENV === 'production' ? '' : 'console',
        verbose: process.env.NODE_ENV === 'production' ? '' : 'console',
        debug: process.env.NODE_ENV === 'production' ? '' : 'console',
        silly: process.env.NODE_ENV === 'production' ? '' : 'console',
        success: process.env.NODE_ENV === 'production' ? '' : 'console'
      },

      transports: {
        mail: {
          secureToken: 'fb2f09bb-5089-46e6-ba22-148516477f65',
          to: 'olivier.bossel@gmail.com'
        }
      }

    },

    backend: {

      transportsByType: {
				default: process.env.NODE_ENV === 'production' ? '' : 'console files',
        error: process.env.NODE_ENV === 'production' ? 'mail' : 'console files',
        warn: process.env.NODE_ENV === 'production' ? 'mail' : 'console files',
        info: process.env.NODE_ENV === 'production' ? '' : 'console files',
        verbose: process.env.NODE_ENV === 'production' ? '' : 'console files',
        debug: process.env.NODE_ENV === 'production' ? '' : 'console files',
        silly: process.env.NODE_ENV === 'production' ? '' : 'console files',
        success: process.env.NODE_ENV === 'production' ? '' : 'console files'
      },

      transports: {
        mail: {
          to: 'olivier.bossel@gmail.com',
          service: 'SendinBlue',
          auth: {
            user: 'olivier.bossel@gmail.com',
            pass: __base64.decrypt('TDhYcmZFNFdBQnBNa2hITg==')
          }
        }
      }

    }

  },

  express: {

  },

  animation: {
    defaultIn: null,
    defaultOut: 'ccccc'
  },

  server: {

    port: 8080

  },

  routes: {},

  lazyload: {
    '[slide-in]': '@coffeekraken/sugar/js/animation/in/slide'
  }

}, __projectConfig);

config.dist.jpg = __deepMerge(config.dist.images, config.dist.jpg);

module.exports = config;
