<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- body -->

<!--
/**
* @name            04. Classes
* @namespace       doc
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation           /doc/classes
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
@s.init();

/* generate ALL the classes */
@s.classes();

/* or generate only the classes you need */
@s.flex.classes();
@s.ui.avatar.classes();

```

> You can find the full list of available helper classes mixins under the **Helpers** section.

