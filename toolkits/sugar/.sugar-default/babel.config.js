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
    __path.resolve(
      __dirname,
      '../node_modules/babel-plugin-add-module-exports'
    ),
    __path.resolve(
      __dirname,
      '../node_modules/@babel/plugin-proposal-class-properties'
    ),
    __path.resolve(
      __dirname,
      '../node_modules/@babel/plugin-proposal-export-default-from'
    ),
    // __path.resolve(
    //   __dirname,
    //   '../node_modules/@babel/plugin-proposal-export-namespace-from'
    // ),
    // __path.resolve(
    //   __dirname,
    //   '../node_modules/@babel/plugin-transform-classes'
    // ),
    __path.resolve(
      __dirname,
      '../node_modules/@babel/plugin-syntax-dynamic-import'
    )
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
