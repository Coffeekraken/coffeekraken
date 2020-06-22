const __fs = require("fs");

const __SLayout = require('@coffeekraken/sugar/node/terminal/SLayout');
const __SScreen = require('@coffeekraken/sugar/node/terminal/SScreen');
const __SForm = require('@coffeekraken/sugar/node/terminal/SForm');
const __SInputContainer = require('@coffeekraken/sugar/node/terminal/SInputContainer');
const __SFiltrableList = require('@coffeekraken/sugar/node/terminal/SFiltrableList');

/**
 * @name                                DefaultPage
 * @namespace                           cli.node.pages
 * @type                                Class
 *
 * Provide a default page layout to display a project informations
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class ProjectLayout extends __SLayout {

  constructor(data) {
    super();
    this.setContent('Hlop');
  }

};