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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFNBQVMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFJeEMsSUFBSSxZQUFZLENBQUM7QUFDakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUFnQixFQUFFLEVBQUUsRUFBRTtJQUNsQyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLFlBQVksRUFBRSxJQUFJO0tBQ3JCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixzQkFBc0I7SUFFdEIsa0VBQWtFO0lBQ2xFLGtDQUFrQztJQUNsQyxrQ0FBa0M7SUFDbEMsZ0VBQWdFO0lBQ2hFLE1BQU07SUFFTixTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTztRQUN6QixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDeEQsSUFBSSxHQUFHO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDekIsT0FBTztJQUNYLENBQUM7SUFFRCxTQUFTLGFBQWEsQ0FBQyxN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