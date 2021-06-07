// import __postcss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob';
import __postcss from 'postcss';
let _mixinsPaths;
const plugin = (settings = {}) => {
    settings = __deepMerge({}, settings);
    const processNested = (css) => {
        // if (Array.isArray(css)) {
        //   // css = css
        //   //   .map((node) => {
        //   //     if (node.type === 'decl') return node.toString() + ';';
        //   //     return node.toString();
        //   //   })
        //   //   .join('\n');
        // }
        // let isFunctionCall = false;
        // if (typeof css === 'string') {
        //   if (css.trim().match(/^sugar\./)) {
        //     isFunctionCall = true;
        //     if (!css.match(/;$/)) css += ';';
        //     css = `:root { content: ${css} }`;
        //   }
        //   // const plugins = __SSugarConfig.get('postcss.plugins').filter(p => p.postcssPlugin !== 'sugar');
        //   css = __postcss.parse(css);
        // }
        // css.walkAtRules((atRule) => {
        //   const string = atRule.toString();
        //   if (string.match(/\);?[.*\n][&>+:]\s?[a-zA-Z0-9-_>+:]+/gm)) {
        //     const parts = string.split(/\)[.*\n]+/gm);
        //     if (parts.length >= 2) {
        //       const AST = processNested(parts[0] + ');' + parts[1]);
        //       atRule.replaceWith(AST);
        //     }
        //   }
        // });
        // css.walkDecls((decl) => {
        //   if (!decl.prop || !decl.value) return;
        //   if (!decl.value.match(/\s?sugar\.[a-zA-Z0-9]+.*/)) return;
        //   const calls = decl.value.match(
        //     /sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,)+\)/gm
        //   );
        //   if (!calls || !calls.length) return;
        //   calls.forEach((sugarStatement) => {
        //     const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9\.]+)/)[1];
        //     const paramsStatement = sugarStatement.replace(
        //       /sugar\.[a-zA-Z0-9\.]+/,
        //       ''
        //     );
        //     let fnPath = `${__dirname}/functions/${functionName
        //       .split('.')
        //       .join('/')}.js`;
        //     if (!__fs.existsSync(fnPath)) {
        //       const potentialFileName = functionName.split('.').pop();
        //       fnPath = `${__dirname}/functions/${functionName
        //         .split('.')
        //         .join('/')}/${potentialFileName}.js`;
        //     }
        //     if (!__fs.existsSync(fnPath)) {
        //       throw new Error(
        //         `<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${functionName}</yellow>" does not exists...`
        //       );
        //     }
        //     const func = require(fnPath);
        //     const functionInterface = func.interface;
        //     const funcFn = func.default;
        //     const intRes = functionInterface.apply(paramsStatement, {});
        //     if (intRes.hasIssues()) {
        //       throw new Error(intRes.toString());
        //     }
        //     const params = intRes.value;
        //     delete params.help;
        //     try {
        //       const result = funcFn({
        //         params,
        //         settings
        //       });
        //       decl.value = decl.value.replace(sugarStatement, result);
        //     } catch (e) {
        //       console.error(e.message);
        //     }
        //   });
        // });
        // css.walkAtRules((atRule) => {
        //   if (atRule.name.match(/^sugar\.[a-zA-Z0-9\.]+/)) {
        //     let potentialMixinPath = `${__dirname}/mixins/${atRule.name
        //       .replace(/^sugar\./, '')
        //       .replace(/\./gm, '/')}.js`;
        //     if (!__fs.existsSync(potentialMixinPath)) {
        //       const potentialFileName = atRule.name.split('.').pop();
        //       potentialMixinPath = potentialMixinPath.replace(
        //         /\.js$/,
        //         `/${potentialFileName}.js`
        //       );
        //     }
        //     if (!__fs.existsSync(potentialMixinPath)) {
        //       throw new Error(
        //         `<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`
        //       );
        //     }
        //     const mixin = require(potentialMixinPath);
        //     const mixinFn = mixin.default;
        //     const mixinInterface = mixin.interface;
        //     let sanitizedParams = atRule.params;
        //     sanitizedParams = sanitizedParams.split('\n')[0];
        //     const intRes = mixinInterface.apply(sanitizedParams, {});
        //     if (intRes.hasIssues()) {
        //       throw new Error(intRes.toString());
        //     }
        //     const params = intRes.value;
        //     Object.keys(params).forEach((paramName) => {
        //       const paramValue = params[paramName];
        //       if (
        //         typeof paramValue === 'string' &&
        //         paramValue.trim().match(/^sugar\./)
        //       ) {
        //         let res = processNested(paramValue);
        //         if (typeof res !== 'string') res = res.toString();
        //         params[paramName] = res;
        //       }
        //     });
        //     delete params.help;
        //     return mixinFn({
        //       params,
        //       atRule,
        //       processNested,
        //       settings
        //     });
        //   }
        // });
        // if (isFunctionCall) {
        //   const functionRes = css
        //     .toString()
        //     .trim()
        //     .replace(/^:root\s?\{\s?content:\s?/, '')
        //     .replace(/;\s?\}$/, '');
        //   return functionRes;
        // }
        // return css;
    };
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
                if (typeof n === 'string') {
                    finalNodes = [...finalNodes, ...__postcss.parse(n).nodes];
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
    return {
        postcssPlugin: 'sugar',
        OnceExit(root) {
            const postProcessorsPaths = __glob.sync('**/*.js', {
                cwd: `${__dirname}/postProcessors`
            });
            postProcessorsPaths.forEach((path) => {
                const processorFn = require(`${__dirname}/postProcessors/${path}`).default;
                processorFn({
                    root
                });
            });
        },
        AtRule(atRule) {
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
                    postcss: __postcss,
                    processNested,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUdoQyxJQUFJLFlBQVksQ0FBQztBQUNqQixNQUFNLE1BQU0sR0FBRyxDQUFDLFdBQWdCLEVBQUUsRUFBRSxFQUFFO0lBQ3BDLFFBQVEsR0FBRyxXQUFXLENBQ3BCLEVBQ0MsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDNUIsNEJBQTRCO1FBQzVCLGlCQUFpQjtRQUNqQiwwQkFBMEI7UUFDMUIsbUVBQW1FO1FBQ25FLG1DQUFtQztRQUNuQyxZQUFZO1FBQ1osc0JBQXNCO1FBQ3RCLElBQUk7UUFFSiw4QkFBOEI7UUFFOUIsaUNBQWlDO1FBQ2pDLHdDQUF3QztRQUN4Qyw2QkFBNkI7UUFDN0Isd0NBQXdDO1FBQ3hDLHlDQUF5QztRQUN6QyxNQUFNO1FBRU4sdUdBQXVHO1FBQ3ZHLGdDQUFnQztRQUNoQyxJQUFJO1FBRUosZ0NBQWdDO1FBQ2hDLHNDQUFzQztRQUV0QyxrRUFBa0U7UUFDbEUsaURBQWlEO1FBQ2pELCtCQUErQjtRQUMvQiwrREFBK0Q7UUFDL0QsaUNBQWlDO1FBQ2pDLFFBQVE7UUFDUixNQUFNO1FBQ04sTUFBTTtRQUVOLDRCQUE0QjtRQUM1QiwyQ0FBMkM7UUFDM0MsK0RBQStEO1FBQy9ELG9DQUFvQztRQUNwQyw4REFBOEQ7UUFDOUQsT0FBTztRQUVQLHlDQUF5QztRQUN6Qyx3Q0FBd0M7UUFDeEMsK0VBQStFO1FBQy9FLHNEQUFzRDtRQUN0RCxpQ0FBaUM7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