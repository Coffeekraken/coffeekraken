import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
let _isUserScrolling = false, _userScrollingTimeout;
document.addEventListener("wheel", (e) => {
  _isUserScrolling = true;
  clearTimeout(_userScrollingTimeout);
  _userScrollingTimeout = setTimeout(() => {
    _isUserScrolling = false;
  }, 200);
});
function userScrolling($elm) {
  $elm.addEventListener("mouseover", (e) => {
    $elm._isMouseover = true;
  });
  $elm.addEventListener("mouseout", (e) => {
    $elm._isMouseover = false;
  });
  if ($elm._isMouseover && _isUserScrolling) {
    return true;
  }
  return false;
}
export {
  userScrolling as default
};
