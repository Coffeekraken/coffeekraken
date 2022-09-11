"use strict";
// // @ts-nocheck
// import __SPromise from '@coffeekraken/s-promise';
// import __deepMerge from '../../shared/object/deepMerge';
// import __SColor from '@coffeekraken/s-color';
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
//  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//    * @name                  settings
//    * @type                  ISBlessedComponentSettings
//    * @private
//    *
//    * Store the component settings
//    *
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
//    */
//   settings: ISBlessedComponentSettings = {};
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
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
//    */
//   static screen;
//   /**
//    * @name                  constructor
//    * @type                  Function
//    * @constructor
//    *
//    * Constructor
//    *
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//     this.settings = settings;
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
//     if (this.settings.attach === true && SBlessedComponent.screen) {
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
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7QUFDakIsb0RBQW9EO0FBQ3BELDJEQUEyRDtBQUMzRCxnREFBZ0Q7QUFDaEQsNkRBQTZEO0FBQzdELGlEQUFpRDtBQUNqRCxtQ0FBbUM7QUFFbkMseUNBQXlDO0FBRXpDLE1BQU07QUFDTiw4Q0FBOEM7QUFDOUMsd0NBQXdDO0FBQ3hDLGtDQUFrQztBQUNsQyw4QkFBOEI7QUFDOUIsS0FBSztBQUNMLCtGQUErRjtBQUMvRixLQUFLO0FBQ0wscUlBQXFJO0FBQ3JJLEtBQUs7QUFDTCwwQkFBMEI7QUFDMUIsb0JBQW9CO0FBQ3BCLHNCQUFzQjtBQUN0QixLQUFLO0FBQ0wsdUJBQXVCO0FBQ3ZCLHlGQUF5RjtBQUN6Rix1REFBdUQ7QUFDdkQscUNBQXFDO0FBQ3JDLDJCQUEyQjtBQUMzQixVQUFVO0FBQ1YsT0FBTztBQUNQLEtBQUs7QUFDTCxzQkFBc0I7QUFDdEIsb0ZBQW9GO0FBQ3BGLE1BQU07QUFFTixpREFBaUQ7QUFFakQsNENBQTRDO0FBQzVDLGlEQUFpRDtBQUNqRCxJQUFJO0FBRUosZ0ZBQWdGO0FBQ2hGLGlDQUFpQztBQUNqQywyQ0FBMkM7QUFDM0MsaURBQWlEO0FBQ2pELDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsSUFBSTtBQUVKLGdGQUFnRjtBQUNoRixRQUFRO0FBQ1IsdUNBQXVDO0FBQ3ZDLHlEQUF5RDtBQUN6RCxnQkFBZ0I7QUFDaEIsT0FBTztBQUNQLG9DQUFvQztBQUNwQyxPQUFPO0FBQ1Asc0ZBQXNGO0FBQ3RGLFFBQVE7QUFDUiwrQ0FBK0M7QUFFL0MsUUFBUTtBQUNSLG9DQUFvQztBQUNwQyxtQ0FBbUM7QUFDbkMsZUFBZTtBQUNmLE9BQU87QUFDUCw0RUFBNEU7QUFDNUUsT0FBTztBQUNQLGtFQUFrRTtBQUNsRSxPQUFPO0FBQ1AsMEJBQTBCO0FBQzFCLHNGQUFzRjtBQUN0RixR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