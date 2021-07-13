/**
*
* @name                    env
* @namespace            js.env
* @type                    Function
* @platform          js
* @platform          ts
* @platform          node
* @status              wip
*
* This function allows you to access environment variables through the same method in node and javascript
*
* @param           {String}          dotPath         The dot path (something.else) to tell which variable you want
* @param           {Mixed}           [value=null]    The value you want to assign. If null, you will just get the wanted variable back
* @return          {Mixed}                           The variable value
*
* @todo        interface
* @todo        doc
*
* @example         js
* import env from '@coffeekraken/sugar/js/dev/env';
* console.log(env('node_env')); // => production
* env('something.cool', { hello: 'world' });
*
* @since         2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/