import __SSugarAppTerminalUi from '../../node/app/sugar/SSugarAppTerminalUi';
import __SSugarAppProcess from '../../node/app/sugar/SSugarAppProcess';

export default function (stringArgs = '') {
  const sugarAppProcess = new __SSugarAppProcess({
    runAsChild: false,
    output: __SSugarAppTerminalUi
  });
  sugarAppProcess.run(stringArgs);
};
