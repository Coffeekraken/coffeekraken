// @ts-nocheck

import __SSugarAppTerminalUi from '../../node/app/sugar/SSugarAppTerminalUi';
import __SSugarAppProcess from '../../node/app/sugar/SSugarAppProcess';

import __SSugarApp from '../../node/app/sugar/SSugarApp';

function sugar(stringArgs = '') {
  // const sugarAppProcess = new __SSugarAppProcess({
  //   runAsChild: false,
  //   stdio: __SSugarAppTerminalUi
  // });
  // sugarAppProcess.run(stringArgs);
  new __SSugarApp(stringArgs);
}
export = sugar;
