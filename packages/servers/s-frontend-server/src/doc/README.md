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

## Simply and powerful development server

This package represent the development server used to serve things like php views (`blade`, `twig`, etc...) and provide simple `routing system` and template data providing like `docmap`, `packageJson`, and more...

## Usage

Here's how to use our implementation:

```js
import __SFrontendServer from '@coffeekraken/s-frontend-server';
const server = new __SFrontendServer();
await server.start({
    port: 8080,
    // etc...
});
```

### Technology

This server is using the AMAZING [Express](https://expressjs.com/) package to handle HTTP requests, register routes, etc...

### Modules

All the server is structured around `modules`. A module is simply a function that will take as parameter the `express` app instance and hook the Express server with new middlewares, routes, etc...

### Built-in modules

By default, the server comes with some built-in modules that handles common stuffs like rendering a `view`, etc. Here's the list of these modules:

- [Root files](/@coffeekraken/s-frontend-server/doc/modules/rootFiles)
- [Docmap](/@coffeekraken/s-frontend-server/doc/modules/docmap)
- [View](/@coffeekraken/s-frontend-server/doc/modules/view)
- [Styleguide](/@coffeekraken/s-frontend-server/doc/modules/styleguide)
- [Config](/@coffeekraken/s-frontend-server/doc/modules/config)
- [Frontspec](/@coffeekraken/s-frontend-server/doc/modules/frontspec)
- [Api](/@coffeekraken/s-frontend-server/doc/modules/api)

<!-- ### Extending the server

Extending the server lets you add new handlers, register dynamic routes as well as exposing some API's and more.

To do so, check out [our extend documentation](/@coffeekraken/s-frontend-server/doc/extends/) -->

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-frontend-server.node.SFrontendServer)

#### `server.start()` parameters

{{> interface namespace='@coffeekraken.s-frontend-server.node.interface.SFrontendServerStartParamsInterface' }}

{{/ layout-readme }}