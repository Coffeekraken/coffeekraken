// import __postcss from 'postcss';
import __fs from 'fs';
import __SFile from '@coffeekraken/s-file';
import __parseFunction from 'parse-function';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __glob from 'glob';
import __postcss from 'postcss';

let _mixinsPaths;
const plugin = (...args) => {
  // list all mixins
  // const mixinsPath = __fs.readdirSync(`${__dirname}/mixins`);

  // const mixinsAtRules = {};

  // if (!_mixinsPaths) {
  //   _mixinsPaths = __glob.sync(`${__dirname}/mixins/**/*.js`);
  // }

  // const importsStack: string[] = [];

  const processNested = (css) => {
    if (typeof css === 'string') css = __postcss.parse(css);
    css.walkAtRules((atRule) => {
      // if (atRule.name === 'import' && atRule.params.match(/^url\(.*\)/)) {
      //   importsStack.push(`.import { content: "hello"; }`);
      //   return;
      // }

      if (atRule.name.match(/^sugar\.[a-zA-Z0-9\.]+/)) {
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
        const intRes = mixinInterface.apply(atRule.params, {});
        if (intRes.hasIssues()) {
          throw new Error(intRes.toString());
        }
        const params = intRes.value;
        delete params.help;
        return mixinFn(params, atRule, processNested);
      }
    });

    // console.log(css.toString());

    css.walkDecls((decl) => {
      if (!decl.prop || !decl.value) return;
      if (!decl.value.match(/\s?sugar\.[a-zA-Z0-9]+.*/)) return;
      const calls = decl.value.match(
        /sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,)+\)/gm
      );
      if (!calls || !calls.length) return;
      calls.forEach((sugarStatement) => {
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
          const result = funcFn(params);
          decl.value = decl.value.replace(sugarStatement, result);
        } catch (e) {
          console.error(e.message);
        }
      });
    });

    return css;
  };

  return {
    postcssPlugin: 'sugar',
    Once(root) {
      const finalCss = processNested(root).toString();
      return finalCss;
    }
  };
};
plugin.postcss = true;

export default plugin;
