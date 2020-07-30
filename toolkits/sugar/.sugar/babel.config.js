module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
        // forceAllTransforms: true
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
    // '@babel/plugin-transform-classes',
    // [
    //   '@babel/plugin-transform-runtime',
    //   {
    //     regenerator: true
    //   }
    // ]
  ]
};
