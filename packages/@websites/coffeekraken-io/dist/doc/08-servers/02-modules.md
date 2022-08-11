<!--
/**
 * @name            Modules
 * @namespace       doc.servers
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Servers           /doc/servers/modules
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# SFrontendServer modules

The SFrontendServer is based on the AMAZING [ExpressJs](https://expressjs.com/) server. This mean that you can extend it as you want by following these steps described bellow:

## Built-in modules

Our server comes with some built-in modules. Here's the list:

{{#each config.frontendServer.modules}}

- `{{@key}}`: {{this.description}}
  {{/each}}

## Create your module

First of all, create a file (where you want) `src/node/myModule.ts` that will be the entry point of your module.

Here's the scaffold content that you can copy and past in your file:

```js
export default function myModule(express, settings, config) {
  // here you can update the config depending on the needs of your
  // module, as well as access the express app instance to register routes, etc...
}
```

## Register your module

To to register your module, simply add it to the `config.frontendServer.modules` by creating a file under `.sugar/frontendServer.config.ts` like this:

```js
export default function (env, config) {
  return {
    modules: {
      myModule: {
        path: "/absolute/path/to/your/module",
        settings: {},
      },
    },
  };
}
```

> For more information about configuring your server, check out the next doc that talk about `handlers`, `middleware` and `routes`.

{{/layout-doc }}
