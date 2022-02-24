<!--
/**
 * @name            Mixins
 * @namespace       doc.css
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CSS           /doc/css/mixins
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Mixins

The `postcssSugarPlugin` gives you access to a tone of useful mixins that can help you stay more coherent and clean in your css files. Here's a non-exhaustive list of available mixins:

-   Clearfix
    -   `@sugar.clearfix;`
    -   Multiple clearfix techniques are available like `micro`, `facebook`, etc...
-   Colors
    -   `@sugar.color(accent);`: Remap the `current` color to the `accent` one.
    -   `@sugar.color.remap(accent, error);`: Remap the `accent` color to the `error` one.
    -   etc...
-   Depth
    -   `@sugar.depth(20);`: Apply the `20` depth. The values depends on your theme configuration.
    -   etc...
-   Direction
    -   `@sugar.direction.rtl { ... }`: Apply some css only for `ltr` direction.
    -   etc...
-   Fonts
    -   `@sugar.font.family(title);`: Apply the `title` font that is defined in your theme configuration.
    -   `@sugar.font.size(20);`: Apply the `20` font size that is defined in your theme configuration.
    -   etc...
-   Icons
    -   `@sugar.icon.classes(fa:user);`: Register the font awesome user ison to be used like this: `.s-icon:user`
    -   etc...
-   Media queries
    -   `@sugar.media(mobile) { ... }`: Apply some css only for the media `mobile`.
    -   `@sugar.media(>=tablet) { ... }`: Apply some css for all that is `tablet` and above.
    -   The medias are specified in your theme configuration.
    -   etc...
-   Ratios
    -   `@sugar.ratio(16/9);`: Apply a ratio of 16/9.
    -   etc...
-   Resets
    -   `@sugar.reset();`: Apply the coffeekraken default reset.
    -   `@sugar.reset.destyle();`: Apply the `destyle` reset.
    -   etc...
-   Scrollbars
    -   `@sugar.scrollbar();`: Apply scrollbar styling depending on your theme configuration.
    -   etc...
-   Themes
    -   `@sugar.theme(dark);`: Apply the `dark` variant of the current theme.
    -   etc...
-   Transitions
    -   `@sugar.transition(fast);`: Apply the `fast` transition defined in your theme configuration.
    -   etc...
-   Buttons
    -   `@sugar.ui.button();`: Apply the `button` style depending on your theme configuration.
    -   etc...
-   Selects
    -   `@sugar.ui.select();`: Apply the `select` style depending on your theme configuration.
    -   etc...

> Note that this list if just a sneak peak of what's available in the toolkit. For more, check out the [styleguide](/styleguide) or the [API](/api) documentations.

{{/layout-doc }}
