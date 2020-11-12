const __path = require('path');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  plugins: [
    // __path.resolve(__dirname, '../node_modules/babel-esm-plugin')
    // __path.resolve(
    //   __dirname,
    //   '../node_modules/babel-plugin-add-module-exports'
    // ),
    // __path.resolve(
    //   __dirname,
    //   '../node_modules/@babel/plugin-proposal-class-properties'
    // ),
    // __path.resolve(
    //   __dirname,
    //   '../node_modules/@babel/plugin-proposal-export-default-from'
    // ),
    // // __path.resolve(
    // //   __dirname,
    // //   '../node_modules/@babel/plugin-proposal-export-namespace-from'
    // // ),
    // __path.resolve(
    //   __dirname,
    //   '../node_modules/babel-plugin-transform-commonjs-es2015-modules'
    // ),
    [
      __path.resolve(
        __dirname,
        '../src/node/babel/plugins/plugin-transform-commonjs-es2015.js'
      ),
      {}
    ],

    __path.resolve(
      __dirname,
      '../node_modules/@babel/plugin-proposal-class-properties'
    )
    // __path.resolve(
    //   __dirname,
    //   '../node_modules/@babel/plugin-transform-classes'
    // ),
    // [
    //   __path.resolve(
    //     __dirname,
    //     '../src/node/babel/plugins/plugin-node-native-modules-browser-polyfill.js'
    //   ),
    //   {}
    // ]
    // __path.resolve(
    //   __dirname,
    //   '../node_modules/@babel/plugin-syntax-dynamic-import'
    // ),
    // __path.resolve(
    //   __dirname,
    //   '../node_modules/@babel/plugin-transform-modules-umd'
    // )
    // __path.resolve(
    //   __dirname,
    //   '../node_modules/@babel/plugin-transform-modules-commonjs'
    // )
    // [
    //   __path.resolve(
    //     __dirname,
    //     '../node_modules/@babel/plugin-transform-parameters'
    //   ),
    //   {
    //     loose: true
    //   }
    // ]
  ]
};
