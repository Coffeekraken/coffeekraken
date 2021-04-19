// import __postcss from 'postcss';
import __fs from 'fs';
import __SFile from '@coffeekraken/s-file';
import __parseFunction from 'parse-function';
import __sugarConfig from '@coffeekraken/s-sugar-config';

const plugin = (opts = {}) => {
  // list all mixins
  const mixinsPath = __fs.readdirSync(`${__dirname}/mixins`);

  const mixinsAtRules = {};

  mixinsPath.forEach((path) => {
    if (!path.match(/\.js$/)) return;
    const fullPath = `${__dirname}/mixins/${path}`;
    const mixin = require(fullPath);
    const mixinFn = mixin.default;
    const mixinInterface = mixin.interface;
    const mixinFile = __SFile.new(fullPath);
    mixinsAtRules[`sugar.${mixinFile.nameWithoutExt}`] = (atRule) => {
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
          const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9]+)/)[1];
          const paramsStatement = sugarStatement.replace(
            /sugar\.[a-zA-Z0-9]+/,
            ''
          );
          if (!__fs.existsSync(`${__dirname}/functions/${functionName}.js`)) {
            throw new Error(
              `<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${functionName}</yellow>" does not exists...`
            );
          }
          const func = require(`${__dirname}/functions/${functionName}`);
          const functionInterface = func.interface;
          const funcFn = func.default;
          const intRes = functionInterface.apply(paramsStatement, {});
          if (intRes.hasIssues()) {
            throw new Error(intRes.toString());
          }
          const params = intRes.value;
          delete params.help;
          const result = funcFn(params);
          decl.value = decl.value.replace(sugarStatement, result);
        });
      });
    }
  };
};
plugin.postcss = true;

export default plugin;
