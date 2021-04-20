// import __postcss from 'postcss';
import __fs from 'fs';
import __SFile from '@coffeekraken/s-file';
import __parseFunction from 'parse-function';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __glob from 'glob';

let _mixinsPaths;
const plugin = (opts = {}) => {
  // list all mixins
  // const mixinsPath = __fs.readdirSync(`${__dirname}/mixins`);

  const mixinsAtRules = {};

  if (!_mixinsPaths) {
    _mixinsPaths = __glob.sync(`${__dirname}/mixins/**/*.js`);
  }

  _mixinsPaths.forEach((path) => {
    const mixin = require(path);
    const mixinFn = mixin.default;
    const mixinInterface = mixin.interface;
    let mixinPath = `${path
      .replace(`${__dirname}/mixins/`, '')
      .split('/')
      .join('.')
      .replace(/\.js$/, '')}`;
    // @ts-ignore
    if (mixinPath.match(/\.default$/)) {
      mixinPath = mixinPath.replace(/\.default$/, '');
    }
    const mixinFile = __SFile.new(path);

    console.log('register', `sugar.${mixinPath}`);

    mixinsAtRules[`sugar.${mixinPath}`] = (atRule) => {
      const intRes = mixinInterface.apply(atRule.params, {});
      if (intRes.hasIssues()) {
        throw new Error(intRes.toString());
      }
      const params = intRes.value;
      delete params.help;
      return mixinFn(params, atRule);
    };
  });

  return {
    postcssPlugin: 'sugar',
    AtRule: {
      ...mixinsAtRules
    },
    Once(root) {
      root.walkDecls((decl) => {
        if (!decl.prop || !decl.value) return;
        if (!decl.value.match(/\s?sugar\.[a-zA-Z0-9]+.*/)) return;
        const calls = decl.value.match(
          /sugar\.[a-zA-Z0-9]+\((?:[^\)]+|\([^\(;,]*\(;,)+\)/gm
        );
        if (!calls || !calls.length) return;
        calls.forEach((sugarStatement) => {
          const functionName = sugarStatement.match(
            /sugar\.([a-zA-Z0-9\.]+)/
          )[1];
          const paramsStatement = sugarStatement.replace(
            /sugar\.[a-zA-Z0-9\.]+/,
            ''
          );

          let fnPath = `${__dirname}/functions/${functionName
            .split('.')
            .join('/')}.js`;
          if (!__fs.existsSync(fnPath)) {
            fnPath = `${__dirname}/functions/${functionName
              .split('.')
              .join('/')}/default.js`;
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
    }
  };
};
plugin.postcss = true;

export default plugin;
