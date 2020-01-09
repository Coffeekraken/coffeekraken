const __findUp = require('find-up');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');

// search for the config file
const configPath = __findUp.sync('webkit.config.js');
let config = {};
if (configPath) {
  config = {
    ...config,
    ...require(configPath)
  };
}

module.exports = __deepMerge({

  dist: {
    js: {
      sourceFolder: 'src/js',
      outputFolder: 'dist/js',
      ignorePattern: '**/*.bundle.js',
      bundle: {
        sourceFilesPattern: './src/js/**/*.bundle.js',
        outputFolder: 'dist/js'
      }
    },
    css: {
      sourceFilesPattern: '**/!(_)*.scss',
      sourceFolder: 'src/scss',
      outputFolder: 'dist/css',
      loadPaths: [
        'node_modules',
        'node_modules/@coffeekraken'
      ],
      importGlobPattern: 'views/**/!(_)*.scss',
      style: 'compressed'
    },
    img: {
      sourceFolder: 'src/img',
      outputFolder: 'dist/img',
      quality: 80
    }
  },

  doc: {
    srcFoldersPattern: '**/src',
    srcFoldersIgnore: [
      '**/node_modules/**',
      '**/vendor/**',
      '**/doc/**',
      '**/demo/**',
      '**/appsRoot/**'
    ],
    filesPattern: 'src/**/*',
    outputFolder: 'doc'
  },

  docMap: {
    srcFilesPattern: '**/*.md',
    srcFilesIgnore: ['**/node_modules/**'],
    outputFilename: 'docMap.json'
  },

  tests: {
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    transform: {
      "\\.txt$": "jest-raw-loader",
      "\\.js$": ["babel-jest", { rootMode: "upward" }]
    }
  }

}, config);
