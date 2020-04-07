import __constructorName from "./constructorName";
import _get from "lodash/get";
import _set from "lodash/set";

/**
 * @name 		            SWatcher
 * @namespace           sugar.js.class
 * @type                Class
 *
 * This class allows you to easily monitor some object properties and get the new and old value of it
 *
 * @example 	js
 * // create the watcher instance
 * const watcher = new SWatcher();
 *
 * // object to watch
 * let myObject = {
 * 		title : 'Hello World'
 * };
 *
 * // watch the object
 * watcher.watch(myObject, 'title', (newVal, oldVal) => {
 *  	// do something when the title changes
 * });
 *
 * // update the title
 * myObject.title = 'Hello Universe';
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SWatcher {

  /**
   * @name                    _watchStack
   * @type                    Object
   * @private
   * 
   * Watch stack
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _watchStack = {};

  /**
   * @name                      constructor
   * @type                      Function
   * 
   * Constructor
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(object) {

    this._proxiedObject = this.createDeepProxy(object, {
      set: (obj, prop, value) => {


        // make tests to detect what is the update

        console.log('set', obj, prop, value);
        Reflect.set(...arguments);
      }
    });
    return this._proxiedObject;

  }

  createDeepProxy(_target, handler) {
    const preproxy = new WeakMap();

    function makeHandler(path) {
      return {
        set(target, key, value, receiver) {

          if (typeof value === 'object') {
            value = proxify(value, [...path, key]);
          }
          target[key] = value;

          if (handler.set) {
            handler.set(_target, `${path.join('.')}.${key}`, value, receiver);
          }
          return true;
        },

        deleteProperty(target, key) {
          if (Reflect.has(target, key)) {
            unproxy(target, key);
            let deleted = Reflect.deleteProperty(target, key);
            if (deleted && handler.deleteProperty) {
              handler.deleteProperty(target, `${path.join('.')}.${key}`);
            }
            return deleted;
          }
          return false;
        }
      }
    }

    function unproxy(obj, key) {
      if (preproxy.has(obj[key])) {
        obj[key] = preproxy.get(obj[key]);
        preproxy.delete(obj[key]);
      }

      for (let k of Object.keys(obj[key])) {
        if (typeof obj[key][k] === 'object') {
          unproxy(obj[key], k);
        }
      }

    }

    function proxify(obj, path) {
      for (let key of Object.keys(obj)) {
        if (typeof obj[key] === 'object') {
          obj[key] = proxify(obj[key], [...path, key]);
        }
      }
      let p = new Proxy(obj, makeHandler(path));
      preproxy.set(p, obj);
      return p;
    }

    return proxify(_target, []);
  }

  // let obj = {
  //   foo: 'baz',
  // }


  // let proxied = createDeepProxy(obj, {
  //   set(target, path, value, receiver) {
  //     console.log('set', path.join('.'), '=', JSON.stringify(value));
  //   },

  //   deleteProperty(target, path) {
  //     console.log('delete', path.join('.'));
  //   }
  // })

  // /**
  //  * @name          destroy
  //  * @type          Function
  //  * 
  //  * Destroy the watcher
  //  * 
  //  * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // destroy() {
  //   // destroy the watchStack
  //   this._watchStack = {};
  // }

  // /**
  //  * Internal implementation of the defineProp
  //  * @param 		{Object} 	obj 		The object to watch
  //  * @param 		{String} 	property 	The property of the object to watch
  //  * @param 		{Mixed} 	value 		The initial value of the property
  //  * @param 		{String} 	objPath 	The object property path to watch
  //  */
  // _defineProp(obj, property, value, objPath, descriptor = null) {
  //   // do not define multiple time the description
  //   if (this._watchStack[objPath]) return;

  //   // store the current value
  //   let val = value;
  //   let currentDescriptor = Object.getOwnPropertyDescriptor(
  //     obj.prototype || obj,
  //     property
  //   );

  //   // custom setter check
  //   const _set = value => {
  //     // descriptor
  //     if (currentDescriptor && currentDescriptor.set) {
  //       let ret = currentDescriptor.set(value);
  //       if (ret) {
  //         val = ret;
  //       } else {
  //         val = currentDescriptor.get();
  //       }
  //     } else {
  //       val = value;
  //     }

  //     // apply the proxy for arrays, etc...
  //     val = this._applyProxy(val, objPath, newVal => {
  //       val = newVal;
  //     });
  //   };

  //   // set the value
  //   _set(value);

  //   // make sure we have the good currentDescriptor
  //   let d = Object.getOwnPropertyDescriptor(obj, property);
  //   Object.defineProperty(obj, property, {
  //     get: () => {
  //       let _val = val;
  //       if (currentDescriptor && currentDescriptor.get) {
  //         _val = currentDescriptor.get();
  //       }
  //       if (descriptor && descriptor.get) {
  //         _val = descriptor.get(_val);
  //       }
  //       return _val;
  //     },
  //     set: v => {
  //       const oldValue = val;
  //       if (descriptor && descriptor.set) {
  //         v = descriptor.set(v);
  //       }
  //       // internal set to use the good setter
  //       _set(v);
  //       // _notify of new update
  //       this._notify(objPath, val, oldValue);
  //     },
  //     configurable:
  //       descriptor && descriptor.configurable !== undefined
  //         ? descriptor.configurable
  //         : currentDescriptor && currentDescriptor.configurable !== undefined
  //         ? currentDescriptor.configurable
  //         : false,
  //     enumarable:
  //       descriptor && descriptor.enumarable !== undefined
  //         ? descriptor.enumarable
  //         : currentDescriptor && currentDescriptor.enumarable !== undefined
  //         ? currentDescriptor.enumarable
  //         : true
  //     // writable : currentDescriptor && currentDescriptor.writable !== undefined ? currentDescriptor.writable : true
  //   });
  // }

  // /**
  //  * Override some array methods to be able to notify of changes
  //  * @param 		{Array} 	array 			The array to process
  //  * @param 		{Array} 	methods 		The methods to override
  //  * @param 		{String} 	objPath 		The object property path to watch
  //  * @param 		{Function} 	setValueCb 		A callback function that will set the updated value
  //  */
  // _overrideArrayMethod(array, methods, objPath, setValueCb) {
  //   const _this = this;

  //   // grab the old value
  //   const oldVal = array.slice(0);

  //   // loop on each methods to override
  //   methods.forEach(method => {
  //     array[method] = function() {
  //       // array items info object
  //       const updateInfo = {
  //         type: Array,
  //         method
  //       };
  //       if (method === "push" || method === "unshift" || method === "concat") {
  //         updateInfo.addedItems = Array.prototype.slice.call(arguments);
  //       } else if (method === "pop") {
  //         updateInfo.removedItems = [oldVal[oldVal.length - 1]];
  //       } else if (method === "shift") {
  //         updateInfo.removedItems = [oldVal[0]];
  //       }
  //       // @TODO Check and add missed methods to watch array
  //       // apply the push
  //       const ret = Array.prototype[method].apply(this, arguments);
  //       // set value callback
  //       setValueCb(this);
  //       // _notify
  //       _this._notify(objPath, this, oldVal, updateInfo);
  //       // return the new value
  //       return ret;
  //     };
  //   });
  // }

  // /**
  //  * Apply a proxy on the variable to detect changes
  //  * on arrays, etc...
  //  * @param 		{Mixed} 	value 		The value on which to apply the proxy
  //  * @param 		{String} 	objPath 	The object property path to watch
  //  * @param 		{Function} 	setValueCb 	A function that will be responsible to set the new value intarnally
  //  * @return 		{Mixed} 				Return the value
  //  */
  // _applyProxy(value, objPath, setValueCb) {
  //   // if is an array
  //   if (value instanceof Array) {
  //     // override methods
  //     this._overrideArrayMethod(
  //       value,
  //       [
  //         "push",
  //         "splice",
  //         "pop",
  //         "shift",
  //         "unshift",
  //         "reverse",
  //         "sort",
  //         "concat"
  //       ],
  //       objPath,
  //       setValueCb
  //     );
  //   }
  //   return value;
  // }

  // /**
  //  * Watch something on an object
  //  * @param 		{Object} 		object 		The object to watch
  //  * @param 		{String} 		path 		The property path to watch on the object
  //  * @param 		{Function} 		cb 			The callback called when the property is updated
  //  */
  // watch(object, path, cb, descriptor = null) {
  //   // split the path by ',' to watch multiple properties
  //   if (typeof path === "string") {
  //     path = path.split(",");
  //   }
  //   if (!path instanceof Array) {
  //     throw "The 'path' parameter has to be an array...";
  //   }
  //   // loop on each path to watch
  //   path.forEach(p => {
  //     this._watch(object, p.trim(), cb, descriptor);
  //   });
  // }

  // /**
  //  * Internal watch$
  //  * @param 		{Object} 		object 		The object to watch
  //  * @param 		{String} 		path 		The property path to watch on the object
  //  * @param 		{Function} 		cb 			The callback called when the property is updated
  //  */
  // _watch(object, path, cb, descriptor = null) {
  //   // check if the path parameter has already a descriptor
  //   const split = path.split(".");
  //   let obj = object;
  //   let property = null;
  //   if (split.length > 1) {
  //     property = split.pop();
  //     obj = _get(object, split.join("."));
  //   } else {
  //     property = split[0];
  //   }
  //   let currentValue = null;
  //   currentValue = _get(object, path);

  //   // if is undefined, create the value at null
  //   if (obj === undefined || currentValue === undefined) {
  //     _set(obj, path, null);
  //     // _set(this, split.join('.'),null);
  //     // throw `It's not possible to watch the property ${path} cause it does not exist...`;
  //   }

  //   // define the property proxy
  //   this._defineProp(obj, property, currentValue, path, descriptor);

  //   // register new watch
  //   if (!this._watchStack[path]) {
  //     this._watchStack[path] = [];
  //   }
  //   this._watchStack[path].push(cb);
  // }

  // /**
  //  * Tell that something has changed
  //  * @param 		{String} 		path 		The object property path that has been updated
  //  * @param 		{Mixed} 		newValue 	The new property value
  //  * @param 		{Mixed} 		oldValue 	The old property value
  //  * @param 		{Object} 		[updateInfo=null] 	An object that add information about the update like addedItems for array, etc...
  //  */
  // _notify(path, newValue, oldValue, updateInfo = null) {
  //   if (this._watchStack[path] !== undefined && newValue !== oldValue) {
  //     this._watchStack[path].forEach(cb => {
  //       cb(newValue, oldValue, updateInfo);
  //     });
  //   }
  // }
}
