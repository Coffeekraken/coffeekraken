import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SRequest from "@coffeekraken/s-request";
function getState() {
  var _a;
  const state = JSON.parse((_a = window.localStorage.getItem("coffeekrakenio")) != null ? _a : "{}");
  return state;
}
function setState(stateObj) {
  const state = getState();
  const newState = __deepMerge(state, stateObj);
  window.localStorage.setItem("coffeekrakenio", JSON.stringify(newState));
}
let _docmap, _docmapPromise;
async function loadDocmap() {
  if (_docmap)
    return _docmap;
  if (_docmapPromise)
    return (await _docmapPromise).data;
  const request = new __SRequest({
    url: `/docmap.json`,
    method: "GET"
  });
  const promise = request.send();
  _docmapPromise = promise;
  _docmap = (await promise).data;
  return _docmap;
}
export {
  getState,
  loadDocmap,
  setState
};
