import __SProcess from '@coffeekraken/s-process';
import __SInterface from '@coffeekraken/s-interface';
import __SPromise from '@coffeekraken/s-promise';
import __fkill from 'fkill';
import __SSugarCliProcessKillParamsInterface from './interface/InteractiveKillParamsInterface'

export default function kill(params) {
  return new __SPromise(async ({ resolve, reject, emit }) => {
    if (params.id) {
      await __fkill(params.id);
      emit('log', {
        value: `<green>[process.kill]</green> The process with id <yellow>${params.id}</yellow> has been <green>successfully</green> killed`
      });
    } else if (params.port) {
      await __fkill(`:${params.port}`);
      emit('log', {
        value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`
      });
    }
    resolve();
  });
}
