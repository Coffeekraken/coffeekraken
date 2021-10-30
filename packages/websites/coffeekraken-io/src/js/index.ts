// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');

// import '@coffeekraken/s-inline-svg-component';
// import '@coffeekraken/s-request-component';
import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
import { define as __SConfigExplorerWebcomponent } from '@coffeekraken/s-config-explorer-component';
import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-side-panel-component';
import { define as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { define as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';

import { define as __DocNavComponent } from './components/docNav';
import { define as __VersionSelector } from './components/VersionSelector';
import { define as __CkSettingsWebcomponent } from './components/CkSettings';

import { register as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { register as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';

// internal components
__DocNavComponent();
__VersionSelector();
__CkSettingsWebcomponent();

__SLitComponent.setDefaultProps('*', {
    mountWhen: 'inViewport',
    defaultStyle: true,
});
__SLitComponent.setDefaultProps(['s-side-panel', 'ck-settings'], {
    mountWhen: 'direct',
});

// webcomponents
__SCodeExampleWebcomponent();
__SConfigExplorerWebcomponent();
__SSidePanelWebcomponent();
__SColorPickerWebcomponent();
__SDatePickerWebcomponent();
__SRangeWebcomponent();

// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';

__sActivateFeature();
__sFormValidateFeature({
    customValidations: {
        coffeekraken: (value, helpers) => {
            if (value === 'coffeekraken') {
                return helpers.message(
                    'Are you sure? Krakens are dangerous...',
                );
            }
            return value;
        },
    },
});

__smoothScroll({
    scroll: {
        offset: 188,
    },
});
__linksStateAttributes();

document.addEventListener('scroll', (e) => {
    if (window.scrollY >= 10) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

__expandPleasantCssClassnamesLive();
