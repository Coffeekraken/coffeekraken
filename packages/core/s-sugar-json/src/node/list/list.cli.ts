require = require('esm')(module, {});

import __SProcess from '@coffeekraken/s-process';
import __SSugarJsonListParamsInterface from './interface/SSugarJsonListParamsInterface';
import __SSugarJson from '../SSugarJson';
import __SPromise from '@coffeekraken/s-promise';
import __SDuration from '@coffeekraken/s-duration';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __path from 'path';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

export default function start(stringArgs = '') {
  const pro = __SProcess.from(
    (params: any = {}) => {
      return new __SPromise(
        ({ resolve, reject, emit }) => {
          emit('log', {
            value:
              '<yellow>[search]</yellow> Searching for <yellow>sugar.json</yellow> files'
          });
          const duration = new __SDuration();
          const sugarJson = new __SSugarJson();
          const list = sugarJson.search();
          emit('log', {
            value: `<green>[success]</green> <magenta>${
              list.length
            }</magenta> file(s) found in <yellow>${
              duration.end().formatedDuration
            }</yellow>`
          });
          list.forEach((path) => {
            emit('log', {
              value: `<yellow>[file]</yellow> <cyan>${__path.relative(
                __packageRoot(),
                path
              )}</cyan>`
            });
          });
          resolve();
        },
        {
          metas: {
            id: 'json.list'
          }
        }
      );
    },
    {
      process: {
        interface: __SSugarJsonListParamsInterface
      }
    }
  );
  pro.run(stringArgs);
}
