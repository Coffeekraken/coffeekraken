"use strict";

var _class = _interopRequireDefault(require("@coffeekraken/notification-webcomponent/js/class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('codemirror/mode/sass/sass.js');

require('codemirror/mode/css/css.js');

require('codemirror/mode/coffeescript/coffeescript.js');

require('codemirror/mode/haml/haml.js');

require('codemirror/mode/htmlmixed/htmlmixed.js');

require('codemirror/mode/javascript/javascript.js');

require('codemirror/mode/stylus/stylus.js');

require('./golden-layout.js');

require('./webcomponent.props.js');

require('./webcomponent.imports.js');

// clear transmations on body
setTimeout(() => {
  document.body.classList.remove('clear-transmations');
}, 500); // codemirror aliases

const CodeMirror = require('codemirror');

CodeMirror.modes.js = CodeMirror.modes.javascript;
CodeMirror.modes.html = CodeMirror.modes.htmlmixed;
CodeMirror.modes.coffee = CodeMirror.modes.coffeescript; // listen for compilation error

document.body.addEventListener('compileError', e => {
  _class.default.notify({
    type: 'error',
    title: 'Woups...',
    body: e.detail.error,
    timeout: 20000
  });
});