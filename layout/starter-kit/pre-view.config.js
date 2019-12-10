module.exports = {
  folder: `${process.cwd()}/views`,
  port: 8080,
  hostname: '127.0.0.1',
  open: true,
  binary: null,
  ini: null,
  hotkeys: {
    selector: 'alt+enter',
    states: 'alt+shift'
  },
  js: 'dist/js/app.bundle.js',
  css: 'dist/css/style.css',
  states: '100%,750px,300px'
}
