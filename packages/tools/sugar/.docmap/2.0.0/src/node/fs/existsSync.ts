/**
*
* @name        existsSync
* @namespace            node.fs
* @type        Function
* @platform        ts
* @platform        node
* @status          beta
*
* This function simply check if the path passed exists.
* You can specify what you want to take care of using the settings object
*
* @param       {String}        path        The path you want to check
* @param       {IExistsSettings}       [settings={}]       Some settings for what you want to take care of
* @return      {Boolean}                       true if exists, false if not
*
* @setting       {Boolean}       [directory=true]      Specify if you want to take care of directories
* @setting         {Boolean}       [file=true]         Specify if you want to take care of files
* @setting         {Boolean}       [symlink=true]      Specify if you want to take care of symlinks
*
* @example         js
* import exists from '@coffeekraken/sugar/fs/exists';
* exists('/something/cool.txt'); // => true
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/