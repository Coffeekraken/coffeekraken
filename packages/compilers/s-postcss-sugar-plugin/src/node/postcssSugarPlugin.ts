// import __postcss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob';
import __postcss from 'postcss';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

let _mixinsPaths;
const plugin = (settings: any = {}) => {
  settings = __deepMerge(
    {
    },
    settings
  );

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
      if (!isAllText) return;
      if (typeof n !== 'string') isAllText = false;
    });
    if (isAllText) nodes = [nodes.join('\n')];

    if (atRule.parent) {

      let finalNodes: any[] = [];

      nodes.map(n => typeof n === 'string' ? n.trim() : n).forEach(n => {
        if (typeof n === 'string') {
          finalNodes = [...finalNodes, ...(__postcss.parse(n).nodes ?? [])];
        } else {
          finalNodes.push(n);
        }
      });

      for (const node of finalNodes.reverse()) {
        if (!node) continue;
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
        const processorFn =
        require(`${__dirname}/postProcessors/${path}`).default;
        processorFn({
          root
        });
      });
    },
    AtRule( atRule) {
        if (atRule.name.match(/^sugar\./)) {

        let potentialMixinPath = `${__dirname}/mixins/${atRule.name
          .replace(/^sugar\./, '')
          .replace(/\./gm, '/')}.js`;

        if (!__fs.existsSync(potentialMixinPath)) {
          const potentialFileName = atRule.name.split('.').pop();
          potentialMixinPath = potentialMixinPath.replace(
            /\.js$/,
            `/${potentialFileName}.js`
          );
        }
        if (!__fs.existsSync(potentialMixinPath)) {
          throw new Error(
            `<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`
          );
        }

        const mixin = require(potentialMixinPath);
        const mixinFn = mixin.default;
        const mixinInterface = mixin.interface;

        let sanitizedParams = atRule.params;

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
          postcss: __postcss,
          processNested,
          settings
        });

      }
    },
    Declaration(decl) {
      if (!decl.prop || !decl.value) return;
      if (!decl.value.match(/\s?sugar\.[a-zA-Z0-9]+.*/)) return;
      const calls = decl.value.match(
        /sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,)+\)/gm
      );

      if (!calls || !calls.length) return;
      calls.forEach((sugarStatement) => {

        // FIX. sugarStatement comes with none corresponding count of "(" and ")"
        const openingParenthesisCount = (sugarStatement.match(/\(/g) || []).length;
        const closingParenthesisCount = (sugarStatement.match(/\)/g) || []).length;

        if (openingParenthesisCount > closingParenthesisCount) {
          sugarStatement += ')'.repeat(openingParenthesisCount - closingParenthesisCount);
        }

        const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9\.]+)/)[1];
        const paramsStatement = sugarStatement.replace(
          /sugar\.[a-zA-Z0-9\.]+/,
          ''
        );
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
          throw new Error(
            `<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${functionName}</yellow>" does not exists...`
          );
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
        } catch (e) {
          console.error(e.message);
        }
      });
    }
  };
};
plugin.postcss = true;

export default plugin;
