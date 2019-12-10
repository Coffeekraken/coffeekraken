// import the select-webcomponent
import '@coffeekraken/select-webcomponent';

// import some sugar helpers
import querySelector from '@coffeekraken/sugar/js/dom/querySelector';

// import some modules
import ViewsSelector from './modules/ViewsSelector';

// init a ViewsSelector instance
const viewsSelector = new ViewsSelector(querySelector('.ck-preview__views-selector'), {});

// import some modules
import StatesSwitcher from './modules/StatesSwitcher';

// init a StatesSwitcher instance
const statesSwitcher = new StatesSwitcher(querySelector('.ck-preview__iframe'), {});
