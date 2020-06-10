


<!-- @namespace    sugar.js.color -->

# ```js SColor ```
### Since: 2.0.0

Class that provide complete and simple to use color manupilation capabilities like:
- Modifiers
- opacity
- darken
- lighten
- desaturate
- saturate
- spin (change hue)
- transparentize
- alpha
- grayscale
- Conversions
- rgba
- hsl
- hsv
- hex
- Print out formats
- toRgbaString
- toHslString
- toHsvString
- toHexString
- toString(format = null)



## Example (js)

```js
import SColor from '@coffeekraken/sugar/js/classes/SColor'
let myColor = new SColor(#ff0000);
// get a lighter color
let ligtherColor = myColor.lighten(20);
// print the color to rgba
console.log(lighterColor.toRgbaString());
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Constructor

## Parameters

- **color**  Object: The color description like (#ff0000 | rgba(...) | hsl(...) | hsv(...) | {r:255,r:140,b:23,a:40})

- **settings** ([object Object]) Object: The settings to configure the SColor instance. Here's the available settings:
- returnNewInstance (false) {Boolean}: Specify if you want by default a new instance back when calling methods like "saturate", "desaturate", etc...
- defaultFormat (hex) {String}: Specify the default format for this instance. This is used in the "toString" method for example...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js getColor ```


This method take as parameter the passed color to the constructor and has to return the
actual real color like color from the static colors listed in the SColor class or maybe
from the Sugar configured colors




### Author
- 





# ```js _parse ```


Parse

## Parameters

- **color**  Object: The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...) | {r:255,r:140,b:23,a:40})




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js convert2 ```


Concert color

## Parameters

- **format**  String: The format wanted as output like (rgba,hsl,hsv and hex)



## Example (js)

```js
myColor._convert2('rgba');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js toHex ```


To hex



## Example (js)

```js
myColor.toHex();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js toHsl ```


To hsl



## Example (js)

```js
myColor.toHsl();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js toHsv ```


To hsv



## Example (js)

```js
myColor.toHsv();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js toRgba ```


To rgba



## Example (js)

```js
myColor.toRgba();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js reset ```


Reset to the original color



## Example (js)

```js
myColor.reset();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js desaturate ```


Desaturate

## Parameters

- **amount**  Number: The amount of desaturation wanted between 0-100

- **returnNewInstance** (this._settings.returnNewInstance) Boolean: Specify if you want back a new SColor instance of the actual one



## Example (js)

```js
myColor.desaturate(20);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js saturate ```


Saturate

## Parameters

- **amount**  Number: The amount of saturation wanted between 0-100

- **returnNewInstance** (this._settings.returnNewInstance) Boolean: Specify if you want back a new SColor instance of the actual one



## Example (js)

```js
myColor.saturate(20);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js grayscale ```


Return a new SColor instance of the color to grayscale

## Parameters

- **returnNewInstance** (this._settings.returnNewInstance) Boolean: Specify if you want back a new SColor instance of the actual one



## Example (js)

```js
myColor.grayscale();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js spin ```


Spin the hue on the passed value (max 360)

## Parameters

- **amount**  Number: The amount of hue spin wanted between 0-360

- **returnNewInstance** (this._settings.returnNewInstance) Boolean: Specify if you want back a new SColor instance of the actual one



## Example (js)

```js
myColor.spin(230);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js transparentize ```


Transparentize

## Parameters

- **amount**  Number: The amount of transparence to apply between 0-100|0-1

- **returnNewInstance** (this._settings.returnNewInstance) Boolean: Specify if you want back a new SColor instance of the actual one



## Example (js)

```js
myColor.transparenize(30);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js alpha ```


Set the alpha

## Parameters

- **alpha**  Number: The new alpha value to apply between 0-100|0-1

- **returnNewInstance** (this._settings.returnNewInstance) Boolean: Specify if you want back a new SColor instance of the actual one



## Example (js)

```js
myColor.alpha(10);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js opacity ```


Set the opacity (alias for alpha)

## Parameters

- **opacity**  Number: The new opacity value to apply between 0-100|0-1

- **returnNewInstance** (this._settings.returnNewInstance) Boolean: Specify if you want back a new SColor instance of the actual one



## Example (js)

```js
myColor.opacity(20);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js opacify ```


Opacify

## Parameters

- **amount**  Number: The amount of transparence to remove between 0-100|0-1

- **returnNewInstance** (this._settings.returnNewInstance) Boolean: Specify if you want back a new SColor instance of the actual one



## Example (js)

```js
myColor.opacify(18);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js darken ```


Darken

## Parameters

- **amount**  Number: The amount of darkness (of the nightmare of the shadow) to apply between 0-100

- **returnNewInstance** (this._settings.returnNewInstance) Boolean: Specify if you want back a new SColor instance of the actual one



## Example (js)

```js
myColor.darken(20);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js lighten ```


Lighten

## Parameters

- **amount**  Number: The amount of lightness (of the sky of the angels) to apply between 0-100

- **returnNewInstance** (this._settings.returnNewInstance) Boolean: Specify if you want back a new SColor instance of the actual one



## Example (js)

```js
myColor.lighten(20);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js toHexString ```


To hex string



## Example (js)

```js
myColor.toHexString();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js toRgbaString ```


To rgba string



## Example (js)

```js
myColor.toRgbaString();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js toHslString ```


To hsl string



## Example (js)

```js
myColor.toHslString();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js toHsvString ```


To hsv string



## Example (js)

```js
myColor.toHsvString();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js toString ```


To string

## Parameters

- **format** (this._settings.defaultFormat) String: The format you want back



## Example (js)

```js
myColor.toString();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# Static ```js colors ```


Static color names map



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _originalSColor ```


Original color value



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _r ```


Internal red value



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _g ```


Internal green value



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _b ```


Internal blue value



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _a ```


Internal alpha value



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _settings ```


Store the settings passed to the constructor. Here's the list of available settings:
- returnNewInstance (false) {Boolean}: Specify if you want by default a new instance back when calling methods like "saturate", "desaturate", etc...
- defaultFormat (rgba) {String}: Specify the default format for this instance. This is used in the "toString" method for example...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js r ```


Get/set the red value


### Example (js)

```js
myColor.r;
myColor.r = 128;
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js g ```


Get/set the green value


### Example (js)

```js
myColor.g;
myColor.g = 20;
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js b ```


Get/set the blue value


### Example (js)

```js
myColor.b;
myColor.b = 30;
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js a ```


Get/set the alpha value


### Example (js)

```js
myColor.a;
myColor.a = 20;
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js l ```


The luminence value


### Example (js)

```js
myColor.l;
myColor.l = 10;
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js s ```


The saturation value


### Example (js)

```js
myColor.s;
myColor.s = 20;
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js v ```


The value of the HSV format


### Example (js)

```js
myColor.v;
myColor.v = 20;
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js h ```


Get/set the hue


### Example (js)

```js
myColor.h;
myColor.h = 30;
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

