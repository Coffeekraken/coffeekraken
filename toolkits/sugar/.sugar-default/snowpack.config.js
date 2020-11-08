const __path = require('path');
const __packageRoot = require('../src/node/path/packageRoot');
const __ipAddress = require('../src/node/network/ipAddress');

const basePlugins = [
  [
    `${__path.resolve(__dirname)}/../src/node/snowpack/SSnowpackSettingsPlugin`,
    {
      compilerOptions: {
        includePaths: [__path.resolve(__packageRoot(), 'node_modules')]
      }
    }
  ],
  [`${__path.resolve(__dirname)}/../node_modules/@snowpack/plugin-dotenv`, {}],
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
];

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
  installOptions: {
    dest: '.cache/web_modules',
    rollup: {
      plugins: [
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
  buildSpecific: {
    buildOptions: {
      out: 'build',
      clean: true
    },
    plugins: [
      // ...basePlugins,
      [
        `${__path.resolve(
          __dirname,
          '../src/node/snowpack/plugins/bundler/SSnowpackBundlerPlugin'
        )}`,
        {}
      ]
      // [
      //   `${__path.resolve(
      //     __dirname
      //   )}/../node_modules/snowpack-plugin-rollup-bundle`,
      //   {
      //     emitHtmlFiles: false,
      //     preserveSourceFiles: false,
      //     // equivalent to inputOptions.input from Rollup
      //     entrypoints: {
      //       index: 'build/dist/js/index.js'
      //     },
      //     extendConfig: (config) => {
      //       // https://rollupjs.org/guide/en/#outputoptions-object
      //       // config.outputOptions = [
      //       //   {
      //       //     dir: 'build',
      //       //     // file: 'index.js',
      //       //     format: 'iife'
      //       //   }
      //       //   // {
      //       //   //   dir: 'build',
      //       //   //   // file: 'index.min.js',
      //       //   //   format: 'iife'
      //       //   //   // plugins: [require('rollup-plugin-terser').terser()]
      //       //   // }
      //       // ];
      //       console.log(config.outputOptions);
      //       // https://rollupjs.org/guide/en/#inputoptions-object
      //       // config.inputOptions = { ... }
      //       return config;
      //     }
      //   }
      // ]
    ]
  },
  devSpecific: {
    plugins: [...basePlugins]
  }
};

module.exports = config;
