/**
*
* @name            findUp
* @namespace            node.fs
* @type            Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* This function simply walk across upper folders to search for a file
* and returns you the first finded
*
* @param       {IFindUpSearch}         search          The name of the file you search
* @param       {IFindUpSettings}       [settings={}]       An object of settings to configure your research
* @return      {SFile|null}                                 An SFile instance or null if nothings founded
*
* @example         js
* import findUp from '@coffeekraken/sugar/node/fs/findUp';
* const file = await findUp('myCoolFile.json', {});
* console.log(file.path);
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/