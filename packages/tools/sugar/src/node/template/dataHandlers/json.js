"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
/**
 * @name          json
 * @namespace     sugar.node.template.dataHandlers
 * @type          Function
 *
 * This function simply take the .data.json file path and return
 * the resulting object
 *
 * @param       {String}      filePath      The file path to take care
 * @return      {SPromise}                  An SPromise instance that will be resolved with the resulting object
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function js(filePath) {
    return new SPromise_1.default((resolve) => {
        resolve(require(filePath));
    }, {
        id: 'templateJsonDataHandler'
    });
}
exports.default = js;
