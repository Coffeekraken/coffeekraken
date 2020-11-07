const __path = require('path');
const __packageRoot = require('../src/node/path/packageRoot');
const __ipAddress = require('../src/node/network/ipAddress');

const config = {
  exclude: [__path.resolve('src/scss/**/[_]*.scss')],
  mount: {
    'node_modules/@coffeekraken/sugar/src/html': {
      url: '/',
      static: true,
      resolve: false
    },
    '.cache/temp': '/temp',
    src: '/dist'
  },
  devOptions: {
    fallback: 'redirect.html',
    hostname: __ipAddress(),
    port: Math.round(Math.random() * 65535),
    port: 8181
  },
  buildOptions: {
    out: 'build',
    clean: true
  },
  installOptions: {
    dest: '.cache/web_modules',
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
          output: '.cache/temp/js.css',
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
      {
        compilerOptions: {
          includePaths: [__path.resolve(__packageRoot(), 'node_modules')]
        }
      }
    ],
    [
      `${__path.resolve(__dirname)}/../node_modules/@snowpack/plugin-dotenv`,
      {}
    ],
    [
      `${__path.resolve(__dirname)}/../node_modules/@snowpack/plugin-babel`,
      {
        transformOptions: require('./babel.config') // TODO     Find a way to load using sugarConfig
      }
    ]
    // `${__path.resolve(__dirname)}/../node_modules/@snowpack/plugin-postcss`,
    // [
    //   `@snowpack/plugin-sass`,
    //   {
    //     // native: true,
    //     compilerOptions: {
    //       loadPath: __path.resolve(__packageRoot(), 'node_modules')
    //     }
    //   }
    // ]
  ]
};

module.exports = config;
