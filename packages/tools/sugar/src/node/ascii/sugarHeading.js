"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
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
module.exports = sugarHeading;
//# sourceMappingURL=module.js.map