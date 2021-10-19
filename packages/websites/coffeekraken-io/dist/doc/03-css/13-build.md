<!--
/**
 * @name            Build
 * @namespace       doc.css
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CSS           /doc/css/build
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

<!-- image -->

<!-- header -->
##### 



# CSS build process

The toolkit make use of the AWESOME [PostCSS](https://postcss.org/) compiler that allows us to enhance CSS using our familiar JS language.
It's fast, reliable and pleasant to work with.

## Compilation

To compile your CSS, you can simply run one of these commands in your terminal at the root of your project:

```shell
# Compile only the CSS
sugar postcss.build
# Launch the development environment with local server, CSS compilation, JS compilation, etc...
sugar
```

By default, the compiler will take the `src/css/index.css` file as input and will save the builded one to `dist/css/index.css`.

All of these configurations are specified inside the `postcssBuilder.config.ts` config file that you can override as all the others settings following the [configuration documentation](/doc/config/overview).

## Configuration

The configuration used by the `SPostcssBuilder` are these ones:

-   `postcssBuilder.config.ts`: Direct builder configuration like input, output, etc...
-   `postcss.config.ts`: [PostCSS](https://postcss.org) under the hood configurations
-   `purgecss.config.ts`: [PurgeCSS](https://purgecss.com/) under the hood configurations

