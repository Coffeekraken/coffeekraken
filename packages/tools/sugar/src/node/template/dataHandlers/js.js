"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
/**
 * @name          js
 * @namespace     sugar.node.template.dataHandlers
 * @type          Function
 * @status              beta
 *
 * This function simply take the .data.js file path and return
 * the resulting object
 *
 * @param       {String}      filePath      The file path to take care
 * @return      {SPromise}                  An SPromise instance that will be resolved with the resulting object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function js(filePath) {
    return new SPromise_1.default(({ resolve }) => __awaiter(this, void 0, void 0, function* () {
        resolve(yield Promise.resolve().then(() => __importStar(require(filePath))));
    }), {
        id: 'templateJsDataHandler'
    });
}
module.exports = js;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxzRUFBZ0Q7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQVMsRUFBRSxDQUFDLFFBQVE7SUFDbEIsT0FBTyxJQUFJLGtCQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ3BCLE9BQU8sQ0FBQyx3REFBYSxRQUFRLEdBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQSxFQUNEO1FBQ0UsRUFBRSxFQUFFLHVCQUF1QjtLQUM1QixDQUNGLENBQUM7QUFDSixDQUFDO0FBQ0QsaUJBQVMsRUFBRSxDQUFDIn0=