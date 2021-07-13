/**
*
* @name            buildInNodeModules
* @namespace            node.module
* @type            Object
* @platform        ts
* @platform        node
* @status          beta
*
* This object store the list of built-in node module
* with a polyfill property for each that point to some
* polyfill depending on the context wanted. It can be "browser"
* or some others to come depending on the needs...
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example             js
* import builtInNodeModules from '@coffeekraken/sugar/node/module/builtInNodeModules';
* // {
* //   os: {
* //     polyfill: {
* //        browser: 'os-browserify'
* //     }
* //   },
* //   ...
* // }
*
* @since           2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/