const __fs = require('fs');

let localPreViewConfig = {};
if (__fs.existsSync(`${process.cwd()}/pre-view.config.js`)) {
  localPreViewConfig = require(`${process.cwd()}/pre-view.config.js`);
}

module.exports = {
  title: require(`${process.cwd()}/package.json`).name,
  folder: `${process.cwd()}/views`,
  watch: `${process.cwd()}/dist`,
  hostname: '127.0.0.1',
  open: true,
  hotkey_selector: 'command+enter',
  hotkey_states: 'ctrl+enter',
  js: 'dist/js/app.bundle.js',
  css: 'dist/css/style.css',
  states: '100%,768px,480px',
  ...localPreViewConfig
};
