<!--
/**
 * @name            vite
 * @namespace       doc.recipes.actions
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Actions          /doc/recipes/actions/vite
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Action `vite`

This action allows you to start a [Vitejs](https://vitejs.dev) server to handle live compilation of your `js/ts` and `css` assets.

Note that this embed the `@coffeekraken/s-postcss-sugar-plugin` plugin so you can make use of all the power it provides directly.

> For more informations about our vitejs integration, please check the [@coffeekraken/s-vite documentation](/@coffeekraken/s-vite/doc/readme)

### Example

Here's an example of usage in a fictive recipe config file:

```js
export default function(env, config) {
    return {
        title: 'My cool recipe',
        description: '...',
        defaultStack: 'dev',
        stacks: {
            dev: {
                description: 'Development stack',
                actions: {
                    vite: {
                        extends: 'vite',
                        params: {}
                    },
                    // etc...
                }
            },
            // etc...
        }
    }
}
```

### Parameters

Here's the parameters that you can pass to this action:

{{> interface namespace='@coffeekraken.s-vite.node.interface.SViteStartParamsInterface' }}

{{/layout-doc }}
