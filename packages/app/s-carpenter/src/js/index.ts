import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as _sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component/webcomponent';

(async () => {
    // features
    __sActivateFeature();

    // components
    setTimeout(() => {
        _sSpecsEditorComponentDefine();
    }, 1000);
})();
