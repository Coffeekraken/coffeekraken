<!-- 
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation           /doc/readme
 *
 * @see             https://github.com/axios/axios#response-schema
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## Simple and effective HTTP request package based on [Axios](https://github.com/axios/axios#response-schema)

This package allows you to make HTTP request simply with some feature like:

- If the request url contains a hash like `#something` and that the response is some `HTML`, the returned data will be directly the `HTMLElement` if exists in the response.
- And more to come as well...

> You may ask "**why don't use axios directly?**". We just want to stay in control with our implementations and having the choice to make updates as we need...

## Usage

Here's how to use our implementation:

```js
import __SRequest from '@coffeekraken/s-request';
const request = new __SRequest({
    url: 'https://something.com...'
});
const result = await request.send();
```

#### Response schema

```js
{
    status: 200,
    statusText: 'OK',
    data: {
        // data returned by the server...
    },
    count: 1,
    axiosResponse: {}, // raw axios response
    axiosResponses: [{}] // array of raw axios response(s)
}
```

#### Request parameters

{{> interface namespace='@coffeekraken.s-request.shared.interface.SRequestParamsInterface' }}

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-request.node.SRequest)

{{/ layout-readme }}