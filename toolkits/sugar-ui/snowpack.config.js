const __path = require('path');

module.exports = {
  scripts: {
    'build:css': 'postcss',
    'run:css': 'postcss src/scss/**/[^_]*.scss --dir dist/css --ext css',
    'run:css::watch': '$1 --watch'
  },
  exclude: [__path.resolve('**/src/*/**')],
  installOptions: {
    rollup: {
      plugins: [
        require('rollup-plugin-scss')({
          includePaths: [__path.resolve(__dirname, 'node_modules')]
        })
      ]
    }
  },
  plugins: [
    './sugar-settings',
    '@snowpack/plugin-babel',
    [
      '@snowpack/plugin-sass',
      {
        compilerOptions: {
          loadPath: __path.resolve(__dirname, 'node_modules')
        }
      }
    ]
  ],
  mount: {
    public: {
      url: '/'
    },
    src: {
      url: '/src'
    }
  },
  devOptions: {}
};
