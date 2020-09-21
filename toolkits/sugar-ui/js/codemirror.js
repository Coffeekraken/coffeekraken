"use strict";

var _codemirror = _interopRequireDefault(require("codemirror"));

require("codemirror/mode/htmlmixed/htmlmixed");

require("codemirror/mode/coffeescript/coffeescript");

require("codemirror/mode/css/css");

require("codemirror/mode/javascript/javascript");

require("codemirror/mode/markdown/markdown");

require("codemirror/mode/php/php");

require("codemirror/mode/sass/sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', () => {
  var $textareas = document.querySelectorAll('textarea#editor');
  [].forEach.call($textareas, $item => {
    var mode = $item.getAttribute('mode') || 'htmlmixed';

    var $editor = _codemirror.default.fromTextArea($item, {
      theme: 'nord',
      lineNumbers: true,
      readOnly: true,
      mode,
      scrollbarStyle: null,
      viewportMargin: Infinity
    });
  });
});