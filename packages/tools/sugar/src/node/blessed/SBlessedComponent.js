"use strict";
// // @ts-nocheck
// import __SPromise from '@coffeekraken/s-promise';
// import __deepMerge from '../../shared/object/deepMerge';
// import __SColor from '@coffeekraken/s-color';
// import __hotkey from '../keyboard/hotkey';
// import __isChildProcess from '../../node/is/childProcess';
// import __innerWidth from './utils/innerWidth';
// import __blessed from 'blessed';
// import IBlessed from '@types/blessed';
// /**
//  * @name                  SBlessedComponent
//  * @namespace            node.blessed
//  * @type                  Class
//  * @status              wip
//  *
//  * This class is the base one for all the sugar blessed components like input, panel, etc...
//  *
//  * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
//  *
//  * @todo      interface
//  * @todo      doc
//  * @todo      tests
//  *
//  * @example       js
//  * import SBlessedComponent from '@coffeekraken/sugar/node/blessed/SBlessedComponent';
//  * class MyCoolComponent extends SBlessedComponent {
//  *    constructor(settings = {}) {
//  *      super(settings);
//  *    }
//  * }
//  *
//  * @since     2.0.0
//  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//  */
// export interface ISBlessedComponentSettings {}
// export interface ISBlessedComponentCtor {
//   new (settings?: ISBlessedComponentSettings);
// }
// export interface ISBlessedComponent extends IBlessed.Widgets.BlessedElement {
//   readonly realHeight: number;
//   setFramerate(framerate: number): void;
//   on(event: string, callback: Function): void;
//   isDisplayed(): boolean;
//   isDestroyed(): boolean;
// }
// class SBlessedComponent extends __blessed.box implements ISBlessedComponent {
//   /**
//    * @name                  _settings
//    * @type                  ISBlessedComponentSettings
//    * @private
//    *
//    * Store the component settings
//    *
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//    */
//   _settings: ISBlessedComponentSettings = {};
//   /**
//    * @name              getScreen
//    * @type              Function
//    * @static
//    *
//    * Get the screen initiated when using some SBlessedComponent instances
//    *
//    * @return      {Screen}          The blessed screen instance
//    *
//    * @since       2.0.0
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//    */
//   static getScreen() {
//     return SBlessedComponent.screen;
//   }
//   /**
//    * @name              destroyScreen
//    * @type              Function
//    * @static
//    *
//    * Get the screen initiated when using some SBlessedComponent instances
//    *
//    * @return      {Screen}          The blessed screen instance
//    *
//    * @since       2.0.0
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//    */
//   static destroyScreen() {
//     if (!SBlessedComponent.getScreen()) return;
//     SBlessedComponent.getScreen().destroy();
//     SBlessedComponent.screen = undefined;
//   }
//   /**
//    * @name                  _framerateInterval
//    * @type                  Function
//    * @private
//    * @static
//    *
//    * Store the setInterval that render the screen
//    *
//    * @since         2.0.0
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//    */
//   static _framerateInterval = null;
//   /**
//    * @name                  screen
//    * @type                  __blessed.screen
//    * @static
//    *
//    * Store the global screen initiated by the first component
//    *
//    * @since       2.0.0
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//    */
//   static screen;
//   /**
//    * @name                  constructor
//    * @type                  Function
//    * @constructor
//    *
//    * Constructor
//    *
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//    */
//   constructor(settings: ISBlessedComponentSettings = {}) {
//     // store the settings
//     settings = __deepMerge(
//       {
//         screen: true,
//         container: true,
//         framerate: null,
//         attach: undefined,
//         blessed: {
//           scrollable: true
//           // mouse: true,
//           // keys: true
//         }
//       },
//       settings
//     );
//     // check if need to create a screen
//     let isNewScreen = false;
//     if (
//       !SBlessedComponent.screen &&
//       settings.screen !== false &&
//       !isNewScreen
//     ) {
//       isNewScreen = true;
//       SBlessedComponent.screen = __blessed.screen({
//         smartCSR: true,
//         title: '[CK] Coffeekraken Sugar',
//         autoPadding: true,
//         cursor: {
//           artificial: true,
//           shape: {
//             bg: new __SColor('terminal.primary').toString(),
//             ch: '|'
//             // ch: '█'
//           },
//           blink: true
//         }
//       });
//       SBlessedComponent.screen.on('destroy', () => {
//         SBlessedComponent.screen = null;
//       });
//       __onProcessExit(() => {
//         SBlessedComponent.destroyScreen();
//       });
//     }
//     // extends parent
//     super(settings.blessed || {});
//     this._settings = settings;
//     this._promise = new __SPromise();
//     // save screen reference
//     this._screen = SBlessedComponent.screen;
//     // listen for screen resize
//     this._screen.on('resize', () => {
//       // update the component
//       if (this.isDisplayed()) this.update();
//     });
//     // keep track of the component status
//     this.on('attach', () => {
//       this._isDisplayed = true;
//       setTimeout(() => {
//         if (this.isDisplayed()) this.update();
//       }, 50);
//     });
//     this.on('detach', () => {
//       this._isDisplayed = false;
//     });
//     // set render interval if not set already
//     if (settings.framerate && !SBlessedComponent._framerateInterval) {
//       this.setFramerate(settings.framerate);
//     }
//     if (this._settings.attach === true && SBlessedComponent.screen) {
//       SBlessedComponent.screen.append(this);
//     }
//     if (this.parent) {
//       setTimeout(() => {
//         if (this.isDisplayed()) this.update();
//       });
//     } else {
//       this.on('attach', () => {
//         setTimeout(() => {
//           if (this.isDisplayed()) this.update();
//         });
//       });
//     }
//   }
//   /**
//    * @name        innerWidth
//    * @type        Integer
//    * @get
//    *
//    * Access the inner width of the component. This mean the actual width
//    * minus the left/right padding
//    *
//    * @since     2.0.0
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//    */
//   get innerWidth() {
//     return __innerWidth(this);
//   }
//   get realHeight() {
//     if (!this.isDisplayed()) return 0;
//     let height = this.height;
//     if (typeof this.getScrollHeight === 'function') {
//       try {
//         const originalHeight = this.height;
//         this.height = 0;
//         height = this.getScrollHeight();
//         this.height = originalHeight;
//       } catch (e) {}
//     }
//     return height;
//   }
//   /**
//    * @name                  setFramerate
//    * @type                  Function
//    *
//    * This method allows you to simply change the interval timeout between the screen renders process.
//    * Note that calling this will change the GLOBAL render screen interval so use with caution...
//    *
//    * @param       {Number}          interval          The interval between screen rendering processes in ms
//    *
//    * @since           2.0.0
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//    */
//   setFramerate(framerate) {
//     clearInterval(SBlessedComponent._framerateInterval);
//     SBlessedComponent._framerateInterval = setInterval(() => {
//       if (!this.isDisplayed()) return;
//       this.update();
//     }, 1000 / framerate);
//   }
//   /**
//    * @name                  update
//    * @type                  Function
//    *
//    * This method simply update the screen if the component is a child of one
//    *
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//    */
//   _renderAfterNotAllowedTimeout = null;
//   update() {
//     if (this.isDestroyed() || !this.isDisplayed()) return;
//     if (this._screen) {
//       this._screen.render();
//     }
//     this.emit('update');
//   }
//   /**
//    * @name                isDisplayed
//    * @type                Function
//    *
//    * Check if the component is in the display list of the screen
//    *
//    * @return      {Boolean}             true if is displayed, false if not
//    *
//    * @since       2.0.0
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//    */
//   isDisplayed() {
//     return this._isDisplayed && SBlessedComponent.getScreen() !== undefined;
//   }
//   /**
//    * @name                  isDestroyed
//    * @type                  Function
//    *
//    * Check if the component (screen) has been destroyed
//    *
//    * @since         2.0.0
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//    */
//   isDestroyed() {
//     return this._destroyed === true;
//   }
// }
// if (!__isChildProcess()) {
//   __hotkey('ctrl+c', {
//     once: true
//   }).on('press', () => {
//     if (!cls.screen) return;
//     cls.screen.destroy();
//   });
// }
// const cls: ISBlessedComponentCtor = SBlessedComponent;
// export default SBlessedComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsZXNzZWRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmxlc3NlZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBQWlCO0FBQ2pCLG9EQUFvRDtBQUNwRCwyREFBMkQ7QUFDM0QsZ0RBQWdEO0FBQ2hELDZDQUE2QztBQUM3Qyw2REFBNkQ7QUFDN0QsaURBQWlEO0FBQ2pELG1DQUFtQztBQUVuQyx5Q0FBeUM7QUFFekMsTUFBTTtBQUNOLDhDQUE4QztBQUM5Qyx3Q0FBd0M7QUFDeEMsa0NBQWtDO0FBQ2xDLDhCQUE4QjtBQUM5QixLQUFLO0FBQ0wsK0ZBQStGO0FBQy9GLEtBQUs7QUFDTCxxSUFBcUk7QUFDckksS0FBSztBQUNMLDBCQUEwQjtBQUMxQixvQkFBb0I7QUFDcEIsc0JBQXNCO0FBQ3RCLEtBQUs7QUFDTCx1QkFBdUI7QUFDdkIseUZBQXlGO0FBQ3pGLHVEQUF1RDtBQUN2RCxxQ0FBcUM7QUFDckMsMkJBQTJCO0FBQzNCLFVBQVU7QUFDVixPQUFPO0FBQ1AsS0FBSztBQUNMLHNCQUFzQjtBQUN0QixzRkFBc0Y7QUFDdEYsTUFBTTtBQUVOLGlEQUFpRDtBQUVqRCw0Q0FBNEM7QUFDNUMsaURBQWlEO0FBQ2pELElBQUk7QUFFSixnRkFBZ0Y7QUFDaEYsaUNBQWlDO0FBQ2pDLDJDQUEyQztBQUMzQyxpREFBaUQ7QUFDakQsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1QixJQUFJO0FBRUosZ0ZBQWdGO0FBQ2hGLFFBQVE7QUFDUix3Q0FBd0M7QUFDeEMseURBQXlEO0FBQ3pELGdCQUFnQjtBQUNoQixPQUFPO0FBQ1Asb0NBQW9DO0FBQ3BDLE9BQU87QUFDUCx3RkFBd0Y7QUFDeEYsUUFBUTtBQUNSLGdEQUFnRDtBQUVoRCxRQUFRO0FBQ1Isb0NBQW9DO0FBQ3BDLG1DQUFtQztBQUNuQyxlQUFlO0FBQ2YsT0FBTztBQUNQLDRFQUE0RTtBQUM1RSxPQUFPO0FBQ1Asa0VBQWtFO0FBQ2xFLE9B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