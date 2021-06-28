// import __postcss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob';
import __postcss from 'postcss';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __path from 'path';
import __getRoot from './utils/getRoot';
import __SBench from '@coffeekraken/s-bench';

let _mixinsPaths;
const plugin = (settings: any = {}) => {
  settings = __deepMerge(
    {
    },
    settings
  );

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

  const sharedData = {};
  const postProcessorsExecuted = false;

  return {
    postcssPlugin: 'sugar',
    Once() {
      if (__SBench.env.isBenchActive('postcssSugarPlugin')) {
        __SBench.start('postcssSugarPlugin');
      }
    },
    OnceExit(root) {

      // console.log('EX');
      // if (postProcessorsExecuted) return;
      // postProcessorsExecuted = true;
      // console.log('IT');

      const postProcessorsPaths = __glob.sync('**/*.js', {
        cwd: `${__dirname}/postProcessors`
      });

      for (let i=0; i<postProcessorsPaths.length; i++) {
        const path = postProcessorsPaths[i];
        const processorFn =
        require(`${__dirname}/postProcessors/${path}`).default;
        processorFn({
          root,
          sharedData
        });
      }

      root.walkComments(comment => {
        if (!comment.text.match(/^@sugar-media-classes-[a-zA-Z0-9-_]+/)) return;
        const mediaName = comment.text.replace('@sugar-media-classes-', '').trim();
        const mediaRule = comment.next();
        if (!mediaRule) return;
        mediaRule.walkRules(rule => {
          if (rule.parent !== mediaRule) return;
          if (!rule.selector) return;
          if (!rule.selector.match(/^\./)) return;

          const selectorParts = rule.selector.split(/[\s:#.]/).filter(l => l !== '');
          if (!selectorParts.length) return;
          const clsSelector = `.${selectorParts[0]}`;

          const newSelector = rule.selector.split(clsSelector).join(`${clsSelector}___${mediaName}`);
          rule.selector = newSelector;
        });
        comment.remove();
      });

      if (__SBench.env.isBenchActive('postcssSugarPlugin')) {
        console.log(__SBench.end('postcssSugarPlugin').toString());
      }

    },
    AtRule( atRule, postcssApi) {

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

        const root = __getRoot(atRule);
        const sourcePath =
          typeof root.source.input.file === 'string'
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
