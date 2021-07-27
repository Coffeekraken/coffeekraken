import __SInterface from '@coffeekraken/s-interface';
import __SGlob from '@coffeekraken/s-glob';
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __chokidar from 'chokidar';
import __SEventEmitter from '@coffeekraken/s-event-emitter';

/**
 * @name           import
 * @namespace      node.mixins.import
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to import other files just like the @import statement does.
 * It add the feature to specify a glob pattern to import multiple files at once.
 *
 * @param         {String}        path        The file path you want to import relative to the file you're in
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.import('./my-cool-file.css');
 * \@sugar.import('../views/** /*.css');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginImportInterface extends __SInterface {
  static definition = {
    path: {
      type: 'String',
      required: true
    }
  };
}

export interface IPostcssSugarPluginImportParams {
  path: string;
}

export { postcssSugarPluginImportInterface as interface };

/**
 * @name          import
 * @namespace     sugar.postcss.mixin.import
 * @type          PostcssMixin
 *
 * This mixin allows you to import files as default import statement does but add the glob support like "something/* * /*.css"
 * 
 * @param       {String}        path      The path or glob to import
 * @return      {Css}                   The corresponding imported css
 *
 * @example       css
 * \@sugar.import('./** /*.css');
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _watcher;
export default function ({
  params,
  atRule,
  postcss
}: {
  params: IPostcssSugarPluginImportParams;
  atRule: any;
  postcss: any;
}) {
  const finalParams: IPostcssSugarPluginImportParams = {
    ...params
  };

  const dirName =
    typeof atRule.source.input.file === 'string'
      ? __path.dirname(atRule.source.input.file)
      : __dirname();

  // resolve globs even if it's a simple path
  const files = __SGlob.resolve(finalParams.path, {
    cwd: dirName
  });

  // watch for new / deleted files
  if (!_watcher) {
    function triggerUpdate(path) {
      __SEventEmitter.global.emit('s-postcss-sugar-plugin-import-update', {
        path: __path.resolve(dirName, path)
      });
    }
    const watcher = __chokidar.watch(finalParams.path, {
      cwd: dirName,
      ignoreInitial: true
    });
    watcher.on('change', (path) => {
      triggerUpdate(path);
    });
    watcher.on('add', (path) => {
      triggerUpdate(path);
    });
    watcher.on('unlink', (path) => {
      triggerUpdate(path);
    });
  }

  files.forEach(file => {
    const newRule = postcss.parse(`@import url('${file.relPath}');`);
    newRule.source.input.file = atRule.source.input.file;    
    atRule.parent.insertAfter(atRule, newRule);
  });

  atRule.remove();
}
