import __codemirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/coffeescript/coffeescript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/php/php';
import 'codemirror/mode/sass/sass';

document.addEventListener('DOMContentLoaded', () => {
  const $textareas = document.querySelectorAll('textarea#editor');
  [].forEach.call($textareas, ($item) => {
    const mode = $item.getAttribute('mode') || 'htmlmixed';

    const $editor = __codemirror.fromTextArea($item, {
      theme: 'nord',
      lineNumbers: true,
      readOnly: true,
      mode,
      scrollbarStyle: null,
      viewportMargin: Infinity
    });
  });
});
