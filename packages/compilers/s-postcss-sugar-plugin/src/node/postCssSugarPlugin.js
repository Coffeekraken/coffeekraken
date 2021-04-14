"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import __postcss from 'postcss';
const fs_1 = __importDefault(require("fs"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const plugin = (opts = {}) => {
    // list all mixins
    const mixinsPath = fs_1.default.readdirSync(`${__dirname}/mixins`);
    const mixinsAtRules = {};
    mixinsPath.forEach((path) => {
        if (!path.match(/\.js$/))
            return;
        const fullPath = `${__dirname}/mixins/${path}`;
        const mixin = require(fullPath);
        const mixinFn = mixin.default;
        const mixinInterface = mixin.interface;
        const mixinFile = s_file_1.default.new(fullPath);
        mixinsAtRules[`sugar.${mixinFile.nameWithoutExt}`] = (atRule) => {
            const intRes = mixinInterface.apply(atRule.params, {});
            if (intRes.hasIssues()) {
                throw new Error(intRes.toString());
            }
            return mixinFn(intRes.value, atRule);
        };
    });
    //   console.log(mixinsAtRules);
    return {
        postcssPlugin: 'sugar',
        AtRule: Object.assign({}, mixinsAtRules)
    };
};
plugin.postcss = true;
exports.default = plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLDRDQUFzQjtBQUN0QixrRUFBMkM7QUFHM0MsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDM0Isa0JBQWtCO0lBQ2xCLE1BQU0sVUFBVSxHQUFHLFlBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLFNBQVMsQ0FBQyxDQUFDO0lBRTNELE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUV6QixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQUUsT0FBTztRQUNqQyxNQUFNLFFBQVEsR0FBRyxHQUFHLFNBQVMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM5QixNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLE1BQU0sU0FBUyxHQUFHLGdCQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLGFBQWEsQ0FBQyxTQUFTLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDOUQsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILGdDQUFnQztJQUVoQyxPQUFPO1FBQ0wsYUFBYSxFQUFFLE9BQU87UUFDdEIsTUFBTSxvQkFDRCxhQUFhLENBQ2pCO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUNGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBRXRCLGtCQUFlLE1BQU0sQ0FBQyJ9