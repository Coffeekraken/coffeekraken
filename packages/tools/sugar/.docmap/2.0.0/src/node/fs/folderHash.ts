/**
*
* @name            folderHash
* @namespace       node.fs
* @type            Function
* @platform        node
* @platform        ts
* @platform        node
* @status          beta
*
* This function allows you to get back an integrity hash for the passed folder.
* This mean that if a folder returns the same integrity hash twice, the folder or files in it
* has not been updated...
*
* @param           {String}            folderPath      The folder path you want to get the hash back
* @param           {IFolderHashSettings}       [settings={}]       Some settings to configure your hash generation process
* @return          {String}                            The calculated folder hash
*
* @todo        tests
*
* @setting         {Boolean}           [recursive=true]            Specify if you want to generate a hash using also the children or not
*
* @example         js
* import folderHash from '@coffeekraken/sugar/node/fs/folderHash';
* folderHash('my/cool/folder'); // => YZOrKDx9LCLd8X39PoFTflXGpRU=,
*
* @see             https://www.npmjs.com/package/folder-hash
* @since           2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/