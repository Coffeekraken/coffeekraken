import __sugarConfig from '@coffeekraken/s-sugar-config';

export default {
  css: {
    main: {
      id: 'main',
      defer: true,
      path: `${__sugarConfig('storage.srcDir')}/css/index.css`,
      dev: {
        path: `${__sugarConfig('storage.srcDir')}/css/index.css`
      }
    }
  },
  js: {
    main: {
      id: 'main',
      type: 'module',
      defer: true,
      path: `${__sugarConfig('storage.distDir')}/js/index.js`,
      dev: {
        path: `${__sugarConfig('storage.srcDir')}/js/index.ts`
      }
    }
  }
};
