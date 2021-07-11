import __SProcess from '@coffeekraken/s-process';
import __SVite from '../SVite';
import __SViteStartInterface from './interface/SViteStartInterface';

export default async function start(stringArgs = '') {
  const vite = new __SVite();
  const pro = await __SProcess.from(vite.start.bind(vite), {
    process: {
      interface: __SViteStartInterface
    }
  });
  pro.run(stringArgs);
}
