// import __postcss from 'postcss';
import __fs from 'fs';
import __SFile from '@coffeekraken/s-file';
import __parseFunction from 'parse-function';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __glob from 'glob';
import __postcss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

let _mixinsPaths;
const plugin = (settings: any = {}) => {
  settings = __deepMerge(
    {
      target: 'global'
    },
    settings
  );

  const processNested = (css) => {
    if (Array.isArray(css)) {
      css = css
        .map((node) => {
          if (node.type === 'decl') return node.toString() + ';';
          return node.toString();
        })
        .join('\n');
    }

    if (typeof css === 'string') css = __postcss.parse(css);

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

    css.walkAtRules((atRule) => {
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
          const result = funcFn({
            params,
            settings
          });
          decl.value = decl.value.replace(sugarStatement, result);
        } catch (e) {
          console.error(e.message);
        }
      });
    });

    return css;
  };

  // load all the styles

  const stylesPaths = __glob.sync(`${__dirname}/**/*.style.css`);
  const stylesCss: string[] = [];
  stylesPaths.forEach((path) => {
    stylesCss.push(__fs.readFileSync(path, 'utf8').toString());
  });

  return {
    postcssPlugin: 'sugar',
    Once(root) {
      root.nodes.unshift(__postcss.parse(stylesCss));
      const finalAst = processNested(root);

      // if target is a component, do not output styles
      if (settings.target && settings.target === 'global') {
        // @ts-ignore
        Object.keys(global._definedStyles).forEach((styleName) => {
          // @ts-ignore
          finalAst.nodes.push(global._definedStyles[styleName]);
        });
      }

      let finalCss = finalAst.toString();
      return finalCss;
    }
  };
};
plugin.postcss = true;

export default plugin;
