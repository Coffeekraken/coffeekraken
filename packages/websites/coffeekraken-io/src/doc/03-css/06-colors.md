<!--
/**
 * @name            Colors
 * @namespace       doc.css
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CSS           /doc/css/colors
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Colors

Colors in Coffeekraken are handled directly in your theme configuration file.
Here's a simple example of a config file that define your colors:

```js
export default function (env, config) {
    return {
        // specify the theme name that you will use to active it for your website
        themeName: 'mytheme',
        // specify some variants like dark, light, etc...
        variants: {
            dark: {
                // specify that your theme is based on the themeDarkBase (optional)
                extends: 'themeDarkBase'
                // override colors from the themeDarkBase file
                color: {
                    main: {
                        color: 'hsl(156,50,50)'
                    }
                }
                // ...all the others configuration you want to override from themeDarkBase
            }
        },
    };
}
```

## Syntax

Colors can be defined in your theme configuration using one of these syntax:

- `hsl(156,50,50)`: HSL syntax **prefered**
- `hsla(156,50,50,1)`: HSLA syntax
- `rgb(245,234,65)`: RGB syntax
- `rgba(245,234,65,1)`: RGBA syntax
- `#ff347f`: Hexadecimal syntax

> It's preferable to **set your colors directly in HSL(A)** syntax cause under the hood this will be the used one. Setting them directly in HSL avoid unecessary conversion.

## Variants

In your theme file, colors are defined as an object. Each color has the `color` property that define the color itself as seen above. Alongside this, you can specify some **variants** like this:

```js
export default function (env, config) {
    return {
        themeName: 'mytheme',
        variants: {
            dark: {
                extends: 'themeDarkBase'
                color: {
                    main: {
                        color: 'hsl(156,50,50)',
                        // defining a variant called "variant1"
                        variant1: {
                            lighten: 50
                        },
                        // defining a variant called "variant2"
                        variant2: {
                            darken: 10,
                            saturate: 20
                        }
                    }
                }
                // ...all the others configuration you want to override from themeDarkBase
            }
        },
    };
}
```

These variants are the same color defined in the `color` property, but with some tweaks like:

- `lighten`: Allows you to increase the `l` HSL color by 0|100
- `darken`: Allows you to decrease the `l` HSL color by 0|100
- `saturate`: Allows you to increase the `s` HSL color by 0|100
- `desaturate`: Allows you to decrease the `s` HSL color by 0|100
- `spin`: Allows you to "spin" the `h` HSL color by -360|360
- `alpha`: Allows you to increase/decrease the `a` HSLA color by 0|1

Some out of the box variants are available through the `themeLightBase.config.ts` and `themeDarkBase.config.ts` configuration file. Here's the list:

- `text`: Used for texts
- `placeholder`: Used for input placeholders
- `foreground`: Used for elements displayed on top of the `color` itself
- `ui`: Used for forms elements background, etc...
- `uiForeground`: Used for forms elements text, etc...
- `background`: Used for backgrounds like body one, etc...
- `backgroundForeground`: Used for elements displayed on top of the `background` variant
- `surface`: Used for some elements background like stripped tables rows
- `surfaceForeground`: Used for elements displayed on top of the `surface`variant
- `border`: Used for borders
- `gradientStart`: Used for gradients as the start color
- `gradientEnd`: Used for gradients as the end color

## `current` color

The concept of the `current` color in Coffeekraken is very similar to the `currentColor` CSS value.
Take an example when we want to create a button that uses this `current` color, then we apply some other colors to it:

```css
.btn {
  background: sugar.color(current);
  color: sugar.color(current, foreground);
}
.my-section {
  @sugar.color (accent);
}
.my-button {
  @sugar.color (error);
}
```

```html
<div class="my-section">
  <a class="btn">Hello world</a>
</div>
<a class="my-button btn">Other button</a>
```

> Note that behind the scene the colors are applied using variables. This mean that the CSS cascading feature works here as well.

{{/layout-doc }}
