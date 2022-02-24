<!--
/**
 * @name            addManifestJson
 * @namespace       doc.recipes.actions
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Actions          /doc/recipes/actions/addManifestJson
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Action `addManifestJson`

This action allows you to make sure the current project has a `manifest.json` file. If not, it will create it using the informations found in the `package.json` file.

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
                    addManifestJson: {
                        extends: 'addManifestJson',
                        params: {}
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

{{> interface namespace='@coffeekraken.cli.node.add.interface.SCliAddManifestJsonParamsInterface' }}

{{/layout-doc }}
