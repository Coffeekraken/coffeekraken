// import __postcss from 'postcss';
import __SBench from '@coffeekraken/s-bench';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __unquote from '@coffeekraken/sugar/shared/string/unquote';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __postcss from 'postcss';
import __getRoot from './utils/getRoot';

let _mixinsPaths;
const plugin = (settings: any = {}) => {
  settings = __deepMerge(
    {
      inlineImport: true
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
  const mixinsStack = {}, functionsStack = {};

  async function _load() {
    // list all mixins
    const mixinsPaths = __glob.sync(`mixins/**/*.js`, {
      cwd: __dirname()
    });
    for (let i=0; i<mixinsPaths.length; i++) {
      const path = mixinsPaths[i];
      const { default: mixin, interface: int } = await import(`./${path}`);
      mixinsStack[`${path.split('/').slice(1).join('.').replace(/\.js$/, '')}`] = {
        mixin,
        interface: int
      };
    }

    // list all functions
    const functionsPaths = __glob.sync(`functions/**/*.js`, {
      cwd: __dirname()
    });
    for (let i=0; i<functionsPaths.length; i++) {
      const path = functionsPaths[i];
      const { default: fn, interface: int } = await import(`./${path}`);
      functionsStack[`${path.split('/').slice(1).join('.').replace(/\.js$/, '')}`] = {
        fn,
        interface: int
      };
    }

    return true;

  }

  return {
    postcssPlugin: 'sugar',
    async Once() {
      if (__SBench.env.isBenchActive('postcssSugarPlugin')) {
        __SBench.start('postcssSugarPlugin');
      }

      await _load();

    },

    async OnceExit(root) {

      // console.log('EX');
      // if (postProcessorsExecuted) return;
      // postProcessorsExecuted = true;
      // console.log('IT');

      const postProcessorsPaths = __glob.sync('**/*.js', {
        cwd: `${__dirname()}/postProcessors`
      });

      console.log('EXIT');

      for (let i=0; i<postProcessorsPaths.length; i++) {
        const path = postProcessorsPaths[i];
        const { default: processorFn } =
        await import(`${__dirname()}/postProcessors/${path}`);
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

        let mixinId = atRule.name.replace(/^sugar\./, '');

        if (!mixinsStack[mixinId]) {
          mixinId = `${mixinId}.${mixinId.split('.').slice(-1)[0]}`
        }

        if (!mixinsStack[mixinId]) {
          throw new Error(
            `<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`
          );
        }

        const root = __getRoot(atRule);
        const sourcePath =
          typeof root.source.input.file === 'string'
            ? __path.dirname(root.source.input.file)
            : __dirname();

        const mixinFn = mixinsStack[mixinId].mixin;
        const mixinInterface = mixinsStack[mixinId].interface;

        const sanitizedParams = atRule.params;

        const params = mixinInterface.apply(sanitizedParams, {});

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

      } else if (atRule.name.match(/^import/)) {

        // check settings
        if (!settings.inlineImport) return;

        // do not take care of imported assets using url('...');
        if (atRule.params.match(/^url\(/)) return;

        const dirName =
          typeof atRule.source.input.file === 'string'
          ? __path.dirname(atRule.source.input.file)
          : __dirname();
        
        const path = __path.resolve(dirName, __unquote(atRule.params));

        if (!__fs.existsSync(path)) {
          throw new Error(`<red>[postcssSugarPlugin.@import]</red> You try to load the file "<yellow>${path}</yellow>" but this file does not exists`);
        }

        const contentStr = __fs.readFileSync(path, 'utf8').toString();
        
        atRule.after(contentStr);
        atRule.remove();

      }
    },
    Declaration(decl) {
      if (!decl.prop || !decl.value) return;
      if (!decl.value.match(/\s?sugar\.[a-zA-Z0-9]+.*/)) return;
      const calls = decl.value.match(
        /sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm
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

        let fnId = functionName;
        if (!functionsStack[fnId]) {
          fnId = `${fnId}.${fnId.split('.').slice(-1)[0]}`
        }

        if (!functionsStack[fnId]) {
          throw new Error(
            `<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`
          );
        }

        const functionInterface = functionsStack[fnId].interface;
        const funcFn = functionsStack[fnId].fn;
        const params = functionInterface.apply(paramsStatement, {});
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
export const postcss = true;
export default plugin;
