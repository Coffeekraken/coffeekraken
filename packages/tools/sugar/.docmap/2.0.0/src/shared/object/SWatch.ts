/**
*
* @name 		            SWatch
* @namespace            js.object
* @type                Class
* @platform          js
* @platform          ts
* @platform          node
* @status        wip
*
* This class allows you to easily monitor some object properties and get the new and old value of it
*
* @param       {Object}      object        The object to watch
* @param       {Object}      [settings={}]       An object of settings to configure your watch process
* - deep (true) {Boolean}: Specify if you want to watch the object deeply or just the first level
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* // create the watcher instance
* const watchedObj = new SWatch({
* 		title : 'Hello World'
* });
*
* // watch the object
* watchedObj.on('title:set', watchResult => {
*  	// do something when the title changes
* });
*
* // update the title
* watchedObj.title = 'Hello Universe';
*
* @since         2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                    _watchStack
* @type                    Object
* @private
*
* Watch stack
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name            _settings
* @type            Object
* @private
*
* Store the settings object to configure your watch instance
*
* @since         2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name                      constructor
* @type                      Function
*
* Constructor
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/