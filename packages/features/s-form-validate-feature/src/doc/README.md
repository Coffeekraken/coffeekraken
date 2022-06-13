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

## SFormValidateFeature

This package expose a simple `SFormValidateFeature` class that allows you to validate your forms before sending them to your backend.

## Features

-   Validate your field and display an error message if needed
-   Prevent your form to be submited when an error occurs
-   Built-in validators like `email`, `min`, `max`, `pattern`, etc...
-   Support custom validators through the [@coffeekraken/s-validator](/package/@coffeekraken/s-validator/doc/readme) package
-   Custom inline error message support
-   And more...

## Usage

Here's how to import and make use of this feature:

```js
import { define } from '@coffeekraken/s-form-validate-feature';
define({
    // some default props...
});
```

#### Simple email validation

```html
<label class="s-label:responsive" s-form-validate email>
    Email address
    <input
        type="text"
        class="s-input s-width:60"
        placeholder="olivier.bossel@coffeekraken.io"
    />
</label>
```

#### Inline message

```html
<label
    class="s-label:responsive"
    s-form-validate
    email
    email-message="Something goes wrong"
>
    Email address
    <input
        type="text"
        class="s-input s-width:60"
        placeholder="olivier.bossel@coffeekraken.io"
    />
</label>
```

## Properties

{{> interface namespace='@coffeekraken.s-form-validate-feature.js.interface.SFormValidateFeatureInterface' }}

> Note that to pass properties using html attributes, you must use the `dashCase` case...

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-form-validate-feature.js.SFormValidateFeature)

{{/ layout-readme }}
