import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as _sCarpenterComponentDefine } from './SCarpenterComponent';

(async () => {
    // features
    __sActivateFeature();

    // components
    console.log(_sCarpenterComponentDefine);
    _sCarpenterComponentDefine();
})();
