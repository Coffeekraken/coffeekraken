module.exports = {
  css: {
    head: [
      {
        name: 'main',
        path: '[config.build.scss.outputDir]/index.css'
      }
    ]
  },
  js: {
    head: [
      {
        name: 'main',
        path: '[config.build.js.outputDir]/index.js'
      }
    ]
  }
};
