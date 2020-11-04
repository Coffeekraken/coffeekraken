const __path = require('path');
const __packageRoot = require('../src/node/path/packageRoot');
const __ipAddress = require('../src/node/network/ipAddress');
const __sugarConfig = require('../src/node/config/sugar');

const config = {
  // exclude: [__path.resolve('src/*/**/*.*')],
  // exclude: ['**/src.old/**'],
  mount: {
    src: {
      url: '/dist',
      static: false,
      resolve: true
    }
  },
  devOptions: {
    // hostname: __ipAddress(),
    port: 8081
    // port: Math.round(Math.random() * 65535)
  },
  buildOptions: {
    out: 'dist'
  },
  // install: ['react'],
  installOptions: {
    rollup: {
      plugins: [
        // require('@rollup/plugin-node-resolve').nodeResolve({
        //   // rootDir: __packageRoot(),
        //   customResolveOptions: {
        //     basedir: __packageRoot(),
        //     moduleDirectory: [
        //       `node_modules`,
        //       `${__packageRoot()}/node_modules`
        //     ],
        //     preserveSymlinks: true
        //   }
        // })
        require('rollup-plugin-scss')({
          output: 'dist/css/index.css',
          cacheLocation: '.cache/sass',
          includePaths: [
            __path.resolve(__packageRoot(), 'node_modules'),
            __path.resolve(__dirname, 'node_modules')
          ]
        })
      ]
    }
  },
  plugins: [
    [
      `${__path.resolve(
        __dirname
      )}/../src/node/snowpack/SSnowpackSettingsPlugin`,
      {}
    ],
    [
      `${__path.resolve(__dirname)}/../node_modules/@snowpack/plugin-dotenv`,
      {}
    ],
    [`${__path.resolve(__dirname)}/../node_modules/@snowpack/plugin-babel`, {}],
    // `${__path.resolve(__dirname)}/../node_modules/@snowpack/plugin-postcss`,
    [
      `@snowpack/plugin-sass`,
      {
        // native: true,
        compilerOptions: {
          loadPath: __path.resolve(__packageRoot(), 'node_modules')
        }
      }
    ]
  ]
};

module.exports = config;
