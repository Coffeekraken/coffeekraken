// import __sugarConfig from '../../node/config/sugar';

import __SProcessSettingsInterface from '../../node/process/interface/SProcessSettingsInterface';
import __SInterface from '../../node/interface/SInterface';

export default (stringArgs = '') => {
  const res = __SProcessSettingsInterface.apply(
    {},
    {
      complete: true
    }
  );
  if (res.hasIssues()) {
    console.log(res.toString());
    return;
  }
};
