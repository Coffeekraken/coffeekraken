import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function up($elm, callback) {
  const originalElm = $elm;
  $elm = $elm.parentNode;
  while ($elm && $elm != originalElm.ownerDocument) {
    if (callback($elm))
      return $elm;
    $elm = $elm.parentNode;
  }
  return null;
}
export {
  up as default
};
