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
        if (typeof css === 'string')
            css = __postcss.parse(css);
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
                const processorFn = require(`${__dirname}/postProcessors/${path}`)
                    .default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUNuQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFJdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxJQUFJLFlBQVksQ0FBQztBQUNqQixNQUFNLE1BQU0sR0FBRyxDQUFDLFdBQWdCLEVBQUUsRUFBRSxFQUFFO0lBQ3BDLFFBQVEsR0FBRyxXQUFXLENBQ3BCO1FBQ0UsTUFBTSxFQUFFLFFBQVE7S0FDakIsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDNUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLEdBQUcsR0FBRyxHQUFHO2lCQUNOLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNaLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNO29CQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDdkQsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekIsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNmO1FBRUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1lBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3pCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVqQyxJQUFJLE1BQU0s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