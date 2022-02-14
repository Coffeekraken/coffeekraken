<!--
/**
 * @name            Default
 * @namespace       doc.recipes.builtIn
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Built-in          /doc/recipes/built-in/default
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Default recipe

The `default` built-in recipe has been thinked to be the more versatile as possible for projects like:

- Website/templates based on `html`, `blade` or `twig` views.
- Make uses of mixins, functions and theming capabilities of the `@coffeekraken/postcss-sugar-plugin`.
- Uses of images that needs to be compressed and optimized.

## Stacks

This recipe have these stacks available:


#### Stack `new`

Allows you to create a new project using this recipe.

###### Usage

```bash
sugar new
```

###### Actions

- `copy`
    - Copy the base project template folder
    - [More on the copy action](/doc/recipes/actions/copy)
- `rename`
    - Rename the created folder with your project name
    - [More on the rename action](/doc/recipes/actions/rename)
- `addSugarJson`
    - Add the `sugar.json` file in your project
    - [More on the addSugarJson action](/doc/recipes/actions/addSugarJson)
- `addManifestJson`
    - Add a `manifest.json` file in your project
    - [More on the addManifestJson action](/doc/recipes/actions/addManifestAction)
- `installDependencies`
    - Install your project dependencies
    - [More on the installDependencies action](/doc/recipes/actions/installDependencies)

#### Stack `dev`

Start the development environment with these actions under the hood:

###### Usage

```bash
sugar dev
```

###### Actions

- `frontendServer`
    - Start the frontend development server
    - [More on the frontendServer action](/doc/recipes/actions/frontendServer)
- `vite`
    - Start the vite development server
    - [More on the vite action](/doc/recipes/actions/vite)

#### Stack `build`

This stack allows you to build your assets, images, etc... for production

###### Usage

```bash
sugar build
```

###### Actions

- `postcssBuild`
    - Build your css
    - [More on the postcssBuild action](/doc/recipes/actions/postcssBuild)
- `viteBuild`
    - Build your `js/ts` for production
    - [More on the viteBuild action](/doc/recipes/actions/viteBuild)
- `imagesBuild`
    - Build, compress and optimize your images for production
    - [More on the imagesBuild action](/doc/recipes/actions/imagesBuild)
- `faviconBuild`
    - Build and generate your favicon from the `src/img/favicon/favicon.png` file
    - [More on the faviconBuild action](/doc/recipes/actions/faviconBuild)

#### Stack `prod`

This stack allows you to start your frontendServer and serve your website with the `production` assets

###### Usage

```bash
sugar prod
```

###### Actions

- `frontendServer`: [More on the frontendServer action](/doc/recipes/actions/frontendServer)

<!-- 
-   Uses `js/ts` sources files
    -   ES module support
    -   Typescript support
    -   Compiled on the fly through [vitejs](https://vitejs.dev/)
    -   HMR
    -   Support for files like `.svelte`, `.vue`, and more...
-   Uses `css` sources files
    -   Compile CSS through [PostCSS](https://postcss.org/)
    -   Built-in support for [Sugar PostCSS Plugin](https://www.npmjs.com/package/@coffeekraken/s-sugar-postcss-plugin)
    -   Compiled on the fly through [vitejs](https://vitejs.dev/)
-   Uses `images`
    -   Compressed and resolutions/webp automatic generation through [@coffeekraken/s-images-builder](https://www.npmjs.com/package/@coffeekraken/s-images-builder) package
-   Uses views engines like:
    -   `.blade.php`: Built-in support for [BladePHP](https://github.com/EFTEC/BladeOne)
    -   `.twig`: Build-in support for [Twig](https://twig.symfony.com/)
    -   And more to come depending on needs...
-   And more like:
    -   Direct access to [@coffeekraken/sugar](https://www.npmjs.com/package/@coffeekraken/sugar) toolkit
    -   Easy documentation writing through [@coffeekraken/s-markdown-builder](https://www.npmjs.com/package/@coffeekraken/s-markdown-builder)
    -   Easy access project documentation through the [@coffeekraken/s-vsdoc](https://www.npmjs.com/package/@coffeekraken/s-vsdoc) VSCode extension -->

{{/layout-doc }}
