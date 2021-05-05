"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import __postcss from 'postcss';
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const postcss_1 = __importDefault(require("postcss"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
let _mixinsPaths;
const plugin = (settings = {}) => {
    settings = deepMerge_1.default({
        target: 'global'
    }, settings);
    const processNested = (css) => {
        if (Array.isArray(css)) {
            css = css
                .map((node) => {
                if (node.type === 'decl')
                    return node.toString() + ';';
                return node.toString();
            })
                .join('\n');
        }
        if (typeof css === 'string')
            css = postcss_1.default.parse(css);
        css.walkAtRules((atRule) => {
            const string = atRule.toString();
            if (string.match(/\);?[.*\n][&>+:]\s?[a-zA-Z0-9-_>+:]+/gm)) {
                const parts = string.split(/\)[.*\n]+/gm);
                if (parts.length >= 2) {
                    const AST = processNested(parts[0] + ');' + parts[1]);
                    atRule.replaceWith(AST);
                }
            }
        });
        css.walkAtRules((atRule) => {
            if (atRule.name.match(/^sugar\.[a-zA-Z0-9\.]+/)) {
                let potentialMixinPath = `${__dirname}/mixins/${atRule.name
                    .replace(/^sugar\./, '')
                    .replace(/\./gm, '/')}.js`;
                if (!fs_1.default.existsSync(potentialMixinPath)) {
                    const potentialFileName = atRule.name.split('.').pop();
                    potentialMixinPath = potentialMixinPath.replace(/\.js$/, `/${potentialFileName}.js`);
                }
                if (!fs_1.default.existsSync(potentialMixinPath)) {
                    throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`);
                }
                const mixin = require(potentialMixinPath);
                const mixinFn = mixin.default;
                const mixinInterface = mixin.interface;
                let sanitizedParams = atRule.params;
                sanitizedParams = sanitizedParams.split('\n&')[0];
                const intRes = mixinInterface.apply(sanitizedParams, {});
                if (intRes.hasIssues()) {
                    throw new Error(intRes.toString());
                }
                const params = intRes.value;
                delete params.help;
                return mixinFn({
                    params,
                    atRule,
                    processNested,
                    settings
                });
            }
        });
        // console.log(css.toString());
        css.walkDecls((decl) => {
            if (!decl.prop || !decl.value)
                return;
            if (!decl.value.match(/\s?sugar\.[a-zA-Z0-9]+.*/))
                return;
            const calls = decl.value.match(/sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,)+\)/gm);
            if (!calls || !calls.length)
                return;
            calls.forEach((sugarStatement) => {
                const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9\.]+)/)[1];
                const paramsStatement = sugarStatement.replace(/sugar\.[a-zA-Z0-9\.]+/, '');
                let fnPath = `${__dirname}/functions/${functionName
                    .split('.')
                    .join('/')}.js`;
                if (!fs_1.default.existsSync(fnPath)) {
                    const potentialFileName = functionName.split('.').pop();
                    fnPath = `${__dirname}/functions/${functionName
                        .split('.')
                        .join('/')}/${potentialFileName}.js`;
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
                    const result = funcFn({
                        params,
                        settings
                    });
                    decl.value = decl.value.replace(sugarStatement, result);
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        });
        return css;
    };
    // load all the styles
    const stylesPaths = glob_1.default.sync(`${__dirname}/**/*.style.css`);
    const stylesCss = [];
    stylesPaths.forEach((path) => {
        stylesCss.push(fs_1.default.readFileSync(path, 'utf8').toString());
    });
    return {
        postcssPlugin: 'sugar',
        Once(root) {
            root.nodes.unshift(postcss_1.default.parse(stylesCss));
            const finalAst = processNested(root);
            // if target is a component, do not output styles
            if (settings.target && settings.target === 'global') {
                // @ts-ignore
                Object.keys(global._definedStyles).forEach((styleName) => {
                    // @ts-ignore
                    finalAst.nodes.push(global._definedStyles[styleName]);
                });
            }
            return finalAst.toString();
        }
    };
};
plugin.postcss = true;
exports.default = plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLDRDQUFzQjtBQUl0QixnREFBMEI7QUFDMUIsc0RBQWdDO0FBQ2hDLDRGQUFzRTtBQUV0RSxJQUFJLFlBQVksQ0FBQztBQUNqQixNQUFNLE1BQU0sR0FBRyxDQUFDLFdBQWdCLEVBQUUsRUFBRSxFQUFFO0lBQ3BDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLE1BQU0sRUFBRSxRQUFRO0tBQ2pCLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzVCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixHQUFHLEdBQUcsR0FBRztpQkFDTixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDWixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTTtvQkFBRSxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQ3ZELE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDZjtRQUVELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtZQUFFLEdBQUcsR0FBRyxpQkFBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4RCxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDekIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxFQUFFO2dCQUMxRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FB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