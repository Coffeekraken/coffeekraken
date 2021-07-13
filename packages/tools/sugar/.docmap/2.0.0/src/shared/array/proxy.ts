/**
*
* @name                  proxy
* @namespace            js.array
* @type                  Function
* @platform          js
* @platform          ts
* @platform          node
* @status              wip
*
* This function override the passed array prototype to intercept changes made through
*
* @param         {Array}           array           The array to proxy
* @return        {Array}                           The same array with his prototype proxied
*
* @example       js
* import proxy from '@coffeekraken/sugar/js/array/proxy';
* const myArray = proxy([1,2,3]);
* myArray.watch(['push','pop'], (watchObj) => {
*    // check the watchObj action
*    switch (watchObj.action) {
*      case 'push':
*        // do something...
*      break;
*    }
* });
*
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                    watch
* @type                    Function
*
* This method allows you to specify which Array methods you want to watch by passing an array of methods names like ['push','pop'].
* You can also specify the handler function that will be called on each array updates, etc...
*
* @param         {Array|String}          methods               The methods you want to watch
* @param         {Function}              handler               The function that will be called on each updates. This function will be called with an object as parameters. Here's the list of properties available:
* - method (null) {String}: The method name that causes the watch emit
* - args ([]) {Array}: An array of all the arguments passed to the method call
* - oldValue (null) {Array}: The array just before the method call
* - value (null) {Array}: The array after the method call
* - returnedValue (null) {Mixed}: This is the value that the method call has returned
* @return        {String}                                    Return a uniq watchid that you can use to unwatch this process
*
* @example         js
* const watchId = myProxiedArray.watch(['push', 'pop'], (watchObj) => {
*    // do something...
* });
*
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                  unwatch
* @type                  Function
*
* This methods allows you to unwatch a process started with the "watch" method.
* You have to pass as parameter the watchId that the "watch" method has returned you.
*
* @param       {String}          watchId         The watchId returned by the "watch" method
*
* @example       js
* const watchId = myArray.watch('push', (obj) => //...);
* myArray.unwatch(watchId);
*
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/