"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const postcss_1 = __importDefault(require("postcss"));
const docblock_1 = __importDefault(require("../color/docblock"));
class postcssSugarPluginMediaMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginMediaMixinInterface;
postcssSugarPluginMediaMixinInterface.definition = {};
/**
 * @name           init
 * @namespace      mixins
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to apply media queries depending on the ```media.config.js``` config
 * file with ease.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(params = {}, atRule = null) {
    const colors = docblock_1.default();
    const cssArray = [colors];
    if (atRule) {
        const AST = postcss_1.default.parse(cssArray.join('\n'));
        atRule.replaceWith(AST);
    }
    else {
        return cssArray.join('\n');
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBR3JELHNEQUFnQztBQUdoQyxpRUFBaUQ7QUFFakQsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTs7QUFHZCwwREFBUztBQUZsRCxnREFBVSxHQUFHLEVBQUUsQ0FBQztBQUl6Qjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILG1CQUF5QixNQUFNLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxJQUFJO0lBQ2pELE1BQU0sTUFBTSxHQUFHLGtCQUFnQixFQUFFLENBQUM7SUFFbEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUxQixJQUFJLE1BQU0sRUFBRTtRQUNWLE1BQU0sR0FBRyxHQUFHLGlCQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCO1NBQU07UUFDTCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUI7QUFDSCxDQUFDO0FBWEQsNEJBV0MifQ==