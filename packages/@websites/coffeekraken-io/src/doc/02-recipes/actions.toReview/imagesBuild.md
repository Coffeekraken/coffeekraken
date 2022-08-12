<!--
/**
 * @name            imagesBuild
 *
 * @TODO            namespace       doc.recipes.actions
 *
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Actions          /doc/recipes/actions/imagesBuild
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Action `imagesBuild`

This action allows you to build, compress and optimize your images using our `@coffeekraken/s-images-builder` package.

> For more informations about our images builder, please check the [@coffeekraken/s-images-builder documentation](/@coffeekraken/s-images-builder/doc/readme)

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
                    imagesBuild: {
                        extends: 'imagesBuild',
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

{{> interface namespace='@coffeekraken.s-images-builder.node.interface.SImagesBuilderBuildParamsInterface' }}

{{/layout-doc }}
