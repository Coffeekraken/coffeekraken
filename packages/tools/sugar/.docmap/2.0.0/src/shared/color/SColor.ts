/**
*
* @name 		SColor
* @namespace            js.color
* @type    Class
* @platform          js
* @platform          ts
* @platform          node
* @status              beta
*
* Class that provide complete and simple to use color manupilation capabilities like:
* - Modifiers
* 	- opacity
* 	- darken
* 	- lighten
* 	- desaturate
* 	- saturate
* 	- spin (change hue)
* 	- transparentize
* 	- alpha
* 	- grayscale
* - Conversions
* 	- rgba
* 	- hsl
* 	- hsv
* 	- hex
* - Print out formats
* 	- toRgbaString
* 	- toHslString
* 	- toHsvString
* 	- toHexString
* 	- toString(format = null)
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import SColor from '@coffeekraken/sugar/js/classes/SColor'
* let myColor = new SColor(#ff0000);
* // get a lighter color
* let ligtherColor = myColor.lighten(20);
* // print the color to rgba
* console.log(lighterColor.toRgbaString());
*
* @since     2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                colors
* @type                Object
* @protected
* @static
*
* Static color names map
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                _originalSColor
* @type                Object
* @private
*
* Original color value
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name            _r
* @type            Number
* @private
*
* Internal red value
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                _g
* @type                Number
* @private
*
* Internal green value
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                  _b
* @type                  Number
* @private
*
* Internal blue value
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              _a
* @type              Number
* @private
*
* Internal alpha value
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                  _settings
* @type                  Object
* @private
*
* Store the settings passed to the constructor. Here's the list of available settings:
* - returnNewInstance (false) {Boolean}: Specify if you want by default a new instance back when calling methods like "saturate", "desaturate", etc...
* - defaultFormat (hex) {String}: Specify the default format for this instance. This is used in the "toString" method for example...
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                  constructor
* @type                  Function
*
* Constructor
*
* @param   {object}    color     The color description like (#ff0000 | rgba(...) | hsl(...) | hsv(...) | {r:255,r:140,b:23,a:40})
* @param       {Object}        [settings={}]         The settings to configure the SColor instance. Here's the available settings:
* - returnNewInstance (false) {Boolean}: Specify if you want by default a new instance back when calling methods like "saturate", "desaturate", etc...
* - defaultFormat (hex) {String}: Specify the default format for this instance. This is used in the "toString" method for example...
* @return    {object}            The color instance
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name            getColor
* @type            Function
*
* This method take as parameter the passed color to the constructor and has to return the
* actual real color like color from the static colors listed in the SColor class or maybe
* from the Sugar configured colors

*/
/**
*
* @name            _parse
* @type            Function
* @private
*
* Parse
*
* @param       {object}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...) | {r:255,r:140,b:23,a:40})
* @return      {object}                  The rgba representation of the passed color
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              convert2
* @type              Function
* @private
*
* Concert color
*
* @param       	{string}      	format 	      	The format wanted as output like (rgba,hsl,hsv and hex)
* @values        rgba, hsl, hsv, hex
* @return      	{object} 	                			The color in wanted object format
*
* @example           js
* myColor._convert2('rgba');
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                toHex
* @type                Function
*
* To hex
*
* @return 	{string} 		The hex string representation
*
* @example           js
* myColor.toHex();
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name            toHsl
* @type            Function
*
* To hsl
*
* @return 	{object} 		The hsl object representation
*
* @example       js
* myColor.toHsl();
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              toHsv
* @type              Function
*
* To hsv
*
* @return 	{object} 		The hsv object representation
*
* @example         js
* myColor.toHsv();
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name            toRgba
* @type            Function
*
* To rgba
*
* @return 	{object} 		The rgba object representation
*
* @example         js
* myColor.toRgba();
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name            r
* @type            Number
*
* Get/set the red value
*
* @example         js
* myColor.r;
* myColor.r = 128;
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              g
* @type              Number
*
* Get/set the green value
*
* @example         js
* myColor.g;
* myColor.g = 20;
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              b
* @type              Number
*
* Get/set the blue value
*
* @example           js
* myColor.b;
* myColor.b = 30;
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              a
* @type              Number
*
* Get/set the alpha value
*
* @example       js
* myColor.a;
* myColor.a = 20;
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              l
* @type              Number
*
* The luminence value
*
* @example             js
* myColor.l;
* myColor.l = 10;
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              s
* @type              Number
*
* The saturation value
*
* @example         js
* myColor.s;
* myColor.s = 20;
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                  v
* @type                  Number
*
* The value of the HSV format
*
* @example         js
* myColor.v;
* myColor.v = 20;
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              h
* @type              Number
*
* Get/set the hue
*
* @example         js
* myColor.h;
* myColor.h = 30;
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          reset
* @type          Function
*
* Reset to the original color
*
* @example         js
* myColor.reset();
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                desaturate
* @type                Function
*
* Desaturate
*
* @param         	{Number} 	          amount 	        	The amount of desaturation wanted between 0-100
* @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
* @return 	        {SColor} 			                      	A new SColor instance or the actual one
*
* @example           js
* myColor.desaturate(20);
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                saturate
* @type                Function
*
* Saturate
*
* @param         	{Number}        	amount 	            	The amount of saturation wanted between 0-100
* @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
* @return 	        {SColor} 			                         	A new SColor instance or the actual one
*
* @example         js
* myColor.saturate(20);
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                      grayscale
* @type                      Function
*
* Return a new SColor instance of the color to grayscale
*
* @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
* @return 	{SColor} 			A new SColor instance or the actual one
*
* @example           js
* myColor.grayscale();
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              spin
* @type              Function
*
* Spin the hue on the passed value (max 360)
*
* @param             	{Number}            	amount 		          	The amount of hue spin wanted between 0-360
* @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
* @return 	            {SColor} 				                          	A new SColor instance or the actual one
*
* @example           js
* myColor.spin(230);
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name              transparentize
* @type              Function
*
* Transparentize
*
* @param             	{Number} 	          	amount 		          	The amount of transparence to apply between 0-100|0-1
* @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
* @return            	{SColor} 					                        	A new SColor instance or the actual one
*
* @example           js
* myColor.transparenize(30);
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                alpha
* @type                Function
*
* Set the alpha
*
* @param           	{Number} 	            alpha 		            	The new alpha value to apply between 0-100|0-1
* @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
* @return          	{SColor} 					                            A new SColor instance or the actual one
*
* @example           js
* myColor.alpha(10);
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                  opacity
* @type                  Function
*
* Set the opacity (alias for alpha)
*
* @param 	                {Number}          	opacity 	              	The new opacity value to apply between 0-100|0-1
* @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
* @return                	{SColor} 			                            		A new SColor instance or the actual one
*
* @example               js
* myColor.opacity(20);
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                  opacify
* @type                  Function
*
* Opacify
*
* @param 	          {Number} 	            amount 		              The amount of transparence to remove between 0-100|0-1
* @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
* @return          	{SColor} 			                              	A new SColor instance or the actual one
*
* @example           js
* myColor.opacify(18);
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                  darken
* @type                  Function
*
* Darken
*
* @param                 	{Number} 	                amount 	                	The amount of darkness (of the nightmare of the shadow) to apply between 0-100
* @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
* @return                	{SColor} 				                                    A new SColor instance or the actual one
*
* @example             js
* myColor.darken(20);
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                      lighten
* @type                      Function
*
* Lighten
*
* @param 	              {Number} 	              amount 	                	The amount of lightness (of the sky of the angels) to apply between 0-100
* @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
* @return                	{SColor} 			                                  	A new SColor instance or the actual one
*
* @example             js
* myColor.lighten(20);
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                  toHexString
* @type                  Function
*
* To hex string
*
* @return 	            {string} 	              	The hex string representation of the color
*
* @example           js
* myColor.toHexString();
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                  toRgbaString
* @type                  Function
*
* To rgba string
*
* @return 	              {string} 	              	The rgba string representation of the color
*
* @example           js
* myColor.toRgbaString();
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                    toHslString
* @type                    Function
*
* To hsl string
*
* @return 	              {string} 	              	The hsl string representation of the color
*
* @example             js
* myColor.toHslString();
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                      toHsvString
* @type                      Function
*
* To hsv string
*
* @return              	{string} 	              	The hsv string representation of the color
*
* @example           js
* myColor.toHsvString();
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                toString
* @type                Function
*
* To string
*
* @param       {String}              [format=this._settings.defaultFormat]                The format you want back
* @values        hex,hsl,hsv,rgba
* @return 	      {string} 		                                                      The rgba string representation of the color
*
* @example         js
* myColor.toString();
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/