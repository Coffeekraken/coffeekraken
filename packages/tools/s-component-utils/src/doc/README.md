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

## Utilities to help working with customElements

This class gives you access to some utilities to help you working with customElement like accessing props (attributes), specify when you want to "mount" your component, etc...

## Usage

Here's how to use our implementation:

```js
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __SInterface from '@coffeekraken/s-interface';

// creating an interface for our component
class MyInterface extends __SInterface {
    static get definition() {
        return {
            prop1: {
                description: 'My cool property',
                type: 'String',
                required: true
            },
            prop2: {
                description: 'My other property',
                type: 'String',
                default: 'world'
            }
        }
    }
}

// getting out component node
const $myComponent = document.querySelector('my-component');

// initiating out component utils instance with our dom element, props and settings
const componentUtils = new __SComponentUtils($myComponent, {
    prop1: 'Hello',
    mountWhen: 'inViewport'
}, {
    componentUtils: {
        interface: MyInterface
    }
});

// wait until the "mountWhen" is reached
await componentUtils.waitAndExecute();

// { prop1: 'Hello', prop2: 'world' }
console.log(componentUtils.props);

// true / false
componentUtils.isInViewport();

// and more...
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-component-utils.js.SComponentUtils)

#### Settings

{{> interface namespace='@coffeekraken.s-component-utils.js.interface.SComponentUtilsSettingsInterface' }}

#### Default props

The component utils class define some default properties that all of the component using it will have. Here's the list:

{{> interface namespace='@coffeekraken.s-component-utils.js.interface.SComponentUtilsDefaultPropsInterface' }}

{{/ layout-readme }}