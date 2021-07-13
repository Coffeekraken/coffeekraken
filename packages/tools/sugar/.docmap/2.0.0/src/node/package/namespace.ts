/**
*
* @name          namespace
* @namespace            node.package
* @type          Function
* @platform        ts
* @platform        node
* @status          wip
*
* This function take a string as parameter like a path, or a doted string like "something.cool" and return you
* a proper namespace build using the package name, your passed string sanitized, etc...
*
* @param       {String}        path        The string path to convert into a proper namespace
* @param       {Object}        [settings={}]     An object of settings to configure your namespace generation
* @return      {String}                    The generated namespace
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example     js
* import namespace from '@coffeekraken/sugar/node/package/namespace';
* namespace('something.cool'); => // coffeekraken.sugar.something.cool
*
* @since       2.0.0
* @author 		Olivier Bossel<olivier.bossel@gmail.com>

*/