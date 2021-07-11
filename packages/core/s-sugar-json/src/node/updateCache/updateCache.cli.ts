import __SProcess from '@coffeekraken/s-process';
import __SSugarJsonUpdateCacheParamsInterface from './interface/SSugarJsonUpdateCacheParamsInterface';
import __SSugarJson from '../SSugarJson';
import __SPromise from '@coffeekraken/s-promise';
import __SDuration from '@coffeekraken/s-duration';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';

export default async function start(stringArgs = '') {
  const pro = await __SProcess.from(
    (params: any = {}) => {
      return new __SPromise(
        ({ resolve, reject, emit }) => {
          emit('log', {
            value: '<yellow>[cache]</yellow> Starting cache update'
          });
          const duration = new __SDuration();
          const sugarJson = new __SSugarJson();
          sugarJson.updateCache();
          emit('log', {
            value: `<green>[cache]</green> Cache updated <green>successfully</green> in <yellow>${
              duration.end().formatedDuration
            }</yellow>`
          });
          resolve();
        },
        {
          metas: {
            id: 'json.updateCache'
          }
        }
      );
    },
    {
      process: {
        interface: __SSugarJsonUpdateCacheParamsInterface
      }
    }
  );
  pro.run(stringArgs);
}
