
# Function


## ```js convert ```


This function take as input any color format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
and convert it into the wanted format like "rgba", "hsl", "hsv", "hex", "rgbaString", "hslString" or "hsvString"

## Parameters

- **input**  Mixed: The input color to convert

- **format** (rgba) String: The format wanted



## Example (js)

```js
import convert from '@coffeekraken/sugar/js/color/convert';
convert('rgba(10,20,30,100)', 'rgba'); // => { r: 10, g: 20, b: 30, a: 100 }
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



