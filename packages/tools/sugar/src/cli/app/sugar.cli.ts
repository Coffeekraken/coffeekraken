// @ts-expect-error ts-migrate(2306) FIXME: File '/workspaces/coffeekraken/packages/tools/suga... Remove this comment to see the full error message
import __SSugarAppTerminalUi from '../../node/app/sugar/SSugarAppTerminalUi';
// @ts-expect-error ts-migrate(2306) FIXME: File '/workspaces/coffeekraken/packages/tools/suga... Remove this comment to see the full error message
import __SSugarAppProcess from '../../node/app/sugar/SSugarAppProcess';

export default function (stringArgs = '') {
  const sugarAppProcess = new __SSugarAppProcess({
    runAsChild: false,
    output: __SSugarAppTerminalUi
  });
  sugarAppProcess.run(stringArgs);
}
