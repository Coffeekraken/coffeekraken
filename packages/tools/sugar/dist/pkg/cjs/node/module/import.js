"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
/**
 * @name                import
 * @namespace           node.module
 * @type                Function
 * @platform            node
 * @status              beta
 * @async
 *
 * This function is the same as the native "import" one unless it allows you to pass an array with 2 values when the
 * first is the package name from which to import things, and the second is the "export" to import.
 *
 * @param       {String|Array}              what            Either a string like with the native "import" function, either an array with 2 values. 1st is the package name, 2nd is the "export" to import
 * @return      {any}                                       The imported things
 *
 * @example         js
 * import { __import } from '@coffeekraken/sugar/module';
 * __import('@coffeekraken/s-typescript-builder');
 * __import(['@coffeekraken/s-typescript-builder', 'STypescriptBuilderBuildParamsInterface']);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function _import(what) {
    return __awaiter(this, void 0, void 0, function* () {
        let imported;
        if (Array.isArray(what)) {
            if (what[0].match(/\.json$/)) {
                imported = (0, fs_1.__readJsonSync)(what[0]);
            }
            else {
                imported = yield Promise.resolve().then(() => __importStar(require(what[0])));
            }
            return imported[what[1]];
        }
        if (what.match(/\.json$/)) {
            imported = (0, fs_1.__readJsonSync)(what);
            return imported;
        }
        return (yield Promise.resolve().then(() => __importStar(require(what)))).default;
    });
}
exports.default = _import;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBd0Q7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQThCLE9BQU8sQ0FBQyxJQUF1Qjs7UUFDekQsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMxQixRQUFRLEdBQUcsSUFBQSxtQkFBYyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNILFFBQVEsR0FBRyx3REFBYSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQzthQUNwQztZQUNELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3ZCLFFBQVEsR0FBRyxJQUFBLG1CQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsT0FBTyxRQUFRLENBQUM7U0FDbkI7UUFDRCxPQUFPLENBQUMsd0RBQWEsSUFBSSxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDeEMsQ0FBQztDQUFBO0FBZkQsMEJBZUMifQ==