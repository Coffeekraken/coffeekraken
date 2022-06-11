<!--
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          wip
 * @menu            Documentation           /doc/readme
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## SFeature

This package expose a simple `SFeature` class that has to be used as base class for your features like `SActivateFeature`, `SFloatingFeature`, etc...

## Features

-   Support for default props
-   Support `SInterface` props definition
-   [@coffeekraken/s-component-utils](/package/@coffeekraken/s-component-utils/doc/readme) availablwe out ob the box
-   Support defered mount using the [@coffeekraken/s-conductor](/package/@coffeekraken/s-conductor/doc/readme) package
-   Support responsive props
-   And more...

## Usage

Here's how to import and make use of this base feature class:

```js
import __SFeature from '@coffeekraken/s-feature';
export default class MyCoolFeature extends __SFeature {
    constructor(name: string, node: HTMLElement, settings?: any) {
        super(name, node, {
            ...(settings ?? {}),
        });
    }
    mount() {
        // start your feature integration here...
    }
}
export function define(
    props: Partial<ISMyCoolFeatureProps> = {},
    name = 'my-cool-feature',
) {
    __SFeature.defineFeature(name, MyCoolFeature, props);
}
```

```js
import { define } from './MyCoolFeature';
define({
    // some default props...
});
```

```html
<div my-cool-feature>
    Hello world
</div>
```

## Properties

{{> interface namespace='@coffeekraken.s-component-utils.js.interface.SComponentUtilsDefaultPropsInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-feature.js.SFeature)

{{/ layout-readme }}
