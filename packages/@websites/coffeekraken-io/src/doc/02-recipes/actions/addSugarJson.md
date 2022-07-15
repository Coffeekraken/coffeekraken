<!--
/**
 * @name            addSugarJson
 * @namespace       doc.recipes.actions
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Actions          /doc/recipes/actions/addSugarJson
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Action `addSugarJson`

This action allows you to make sure the current project has a `sugar.json` file.

### Example

Here's an example of usage in a fictive recipe config file:

```js
export default function (env, config) {
  return {
    title: "My cool recipe",
    description: "...",
    defaultStack: "dev",
    stacks: {
      new: {
        description: "Create a new project",
        actions: {
          addSugarJson: {
            extends: "addSugarJson",
            params: {
              recipe: "myCoolRecipe",
            },
          },
          // etc...
        },
      },
      dev: {
        // etc...
      },
      // etc...
    },
  };
}
```

### Parameters

Here's the parameters that you can pass to this action:

{{> interface namespace='@coffeekraken.cli.node.add.interface.SCliAddSugarJsonParamsInterface' }}

{{/layout-doc }}
