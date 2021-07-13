/**
*
* @name 		SLocalStorageFonts
* @namespace            js.class
* @type    Class
*
* This class allows to easily store and load custom fonts from the localStorage
*
* @example 	js
* new SLocalStorageFonts({
*  	json_path : '/fonts/fonts.json#v1'
* });
*
* // the fonts.json file looks like this
* {
* 		"fonts" : [{
*   		"font-family" : "Open Sans",
*     	"font-weight" : 300,
*      	"src" : "url(data:application/font-woff;base64,d09GRgA..."
*      }]
* }
*
* @author 		Olivier Bossel<olivier.bossel@gmail.com>

*/
/**
*
* Settings
* @type 	{Object}

*/
/**
*
* Store the version of the fonts to load.
* Used for cache busting
* @setting
* @type 		{String}
* @default 	1.0

*/
/**
*
* Set the json file to load
* @setting
* @type 		{String}
* @default 	/fonts/fonts.json

*/
/**
*
* Set if want the debug messages in the console
* @setting
* @type 		{Boolean}
* @default 	false

*/
/**
*
* @constructor
* @param 		{Object} 	settings 	The settings

*/
/**
*
* Init

*/
/**
*
* Insert font

*/
/**
*
* Debug

*/