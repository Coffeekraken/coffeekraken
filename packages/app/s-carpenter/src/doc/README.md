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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## SCarpenter

This package allows you to build a nice components/sections editor directly on your website.
This is inspired by the [Storybook](https://storybook.js.org/) project but tries to be easier to use
as well as usable directly on your website just as projects like [Divi wordpress theme](https://www.elegantthemes.com/gallery/divi/).

## Features

-   Make use of [`.spec.json`](/package/@coffeekraken/s-specs/doc/readme) files to describe your components/sections/etc...
-   Fully customizable UI (optional)
-   Easy install as it is just a regular webcomponent
-   And more...

## Usage

Here's a simple example how to use the SCarpenterComponent webcomponent:

```js
import { define } from '@coffeekraken/s-carpenter';
define();
```

```html
<s-carpenter id="my-editor"></s-carpenter>
```

## Specification data

This component works with some specification data that you have to provide it either:

1. By setting directly the JSON in the `specs` attribute
2. By specify the `specs` attribute to a url where to fetch the specs
3. By setting an `HTMLTemplateElement` id where to read the JSON data from

The specifications JSON must follow this structure:

```js
{
   specsMap: {
     'components.card.card': {},
     'components.cta.cta': {}
     // ...
   },
   specsBySources: {
     components: {
        'components.card.card': {},
        'components.cta.cta': {}
        // ...
     },
     sections: {
        // ...
     }
   },
   frontspec: {
      media: {
          // optional but used to display responsive breakpoints
      }
   }
}
```

> Check out the [@coffeekraken/s-frontspec](/package/@coffeekraken/s-frontspec/doc/readme) package documentation for more details on the `frontspec` property...

Here's an example of specification for a card:

```js
{
    type: 'Component',
    title: 'Card',
    description: 'Wonderfull card component',
    props: {
        title: {
            type: 'String',
            title: 'Title',
            description: 'Card title',
            default: 'Hello world',
            required: true
        },
        text: {
            type: 'String',
            title: 'Text',
            description: 'Card text',
            required: true
        },
        image: '@sugar.views.props.image', // make use of pre-written specs from the @coffeekraken/sugar package
        cta: '@sugar.views.components.cta
    }
}
```

## Properties

{{> interface namespace='@coffeekraken.s-carpenter.js.SCarpenterComponent' }}

> Check the [@coffeekraken/s-specs](/package/@coffeekraken/s-specs/doc/readme) package documentation for more details on how to use the `.specs.json` files

{{/ layout-readme }}
