<!-- 
 * @name            Default
 * @namespace       doc.recipes.builtIn
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes / Built-in           /doc/recipes/built-in/default
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
-->

{{#> layout-doc }}

# Default recipe ```default```

The ```default``` built-in recipe has been thinked to be the more versatile as possible for projects like:

- Uses ```js/ts``` sources files
    - ES module support
    - Typescript support
    - Compiled on the fly through [vitejs](https://vitejs.dev/)
    - HMR
    - Support for files like ```.svelte```, ```.vue```, and more...
- Uses ```css``` sources files
    - Compile CSS through [PostCSS](https://postcss.org/)
    - Built-in support for [Sugar PostCSS Plugin](https://www.npmjs.com/package/@coffeekraken/s-sugar-postcss-plugin)
    - Compiled on the fly through [vitejs](https://vitejs.dev/)
- Uses ```images```
    - Compressed and resolutions/webp automatic generation through [@coffeekraken/s-images-builder](https://www.npmjs.com/package/@coffeekraken/s-images-builder) package
- Uses views engines like:
    - ```.blade.php```: Built-in support for [BladePHP](https://github.com/EFTEC/BladeOne)
    - ```.twig```: Build-in support for [Twig](https://twig.symfony.com/)
    - And more to come depending on needs...
- And more like:
    - Direct access to [@coffeekraken/sugar](https://www.npmjs.com/package/@coffeekraken/sugar) toolkit
    - Easy documentation writing through [@coffeekraken/s-markdown-builder](https://www.npmjs.com/package/@coffeekraken/s-markdown-builder)
    - Easy access project documentation through the [@coffeekraken/s-vsdoc](https://www.npmjs.com/package/@coffeekraken/s-vsdoc) VSCode extension


{{/layout-doc }}