"use strict";

var _compileServer = _interopRequireDefault(require("@coffeekraken/compile-server"));

var _SWebComponent = _interopRequireDefault(require("@coffeekraken/sugar/js/core/SWebComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setting up compile server
let compileServerSettings = JSON.parse(window.app.compileServer);
const port = compileServerSettings.port || 4000;
compileServerSettings = Object.assign({
  apiUrl: `${document.location.protocol}//${document.location.hostname}:${port}`
}, compileServerSettings);

_compileServer.default.setup(compileServerSettings); // default properties


_SWebComponent.default.setDefaultProps({
  mountDependencies: [() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      });
    });
  }]
}, ['ck-codemirror', 'ck-interactive-demo']);

_SWebComponent.default.setDefaultProps({
  theme: 'material',
  compile: _compileServer.default.compile
}, 'ck-codemirror');

_SWebComponent.default.setDefaultProps({
  driver: 'fontawesome'
}, 'ck-icon');