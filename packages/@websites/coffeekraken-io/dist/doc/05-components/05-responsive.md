<!--
/**
 * @name            Responsive
 * @namespace       doc.components
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Components           /doc/components/responsive
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

<!-- image -->

<!-- header -->
##### @coffeekraken/coffeekraken-io



# Responsive

Our components are based on the [SLitComponent](/package/@coffeekraken/s-lit-component/doc/readme) class which nake uses of the [SComponentUtils](/package/@coffeekraken/s-component-utils/doc/readme) one that gives you the ability to set some **responsive properties**.

## Usage

Use with the `themeMedia.queries` configuration:

> By default, the available queries are `mobile`, `tablet`, `desktop`, `wide` and `dwarf`.

```html
<!-- using the <responsive> special tag -->
<my-cool-component title="hello">
  <responsive media="tablet" title="world"></responsive>
</my-cool-component>
<!-- passing a json with the "responsive" attribute -->
<my-cool-component
  title="hello"
  responsive='{"tablet":{"title":"world"}}'
></my-cool-component>

```


You can also specify directly a media query like this:

```html
<my-cool-component title="hello">
  <responsive media="screen and (max-width:1280px)" title="world"></responsive>
</my-cool-component>

```


