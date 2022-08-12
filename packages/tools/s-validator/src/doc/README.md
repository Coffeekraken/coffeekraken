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

## SValidator

This class allows you to validate data using our built-in validators (`min`,`max`,`email`,`creditCard`, etc...), or by specifying your own.

-   Support a lot of built-in validators (see list bellow)
-   Support custom validators as well
-   Easy translation system
-   And more...

## Usage

Here's how to use this class:

```js
import __SValidator from '@coffeekraken/s-validator';
const validator = new __SValidator();
validator.validate('hello', {
    min: 2,
    max: 3,
}); // => { valid: false, rules: {... }, messages: ['Must be at max 3 characters'] }
```

## Built-in validators

Here's the list of built-in validators:

{{#each validatorsDefinition}} - **{{ @key }}**: {{this.description}}
{{/each}}

## Custom validator

To create a custom validator, simply follow this example:

```js
import __SValidator from '@coffeekraken/s-validator';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

const definition = {
    description: 'Validate some cool value that starts with "CK"',
    type: 'String',
};

function myValidator(value, settings) {
    let message, valid;

    const finalSettings = __deepMerge(
        {
            i18n: {
                string: 'Must start with "CK"',
            },
            trim: true,
        },
        settings ?? {},
    );

    if (finalSettings.trim) {
        value = value.trim();
    }

    valid = value.match(/^CK.*/);
    if (!valid) {
        message = finalSettings.i18n.string;
    }

    return {
        valid,
        message,
    };
}

// Register our new validator
__SValidator.registerValidator('myValidator', myValidator, {
    definition: definition,
});
```

## I18n

Here's the default `en` i18n translations.
To translate your messages, simply translate the messages based on this structure and pass your new object to the `i18n` settings.

```js
{{ jsonStringify en }}
```

## Settings

{{> interface namespace='@coffeekraken.s-validator.shared.interface.SValidatorSettingsInterface' }}

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-validator.shared.SValidator)

{{/ layout-readme }}
