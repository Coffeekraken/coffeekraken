<!--
/**
 * @name            Middlewares
 * @namespace       doc.servers
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Servers           /doc/servers/middlewares
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# SFrontendServer middlewares

Middlewares are functions that will be executed between the incoming request and the response sending to client. For more information about middlewares, I let you check the [express.js middleware documentation](https://expressjs.com/en/guide/using-middleware.html).

## Registering your own middleware

To register your own handler, the easiest way is to register it through a module.

> To check how to register a module, check the [modules documentation page](/doc/servers/modules).

```js
export default function myModule(express, settings, config) {
    config.middlewares.myMiddleware = {
        path: `/absolute/path/to/my/middleware`,
        settings: {},
    };
}
```

## Handler scaffold

Here's some base code that you can use for your handler:

```js
export default function myMiddleware(settings = {}) {
    return async function (req, res, next) {
        // do something for your middleware...
        if (!res.templateData) res.templateData = {};
        res.templateData.hello = 'world';
        // tell express to go next when finished
        next();
    };
}
```

{{/layout-doc }}
