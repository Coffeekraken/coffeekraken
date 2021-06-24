// import __postcss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob';
import __postcss from 'postcss';
import __path from 'path';
import __getRoot from './utils/getRoot';
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
            const calls = decl.value.match(/sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,)+\)/gm);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFFeEMsSUFBSSxZQUFZLENBQUM7QUFDakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUFnQixFQUFFLEVBQUUsRUFBRTtJQUNwQyxRQUFRLEdBQUcsV0FBVyxDQUNwQixFQUNDLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixzQkFBc0I7SUFFdEIsa0VBQWtFO0lBQ2xFLGtDQUFrQztJQUNsQyxrQ0FBa0M7SUFDbEMsZ0VBQWdFO0lBQ2hFLE1BQU07SUFFTixTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSztRQUVoQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUztnQkFBRSxPQUFPO1lBQ3ZCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTtnQkFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTO1lBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTFDLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUVqQixJQUFJ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