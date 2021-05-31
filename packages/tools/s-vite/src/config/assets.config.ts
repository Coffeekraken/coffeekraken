export default {
  js: {
    viteClient: {
      id: 'viteClient',
      type: 'module',
      defer: true,
      src: '[config.vite.server.hostname]/@vite/client',
      env: 'dev'
    }
  }
};
