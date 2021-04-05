// @ts-nocheck

import __SDocMap from '../../node/docMap/SDocMap';
import __SStdio from '@coffeekraken/s-stdio';
import __SDocMapSettingsInterface from '../../node/docMap/interface/SDocMapSettingsInterface';
import __argsToObject from '../../node/cli/argsToObject';

export default async (stringArgs = '') => {
  const settings = __argsToObject(stringArgs, {
    definition: __SDocMapSettingsInterface.definition
  });
  const docMap = new __SDocMap({
    docMap: settings
  });

  const findPromise = docMap.find();
  __SStdio.new(findPromise, 'terminal');
  await findPromise;
  process.exit();
};
