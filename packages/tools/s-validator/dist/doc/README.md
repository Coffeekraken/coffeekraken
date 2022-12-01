<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-validator

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-validator?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-validator)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-validator?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-validator)
[![license](https://shields.io/npm/l/@coffeekraken/s-validator?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Simple and powerfull class that let you pass a value with rules to validate it, and get back what&#039;s ok and what&#039;s not with messages for each errors.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-validator

```

<!-- body -->

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


-   ****: Validate string, array, object and number using the &quot;min&quot; rule
    
-   ****: Validate string, array, object and number using the &quot;max&quot; rule
    
-   ****: Validate an email string
    
-   ****: Make sure a value has been provided
    
-   ****: Validate an iso date string
    
-   ****: Validate an iso time string
    
-   ****: Validate an iso date string
    
-   ****: Validate an integer
    
-   ****: Validate an number
    
-   ****: Validate an negative number
    
-   ****: Validate an positive number
    
-   ****: Validate a string using a regex pattern
    
-   ****: Validate an alphanum string
    
-   ****: Validate a credit card string
    
-   ****: Validate a color string
    
-   ****: Validate a hexadecimal string
    
-   ****: Validate a password string
    
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
    settings ?? {}
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
export default {
  min: {
    string: 'Must have at least %n characters',
    object: 'Must have at least %n properties',
    number: 'Must be greater than %n',
    array: 'Must have at least %n items',
  },
  max: {
    string: 'Must have at max %n characters',
    object: 'Must have at max %n properties',
    number: 'Must be lower than %n',
    array: 'Must have at max %n items',
  },
  email: { string: 'Must be a valid email address' },
  required: { default: 'This is required' },
  isoDate: { string: 'Must be a valid ISO date' },
  isoTime: { string: 'Must be a valid ISO time' },
  isoDateTime: { string: 'Must be a valid ISO date time' },
  integer: { string: 'Must be an integer' },
  number: { string: 'Must be an number' },
  negative: { string: 'Must be a negative number' },
  positive: { string: 'Must be a positive number' },
  pattern: { string: 'Must match the pattern %pattern' },
  alphanum: { string: 'Must contain only alphanumeric characters' },
  creditCard: { string: 'Must be a valid credit card number' },
  color: { string: 'Must be a valid color (hex, rgb, rgba, hsl, hsla)' },
  hex: { string: 'Must be a valid hex color' },
  password: {
    weak: '',
    medium:
      'Must be >=6 characters, at least 1 lowercase/uppercase/special character',
    strong:
      'Must be >=8 characters, at least 1 lowercase/uppercase/digit/special character',
  },
};

```

## Settings

<span class="s-typo s-typo--code">
SValidatorSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
i18n             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify the i18n translation object. See the README for more informations.</p>
</dt>
</dl>

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-validator.shared.SValidator)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
