/**
 * Set the one split tag data
 * @param 		{String} 		name 			The one split tag name to process
 * @param 		{Array}			splits 			An array of values found on the one split tag line
 * @param 		{Object} 		data 			The one split tag object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function oneSplitTag(name, splits, data) {
  data[name] = splits[0];
}
