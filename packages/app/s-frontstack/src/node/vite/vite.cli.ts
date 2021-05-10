import __SProcess from '@coffeekraken/s-process';
import __SFrontstack from '../SFrontstack';
import __SFrontstackViteInterface from './interface/SFrontstackViteInterface';

export default function start(stringArgs = '') {
  const frontstack = new __SFrontstack();
  const pro = __SProcess.from(frontstack.vite.bind(frontstack), {
    process: {
      interface: __SFrontstackViteInterface
    }
  });
  pro.run(stringArgs);
}
