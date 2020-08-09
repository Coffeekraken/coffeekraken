"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = querySelectorLive;

var _uniqid = _interopRequireDefault(require("../util/uniqid"));

var _matches = _interopRequireDefault(require("./matches"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      querySelectorLive
 * @namespace           js.dom
 * @type      Function
 *
 * Observe the dom to get all the elements that matches a passed css selector at any point in time.
 * Be warned that this use the mutation observer API and will monitor all the document for new nodes. Make sure to use it
 * when you don't have the chance to use the custom elements API instead
 *
 * @param	{String} 		selector 		The css selector that we are interested in
 * @param 	{Function} 		cb 				The function to call with the newly added node
 * @param 	{Object} 		[settings={}] 	An optional settings object to specify things like the rootNode to monitor, etc...
 *
 * @example 	js
 * import querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive'
 * querySelectorLive('.my-cool-item', (node, clearFn) => {
 * 	// do something here with the detected node
 *  // call clearFn if you want to stop listening for this selector
 *  clearFn();
 * });
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _observer,
    _selectors = {};

function querySelectorLive(selector, cb, settings) {
  if (settings === void 0) {
    settings = {};
  }

  var id = "".concat(selector, " - ").concat((0, _uniqid.default)()); // extend settings

  settings = Object.assign({}, {
    rootNode: document,
    once: true
  }, settings);

  if (!_selectors[selector]) {
    _selectors[selector] = [{
      id: id,
      selector: selector,
      cb: cb,
      settings: settings
    }];
  } else {
    _selectors[selector].push({
      id: id,
      selector: selector,
      cb: cb,
      settings: settings
    });
  }

  function pushNewNode(node, sel) {
    var objs = _selectors[sel];
    if (!objs) return;
    objs.forEach(obj => {
      if (obj.settings.once) {
        if (!node._querySelectorLive) {
          node._querySelectorLive = {};
        }

        if (node._querySelectorLive[obj.id]) return;
        node._querySelectorLive[obj.id] = true;
      }

      obj.cb && obj.cb(node, () => {
        delete _selectors[obj.selector];
      });
    });
  } // listen for updates in document


  if (!_observer) {
    _observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes) {
          [].forEach.call(mutation.addedNodes, node => {
            // get all the selectors registered
            var selectors = Object.keys(_selectors); // loop on each selectors

            selectors.forEach(sel => {
              if ((0, _matches.default)(node, sel)) {
                pushNewNode(node, sel);
              }
            });
            if (!node.querySelectorAll) return;
            selectors.forEach(sel => {
              var nestedNodes = node.querySelectorAll(sel);
              [].forEach.call(nestedNodes, nestedNode => {
                pushNewNode(nestedNode, sel);
              });
            });
          });
        }
      });
    });

    _observer.observe(settings.rootNode, {
      childList: true,
      subtree: true
    });
  } // first search


  [].forEach.call(settings.rootNode.querySelectorAll(selector), node => {
    pushNewNode(node, selector);
  });
}
/**
 * @name 	settings.rootNode
 * The root node used to detect newly added nodes within
 * @prop
 * @type 		{HTMLElement}
 * @default 	document
 */

/**
 * @name 	settings.once
 * Specify if want to detect the node only once. Mean that if the node is removed from the dom and added again, it will not be detected again.
 * @prop
 * @type 		{Boolean}
 * @default 	true
 */


module.exports = exports.default;