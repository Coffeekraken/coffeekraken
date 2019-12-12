// import the select-webcomponent
import '@coffeekraken/select-webcomponent';

// import some sugar helpers
import querySelector from '@coffeekraken/sugar/js/dom/querySelector';

// import some modules
import ViewsSelector from './modules/ViewsSelector';
const viewsSelector = new ViewsSelector(querySelector('.ck-preview__views-selector'), {});

// import some modules
import StatesSwitcher from './modules/StatesSwitcher';
const statesSwitcher = new StatesSwitcher(querySelector('.ck-preview__iframe'), {});

// welcome container
import WelcomeContainer from './modules/WelcomeContainer';
const welcomeContainer = new WelcomeContainer(querySelector('.ck-preview__welcome-container'));
