// import __postcss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob';
import __postcss from 'postcss';
import __path from 'path';
import __getRoot from './utils/getRoot';
import __SBench from '@coffeekraken/s-bench';
let _mixinsPaths;
const plugin = (settings = {}) => {
    settings = __deepMerge({}, settings);
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
    const postProcessorsExecuted = false;
    return {
        postcssPlugin: 'sugar',
        Once() {
            if (__SBench.env.isBenchActive('postcssSugarPlugin')) {
                __SBench.start('postcssSugarPlugin');
            }
        },
        OnceExit(root) {
            // console.log('EX');
            // if (postProcessorsExecuted) return;
            // postProcessorsExecuted = true;
            // console.log('IT');
            const postProcessorsPaths = __glob.sync('**/*.js', {
                cwd: `${__dirname}/postProcessors`
            });
            for (let i = 0; i < postProcessorsPaths.length; i++) {
                const path = postProcessorsPaths[i];
                const processorFn = require(`${__dirname}/postProcessors/${path}`).default;
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
                let potentialMixinPath = `${__dirname}/mixins/${atRule.name
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
                    : __dirname;
                const mixin = require(potentialMixinPath);
                const mixinFn = mixin.default;
                const mixinInterface = mixin.interface;
                const sanitizedParams = atRule.params;
                // console.log('PA', atRule.params);
                // sanitizedParams = sanitizedParams.split('\n')[0];
                const intRes = mixinInterface.apply(sanitizedParams, {});
                if (intRes.hasIssues()) {
                    throw new Error(intRes.toString());
                }
                const params = intRes.value;
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
                let fnPath = `${__dirname}/functions/${functionName
                    .split('.')
                    .join('/')}.js`;
                if (!__fs.existsSync(fnPath)) {
                    const potentialFileName = functionName.split('.').pop();
                    fnPath = `${__dirname}/functions/${functionName
                        .split('.')
                        .join('/')}/${potentialFileName}.js`;
                }
                if (!__fs.existsSync(fnPath)) {
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
        }
    };
};
plugin.postcss = true;
export default plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsSUFBSSxZQUFZLENBQUM7QUFDakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUFnQixFQUFFLEVBQUUsRUFBRTtJQUNwQyxRQUFRLEdBQUcsV0FBVyxDQUNwQixFQUNDLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixzQkFBc0I7SUFFdEIsa0VBQWtFO0lBQ2xFLGtDQUFrQztJQUNsQyxrQ0FBa0M7SUFDbEMsZ0VBQWdFO0lBQ2hFLE1BQU07SUFFTixTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSztRQUVoQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUztnQkFBRSxPQUFPO1lBQ3ZCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTtnQkFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTO1lBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTFDLElB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