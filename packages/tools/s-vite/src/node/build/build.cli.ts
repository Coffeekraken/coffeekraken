import __SProcess from '@coffeekraken/s-process';
import __SVite from '../SVite';
import __SViteBuildInterface from './interface/SViteBuildInterface';

export default async function build(stringArgs = '') {
  const vite = new __SVite();
  const pro = await __SProcess.from(vite.build.bind(vite), {
    process: {
      interface: __SViteBuildInterface
    }
  });
  pro.run(stringArgs);
}
