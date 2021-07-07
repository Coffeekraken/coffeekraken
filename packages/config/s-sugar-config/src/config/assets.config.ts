export default {
  css: {
    main: {
      id: 'main',
      defer: true,
      src: `[config.storage.serve.cssDir]/index.css`,
      'src@dev': '[config.vite.server.hostname][config.storage.serve.cssDir]/index.css'
    }
  },
  js: {
    module: {
      id: 'module',
      type: 'module',
      defer: true,
      src: '[config.storage.serve.jsDir]/module.es.js',
      'src@dev': '[config.vite.server.hostname][config.storage.serve.jsDir]/index.ts'
    },
    main: {
      id: 'main',
      nomodule: true,
      defer: true,
      src: '[config.storage.serve.jsDir]/index.iife.js',
      'src@dev': undefined
    }
  }
};
