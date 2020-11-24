"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SBlessedPopup_1 = __importDefault(require("../popup/SBlessedPopup"));
const SSummaryList_1 = __importDefault(require("./SSummaryList"));
/**
 * @name                      blessedSummaryListPopup
 * @namespace           sugar.node.blessed.list
 * @type                      Function
 * @wip
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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import blessedSummaryListPopup from 'coffeekraken/sugar/node/blessed/list/blessedSummaryListPopup';
 * blessedSummaryListPopup({
 *    title: 'Hello',
 *    description: 'World',
 *    items: [{
 *       id: 'port',
 *       text: 'Server port',
 *       default: 8080
 *    }]
 * }).attachTo(myCoolBlessedParent);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function blessedSummaryListPopup(settings = {}) {
    settings = deepMerge_1.default({
        title: null,
        description: null,
        items: []
    }, settings);
    const $popupBox = new SBlessedPopup_1.default({
        title: settings.title,
        description: settings.description
    });
    const $summaryListBox = new SSummaryList_1.default(settings.items, {});
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
}
module.exports = blessedSummaryListPopup;
