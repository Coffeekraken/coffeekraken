var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import __postcss from 'postcss';
import __SBench from '@coffeekraken/s-bench';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __unquote from '@coffeekraken/sugar/shared/string/unquote';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __postcss from 'postcss';
import __getRoot from './utils/getRoot';
import __jsObjectToCssProperties from './utils/jsObjectToCssProperties';
let _mixinsPaths;
const plugin = (settings = {}) => {
    settings = __deepMerge({
        inlineImport: true,
    }, settings);
    // load all the styles
    // const stylesPaths = __glob.sync(`${__dirname}/**/*.style.css`);
    // const stylesCss: string[] = [];
    // stylesPaths.forEach((path) => {
    //   stylesCss.push(__fs.readFileSync(path, 'utf8').toString());
    // });
    function findUp(node, checker) {
        const res = checker(node);
        if (!res && node.parent)
            return findUp(node.parent, checker);
        else if (res)
            return res;
        return;
    }
    function applyNoScopes(scopes, fromNode) {
        const noScopeRule = findUp(fromNode, (node) => {
            if ((node === null || node === void 0 ? void 0 : node.name) === 'sugar.scope.no')
                return node;
            return;
        });
        if (noScopeRule && noScopeRule.params) {
            const noScopes = noScopeRule.params
                .trim()
                .replace(/^\(/, '')
                .replace(/\)$/, '')
                .split(/[,\s]/)
                .map((l) => l.trim());
            const newScopes = scopes.filter((scope) => {
                return noScopes.indexOf(scope) === -1;
            });
            return newScopes;
        }
        return scopes;
    }
    function replaceWith(atRule, nodes) {
        nodes = Array.from(nodes);
        let isAllText = true;
        nodes.forEach((n) => {
            if (!isAllText)
                return;
            if (typeof n !== 'string')
                isAllText = false;
        });
        if (isAllText)
            nodes = [nodes.join('\n')];
        if (atRule.parent) {
            let finalNodes = [];
            nodes
                .map((n) => (typeof n === 'string' ? n.trim() : n))
                .forEach((n) => {
                var _a;
                if (typeof n === 'string') {
                    finalNodes = [...finalNodes, ...((_a = __postcss.parse(n).nodes) !== null && _a !== void 0 ? _a : [])];
                }
                else {
                    finalNodes.push(n);
                }
            });
            for (const node of finalNodes.reverse()) {
                if (!node)
                    continue;
                atRule.parent.insertAfter(atRule, node);
            }
        }
        atRule.remove();
    }
    const sharedData = {
        noScopes: [],
    };
    const mixinsStack = {}, functionsStack = {};
    function _load() {
        return __awaiter(this, void 0, void 0, function* () {
            // list all mixins
            const mixinsPaths = __glob.sync(`mixins/**/*.js`, {
                cwd: __dirname(),
            });
            for (let i = 0; i < mixinsPaths.length; i++) {
                const path = mixinsPaths[i];
                const { default: mixin, interface: int } = yield import(`./${path}`);
                mixinsStack[`${path.split('/').slice(1).join('.').replace(/\.js$/, '')}`] = {
                    mixin,
                    interface: int,
                };
            }
            // list all functions
            const functionsPaths = __glob.sync(`functions/**/*.js`, {
                cwd: __dirname(),
            });
            for (let i = 0; i < functionsPaths.length; i++) {
                const path = functionsPaths[i];
                const { default: fn, interface: int } = yield import(`./${path}`);
                functionsStack[`${path.split('/').slice(1).join('.').replace(/\.js$/, '')}`] = {
                    fn,
                    interface: int,
                };
            }
            return true;
        });
    }
    return {
        postcssPlugin: 'sugar',
        Once() {
            return __awaiter(this, void 0, void 0, function* () {
                if (__SBench.env.isBenchActive('postcssSugarPlugin')) {
                    __SBench.start('postcssSugarPlugin');
                }
                yield _load();
            });
        },
        OnceExit(root) {
            return __awaiter(this, void 0, void 0, function* () {
                // console.log('EX');
                // if (postProcessorsExecuted) return;
                // postProcessorsExecuted = true;
                // console.log('IT');
                const postProcessorsPaths = __glob.sync('**/*.js', {
                    cwd: `${__dirname()}/postProcessors`,
                });
                for (let i = 0; i < postProcessorsPaths.length; i++) {
                    const path = postProcessorsPaths[i];
                    const { default: processorFn } = yield import(`${__dirname()}/postProcessors/${path}`);
                    processorFn({
                        root,
                        sharedData,
                    });
                }
                root.walkComments((comment) => {
                    if (!comment.text.match(/^@sugar-media-classes-[a-zA-Z0-9-_]+/))
                        return;
                    const mediaName = comment.text.replace('@sugar-media-classes-', '').trim();
                    const mediaRule = comment.next();
                    if (!mediaRule)
                        return;
                    mediaRule.walkRules((rule) => {
                        if (rule.parent !== mediaRule)
                            return;
                        if (!rule.selector)
                            return;
                        if (!rule.selector.match(/^\./))
                            return;
                        const selectorParts = rule.selector.split(/[\s:#.]/).filter((l) => l !== '');
                        if (!selectorParts.length)
                            return;
                        const clsSelector = `.${selectorParts[0]}`;
                        const newSelector = rule.selector.split(clsSelector).join(`${clsSelector}___${mediaName}`);
                        rule.selector = newSelector;
                    });
                    comment.remove();
                });
                if (__SBench.env.isBenchActive('postcssSugarPlugin')) {
                    console.log(__SBench.end('postcssSugarPlugin').toString());
                }
            });
        },
        AtRule(atRule, postcssApi) {
            if (atRule.name.match(/^sugar\./)) {
                let mixinId = atRule.name.replace(/^sugar\./, '');
                // if (atRule.name === 'sugar.scope.no') {
                //     console.log('NOffff', atRule);
                // }
                if (!mixinsStack[mixinId]) {
                    mixinId = `${mixinId}.${mixinId.split('.').slice(-1)[0]}`;
                }
                if (!mixinsStack[mixinId]) {
                    throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`);
                }
                const root = __getRoot(atRule);
                const sourcePath = typeof root.source.input.file === 'string' ? __path.dirname(root.source.input.file) : __dirname();
                const mixinFn = mixinsStack[mixinId].mixin;
                const mixinInterface = mixinsStack[mixinId].interface;
                const sanitizedParams = atRule.params;
                const params = mixinInterface.apply(sanitizedParams, {});
                delete params.help;
                mixinFn({
                    params,
                    atRule,
                    findUp,
                    applyNoScopes(scopes = []) {
                        return applyNoScopes(scopes, atRule);
                    },
                    replaceWith(nodes) {
                        replaceWith(atRule, nodes);
                    },
                    jsObjectToCssProperties: __jsObjectToCssProperties,
                    postcssApi,
                    sourcePath,
                    sharedData,
                    postcss: __postcss,
                    settings,
                });
            }
            else if (atRule.name.match(/^import/)) {
                // check settings
                if (!settings.inlineImport)
                    return;
                // do not take care of imported assets using url('...');
                if (atRule.params.match(/^url\(/))
                    return;
                const dirName = typeof atRule.source.input.file === 'string'
                    ? __path.dirname(atRule.source.input.file)
                    : __dirname();
                const path = __path.resolve(dirName, __unquote(atRule.params));
                if (!__fs.existsSync(path)) {
                    throw new Error(`<red>[postcssSugarPlugin.@import]</red> You try to load the file "<yellow>${path}</yellow>" but this file does not exists`);
                }
                const contentStr = __fs.readFileSync(path, 'utf8').toString();
                atRule.after(contentStr);
                atRule.remove();
            }
        },
        Declaration(decl) {
            if (!decl.prop || !decl.value)
                return;
            if (!decl.value.match(/\s?sugar\.[a-zA-Z0-9]+.*/))
                return;
            const calls = decl.value.match(/sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm);
            if (!calls || !calls.length)
                return;
            calls.forEach((sugarStatement) => {
                // FIX. sugarStatement comes with none corresponding count of "(" and ")"
                const openingParenthesisCount = (sugarStatement.match(/\(/g) || []).length;
                const closingParenthesisCount = (sugarStatement.match(/\)/g) || []).length;
                if (openingParenthesisCount > closingParenthesisCount) {
                    sugarStatement += ')'.repeat(openingParenthesisCount - closingParenthesisCount);
                }
                const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9\.]+)/)[1];
                const paramsStatement = sugarStatement.replace(/sugar\.[a-zA-Z0-9\.]+/, '');
                let fnId = functionName;
                if (!functionsStack[fnId]) {
                    fnId = `${fnId}.${fnId.split('.').slice(-1)[0]}`;
                }
                if (!functionsStack[fnId]) {
                    throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`);
                }
                const functionInterface = functionsStack[fnId].interface;
                const funcFn = functionsStack[fnId].fn;
                const params = functionInterface.apply(paramsStatement, {});
                delete params.help;
                try {
                    const result = funcFn({
                        params,
                        settings,
                    });
                    decl.value = decl.value.replace(sugarStatement, result);
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        },
    };
};
plugin.postcss = true;
export const postcss = true;
export default plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFNBQVMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFFeEMsT0FBTyx5QkFBeUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RSxJQUFJLFlBQVksQ0FBQztBQUNqQixNQUFNLE1BQU0sR0FBRyxDQUFDLFdBQWdCLEVBQUUsRUFBRSxFQUFFO0lBQ2xDLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksWUFBWSxFQUFFLElBQUk7S0FDckIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLHNCQUFzQjtJQUV0QixrRUFBa0U7SUFDbEUsa0NBQWtDO0lBQ2xDLGtDQUFrQztJQUNsQyxnRUFBZ0U7SUFDaEUsTUFBTTtJQUVOLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN4RCxJQUFJLEdBQUc7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUN6QixP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