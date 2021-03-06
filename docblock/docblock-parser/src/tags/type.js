/**
 * Set the type data
 * @param 		{String} 		name 			The type name to process
 * @param 		{Array}			splits 			An array of values found on the type line
 * @param 		{Object} 		data 			The type object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function typeTag(name, splits, data) {
  // protect
  if (!splits || splits.length < 1) {
    // invalid tag
    return;
  }
  data.types = splits[0]
    .replace("{", "")
    .replace("}", "")
    .split(/\||,/)
    .map(type => type.trim());
}
