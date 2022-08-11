<!--
/**
 * @name            viteBuild
 * @namespace       doc.recipes.actions
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Actions          /doc/recipes/actions/viteBuild
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Action `viteBuild`

This action allows you to build your `js/ts` and `css` assets using the [viteBuildjs](https://viteBuildjs.dev) library.

Note that this embed the `@coffeekraken/s-postcss-sugar-plugin` plugin so you can make use of all the power it provides directly.

> For more informations about our viteBuildjs integration, please check the [@coffeekraken/s-vite documentation](/@coffeekraken/s-vite/doc/readme)

### Example

Here's an example of usage in a fictive recipe config file:

```js
export default function (env, config) {
  return {
    title: "My cool recipe",
    description: "...",
    defaultStack: "dev",
    stacks: {
      build: {
        description: "Development stack",
        actions: {
          viteBuild: {
            extends: "viteBuild",
            params: {},
          },
          // etc...
        },
      },
      dev: {},
      // etc...
    },
  };
}
```

### Parameters

Here's the parameters that you can pass to this action:

{{> interface namespace='@coffeekraken.s-vite.node.interface.SViteBuildParamsInterface' }}

{{/layout-doc }}
