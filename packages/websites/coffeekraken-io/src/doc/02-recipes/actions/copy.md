<!--
/**
 * @name            copy
 * @namespace       doc.recipes.actions
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Actions          /doc/recipes/actions/copy
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Action `copy`

This action allows you to copy files/folder from a source (`src`), to a destination (`dest`).

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
                    copy: {
                        extends: 'copy',
                        params: {
                            src: '...',
                            dest: '...',
                            chdir: true // tell the process to change into the copied folder if it is one
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

{{> interface namespace='@coffeekraken.cli.node.fs.interface.SCliFsCopyParamsInterface' }}

{{/layout-doc }}
