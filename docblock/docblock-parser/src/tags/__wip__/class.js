/**
 * Set the class data
 * @param 		{String} 		name 			The class name to process
 * @param 		{Array}			splits 			An array of values found on the class line
 * @param 		{Object} 		data 			The class object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function classTag(name, splits, data) {
  // protect
  if (!splits.length) {
    data.class = true;
  } else {
    data.class = splits[0];
  }
}
