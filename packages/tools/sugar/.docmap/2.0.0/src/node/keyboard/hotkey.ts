/**
*
* @name                hotkey
* @namespace            node.keyboard
* @type                Function
* @platform        ts
* @platform        node
* @status          beta
*
* This function allows you to add keyboard listening process and subscribe to some sequences
* using the SPromise instance returned.
*
* @param        {String}       hotkey          The hotkey to detect
* @param         {Object}      [settings={}]    An option object to configure your hotkey. Here's the list of available settings:
* - once (false) {Boolean}: Specify if you want to detect the keyboard event just once
* - splitChar (+) {String}: Specify the split key to use in the sequences like "ctrl+a"
* - systemWide (false) {Boolean}: Specify if the listener have to listen for the application only events, or for the system level ones
* @return      {SPromise}                       An SPromise instance on which you can register for "key" stack event
*
* @todo      interface
* @todo      doc
* @todo      tests
* @todo      {Feature}       Add IPC support to allow listen for key press in child processes
* @todo      {Feature}       Add the system wide support
*
* @example         js
* import hotkey from '@coffeekraken/sugar/node/keyboard/hotkey';
* const promise = hotkey('ctrl+a').on('key', (e) => {
*    // do something...
* });
* promise.cancel();
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/