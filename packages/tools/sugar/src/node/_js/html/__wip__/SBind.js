"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SWatch = _interopRequireDefault(require("../object/SWatch"));

var _camelize = _interopRequireDefault(require("../string/camelize"));

var _uncamelize = _interopRequireDefault(require("../string/uncamelize"));

var _autoCast = _interopRequireDefault(require("../string/autoCast"));

var _uniqid = _interopRequireDefault(require("../util/uniqid"));

var _set = _interopRequireDefault(require("../object/set"));

var _dispatchEvent = _interopRequireDefault(require("../dom/dispatchEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SBind = /*#__PURE__*/function () {
  /**
   * @name              _bindStack
   * @type              Object
   * @private
   *
   * Store all the bind objects settings
   *
   * @author		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                _mutationObservedElementsStack
   * @type                Array
   * @private
   *
   * Store all the mutation observers that are used to
   * be notified when attributes are updated
   *
   * @author		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name                _digestsMutation
   * @type                Map
   * @private
   *
   * Store for each binded HTMLElement if each binded attributes are
   * in digest phase to avoid multiple assignement of the same attribute
   * in each digest phase
   *
   * @author		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @constructor
   */
  function SBind() {
    _classCallCheck(this, SBind);

    _defineProperty(this, "_bindStack", {
      attr2obj: {},
      obj2attr: {}
    });

    _defineProperty(this, "_mutationObservedElementsStack", []);

    _defineProperty(this, "_digestsMutation", new Map());

    // init new watcher
    this._watcher = new _SWatch.default();
  }
  /**
   * @name                  bind
   * @type                  Function
   *
   * This method allows you to bind an Object|HTMLElement property to another Object|HTMLElement property
   * This mean that when the property of the first passed element is updated, the same property on the second
   * element will be updated as well
   *
   * @param       {Object|HTMLElement}        source            The source object
   * @param       {String}                    sourcePath        The source path to the property that you want to bind
   * @param       {Object|HTMLElement}        target            The target object
   * @param       {String}                    [targetPath=sourcePath]        The target path to the property that you want to be sync with the source element
   *
   * @author		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _createClass(SBind, [{
    key: "bind",
    value: function bind(source, sourcePath, target, targetPath) {
      // check if the source object is already a watched one
      if (typeof source === 'object' && !source.hasOwnProperty('__$SWatch')) {
        source = new _SWatch.default(source);
      }
    } // /**
    //  * Bind object path 2 object path
    //  * @param 		{Object} 	object1 	The source object that will be watched
    //  * @param 		{String} 	path1 		The property path on the source object to watch
    //  * @param 		{Object} 	object2 	The destination object that will be updated
    //  * @param 		{String} 	path2 		The property path on the destination object to update
    //  * @return 		{SBind} 				The binder instance to allow chainability
    //  */
    // bindObjectPath2ObjectPath(object1, path1, object2, path2) {
    //   // watch the path to update the attribute accordingly
    //   this._watcher.watch(object1, path1, (newVal, oldVal) => {
    //     // do nothing is no
    //     if (newVal === oldVal) return;
    //     // set the new value
    //     __set(object2, path2, newVal);
    //   });
    //   return this;
    // }
    // /**
    //  * Bind element attribute to object path
    //  * @param 		{HTMLElement} 	elm 		The source html element that will be watched
    //  * @param 		{String} 		attribute  	The attribute name to watch on the element
    //  * @param 		{Object} 		object 		The destination object that will be updated
    //  * @param 		{String} 		path 		The property path on the destination object to update
    //  * @return 		{SBind} 					The binder instance to allow chainability
    //  */
    // bindElementAttribute2ObjectPath(elm, attribute, object, path) {
    //   // generate an bindId in the object if not already exist
    //   if (!object._binderId) object._binderId = `s-binder-${__uniqid()}`;
    //   // observe the element
    //   this._observeDomElement(elm);
    //   // attr2obj
    //   if (!this._bindStack.attr2obj[attribute])
    //     this._bindStack.attr2obj[attribute] = {};
    //   if (!this._bindStack.attr2obj[attribute][`${object._binderId}:${path}`]) {
    //     this._bindStack.attr2obj[attribute][`${object._binderId}:${path}`] = {
    //       object: object,
    //       path: path
    //     };
    //   }
    //   return this;
    // }
    // /**
    //  * Bind object path to element attribute
    //  * @param 		{Object} 		object 		The source object that will be watched
    //  * @param 		{String} 		path 		The property path on the source object to watch
    //  * @param 		{HTMLElement}	elm 		The HTMLElement that will be updated
    //  * @param 		{String} 		attribute 	The attribute to update on the element
    //  * @return 		{SBind} 					The binder instance to allow chainability
    //  */
    // bindObjectPath2ElementAttribute(object, path, elm, attribute) {
    //   // generate an bindId in the object if not already exist
    //   if (!object._binderId) object._binderId = `s-binder-${__uniqid()}`;
    //   // obj2attr
    //   if (!this._bindStack.obj2attr[`${object._binderId}:${path}`])
    //     this._bindStack.obj2attr[`${object._binderId}:${path}`] = {};
    //   if (!this._bindStack.obj2attr[`${object._binderId}:${path}`][attribute]) {
    //     this._bindStack.obj2attr[`${object._binderId}:${path}`][attribute] = {
    //       elm: elm,
    //       attribute: attribute
    //     };
    //   }
    //   // watch the path to update the attribute accordingly
    //   this._watcher.watch(object, path, (newVal, oldVal) => {
    //     // get the digest attribute stack from the element
    //     let digest = this._digestsMutation.get(elm);
    //     if (digest && digest[attribute]) return;
    //     if (newVal === oldVal) return;
    //     // loop on all attributes to update
    //     for (const attribute in this._bindStack.obj2attr[
    //       `${object._binderId}:${path}`
    //     ]) {
    //       const watch = this._bindStack.obj2attr[`${object._binderId}:${path}`][
    //         attribute
    //       ];
    //       // prevent from multiple same attribute assignement in the same digest process
    //       if (digest && digest[watch.attribute]) continue;
    //       if (!digest) digest = {};
    //       digest[watch.attribute] = true;
    //       this._digestsMutation.set(elm, digest);
    //       // update the attribute
    //       watch.elm.setAttribute(__uncamelize(watch.attribute), newVal);
    //       // if the attribute is the value, trigger a change event
    //       // if (__uncamelize(watch.attribute) === 'value') {
    //       // 	elm.value = newVal;
    //       // 	__dispatchEvent(watch.elm, 'change');
    //       // }
    //     }
    //   });
    //   return this;
    // }
    // /**
    //  * Destroy the binder
    //  */
    // destroy() {
    //   // @TODO binder destroy implementation
    // }
    // /**
    //  * Observe DOM element
    //  * @param 		{HTMLElement} 	elm 	The element to watch
    //  */
    // _observeDomElement(elm) {
    //   // check if already observe the element
    //   if (this._mutationObservedElementsStack.indexOf(elm) !== -1) return;
    //   this._mutationObservedElementsStack.push(elm);
    //   // check attributes changes to update settings
    //   let observer = new MutationObserver(mutations => {
    //     // loop on mutations
    //     mutations.forEach(mutation => {
    //       // update the attr property
    //       let val = __autoCast(elm.getAttribute(mutation.attributeName));
    //       // make a new attribute
    //       let camelName = __camelize(mutation.attributeName);
    //       // set that we are digesting this attribute on this element
    //       let digest = this._digestsMutation.get(elm);
    //       if (!digest) digest = {};
    //       digest[mutation.attributeName] = true;
    //       this._digestsMutation.set(elm, digest);
    //       // set all the objects values bound to this attribute
    //       if (this._bindStack.attr2obj[mutation.attributeName]) {
    //         // loop on each objects to update
    //         for (const objectPath in this._bindStack.attr2obj[
    //           mutation.attributeName
    //         ]) {
    //           const watch = this._bindStack.attr2obj[mutation.attributeName][
    //             objectPath
    //           ];
    //           // update the value
    //           __set(watch.object, watch.path, val);
    //         }
    //       }
    //     });
    //     // restore the mutate state in the next loop
    //     setTimeout(() => {
    //       this._digestsMutation = new Map();
    //     });
    //   });
    //   // observe the node itself
    //   observer.observe(elm, {
    //     childList: false,
    //     attributes: true,
    //     characterData: true,
    //     subtree: false,
    //     attributeOldValue: true,
    //     characterDataOldValue: true
    //   });
    // }

  }]);

  return SBind;
}();

exports.default = SBind;
module.exports = exports.default;