/**
*
* @name                            deepProxy
* @namespace            js.object
* @type                            Function
* @platform          js
* @platform          ts
* @platform          node
* @status        wip
*
* This function allows you to add Proxy to an object in deep fashion.
* Normally the Proxy process only the level on which it has been added. Here we add Proxy to all the
* object levels and to new properties as well.
*
* On the returned proxied object, you will have access to the ```revoke``` method that you can call to revoke the proxy applied.
* This method will return you a shallow version of the proxied object that you can use as you want
*
* @param          {Object}                 object            The object on which to add the proxy
* @param           {Function}                handlerFn       The handler function that will be called with the update object. It can be a property deleted, an array item added, a property updated, etc...:
* - set: An object property added or updated
* - delete: An object property deleted
* - push: An item has been added inside an array
* - {methodName}: Every array actions
* @param         {Object}                [settings={}]         An object of settings to configure your proxy:
* - deep (true) {Boolean}: Specify if you want to watch the passed object deeply or juste the first level
* - handleSet (true) {Boolean}: Specify if you want to handle the "set" action
* - handleGet (false) {Boolean}: Specify if you want to handle the "get" action
* - handleDelete (true) {Boolean}: Specify if you want to handle the "delete" action
* @return          {Object}                                  The proxied object
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example           js
* import deepProxy from '@coffeekraken/sugar/js/object/deepProxy';
* const a = deepProxy({
*    hello: 'world'
* }, (actionObj) => {
*    // do something with the actionObj...
* });
* a.hello = 'coco';
*
* @since       2.0.0
* @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/