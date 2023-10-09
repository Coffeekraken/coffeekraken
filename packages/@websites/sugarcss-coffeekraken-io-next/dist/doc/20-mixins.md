<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- body -->

<!--
/**
* @name            05. Mixins
* @namespace       doc
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation           /doc/mixins
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Mixins

The `postcssSugarPlugin` gives you access to a tone of useful mixins that can help you stay more coherent and clean in your css files. Here's a none exhaustive list of available mixins:

- `@s.color(accent);`: Apply the **accent** color to the element and his children
- `@s.depth(50);`: Apply the **50** depth to the element
- `@s.disabled;`: Apply the **disabled** state to the element
- `@s.layout(1 2 _ 3 3);`: Apply a two columns layour with two rows
- `@s.reset();`: Apply the [Destyle](https://nicolas-cusan.github.io/destyle.css/) reset with some other additional tweaks to avoid visual issues on edge cases
- `@s.theme.apply(dark);`: Apply the **dark** theme to the element and his children
- `@s.theme(dark) { ... }`: Apply the **dark** theme to the element and his children
- `@s.typo(h2);`: Apply the **h2** typography to the element
- and more...

> You can find the full list of available helper classes mixins under the **Mixins** section.

