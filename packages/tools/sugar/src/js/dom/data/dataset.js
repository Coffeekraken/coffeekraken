import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __uncamelize from "../../../shared/string/uncamelize";
import __autoCast from "../../../shared/string/autoCast";
import __toString from "../../../shared/string/toString";
function dataset($elm, key, value = null) {
  if (!$elm.getAttribute)
    return;
  if (!value) {
    const v = $elm.dataset[key] || $elm.getAttribute("data-" + __uncamelize(key));
    return __autoCast(v);
  } else {
    const dataset2 = $elm.dataset;
    if (dataset2) {
      $elm.dataset[key] = __toString(value);
    } else {
      $elm.setAttribute("data-" + __uncamelize(key), __toString(value));
    }
    return $elm;
  }
}
var dataset_default = dataset;
export {
  dataset_default as default
};
