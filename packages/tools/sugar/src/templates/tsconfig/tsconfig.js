/* eslint-disable */
module.exports = {
  exclude: [
    '/**/node_modules',
    '/**/__tests__',
    '/**/__wip__',
    '/**/__tests__.wip',
    '/**/*.test.ts',
    '/**/*.test.js'
  ],
  compilerOptions: {
    allowJs: true,
    strict: true,
    traceResolution: false,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: false,
    noImplicitAny: false,
    noStrictGenericChecks: false,
    allowSyntheticDefaultImports: true
  }
};
