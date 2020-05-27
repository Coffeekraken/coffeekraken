const __SAppPage = require('../../../../node/blessed/app/SAppPage');

/**
 * @name              AboutAppPage
 * @namespace         termapp.node.pages
 * @type              Class
 * @extends           SAppPage
 *
 * This represent the page where we display the commands available through the sugar termapp
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class AboutAppPage extends __SAppPage {
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
        bg: 'green'
      }
    }
  ) {
    super(id, title, settings);
  }
};
