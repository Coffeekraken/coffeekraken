"use strict";

require('codemirror/mode/sass/sass.js');

require('codemirror/mode/css/css.js');

require('codemirror/mode/coffeescript/coffeescript.js');

require('codemirror/mode/haml/haml.js');

require('codemirror/mode/htmlmixed/htmlmixed.js');

require('codemirror/mode/javascript/javascript.js');

require('codemirror/mode/stylus/stylus.js');

const CodeMirror = require('codemirror');

CodeMirror.modes.js = CodeMirror.modes.javascript;
CodeMirror.modes.html = CodeMirror.modes.htmlmixed;
CodeMirror.modes.coffee = CodeMirror.modes.coffeescript;