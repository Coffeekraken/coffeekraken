const __deepMerge = require('../../object/deepMerge');
const __SPopup = require('../popup/SPopup');
const __SSummaryList = require('./SSummaryList');

/**
 * @name                      summaryListPopup
 * @namespace           sugar.node.blessed.list
 * @type                      Function
 *
 * This function init and display a summary list popup and return an SPromise instance on which you can subscribe for response, etc...
 *
 * @param         {Object}          [settings = {}]           A simple settings object to configure your summary list popup
 * @return        {Object}                                    An object on which you can find these properties:
 * - popup: An SCenteredPopup instance
 * - list: The SSummaryList instance
 * - on: The "on" function mapped from the list.promise SPromise instance
 * - then: The "then" function mapped from the list.promise SPromise instance
 * - catch: The "catch" function mapped from the list.promise SPromise instance
 * - attachTo: A simple function that you can use to attach the popup to a blessed element
 *
 * @example         js
 * const summaryListPopup = require('@coffeekraken/sugar/node/blessed/list/summaryListPopup');
 * summaryListPopup({
 *    title: 'Hello',
 *    description: 'World',
 *    items: [{
 *       id: 'port',
 *       text: 'Server port',
 *       default: 8080
 *    }]
 * }).attachTo(myCoolBlessedParent);
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function summaryListPopup(settings = {}) {
  settings = __deepMerge(
    {
      title: null,
      description: null,
      items: []
    },
    settings
  );

  const $popupBox = new __SPopup({
    title: settings.title,
    description: settings.description
  });
  const $summaryListBox = new __SSummaryList(settings.items, {});
  $popupBox.append($summaryListBox);
  $summaryListBox.promise.on('finally,cancel', () => {
    $popupBox.remove($summaryListBox);
    $popupBox.detach();
  });

  return {
    $popup: $popupBox,
    $list: $summaryListBox,
    on: $summaryListBox.on,
    then: $summaryListBox.then,
    catch: $summaryListBox.catch,
    attach: (parent) => {
      parent.append($popupBox);
    }
  };
};
