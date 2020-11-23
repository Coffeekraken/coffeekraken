"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
/**
 * @name          sugarHeading
 * @namespace     sugar.js.ascii
 * @type          Function
 *
 * This function returns an ascii version of the sugar logo
 *
 * @param     {Object}      [settings={}]       A settings object:
 * - version (2.0.0) {String}: The version you want to display
 * - borders (true) {Boolean}: If you want to display the border left or not
 *
 * @example     js
 * import sugarHeading from '@coffeekraken/sugar/js/ascii/sugarHeading';
 * sugarHeading();
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function sugarHeading(settings = {}) {
    settings = deepMerge_1.default({
        version: '2.0.0',
        borders: true
    }, settings);
    let version = '';
    if (settings.version)
        version = `<white>${settings.version}</white>`;
    const value = [
        `<yellow>${settings.borders ? '█' : ''}</yellow>`,
        `<yellow>${settings.borders ? '█' : ''}     ____                           </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}   / ____|</yellow><white>Coffee<cyan>kraken</cyan></white><yellow> __ _ _ __   </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}   \\___ \\| | | |/ _\` |/ _\` | \`__|  </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}    ___) | |_| | (_| | (_| | |       </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}   |____/ \\__,_|\\__, |\\__,_|_|</yellow> ${version}    `,
        `<yellow>${settings.borders ? '█' : ''}                |___/</yellow>`,
        `<yellow>${settings.borders ? '█' : ''}</yellow>`
    ]
        .map((line) => {
        return parseHtml_1.default(line).trim();
    })
        .join('\n');
    return value;
}
exports.default = sugarHeading;
