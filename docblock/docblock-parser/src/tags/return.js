import __upperFirst from "../utils/upper-first";

/**
 * Set the return data
 * @param 		{String} 		name 			The return name to process
 * @param 		{Array}			splits 			An array of values found on the return line
 * @param 		{Object} 		data 			The return object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function returnTag(name, splits, data) {
  // protect
  if (!splits || splits.length < 2) {
    // invalid tag
    return;
  }
  data.return = {
    types: splits[0]
      .replace("{", "")
      .replace("}", "")
      .split(/\||,/)
      .map(type => type.trim()),
    description: splits[1]
  };
}
