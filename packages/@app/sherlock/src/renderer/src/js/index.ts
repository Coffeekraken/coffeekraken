import { define as __SGaugeComponentDefine } from '@coffeekraken/s-gauge-component';
import { define as __SSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';

import './components/app/SherlockAppComponent.js';
(async () => {
    // features
    __SSugarFeatureDefine();
    // components
    __SGaugeComponentDefine();
})();
