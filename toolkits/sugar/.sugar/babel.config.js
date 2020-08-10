module.exports = {
  plugins: [
    'add-module-exports',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-classes',
    [
      '@babel/plugin-transform-parameters',
      {
        loose: true
      }
    ]
  ]
};
