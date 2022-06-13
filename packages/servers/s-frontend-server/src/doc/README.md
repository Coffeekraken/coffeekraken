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

## SFrontendServer

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

{{#each config.frontendServer.modules}} - **{{@key}}**: {{this.description}}
{{/each}}

[More on modules](/doc/servers/modules)

## Handlers

Handlers are `controllers` for specific routes. This mean that when you call for example the route `/something/cool`, you must have an handler registered to take care of this request.

{{#each config.frontendServer.handlers}} - **{{@key}}**: {{this.description}}
{{/each}}

[More on handlers](/doc/servers/handlers)

## Middlewares

Middlewares are functions that will be executed between the incoming request and the response sending to client. For more information about middlewares, I let you check the [express.js middleware documentation](https://expressjs.com/en/guide/using-middleware.html).

{{#each config.frontendServer.middlewares}} - **{{@key}}**: {{this.description}}
{{/each}}

[More on middlewares](/doc/servers/middlewares)

## Routing

The routing of this server is pretty simple and stands on the `src/pages` folder structure.

Admit that we have this folder structure:

```shell
|
| src
|---| pages
|   |---| hello
|       |---| hello.ts
|---| views
|   |---| hello.twig
|
```

And that the `hello.ts` file contains:

```js
export default {
    views: ['hello'],
};
```

This will render the view stored under `src/views/hello.twig` when you reach the `/hello` url.

[More on routing](/doc/routing/overview)

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-frontend-server.node.SFrontendServer)

#### `server.start()` parameters

{{> interface namespace='@coffeekraken.s-frontend-server.node.interface.SFrontendServerStartParamsInterface' }}

{{/ layout-readme }}
