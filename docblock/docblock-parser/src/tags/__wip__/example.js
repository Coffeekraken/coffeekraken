/**
 * Set the example data
 * @param 		{String} 		name 			The example name to process
 * @param 		{Array}			splits 			An array of values found on the example line
 * @param 		{Object} 		data 			The example object on which to set the values as you want
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function exampleTag(name, splits, data, language = "js") {
  data.example = {
    language: splits[0] || language
  };
}
