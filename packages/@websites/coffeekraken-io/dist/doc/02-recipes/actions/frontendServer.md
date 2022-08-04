<!--
/**
 * @name            frontendServer
 * @namespace       doc.recipes.actions
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Actions          /doc/recipes/actions/frontendServer
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

<!-- image -->

<!-- header -->
##### @coffeekraken/coffeekraken-io



# Action `frontendServer`

This action allows you to start a `development` server that will handle things like views rendering, static files serving and more...

> For more informations about our frontend server, please check the [@coffeekraken/s-frontend-server documentation](/@coffeekraken/s-frontend-server/doc/readme)

### Example

Here's an example of usage in a fictive recipe config file:

```js
export default function (env, config) {
  return {
    title: "My cool recipe",
    description: "...",
    defaultStack: "dev",
    stacks: {
      dev: {
        description: "Development stack",
        actions: {
          frontendServer: {
            extends: "frontendServer",
            params: {},
          },
          // etc...
        },
      },
      // etc...
    },
  };
}

```


### Parameters

Here's the parameters that you can pass to this action:


```js


```



