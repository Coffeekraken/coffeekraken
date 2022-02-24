<!--
/**
 * @name            rename
 * @namespace       doc.recipes.actions
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Actions          /doc/recipes/actions/rename
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Action `rename`

This action allows you to rename a package. This will take care of:

1. Renaming the folder we're in
2. Renaming the package inside the `package.json` file

### Example

Here's an example of usage in a fictive recipe config file:

```js
export default function(env, config) {
    return {
        title: 'My cool recipe',
        description: '...',
        defaultStack: 'dev',
        stacks: {
            new: {
                description: 'Create a new project',
                actions: {
                    rename: {
                        extends: 'rename',
                        params: {
                            name: undefined, // the user will be prompted for it...
                            folder: true
                        }
                    },
                    // etc...
                }
            },
            dev: {
                // etc...
            },
            // etc...
        }
    }
}
```

### Parameters

Here's the parameters that you can pass to this action:

{{> interface namespace='@coffeekraken.cli.node.package.interface.SCliPackageRenameParamsInterface' }}

> If you don't specify some parameters in your recipe, the user will be prompted for them...

{{/layout-doc }}
