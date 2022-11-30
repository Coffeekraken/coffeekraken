<!--
/**
 * @name            installDependencies
 *
 * @TODO            namespace       doc.recipes.actions
 *
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Actions          /doc/recipes/actions/installDependencies
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Action `installDependencies`

This action allows you to install your dependencies like the `node_modules` ones as well as the `composer` if present.

### Example

Here's an example of usage in a fictive recipe config file:

```js
export default function (env, config) {
    return {
        title: 'My cool recipe',
        description: '...',
        defaultStack: 'dev',
        stacks: {
            new: {
                description: 'Create a new project',
                actions: {
                    installDependencies: {
                        extends: 'installDependencies',
                        params: {},
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

{{> interface namespace='@coffeekraken.cli.node.package.interface.SCliPackageInstallParamsInterface' }}

{% endblock %}
