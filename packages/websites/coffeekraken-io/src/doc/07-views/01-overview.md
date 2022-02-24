<!--
/**
 * @name            Overview
 * @namespace       doc.views
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Views           /doc/views/overview
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Views support overview

Coffeekraken has a built-in server that support multiple views types like:

-   `.blade.php`
-   `.twig`
-   and more to comes...

These views are rendered using native PHP libraries through the `@coffeekraken/s-view-renderer` package.

> For more information about the `@coffeekraken/s-view-renderer`, please check his own documentation.

## Getting started

To start with our views system, consider the folder `{{rootRelative config.frontendServer.viewsDir}}` as the location where all your views will lives.

Take the example of creating a view that will be displayed through the `/view/mypage` path.

1. Create the file `{{rootRelative config.frontendServer.viewsDir }}/mypage/mypage.blade.php`
2. Fill your view with some html
3. Make sure your development stack is up using the `sugar dev` command
4. Go to `http://localhost:{{ config.frontendServer.port }}/view/mypage`

That's it! Your view is up and running

{{/layout-doc }}
