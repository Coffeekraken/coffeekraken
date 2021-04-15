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
            const params = intRes.value;
            delete params.help;
            return mixinFn(params, atRule);
        };
    });
    return {
        postcssPlugin: 'sugar',
        AtRule: Object.assign({}, mixinsAtRules),
        Once(root) {
            root.walkDecls((decl) => {
                if (!decl.prop || !decl.value)
                    return;
                if (!decl.value.match(/\s?sugar\.[a-zA-Z0-9]+.*/))
                    return;
                const calls = decl.value.match(/sugar\.[a-zA-Z0-9]+\((?:[^\)]+|\([^\(;,]*\(;,)+\)/gm);
                if (!calls || !calls.length)
                    return;
                calls.forEach((sugarStatement) => {
                    const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9]+)/)[1];
                    const paramsStatement = sugarStatement.replace(/sugar\.[a-zA-Z0-9]+/, '');
                    if (!fs_1.default.existsSync(`${__dirname}/functions/${functionName}.js`)) {
                        throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${functionName}</yellow>" does not exists...`);
                    }
                    const func = require(`${__dirname}/functions/${functionName}`);
                    const functionInterface = func.interface;
                    const funcFn = func.default;
                    const intRes = functionInterface.apply(paramsStatement, {});
                    if (intRes.hasIssues()) {
                        throw new Error(intRes.toString());
                    }
                    const params = intRes.value;
                    delete params.help;
                    const result = funcFn(params);
                    decl.value = decl.value.replace(sugarStatement, result);
                });
            });
        }
    };
};
plugin.postcss = true;
exports.default = plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLDRDQUFzQjtBQUN0QixrRUFBMkM7QUFJM0MsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDM0Isa0JBQWtCO0lBQ2xCLE1BQU0sVUFBVSxHQUFHLFlBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLFNBQVMsQ0FBQyxDQUFDO0lBRTNELE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUV6QixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQUUsT0FBTztRQUNqQyxNQUFNLFFBQVEsR0FBRyxHQUFHLFNBQVMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM5QixNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLE1BQU0sU0FBUyxHQUFHLGdCQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLGFBQWEsQ0FBQyxTQUFTLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDOUQsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUM1QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDbkIsT0FBTyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTztRQUNMLGFBQWEsRUFBRSxPQUFPO1FBQ3RCLE1BQU0sb0JBQ0QsYUFBYSxDQUNqQjtRQUNELElBQUksQ0FBQyxJQUFJO1lBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO29CQUFFLE9BQU87Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQztvQkFBRSxPQUFPO2dCQUMxRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDNUIscURBQXFELENBQ3RELENBQUM7Z0JBQ0YsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO29CQUFFLE9BQU87Z0JBQ3BDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtvQkFDL0IsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUM1QyxxQkFBcUIsRUFDckIsRUFBRSxDQUNILENBQUM7b0JBQ0YsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLGNBQWMsWUFBWSxLQUFLLENBQUMsRUFBRTt3QkFDakUsTUFBTSxJQUFJLEtBQUssQ0FDYiw2RUFBNkUsWUFBWSwrQkFBK0IsQ0FDekgsQ0FBQztxQkFDSDtvQkFDRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxTQUFTLGNBQWMsWUFBWSxFQUFFLENBQUMsQ0FBQztvQkFDL0QsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUM1QixNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUM1RCxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRTt3QkFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztxQkFDcEM7b0JBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDNUIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNuQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMxRCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUV0QixrQkFBZSxNQUFNLENBQUMifQ==