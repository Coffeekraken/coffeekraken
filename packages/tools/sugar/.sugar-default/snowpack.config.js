const __path = require('path');
const __packageRoot = require('../src/node/path/packageRoot');
const __ipAddress = require('../src/node/network/ipAddress');
const __terser = require('rollup-plugin-terser').terser;
const __nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;

const baseRollupPlugins = [
  __nodeResolve(),
  require(`${__path.resolve(
    __dirname
  )}/../node_modules/rollup-plugin-scss/index.cjs`)({
    output: '.dev/temp/js.css',
    cacheLocation: '.dev/cache/sass',
    includePaths: [
      __path.resolve(__packageRoot(), 'node_modules'),
      __path.resolve(__dirname, '../node_modules')
    ]
  })
];

const basePlugins = [
  // [
  //   `${__path.resolve(__dirname)}/../node_modules/@snowpack/plugin-run-script`,
  //   {
  //     cmd: `${__path.resolve(
  //       __dirname
  //     )}/../node_modules/chokidar-cli/index.js "node_modules/@coffeekraken/sugar/js/**/*.js" -c "snowpack install --config ${__path.resolve(
  //       __packageRoot(__dirname),
  //       'snowpack.config.js'
  //     )} --reload --polyfill-node" --silent --follow-symlinks`
  //   }
  // ],
  // [
  //   `${__path.resolve(
  //     __dirname,
  //     '../src/node/snowpack/plugins/nodeModulesWatcher/SSnowpackNodeModulesWatcherPlugin'
  //   )}`,
  //   {}
  // ],
  [
    `${__path.resolve(
      __dirname
    )}/../src/node/snowpack/plugins/resolveAlias/SSnowpackResolveAliasPlugin`,
    {
      extension: ['.js'],
      devPath: 'src/js',
      noWarning: true
    }
  ],
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
];

const config = {
  // exclude: [__path.resolve('src/scss/**/[_]*.scss'), '!node_modules/**'],
  mount: {
    'node_modules/@coffeekraken/sugar/src/html': {
      url: '/',
      static: true,
      resolve: false
    },
    node_modules: {
      url: '/node_modules',
      static: false,
      resolve: true
    },
    '.dev/temp': '/temp',
    src: '/dist'
  },
  devOptions: {
    fallback: 'redirect.html',
    hostname: __ipAddress(),
    port: Math.round(Math.random() * 65535),
    port: 8181
  },
  installOptions: {
    dest: '.dev/web_modules',
    rollup: {
      plugins: [...baseRollupPlugins]
    }
  },
  alias: {
    '@coffeekraken': './node_modules/@coffeekraken'
  },
  installSpecific: {
    plugins: [...basePlugins]
  },
  buildSpecific: {
    buildOptions: {
      out: 'build',
      clean: true
    },
    plugins: [
      ...basePlugins,
      [
        `${__path.resolve(
          __dirname,
          '../src/node/snowpack/plugins/bundler/SSnowpackBundlerPlugin'
        )}`,
        {
          input: '[build]/dist/js/index.js',
          output: [
            {
              format: 'iife',
              plugins: [],
              compact: false,
              sourcemap: true,
              file: '[build]/js/index.js'
            },
            {
              format: 'iife',
              plugins: [__terser()],
              compact: true,
              sourcemap: true,
              file: '[build]/js/index.min.js'
            }
          ]
        }
      ]
    ]
  },
  devSpecific: {
    plugins: [...basePlugins]
  }
};

module.exports = config;
