const __blessed = require('blessed');
const __SComponent = require('./SComponent');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('../terminal/parseHtml');
const __countLine = require('../string/countLine');
const __hotkey = require('../keyboard/hotkey');
const __color = require('../color/color');
const __SPromise = require('../promise/SPromise');
const __SInput = require('./SInput');
const __multiple = require('../class/multipleExtends');

/**
 * @name                  SSidePanel
 * @namespace           node.blessed.panel
 * @type                  Class
 *
 * This class gives you the ability to create a side panel (left, right, tom, bottom) that can contain any other content
 * simply by calling the "append" method on it. It can also be hided and displayed using a simple "key" mapping that you can specify in the settings.
 *
 * @param         {Object}              [settings={}]                 A settings object to configure your side panel using these properties:
 * - id (null) {String}: Specify an id for your panel to you can use the static methods like ```SSidePanel.open(panelId)```
 * - side (left) {String}: Specify the side on which you want the panel to be displayed. Can be "left", "right", "top" or "bottom"
 *
 *
 * @example       js
 * const SSidePanel = require('@coffeekraken/sugar/node/blessed/panel/SSidePanel');
 * const panel = new SSidePanel({
 *    id: 'myCoolPanel',
 *    side: 'right'
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSidePanel extends __blessed.box {
  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(__deepMerge({}, settings));
  }

  /**
   * @name            update
   * @type            Function
   * @override
   *
   * Update the component display
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    super.update();
  }
};
