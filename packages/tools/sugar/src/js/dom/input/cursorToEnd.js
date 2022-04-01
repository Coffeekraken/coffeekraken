import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function cursorToEnd($input) {
  $input.focus();
  setTimeout(() => {
    if (typeof $input.selectionStart == "number") {
      $input.selectionStart = $input.selectionEnd = $input.value.length;
    } else if (typeof $input.createTextRange != "undefined") {
      var range = $input.createTextRange();
      range.collapse(false);
      range.select();
    }
  });
}
export {
  cursorToEnd as default
};
