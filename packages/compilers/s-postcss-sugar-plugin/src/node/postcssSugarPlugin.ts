// import __postcss from 'postcss';
import __fs from 'fs';
import __SFile from '@coffeekraken/s-file';
import __parseFunction from 'parse-function';

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
      return mixinFn(intRes.value, atRule);
    };
  });

  //   console.log(mixinsAtRules);

  return {
    postcssPlugin: 'sugar',
    AtRule: {
      ...mixinsAtRules
    }
  };
};
plugin.postcss = true;

export default plugin;
