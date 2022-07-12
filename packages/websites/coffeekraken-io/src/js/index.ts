import { define as __sActivateFeature } from "@coffeekraken/s-activate-feature";
import { define as __sAppearFeature } from "@coffeekraken/s-appear-feature";
import { define as __SCodeExampleWebcomponent } from "@coffeekraken/s-code-example-component";
import { define as __SColorPickerComponent } from "@coffeekraken/s-color-picker-component";
import { define as __SDatetimePickerComponent } from "@coffeekraken/s-datetime-picker-component";
import __SFeature from "@coffeekraken/s-feature";
import { define as __SFiltrableInputComponent } from "@coffeekraken/s-filtrable-input-component";
import { define as __sFloatingFeature } from "@coffeekraken/s-floating-feature";
import { define as __sFormValidateFeature } from "@coffeekraken/s-form-validate-feature";
import { define as __sInlineFeature } from "@coffeekraken/s-inline-feature";
import { define as __sPageTransitionFeature } from "@coffeekraken/s-page-transition-feature";
import { define as __sRefocusFeature } from "@coffeekraken/s-refocus-feature";
import { define as __SScrollComponent } from "@coffeekraken/s-scroll-component";
import {
  define as __SSliderComponent,
  SSliderSlideableBehavior,
} from "@coffeekraken/s-slider-component";
import { define as __sSugarFeature } from "@coffeekraken/s-sugar-feature";

import __SLitComponent from "@coffeekraken/s-lit-component";
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
import { define as __SSidePanelWebcomponent } from "@coffeekraken/s-panel-component";
import { define as __SRangeWebcomponent } from "@coffeekraken/s-range-component";

// Components
// import { define as __CKBlobComponent } from './components/CkBlob';
import { define as __CKDiscoverComponent } from "./components/CKDiscover";
import { define as __CKDiscoverTabedComponent } from "./components/CKDiscoverTabed";
import { define as __CKDocSubNavComponent } from "./components/CKDocSubNav/CKDocSubNav";
import { define as __CkFallingStarsComponent } from "./components/CkFallingStars";
import { define as __CKSearchComponent } from "./components/CKSearch";
import { define as __CKSettingsComponent } from "./components/CkSettings";
import { define as __VersionSelector } from "./components/VersionSelector";

// others
import __SConductor from "@coffeekraken/s-conductor";
import __SDashboard from "@coffeekraken/s-dashboard";
import __STheme from "@coffeekraken/s-theme";

// import __SCssAnimation from '@coffeekraken/s-css-animation';

interface HTMLElement {
  classList: {
    add(this: HTMLElement, cls: string): void;
  };
}

// @ts-ignore
const viewsRelated = import.meta.globEager("../views/**/*.ts");
// @ts-ignore
const forDocRelated = import.meta.globEager("./forDoc/**/*.ts");

// setup conductor
__SConductor.setup({
  log: true,
});

// @ts-ignore
// const $div = document.createElement('div');
// const add = $div.classList.add;

// HTMLElement.prototype.classList.add = function (cls) {
//     console.log('CLS', cls);
// }

// HTMLElement.__proto__.classList = {
//     ...HTMLElement.prototype.classList,
//     add(...cls) {
//         console.log('cls', cls, this);
//     },
// };

// Object.defineProperty(HTMLElement.prototype, 'classList', {
//     get() {
//         const _this = this;
//         return {
//             ..._classList,
//             add(cls) {
//                 console.log(_classList);
//                 console.log('cls', cls, _this);
//                 _classList.add.call(_this, cls);
//             },
//         };
//     },
//     enumerable: true,
// });

// HTMLElement.classList.add = (cls) => {
//     console.log('THI', cls, this);
// };

(async () => {
  __SFeature.setDefaultProps("*", {
    mountWhen: "nearViewport",
  });
  __SLitComponent.setDefaultProps("*", {
    mountWhen: "nearViewport",
  });
  __SLitComponent.setDefaultProps(["s-panel", "ck-settings"], {
    mountWhen: "direct",
  });
  __SLitComponent.setDefaultProps(["s-code-example"], {
    scrollToSettings: {
      offset: 100,
    },
  });

  // init theme
  __STheme.init();

  // features
  __sActivateFeature();
  __sPageTransitionFeature();

  // internal components
  __VersionSelector();
  __CKSearchComponent();
  // __CKBlobComponent();
  __CkFallingStarsComponent();

  // components
  __CKDiscoverComponent();
  __CKDiscoverTabedComponent();
  __CKSettingsComponent();
  __CKDocSubNavComponent();
  __SCodeExampleWebcomponent();
  __SFiltrableInputComponent();
  __SSidePanelWebcomponent();
  __SColorPickerComponent();
  __SDatetimePickerComponent();
  __SScrollComponent();
  __SRangeWebcomponent();
  __SSliderComponent({
    behaviors: {
      slideable: {
        class: SSliderSlideableBehavior,
        settings: {},
      },
      // cssAnimation: {
      //     class: SSliderCssAnimationBehavior,
      //     settings: {},
      // },
    },
  });

  // features
  __sSugarFeature();
  __sFloatingFeature();
  __sAppearFeature();
  __sRefocusFeature();
  __sInlineFeature();
  // __sParallaxFeature();
  __sFormValidateFeature({
    customValidations: {
      coffeekraken: (value, helpers) => {
        if (value === "coffeekraken") {
          return helpers.message("Are you sure? Krakens are dangerous...");
        }
        return value;
      },
    },
  });

  // dashboard
  new __SDashboard({
    dashboard: {
      components: {
        "s-dashboard-pages": {
          onSelect: (page) => {
            document.location.href = page.item.loc;
          },
        },
      },
    },
  });
})();
