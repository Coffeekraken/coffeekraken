import __SInterface from '@coffeekraken/s-interface';
import __SGlob from '@coffeekraken/s-glob';
import __path from 'path';

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
      : __dirname;

  // resolve globs even if it's a simple path
  const files = __SGlob.resolve(finalParams.path, {
    cwd: dirName
  });

  files.forEach(file => {
    const newRule = postcss.parse(`@import '${file.relPath}';`);
    newRule.source.input.file = atRule.source.input.file;    
    atRule.parent.insertAfter(atRule, newRule);
  });

  atRule.remove();
}
