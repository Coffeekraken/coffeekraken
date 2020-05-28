const __SAppPage = require('../../../../node/blessed/app/SAppPage');
const __SCommandPanel = require('../../../../node/blessed/panel/SCommandPanel');
const __SInputPopup = require('../../../../node/blessed/popup/SInputPopup');
const __hotkey = require('../../../../node/keyboard/hotkey');

/**
 * @name              CommandsAppPage
 * @namespace         termapp.node.pages
 * @type              Class
 * @extends           SAppPage
 *
 * This represent the page where we display the commands available through the sugar termapp
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class CommandsAppPage extends __SAppPage {
  /**
   * @name          currentNamespace
   * @type          String
   * @static
   *
   * Store the current filtered namespace applied
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static currentNamespace = '';

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(id, title, settings = {}) {
    super(id, title, settings);

    // const scssCommand = ;
    const panel = new __SCommandPanel('+(build|server).**');
    this.append(panel);

    // listen for namespace filtering
    panel.promise.on('namespace', (namespace) => {
      this.app.goTo(`/commands/${namespace}`);
    });

    __hotkey('backspace').on('press', () => {
      this.app.back();
    });

    this.on('arg.namespace', (argObj) => {
      panel.filterByNamespace(argObj.newValue || '');
    });
  }
};
