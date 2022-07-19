<!--
/**
 * @name            Responsive
 * @namespace       doc.css
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CSS           /doc/css/responsive
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Responsive

Another central feature in web development is obviously the responsiveness of your websites.
To handle that efficiently and keep a development experience nice and clean, the toolkit provide some useful mixins that you will discover here.

## `@sugar.media`

This first mixin is kind of the main one, as well as the one that you will uses the most.
See this as a simpler replacement for the traditional `@media` css statement. Here's an example of usage:

```css
.my-button {
  background: red;
  @sugar.media mobile {
    background: green;
  }
}
```

Ok ok... Nice but what is this `mobile` keyword and from where is it popping from?

This(ese) "breakpoints" comes from your theme configuration as all other settings in the toolkit. Here's a sample of media configuration:

`themeMedia.config.ts`

```js
{{toString media}}
```

These settings gives us a "mobile first" approach and 5 breakpoints that are `mobile`, `tablet`, `desktop`, `wide` and `dwarf`. The role of the `defaultAction` property will be more obvious right bellow.

Here's some more "complex" queries to explain the role of the `defaultAction` property:

```css
/**
 * No defaultAction specified, will take the theme configuration one
 * This will mean GREATER or EQUAL to the mobile breakpoint
 */
@sugar.media mobile {
}

/**
 * Specify an action
 * This will mean GREATER than the mobile breakpoint
 */
@sugar.media >mobile {
}

/**
 * Specify an action
 * This will mean EQUAL to the tablet breakpoint
 */
@sugar.media =tablet {
}
```

> With these examples you can see that passing from a "mobile first" approach to a "desktop first" one rely just on changing the `defaultAction` to `<=`.

## `@sugar.media.classes`

This second mixin allows you to make some (or all) your classes responsive so you will be able to apply them directly in your HTML. With an example this will become a lot more obvious:

Consider having a some buttons with different colors like so:

```css
/**
 * Wrap our classes inside the sugar media classes mixin
 * to generate these classes for medias like tablet, mobile, etc...
 */
@sugar.media.classes {
  .btn {
    background: red;
  }
  .btn-green {
    background: green;
  }
  .btn-yellow {
    background: yellow;
  }
}
```

This will allows you to apply responsive classes like so:

```html
<a class="btn @tablet btn-green @desktop btn-yellow">Hello world</a>
```

> Note that for this syntax to work you need to use one of the [pleasant syntax transformer](/doc/css/syntax).

{{/layout-doc }}
