// import __postcss from 'postcss';
import __fs from 'fs';
import __glob from 'glob';
import __postcss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
let _mixinsPaths;
const plugin = (settings = {}) => {
    settings = __deepMerge({
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
        let isFunctionCall = false;
        if (typeof css === 'string') {
            if (css.trim().match(/^sugar\./)) {
                isFunctionCall = true;
                if (!css.match(/;$/))
                    css += ';';
                css = `:root { content: ${css} }`;
            }
            css = __postcss.parse(css);
        }
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
        });
        css.walkAtRules((atRule) => {
            if (atRule.name.match(/^sugar\.[a-zA-Z0-9\.]+/)) {
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
                const mixin = require(potentialMixinPath);
                const mixinFn = mixin.default;
                const mixinInterface = mixin.interface;
                let sanitizedParams = atRule.params;
                sanitizedParams = sanitizedParams.split('\n')[0];
                const intRes = mixinInterface.apply(sanitizedParams, {});
                if (intRes.hasIssues()) {
                    throw new Error(intRes.toString());
                }
                const params = intRes.value;
                Object.keys(params).forEach((paramName) => {
                    const paramValue = params[paramName];
                    if (typeof paramValue === 'string' &&
                        paramValue.trim().match(/^sugar\./)) {
                        let res = processNested(paramValue);
                        if (typeof res !== 'string')
                            res = res.toString();
                        params[paramName] = res;
                    }
                });
                delete params.help;
                return mixinFn({
                    params,
                    atRule,
                    processNested,
                    settings
                });
            }
        });
        if (isFunctionCall) {
            const functionRes = css
                .toString()
                .trim()
                .replace(/^:root\s?\{\s?content:\s?/, '')
                .replace(/;\s?\}$/, '');
            return functionRes;
        }
        return css;
    };
    // load all the styles
    const stylesPaths = __glob.sync(`${__dirname}/**/*.style.css`);
    const stylesCss = [];
    stylesPaths.forEach((path) => {
        stylesCss.push(__fs.readFileSync(path, 'utf8').toString());
    });
    return {
        postcssPlugin: 'sugar',
        Once(root) {
            root.nodes.unshift(__postcss.parse(stylesCss));
            let finalAst = processNested(root);
            const postProcessorsPaths = __glob.sync('**/*.js', {
                cwd: `${__dirname}/postProcessors`
            });
            postProcessorsPaths.forEach((path) => {
                const processorFn = require(`${__dirname}/postProcessors/${path}`).default;
                finalAst = processorFn({
                    ast: finalAst,
                    root
                });
            });
            return finalAst.toString();
        }
    };
};
plugin.postcss = true;
export default plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUNuQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFJdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxJQUFJLFlBQVksQ0FBQztBQUNqQixNQUFNLE1BQU0sR0FBRyxDQUFDLFdBQWdCLEVBQUUsRUFBRSxFQUFFO0lBQ3BDLFFBQVEsR0FBRyxXQUFXLENBQ3BCO1FBQ0UsTUFBTSxFQUFFLFFBQVE7S0FDakIsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDNUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLEdBQUcsR0FBRyxHQUFHO2lCQUNOLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNaLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNO29CQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDdkQsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekIsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNmO1FBRUQsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBRTNCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDaEMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENB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