const __findUp = require('find-up');
const __pkgUp = require("pkg-up");


// search for the config file
const configPath = __findUp.sync('monorepo.config.js');
let config = {};
if (configPath) {
  config = {
    ...config,
    ...require(configPath)
  };
}

// load the general package.json file for the monorepo
let generalPackageJsonPath = __pkgUp.sync({
  cwd: process.cwd() + "/../"
});
if (!generalPackageJsonPath) {
  generalPackageJsonPath = __pkgUp.sync({
    cwd: process.cwd()
  });
}

let repositoryRootPath = __findUp.sync([
  '.git',
  'monorepo.config.js'
]);
if ( ! repositoryRootPath) {
  __log('We cannot find a ".git" folder or a "monorepo.config.js" file that indicate the root of the repository...', 'error');
  process.exit();
}
repositoryRootPath = repositoryRootPath.split('/').slice(0,-1).join('/');

module.exports = {

  packagesPattern: '**/package.json',
  localPackageJson: require(process.cwd() + "/package.json"),
  generalPackageJson: require(generalPackageJsonPath),
  repositoryRootPath: repositoryRootPath,

  dist: {
    js: {
      sourceFolder: '<rootDir>/src/js',
      outputFolder: '<rootDir>/dist/js',
      ignorePattern: '**/*.bundle.js',
      bundle: {
        sourceFilesPattern: './<rootDir>/src/js/**/*.bundle.js',
        outputFolder: '<rootDir>/dist/js'
      }
    },
    css: {
      sourceFolder: '<rootDir>/src/scss',
      outputFolder: '<rootDir>/dist/css',
      loadPaths: [
        'node_modules',
        'node_modules/@coffeekraken'
      ],
      style: 'compressed'
    },
    img: {
      sourceFolder: '<rootDir>/src/img',
      outputFolder: '<rootDir>/dist/img',
      quality: 80
    }
  },

  demo: {
    folder: 'demo'
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
  },

  ...config
};
