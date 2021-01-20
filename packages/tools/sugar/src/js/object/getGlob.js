"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const minimatch_1 = __importDefault(require("minimatch"));
const flatten_1 = __importDefault(require("./flatten"));
const deepize_1 = __importDefault(require("./deepize"));
module.exports = function getGlob(obj, glob, settings = {}) {
    settings = Object.assign({ deepize: true }, settings);
    const flat = flatten_1.default(obj);
    const resultObj = {};
    Object.keys(flat).forEach((path) => {
        if (minimatch_1.default(path, glob)) {
            resultObj[path] = flat[path];
        }
    });
    if (settings.deepize === true)
        return deepize_1.default(resultObj);
    return resultObj;
};
// console.log(
//   getGlob(
//     {
//       someting: {
//         cool: 'hello'
//       },
//       coco: ['hello', 'world'],
//       world: {
//         'coco.plop': {
//           yep: 'dsojiofj'
//         }
//       }
//     },
//     'world.*'
//   )
// );
//# sourceMappingURL=getGlob.js.map