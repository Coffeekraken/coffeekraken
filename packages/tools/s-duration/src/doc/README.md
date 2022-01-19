<!-- 
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation           /doc/readme
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-readme }}

## Calcul and display durations with ease

This `SDuration` class allows you to calculate and display for example a process duration with ease. Here's some features

- Calculate with ease durations
- Display formated duration like `2m33s`

## Usage

Here's how to use our implementation:

```js
import __SDuration from '@coffeekraken/s-duration';

const duration = new __SDuration();;

// do something here...

console.log(`This process has taken ${duration.end().formatedDuration}`);
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-duration.node.SDuration)

{{/ layout-readme }}