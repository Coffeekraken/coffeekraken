import './sugar';
// Coffeekraken others
import __SConductor from '@coffeekraken/s-conductor';
// import __SDashboard from '@coffeekraken/s-dashboard';
import __STheme from '@coffeekraken/s-theme';

// Coffeekraken features
import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
// import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
// import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import __SFeature from '@coffeekraken/s-feature';

// Coffeekraken components
import { define as __sCarpenterComponentDefine } from '@coffeekraken/s-carpenter';
import __SLitComponent from '@coffeekraken/s-lit-component';
// import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
// import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
// import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
// import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
// import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
// import { define as __SSliderComponent } from '@coffeekraken/s-slider-component';
// import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-panel-component';
// import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';

// Project level components
// ...

// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');

// setup conductor
__SConductor.setup({
  log: true,
});

// Init script
(async () => {
  // Set some features defaults
  __SFeature.setDefaultProps('*', {});

  // Set some components defaults
  __SLitComponent.setDefaultProps('*', {});

  // Init theme
  __STheme.init();

  // features
  __sActivateFeature();
  __sAppearFeature();
  // __sFloatingFeature();
  // __sRefocusFeature();
  // __sInlineFeature();
  // __sParallaxFeature();
  __sFormValidateFeature({});
  // __sPageTransitionFeature();

  // Project related components
  // ...

  // Components
  // __SCodeExampleWebcomponent();
  // __SFiltrableInputComponent();
  // __SSidePanelWebcomponent();
  // __SColorPickerComponent();
  // __SDatetimePickerComponent();
  // __SScrollComponent();
  // __SRangeWebcomponent();
  // __SSliderComponent({
  //   // behaviors: {
  //   //   slideable: {
  //   //     class: SSliderSlideableBehavior,
  //   //     settings: {},
  //   //   },
  //   // },
  // });
  __sCarpenterComponentDefine();

  // Dashboard
  // new __SDashboard({
  //     dashboard: {
  //         components: {
  //             's-dashboard-pages': {
  //                 onSelect: (page) => {
  //                     document.location.href = page.item.loc;
  //                 },
  //             },
  //         },
  //     },
  // });
})();
