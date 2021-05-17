import __SProcess from '@coffeekraken/s-process';
import __SFrontstack from '../SFrontstack';
import __SFrontstackExecInterface from './interface/SFrontstackExecInterface';

export default function start(stringArgs = '') {
  const frontstack = new __SFrontstack();
  const pro = __SProcess.from(frontstack.exec.bind(frontstack), {
    process: {
      interface: __SFrontstackExecInterface
    }
  });
  pro.run(stringArgs);
}
