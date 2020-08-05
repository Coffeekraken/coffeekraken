const __SAppPage = require('../../blessed/app/SAppPage');
const __SCommandPanel = require('../../blessed/panel/SCommandPanel');
const __SInputPopup = require('../../blessed/popup/SInputPopup');
const __hotkey = require('../../keyboard/hotkey');

/**
 * @name              STermAppCommandsPage
 * @namespace           node.termapp.pages
 * @type              Class
 * @extends           SAppPage
 *
 * This represent the page where we display the commands available through the sugar termapp
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STermAppCommandsPage extends __SAppPage {
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
    const panel = new __SCommandPanel(settings.commands);
    this.append(panel);

    __hotkey('backspace').on('press', () => {
      this.app.back();
    });
  }
};
