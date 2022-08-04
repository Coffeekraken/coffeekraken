<!--
/**
 * @name            Overview
 * @namespace       doc.images
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Images           /doc/images/overview
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

<!-- image -->

<!-- header -->
##### @coffeekraken/coffeekraken-io



# Images management overview

Images are central to web development. It's not only central but sometimes painful to work with.

Coffeekraken comes with a simple, elegant and fully customizable solution. Here's the points that we think are painful in image management and how we handle these:

## Our solution

1. Images are in multiple formats like `.jpg`, `.png`, etc...
   - Our solution handles:
     - `.jpg`
     - `.png`
     - `.gif`
     - `.svg`
     - `.webp`
2. Sometimes (everytime), images are not optimized for the web
   - Too big images
     - You can specify some `max-width` and `max-height` for your images
   - They are not compressed
     - You can simply set a `quality` target percentage
   - We need different `resolution`
     - Simply specify the resolution(s) you want to have multiple images outputs like `[1,2,3]` that will generate images for these 3 resolutions
3. Free `.webp` output if you want
   - Simply set the `webp` setting to `true`

## Fully customizable

Don't worry, if our default configuration does not suits your needs, you can as well override it as for the rest of the modules.

To do so, simply create a file `.sugar/imageBuilder.config.js` and override the settings you want.

# Config partial

