
# Class


## ```js SColor ```
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


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Constructor




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js getColor ```


This method take as parameter the passed color to the constructor and has to return the
actual real color like color from the static colors listed in the SColor class or maybe
from the Sugar configured colors

## Parameters

- **color**  String: The passed color to the constructor




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


