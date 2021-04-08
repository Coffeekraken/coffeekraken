import __SProcess from '@coffeekraken/s-process';
import __SFrontstack from '../SFrontstack';
import __SFrontstackStartInterface from './interface/SFrontstackStartInterface';

export default function start(stringArgs = '') {
  const frontstack = new __SFrontstack();
  const pro = __SProcess.from(frontstack.start.bind(frontstack), {
    process: {
      interface: __SFrontstackStartInterface
    }
  });
  pro.run(stringArgs);
}
