/**
*
* @name            expandGlob
* @namespace            js.glob
* @type            Function
* @platform          js
* @platform          ts
* @platform          node
* @status            alpha
*
* This function take some extended glob pattern(s) and expand them to standard supported
* glob patterns. With this, you will have access to some syntax sugar like these:
* - /something/**{2,4}/*.ts => **{2,4} = search in level 2 bis level 4
*
* @param       {String|Array<String>}      globs           The glob(s) to expand
* @return      {Array<String>}                             An array of expanded globs
*
* @example         js
* import expandGlob from '@coffeekraken/sugar/js/glob/expandGlob';
* expandGlob('/something/**{2,4}/*.ts');
* // ['/something/* /* /*.ts','/something/* /* /* /*.ts', '/something/* /* /* /* /*.ts']
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/