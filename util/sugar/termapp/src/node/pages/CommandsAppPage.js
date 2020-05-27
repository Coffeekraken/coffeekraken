const __SAppPage = require('../../../../node/blessed/app/SAppPage');
const __SCommandPanel = require('../../../../node/blessed/panel/SCommandPanel');
const __SInputPopup = require('../../../../node/blessed/popup/SInputPopup');

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
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    id,
    title,
    settings = {
      style: {
        bg: 'red'
      }
    }
  ) {
    super(id, title, settings);

    // const scssCommand = ;
    const panel = new __SCommandPanel('+(build|server).**');
    this.append(panel);

    const inputPopup = new __SInputPopup({
      title: 'Filter commands by namespace',
      $input: {
        placeholder: 'Enter the namespace you want...'
      }
    });
    this.append(inputPopup);

    this.on('arg.namespace', (argObj) => {
      console.log('argObj', argObj);
    });
  }
};
