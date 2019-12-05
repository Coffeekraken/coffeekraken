# Filters

> Stored in `@coffeekraken/sugar/js/filter/...`

Sugar provide some nice filters classes to apply non css supported effects on your elements.
Here's a list of available filters:

- **[SGooeySvgFilter](../src/js/filter/SGooeySvgFilter.md)** : Make a gooey effect like in [this demo](https://tympanus.net/Development/CreativeGooeyEffects/)
- **[SGradientSvgFilter](../src/js/filter/SGradientSvgFilter.md)** : Apply an SVG gradient filter on top of any HTMLElement
- **[SMotionblurSvgFilter](../src/js/filter/SMotionblurSvgFilter.md)** : Monitor an HTMLElement movement and apply a nice motion blur accordingly

## Usage

To use the filters, simply import them from into your codebase like this:

```js
import SGooeySvgFilter from "@coffeekraken/sugar/js/filter/SGooeySvgFilter";
// then use it
const myFilter = SGooeySvgFilter();
myFilter.applyTo(myCoolHTMLElement);
```
