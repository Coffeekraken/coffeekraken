<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- body -->

<!--
/**
* @name            Register new config files
* @namespace       doc.config
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Configuration           /doc/config/register
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Registering new config files

To register some new configuration files for your package, you just need to create a `sugar.json` file at your package root directory and specify where are stored your configuration files like so:

```js
export default {
  config: {
    folders: [
      {
        path: './dist/pkg/%moduleSystem/config',
      },
    ],
  },
};

```

