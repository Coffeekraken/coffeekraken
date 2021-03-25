// import __sugarConfig from '../../node/config/sugar';

import __SProcessSettingsInterface from '../../node/process/interface/SProcessSettingsInterface';
import __SInterface from '@coffeekraken/s-interface';

export default (stringArgs = '') => {
  const res = __SProcessSettingsInterface.apply({}, {});
  if (res.hasIssues()) {
    console.log(res.toString());
    return;
  }
};
