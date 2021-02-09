// @ts-nocheck

import __SDocMap from '../../node/docMap/SDocMap';
import __stdio from '../../node/stdio/stdio';
import __SDocMapSettingsInterface from '../../node/docMap/interface/SDocMapSettingsInterface';
import __argsToObject from '../../node/cli/argsToObject';

export default async (stringArgs = '') => {
  const settings = __argsToObject(stringArgs, {
    definition: __SDocMapSettingsInterface.definition
  });
  const docMap = new __SDocMap({
    docMap: settings
  });
  const readPromise = docMap.read();
  const stdio = __stdio(readPromise, 'inherit');
  const res = await readPromise;
  const logStrArray: string[] = [];
  Object.keys(res).forEach((namespace) => {
    logStrArray.push(`- <green>${namespace}</green>`);
  });
  stdio.log({
    value: logStrArray.join('\n')
  });
  process.exit();
};
