<!--
/**
 * @name            Overview
 * @namespace       doc.docmap
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Docmap           /doc/docmap/overview
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# What is a docmap?

A docmap is nothing more that a **json file that lists all of the documentation you can have** inside your project.

When we say "**documentation**", it means meanly "**docblocks**" that you may have written in your source files.

## What is a docblock?

A docblock is a simple block written using the [Docblock syntax](https://en.wikipedia.org/wiki/Docblock).

It may look like this:

```js
/**
 * @name            MyCoolFunction
 * @namespace       something.cool
 * @type            Function
 *
 * This is my cool function that may or may not output the wonderful poop emoji... Pretty neat don't you think?
 *
 * @param       {Boolean}           [force=false]           Specify if you want to force the poop or not
 * @return      {String}                                    The poop emoji character
 *
 * @author      Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (force = false): string {
    // ...
}
```

## What is the purpose of a docmap

A docmap can be useful for many things like **indexing where to find the documentation** for a particular function, class, etc...

It can be used to generate a documentation website **as we are doing for the whole Coffeekraken ecosystem**.

The only thing that limit what you can do with that is your imagination. As the docmap is just a "**directory**" of your documentation, you can build everything you want on top of that.

> Make sure to take a look at the others documentation about docmap to learn how to build your own, how to write your docblocks for the best results as well as how to access your docmap through his simple API...

{{/layout-doc }}
