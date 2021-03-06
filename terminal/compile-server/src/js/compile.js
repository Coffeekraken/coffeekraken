import __compileJs from './compile/js';
import __compileSass from './compile/sass';
import __compileStylus from './compile/stylus';

/**
 * @name      compile
 * @namespace       compile-server
 * @type        Function
 *
 * Compile some code
 *
 * @param 		{String} 			code 			The code to compile
 * @param 		{String} 			language 		The language of the code to compile like. (sass,scss,js,javascript,coffee,coffeescript,typescript,ts,stylus,styl)
 * @param 		{Object} 			[options={}] 	Some option to pass to the according compilation package bellow. (sass,scss = node-sass / js,coffee,ts = webpack with loaders / stylus = stylus)
 *
 * @example 		js
 * const compileServer = require('@coffeekraken/compile-server');
 * compileServer.compile(myCoolCode, 'js').then((compiledCode) => {
 *  	// do something here...
 * });
 *
 * @author  	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function compile(code, language, options = {}) {
	return new Promise((resolve, reject) => {
		switch(language) {
			case 'sass':
			case 'scss':
				resolve(__compileSass(code, language, options));
			break;
			case 'js':
			case 'javascript':
			case 'coffee':
			case 'coffeescript':
			case 'typescript':
			case 'ts':
				resolve(__compileJs(code, language, options));
			break;
			case 'stylus':
			case 'styl':
				resolve(__compileStylus(code, language, options));
			break;
			default:
				resolve(code);
			break;
		}
	});
}
