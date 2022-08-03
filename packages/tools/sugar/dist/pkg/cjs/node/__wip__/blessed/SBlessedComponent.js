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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7QUFDakIsb0RBQW9EO0FBQ3BELDJEQUEyRDtBQUMzRCxnREFBZ0Q7QUFDaEQsNkNBQTZDO0FBQzdDLDZEQUE2RDtBQUM3RCxpREFBaUQ7QUFDakQsbUNBQW1DO0FBRW5DLHlDQUF5QztBQUV6QyxNQUFNO0FBQ04sOENBQThDO0FBQzlDLHdDQUF3QztBQUN4QyxrQ0FBa0M7QUFDbEMsOEJBQThCO0FBQzlCLEtBQUs7QUFDTCwrRkFBK0Y7QUFDL0YsS0FBSztBQUNMLHFJQUFxSTtBQUNySSxLQUFLO0FBQ0wsMEJBQTBCO0FBQzFCLG9CQUFvQjtBQUNwQixzQkFBc0I7QUFDdEIsS0FBSztBQUNMLHVCQUF1QjtBQUN2Qix5RkFBeUY7QUFDekYsdURBQXVEO0FBQ3ZELHFDQUFxQztBQUNyQywyQkFBMkI7QUFDM0IsVUFBVTtBQUNWLE9BQU87QUFDUCxLQUFLO0FBQ0wsc0JBQXNCO0FBQ3RCLG9GQUFvRjtBQUNwRixNQUFNO0FBRU4saURBQWlEO0FBRWpELDRDQUE0QztBQUM1QyxpREFBaUQ7QUFDakQsSUFBSTtBQUVKLGdGQUFnRjtBQUNoRixpQ0FBaUM7QUFDakMsMkNBQTJDO0FBQzNDLGlEQUFpRDtBQUNqRCw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLElBQUk7QUFFSixnRkFBZ0Y7QUFDaEYsUUFBUTtBQUNSLHVDQUF1QztBQUN2Qyx5REFBeUQ7QUFDekQsZ0JBQWdCO0FBQ2hCLE9BQU87QUFDUCxvQ0FBb0M7QUFDcEMsT0FBTztBQUNQLHNGQUFzRjtBQUN0RixRQUFRO0FBQ1IsK0NBQStDO0FBRS9DLFFBQVE7QUFDUixvQ0FBb0M7QUFDcEMsbUNBQW1DO0FBQ25DLGVBQWU7QUFDZixPQUFPO0FBQ1AsNEVBQTRFO0FBQzVFLE9BQU87QUFDUCxrRUFBa0U7QUFDbEUsT0FBTztBQUNQLDBCQUEwQjtBQUMxQixz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