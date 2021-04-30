import __sugarConfig from '@coffeekraken/s-sugar-config';

export default {
  css: {
    main: {
      id: 'main',
      defer: true,
      path: `${__sugarConfig('storage.distDir')}/css/index.css`
    }
  },
  js: {
    main: {
      type: 'module',
      id: 'main',
      defer: true,
      path: `${__sugarConfig('storage.distDir')}/js/index.bundle.js`
    }
  }
};
