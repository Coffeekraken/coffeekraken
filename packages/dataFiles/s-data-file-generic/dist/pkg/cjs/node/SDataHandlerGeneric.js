"use strict";
// @ts-nocheck
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
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_data_handler_js_1 = __importDefault(require("@coffeekraken/s-data-handler-js"));
const extension_1 = __importDefault(require("@coffeekraken/sugar/node/fs/extension"));
const checkPathWithMultipleExtensions_1 = __importDefault(require("@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions"));
/**
 * @name          SDataHandlerGeneric
 * @namespace     node
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDataHandlerGeneric {
    static handle(filePath) {
        return new s_promise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            const extension = (0, extension_1.default)(filePath), filePathWithoutExtension = filePath.replace(`.${extension}`, '');
            const dataFilePath = (0, checkPathWithMultipleExtensions_1.default)(`${filePathWithoutExtension}.data.${extension}`, SDataHandlerGeneric.extensions);
            switch ((0, extension_1.default)(dataFilePath)) {
                case 'js':
                case 'json':
                    const res = yield s_data_handler_js_1.default.handle(dataFilePath);
                    return resolve(res);
                    break;
            }
            resolve({});
        }));
    }
}
exports.default = SDataHandlerGeneric;
SDataHandlerGeneric.extensions = ['js', 'json'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCx3RkFBK0Q7QUFDL0Qsc0ZBQWdFO0FBQ2hFLGtJQUE0RztBQUU1Rzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBcUIsbUJBQW1CO0lBRXBDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUTtRQUNsQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBQSxtQkFBVyxFQUFDLFFBQVEsQ0FBQyxFQUNuQyx3QkFBd0IsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUN2QyxJQUFJLFNBQVMsRUFBRSxFQUNmLEVBQUUsQ0FDTCxDQUFDO1lBRU4sTUFBTSxZQUFZLEdBQUcsSUFBQSx5Q0FBaUMsRUFDbEQsR0FBRyx3QkFBd0IsU0FBUyxTQUFTLEVBQUUsRUFDL0MsbUJBQW1CLENBQUMsVUFBVSxDQUNqQyxDQUFDO1lBRUYsUUFBUSxJQUFBLG1CQUFXLEVBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQy9CLEtBQUssSUFBSSxDQUFDO2dCQUNWLEtBQUssTUFBTTtvQkFDUCxNQUFNLEdBQUcsR0FBRyxNQUFNLDJCQUFnQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDeEQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLE1BQU07YUFDYjtZQUVELE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUF6Qkwsc0NBMEJDO0FBekJVLDhCQUFVLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMifQ==