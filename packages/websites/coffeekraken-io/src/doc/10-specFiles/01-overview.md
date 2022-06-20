<!--
/**
 * @name            Overview
 * @namespace       doc.specfiles
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Spec files           /doc/specfiles/overview
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Spec files

A spec file is mainly a file that describe something like:

-   `frontspec.json`: Describe what the project has to offer for the frontend (js, css, typos, etc...)
-   `viewspec.json`: Describe what are the data to pass to a view. Useful to build your backend dynamically

These files are legit by some specifications that you can discover separatly in each files documentations.

## Why these spec files?

The goal of these files is to describe each part of your frontend like the views, resources (js, css), etc...

If we take the `viewspec.json` file for example. His goal is to describe a particular view like `hello.blade.php`.
By describing the data that this view depends on, you can use that and build your backend automatically. Pretty usefull for medium/large projects.

-   [More on `frontspec.json`](/doc/specfiles/frontspec)
-   [More on `viewspec.json`](/doc/specfiles/frontspec)

{{/layout-doc }}
