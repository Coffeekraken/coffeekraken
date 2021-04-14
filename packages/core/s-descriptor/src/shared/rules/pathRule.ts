// @ts-nocheck

import __isPath from '@coffeekraken/sugar/shared/is/path';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
import { ISDescriptorResultObj } from '../SDescriptorResult';
import { ISDescriptorRule, ISDescriptorSettings } from '../_SDescriptor';
import __isNode from '@coffeekraken/sugar/shared/is/node';

/**
 * @name          pathRule
 * @namespace     sugar.js.descriptor.rules
 * @type          ISDescriptorRule
 * @status        wip
 *
 * This rule allows you to make sure a value is not under a certain value
 *
 * @todo      tests
 * @todo      doc
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
export interface IRuleParams {
  value: boolean;
}
export interface IRuleSettings {}

const ruleObj: ISDescriptorRule = {
  name: 'Path',
  id: 'path',
  settings: {
    mapOnArray: true
  },
  processParams: (params: number) => {
    return {
      absolute: params.absolute ?? false,
      exists: params.exists ?? false,
      create: params.create ?? false,
      rootDir: params.rootDir ?? (process && process.cwd ? process.cwd() : '/'),
      glob: params.glob ?? false,
      tokens: params.tokens ?? true,
      cast: params.cast ?? true
    };
  },
  apply: (
    value: any,
    params: IRuleParams,
    ruleSettings: IRuleSettings,
    settings: ISDescriptorSettings
  ): ISDescriptorResultObj | true => {
    if (typeof value !== 'string') {
      return new Error('The path value must be a <yellow>String</yellow>');
    }

    function toAbsolute(path) {
      if (params.absolute && path.slice(0, 1) !== '/') {
        if (!params.cast)
          return new Error(
            `The passed path "<cyan>${path}</cyan>" must be absolute and cannot be casted automatically`
          );
        if (__isNode()) {
          const __path = require('path'); // eslint-disable-line
          path = __path.resolve(params.rootDir, path);
        } else {
          path = `${rootDir}${path}`;
        }
      }
      return path;
    }

    // tokens
    if (params.tokens && __isNode()) {
      const __replacePathTokens = require('@coffeekraken/sugar/node/path/replacePathTokens') // eslint-disable-line
        .default;
      value = __replacePathTokens(value);
    }

    if (params.glob) {
      switch (params.glob) {
        case true:
          break;
        case false:
          if (__isGlob(value))
            return new Error(
              `The passed path "<cyan>${value}</cyan>" is a glob and this is not authorized`
            );
          break;
        case 'resolve':
        case 'SFile':
          if (!__isNode())
            return new Error(
              `The parameter "<magenta>glob: 'resolve'</magenta>" can be used only in a node context`
            );
          const __resolveGlob = require('@coffeekraken/sugar/node/glob/resolveGlob') // eslint-disable-line
            .default;
          /* eslint-disable */
          let files = __resolveGlob(value, {
            cwd: params.rootDir
          });
          files = files.map((file) => {
            if (params.glob === 'SFile') return file;
            if (params.absolute) return toAbsolute(file.path);
            return file.path;
          });
          /* eslint-enable */
          return files;
          break;
      }
    }

    if (!__isPath(value)) {
      return new Error(
        `The passed path "<cyan>${value}</cyan>" is not a valid path`
      );
    }

    if (params.exists) {
      if (!__isNode())
        return new Error(
          `Sorry but the "<yellow>exists</yellow>" parameter can be used only in a node context`
        );
      const __fs = require('fs'); // eslint-disable-line
      if (!__fs.existsSync(value))
        if (params.create) {
          __fs.mkdirSync(value, { recursive: true });
        } else {
          return new Error(
            `The passed path "<cyan>${value}</cyan>" does not exists and it should`
          );
        }
    }

    return value;
  }
};

export default ruleObj;
