"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
const jsObjectToCssProperties_1 = __importDefault(require("../../utils/jsObjectToCssProperties"));
class postcssSugarPluginTypoHInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginTypoHInterface;
postcssSugarPluginTypoHInterface.definition = {
    level: {
        type: 'Number',
        required: true,
        alias: 'l'
    }
};
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({ level: 1 }, params);
    const typoConfigObj = theme_1.default().config(`typo.h${finalParams.level}`);
    if (!typoConfigObj)
        throw new Error(`<red>[postcssSugarPlugin.mixins.typo.h]</red> Sorry but the "<yellow>h${finalParams.level}</yellow>" title does not exists...`);
    const css = jsObjectToCssProperties_1.default(typoConfigObj);
    const AST = processNested(css);
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUN4QyxrR0FBNEU7QUFFNUUsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTs7QUFjZCxxREFBUztBQWI3QywyQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVNKLG1CQUF5QixFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsQ0FBQyxJQUNMLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxhQUFhLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFckUsSUFBSSxDQUFDLGFBQWE7UUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYix5RUFBeUUsV0FBVyxDQUFDLEtBQUsscUNBQXFDLENBQ2hJLENBQUM7SUFFSixNQUFNLEdBQUcsR0FBRyxpQ0FBeUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUVyRCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBekJELDRCQXlCQyJ9