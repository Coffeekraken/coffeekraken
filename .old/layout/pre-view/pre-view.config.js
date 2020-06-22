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
  states: '100%,768px,480px'
}
