module.exports = {
  compilerOptions: {
    allowJs: true,
    strict: true,
    sourceMap: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: false,
    noImplicitAny: false,
    noStrictGenericChecks: false,
    allowSyntheticDefaultImports: true,
    incremental: true,
    tsBuildInfoFile: '[config.storage.tempFolderPath]/ts/.tsbuildinfo',
    types: ['node']
  },
  stacks: {
    js: {
      include: ['src/js/**/*.ts'],
      compilerOptions: {
        target: 'es5',
        module: 'umd',
        moduleResolution: 'node'
      }
    },
    node: {
      include: ['src/cli/**/*.ts', 'src/node/**/*.ts'],
      compilerOptions: {
        module: 'commonjs',
        target: 'es6',
        moduleResolution: 'node'
      }
    }
  }
};
