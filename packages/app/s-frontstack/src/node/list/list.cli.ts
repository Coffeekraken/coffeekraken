import __SProcess from '@coffeekraken/s-process';
import __SFrontstack from '../SFrontstack';
import __SFrontstackListParamsInterface from './interface/SFrontstackListParamsInterface';

export default async function action(stringArgs = '') {
  const frontstack = new __SFrontstack();
  const pro = __SProcess.from(frontstack.list.bind(frontstack), {
    process: {
      interface: __SFrontstackListParamsInterface
    }
  });
  pro.run(stringArgs);
}
