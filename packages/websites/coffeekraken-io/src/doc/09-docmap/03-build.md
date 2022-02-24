<!--
/**
 * @name            Build
 * @namespace       doc.docmap
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Docmap           /doc/docmap/build
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Building your docmap

To build your docmap, the easiest wait is to use the `sugar` CLI like so:

```shell
sugar docmap.build
```

> Make sure to launch this command in your project root directory.

## Sources

The docmap builder will search for all your project dependencies that have themselves a `docmap.json` file at their root, and it will search inside your project for files that have 1 or more docblock(s) with a `@namespace ...` tag.
This `@namespace` tag is required as the builder uses it to store the item under the good namespace.

As you may doubt, the builder will not take a look inside the `node_modules` directory to search for files with the `@namespace` tag. This would be way to slow and not requested. In fact, the builder will take a look in your files using these glob patterns:

{{#each config.docmap.build.globs}}
- `{{this}}`
{{/each}}

Here's are the excluded folders:

{{#each config.docmap.build.exclude}}
- `{{this}}`
{{/each}}

If you need to update or add some globs to search in, simply create a file under `.sugar/docmap.config.ts` and fill it like so:

```js
export default function (env, config) {
    if (env.platform !== 'node') return {};
    return {
        build: {
            globs: [...(config.docmap.build.globs ?? []), 'something/**/*'],
        },
    };
}
```

## Output

By default, the build command will generate a `docmap.json` file in your project root folder. We recommend you to keep this like that but if you want to update the output location, you can do so by updating the `config.docmap.build.outPath` configuration.

{{/layout-doc }}
