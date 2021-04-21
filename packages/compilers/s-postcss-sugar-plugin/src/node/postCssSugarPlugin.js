"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import __postcss from 'postcss';
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
let _mixinsPaths;
const plugin = (opts = {}) => {
    // list all mixins
    // const mixinsPath = __fs.readdirSync(`${__dirname}/mixins`);
    const mixinsAtRules = {};
    if (!_mixinsPaths) {
        _mixinsPaths = glob_1.default.sync(`${__dirname}/mixins/**/*.js`);
    }
    _mixinsPaths.forEach((path) => {
        const mixin = require(path);
        const mixinFn = mixin.default;
        const mixinInterface = mixin.interface;
        let mixinPath = `${path
            .replace(`${__dirname}/mixins/`, '')
            .split('/')
            .join('.')
            .replace(/\.js$/, '')}`;
        // @ts-ignore
        if (mixinPath.match(/\.default$/)) {
            mixinPath = mixinPath.replace(/\.default$/, '');
        }
        mixinsAtRules[`sugar.${mixinPath}`] = (atRule) => {
            const intRes = mixinInterface.apply(atRule.params, {});
            if (intRes.hasIssues()) {
                throw new Error(intRes.toString());
            }
            const params = intRes.value;
            delete params.help;
            console.log('MIN', params);
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
                    const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9\.]+)/)[1];
                    const paramsStatement = sugarStatement.replace(/sugar\.[a-zA-Z0-9\.]+/, '');
                    let fnPath = `${__dirname}/functions/${functionName
                        .split('.')
                        .join('/')}.js`;
                    if (!fs_1.default.existsSync(fnPath)) {
                        fnPath = `${__dirname}/functions/${functionName
                            .split('.')
                            .join('/')}/default.js`;
                    }
                    if (!fs_1.default.existsSync(fnPath)) {
                        throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${functionName}</yellow>" does not exists...`);
                    }
                    const func = require(fnPath);
                    const functionInterface = func.interface;
                    const funcFn = func.default;
                    const intRes = functionInterface.apply(paramsStatement, {});
                    if (intRes.hasIssues()) {
                        throw new Error(intRes.toString());
                    }
                    const params = intRes.value;
                    delete params.help;
                    try {
                        const result = funcFn(params);
                        decl.value = decl.value.replace(sugarStatement, result);
                    }
                    catch (e) {
                        console.error(e.message);
                    }
                });
            });
        }
    };
};
plugin.postcss = true;
exports.default = plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLDRDQUFzQjtBQUl0QixnREFBMEI7QUFFMUIsSUFBSSxZQUFZLENBQUM7QUFDakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDM0Isa0JBQWtCO0lBQ2xCLDhEQUE4RDtJQUU5RCxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFFekIsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixZQUFZLEdBQUcsY0FBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsaUJBQWlCLENBQUMsQ0FBQztLQUMzRDtJQUVELFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM1QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM5QixNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksU0FBUyxHQUFHLEdBQUcsSUFBSTthQUNwQixPQUFPLENBQUMsR0FBRyxTQUFTLFVBQVUsRUFBRSxFQUFFLENBQUM7YUFDbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDVCxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDMUIsYUFBYTtRQUNiLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNqQyxTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakQ7UUFDRCxhQUFhLENBQUMsU0FBUyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMs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