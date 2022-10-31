<!--
/**
 * @name            postcssBuild
 *
 * @TODO            namespace       doc.recipes.actions
 *
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Actions          /doc/recipes/actions/postcssBuild
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Action `postcssBuild`

This action allows you to build your postcss files down to a production ready css file.

> For more informations about our postcss builder, please check the [@coffeekraken/s-postcss-builder documentation](/@coffeekraken/s-postcss-builder/doc/readme)

### Example

Here's an example of usage in a fictive recipe config file:

```js
export default function (env, config) {
    return {
        title: 'My cool recipe',
        description: '...',
        defaultStack: 'dev',
        stacks: {
            dev: {
                description: 'Development stack',
                actions: {
                    postcssBuild: {
                        extends: 'postcssBuild',
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

{{> interface namespace='@coffeekraken.s-postcss-builder.node.interface.SPostcssBuilderBuildParamsInterface' }}

{{/layout-doc }}
