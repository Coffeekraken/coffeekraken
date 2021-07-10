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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob';
import __postcss from 'postcss';
import __path from 'path';
import __getRoot from './utils/getRoot';
import __SBench from '@coffeekraken/s-bench';
import __unquote from '@coffeekraken/sugar/shared/string/unquote';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
let _mixinsPaths;
const plugin = (settings = {}) => {
    settings = __deepMerge({
        inlineImport: true
    }, settings);
    // load all the styles
    // const stylesPaths = __glob.sync(`${__dirname}/**/*.style.css`);
    // const stylesCss: string[] = [];
    // stylesPaths.forEach((path) => {
    //   stylesCss.push(__fs.readFileSync(path, 'utf8').toString());
    // });
    function replaceWith(atRule, nodes) {
        nodes = Array.from(nodes);
        let isAllText = true;
        nodes.forEach(n => {
            if (!isAllText)
                return;
            if (typeof n !== 'string')
                isAllText = false;
        });
        if (isAllText)
            nodes = [nodes.join('\n')];
        if (atRule.parent) {
            let finalNodes = [];
            nodes.map(n => typeof n === 'string' ? n.trim() : n).forEach(n => {
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
    const sharedData = {};
    const mixinsStack = {}, functionsStack = {};
    function _load() {
        return __awaiter(this, void 0, void 0, function* () {
            // list all mixins
            const mixinsPaths = __glob.sync(`${__dirname()}/mixins/**/*.js`);
            // list all functions
            const functionsPaths = __glob.sync(`${__dirname()}/functions/**/*.js`);
            for (let i = 0; i < mixinsPaths.length; i++) {
                const path = mixinsPaths[i];
                const { default: mixin } = yield import(path);
                mixinsStack[`${path.split('/').slice(-2).join('.').replace(/\.js$/, '')}`] = mixin;
                console.log(mixinsStack);
            }
            console.log(mixinsStack);
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
            // console.log('EX');
            // if (postProcessorsExecuted) return;
            // postProcessorsExecuted = true;
            // console.log('IT');
            const postProcessorsPaths = __glob.sync('**/*.js', {
                cwd: `${__dirname()}/postProcessors`
            });
            for (let i = 0; i < postProcessorsPaths.length; i++) {
                const path = postProcessorsPaths[i];
                const processorFn = require(`${__dirname()}/postProcessors/${path}`).default;
                processorFn({
                    root,
                    sharedData
                });
            }
            root.walkComments(comment => {
                if (!comment.text.match(/^@sugar-media-classes-[a-zA-Z0-9-_]+/))
                    return;
                const mediaName = comment.text.replace('@sugar-media-classes-', '').trim();
                const mediaRule = comment.next();
                if (!mediaRule)
                    return;
                mediaRule.walkRules(rule => {
                    if (rule.parent !== mediaRule)
                        return;
                    if (!rule.selector)
                        return;
                    if (!rule.selector.match(/^\./))
                        return;
                    const selectorParts = rule.selector.split(/[\s:#.]/).filter(l => l !== '');
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
        },
        AtRule(atRule, postcssApi) {
            if (atRule.name.match(/^sugar\./)) {
                let potentialMixinPath = `${__dirname()}/mixins/${atRule.name
                    .replace(/^sugar\./, '')
                    .replace(/\./gm, '/')}.js`;
                if (!__fs.existsSync(potentialMixinPath)) {
                    const potentialFileName = atRule.name.split('.').pop();
                    potentialMixinPath = potentialMixinPath.replace(/\.js$/, `/${potentialFileName}.js`);
                }
                if (!__fs.existsSync(potentialMixinPath)) {
                    throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`);
                }
                const root = __getRoot(atRule);
                const sourcePath = typeof root.source.input.file === 'string'
                    ? __path.dirname(root.source.input.file)
                    : __dirname();
                const mixin = require(potentialMixinPath);
                const mixinFn = mixin.default;
                const mixinInterface = mixin.interface;
                const sanitizedParams = atRule.params;
                // console.log('PA', atRule.params);
                // sanitizedParams = sanitizedParams.split('\n')[0];
                const params = mixinInterface.apply(sanitizedParams, {});
                // Object.keys(params).forEach((paramName) => {
                //   const paramValue = params[paramName];
                //   if (
                //     typeof paramValue === 'string' &&
                //     paramValue.trim().match(/^sugar\./)
                //   ) {
                //     let res = processNested(paramValue);
                //     if (typeof res !== 'string') res = res.toString();
                //     params[paramName] = res;
                //   }
                // });
                delete params.help;
                mixinFn({
                    params,
                    atRule,
                    replaceWith(nodes) {
                        replaceWith(atRule, nodes);
                    },
                    postcssApi,
                    sourcePath,
                    sharedData,
                    postcss: __postcss,
                    settings
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
                let fnPath = `${__dirname()}/functions/${functionName
                    .split('.')
                    .join('/')}.js`;
                if (!__fs.existsSync(fnPath)) {
                    const potentialFileName = functionName.split('.').pop();
                    fnPath = `${__dirname()}/functions/${functionName
                        .split('.')
                        .join('/')}/${potentialFileName}.js`;
                }
                if (!__fs.existsSync(fnPath)) {
                    throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${functionName}</yellow>" does not exists...`);
                }
                const func = require(fnPath);
                const functionInterface = func.interface;
                const funcFn = func.default;
                const params = functionInterface.apply(paramsStatement, {});
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
        }
    };
};
plugin.postcss = true;
export default plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsSUFBSSxZQUFZLENBQUM7QUFDakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUFnQixFQUFFLEVBQUUsRUFBRTtJQUNwQyxRQUFRLEdBQUcsV0FBVyxDQUNwQjtRQUNFLFlBQVksRUFBRSxJQUFJO0tBQ25CLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixzQkFBc0I7SUFFdEIsa0VBQWtFO0lBQ2xFLGtDQUFrQztJQUNsQyxrQ0FBa0M7SUFDbEMsZ0VBQWdFO0lBQ2hFLE1BQU07SUFFTixTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSztRQUVoQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUztnQkFBRSxPQUFPO1lBQ3ZCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTtnQkFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQy9DLENB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