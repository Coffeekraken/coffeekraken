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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-readme }}

## Define and use interfaces with ease

This package allows you to define interfaces for your objects by specifying the type you want, a description for documentation, some accepted values, if the value is required, etc...

With all of that, you will be able to make things like:

- **Apply your interface on a simple object** and get back the final mixed values
- Check that the passed **data are correct**
- Get back an object with all the **default values**
- and more...

## Usage

Here's how to use our implementation:

```js
import __SInterface from '@coffeekraken/s-interface';

class MyInterface extends __SInterface {
    static get _definition() {
        return {
            property1: {
                description: 'My cool property',
                type: 'Boolean',
                required: true
            },
            property2: {
                description: 'My cool property',
                type: 'String',
                default: 'Hello world'
            }
        }
    }
}

// get the default values object
const defaults = MyInterface.defaults();

// apply the interface on a custom object
const finalValues = MyInterface.apply({
    property1: true
}); // => { property1: true, property2: 'Hello world' }

// throw an error
MyInterface.apply({
    property1: 'hello'
});
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-interface.shared.SInterface)

{{/ layout-readme }}