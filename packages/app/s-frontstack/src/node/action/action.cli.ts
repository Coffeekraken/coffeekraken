import __SProcess from '@coffeekraken/s-process';
import __SFrontstack from '../SFrontstack';
import __SFrontstackActionInterface from './interface/SFrontstackActionInterface';

export default function action(stringArgs = '') {
  const frontstack = new __SFrontstack();
  const pro = __SProcess.from(frontstack.action.bind(frontstack), {
    process: {
      interface: __SFrontstackActionInterface
    }
  });
  pro.run(stringArgs);
}
