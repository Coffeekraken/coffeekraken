"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import __postcss from 'postcss';
const fs_1 = __importDefault(require("fs"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
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
        const mixinFile = s_file_1.default.new(path);
        console.log('register', `sugar.${mixinPath}`);
        mixinsAtRules[`sugar.${mixinPath}`] = (atRule) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLDRDQUFzQjtBQUN0QixrRUFBMkM7QUFHM0MsZ0RBQTBCO0FBRTFCLElBQUksWUFBWSxDQUFDO0FBQ2pCLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQzNCLGtCQUFrQjtJQUNsQiw4REFBOEQ7SUFFOUQsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBRXpCLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDakIsWUFBWSxHQUFHLGNBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLGlCQUFpQixDQUFDLENBQUM7S0FDM0Q7SUFFRCxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDOUIsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLFNBQVMsR0FBRyxHQUFHLElBQUk7YUFDcEIsT0FBTyxDQUFDLEdBQUcsU0FBUyxVQUFVLEVBQUUsRUFBRSxDQUFDO2FBQ25DLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ1QsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzFCLGFBQWE7UUFDYixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDakMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsTUFBTSxTQUFTLEdBQUcsZ0JBQU8sQ0FBQyxH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