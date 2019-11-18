import __upperFirst from "../utils/upper-first";
/**
 * Set the param data
 * @param 		{String} 		name 			The param name to process
 * @param 		{Array}			splits 			An array of values found on the param line
 * @param 		{Object} 		data 			The param object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function paramTag(name, splits, data) {
  // protect
  if (!splits || splits.length < 3) {
    // invalid tag
    return;
  }

  if (!data.params) data.params = [];

  let def = undefined;
  let _name = splits[1];
  let _optional = false;
  let _param = {};
  if (_name.substr(0, 1) === "[" && _name.substr(-1) === "]") {
    const defSplit = _name.substr(1, _name.length - 2).split("=");
    def = defSplit[1];
    _name = defSplit[0];
  }

  if (def) {
    _optional = true;
  }

  _param = {
    name: _name,
    types: splits[0]
      .replace("{", "")
      .replace("}", "")
      .split(/\||,/)
      .map(type => type.trim()),
    description: splits[2],
    optional: _optional
  };
  if (def !== undefined) {
    _param.default = def;
  }
  data.params.push(_param);
}
