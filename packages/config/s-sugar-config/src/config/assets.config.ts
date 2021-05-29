import __SugarConfig from '@coffeekraken/s-sugar-config';

export default {
  css: {
    main: {
      id: 'main',
      defer: true,
      src: `./dist/css/index.css`,
      'dev:src': '[config.vite.server.hostname]/src/css/index.css'
    }
  },
  js: {
    main: {
      id: 'main',
      type: 'module',
      defer: true,
      src: './dist/js/index.js',
      'dev:src': '[config.vite.server.hostname]/src/js/index.ts'
    }
  }
};
