// import the select-webcomponent
import '@coffeekraken/select-webcomponent';

// import some sugar helpers
import querySelector from '@coffeekraken/sugar/js/dom/querySelector';

// import some modules
import ViewsSelector from './modules/ViewsSelector';

// init a ViewsSelector instance
const viewsSelector = new ViewsSelector(querySelector('.ck-preview__views-selector'), {});
