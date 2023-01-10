<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- body -->

<!--
/**
* @name            Classes
* @namespace       doc.css
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / CSS           /doc/css/classes
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Classes

Out of the box, the `postcssSugarPlugin` can generate a lot of helper classes based for the most part on your theme configuration.

To generate all these classes, you can simply add this to your css file:

```css
/* init the sugar toolkit */
@sugar.init();
/* generate ALL the classes */
@sugar.classes();
/* or generate only the classes you need */
@sugar.position.classes();
@sugar.ui.avatar.classes();

```

Here's a small non-exhaustive list of classes that are available:

-   Position
    -   `s-position:absolute:top:right`
    -   `s-position:absolute:bottom:center`
    -   `s-position:relative`
    -   etc...
-   Clearfix
    -   `s-clearfix`
    -   `s-clearfix:micro`
    -   etc...
-   Colors
    -   `s-tc:accent`: Text color to accent.
    -   `s-bg:accent`: Background color to accent.
    -   `s-color:accent`: Apply the `accent` color schema.
    -   etc...
-   Fonts
    -   `s-font:bold`
    -   `s-font:20`: Set the font size to `20`. This value of this size depends on your theme configuration.
    -   etc...
-   Icons
    -   `s-icon:name`: Apply an icon registered with the mixin `@sugar.icon.classes`.
    -   etc...
-   Layout
    -   `s-layout:12`: Apply a 2 columns layout. This layout is defined in your theme configuration.
    -   `s-layout:112`: Apply a 2 columns (2/3 - 1/3) layout.
    -   etc...
-   Paddings / Margins
    -   `s-p:30`: Apply a `30` padding. The value of this `30` depends on your theme configuration
    -   `s-pbe:50`: Apply a `50` **padding-block-end** padding.
    -   `s-mis:20`: Apply a `20` **margin-inline-start** margin.
    -   etc...
-   Ratios
    -   `s-ratio:16-9`: Apply a 16/9 ratio.
    -   `s-ratio:2-3`: Apply a 2/3 ratio.
    -   These ratios depends on your theme configuration.
    -   etc...
-   Scale
    -   `s-scale:15`: Apply a 1.5 scale. This scale is not using a `transform` css property but will actually scale css values that are defined using the `sugar.scalable(value)` postcss function.
    -   These scales depends on your theme configuration.
    -   etc...
-   Typography
    -   `s-typo:h1`: Apply an `h1` style.
    -   `s-typo:p:bold`: Apply a `p` and `bold` style.
    -   These typography styles are defined in your theme configuration.
    -   etc...

These are just a sneak peak of what the toolkit has to offer. For more please take a look at the [styleguide](/styleguide) documentation.

