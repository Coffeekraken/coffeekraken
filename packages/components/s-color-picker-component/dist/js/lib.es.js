import __SLitComponent from'@coffeekraken/s-lit-component';import __Pickr from'@simonwep/pickr';import {css,unsafeCSS,html}from'lit';import __SInterface from'@coffeekraken/s-interface';// @ts-nocheck
/**
 * @name                      plainObject
 * @namespace            js.is
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed object (or array of objects) is/are plain object(s)
 *
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import isPlainObject from '@coffeekraken/sugar/js/is/plainObject';
 * isPlainObject({ hello: 'world'}); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function plainObject(object) {
    if (!object)
        return false;
    if (typeof object !== 'object')
        return false;
    if (object.constructor && object.constructor.name !== 'Object')
        return false;
    if (Object.prototype.toString.call(object) !== '[object Object]')
        return false;
    if (object !== Object(object))
        return false;
    // if (object.constructor !== Object) return false;
    return true;
}// @ts-nocheck
/**
 * @name                deepMerge
 * @namespace            js.object
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Deep merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 *
 * @param           {Object}            args...        Pass all the objects you want to merge
 * @param           {Object}            [settings={}]       Pass as last object the settings one that can contain these properties:
 * - object (true) {Boolean}: Specify if you want to merge the objects
 * - array (false) {Boolean}: Specify if you want to merge the arrays
 * @return          {Object}                              The merged object result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// function deepMerge(...args) {
//     const settings = {
//         array: false,
//         object: true,
//     };
//     function merge(firstObj, secondObj) {
//         const newObj = {};
//         if (!firstObj && secondObj) return secondObj;
//         if (!secondObj && firstObj) return firstObj;
//         if (!firstObj && !secondObj) return {};
//         __copyTo(firstObj).withAccess().toCover(newObj);
//         for (const key of Object.keys(secondObj)) {
//             // merging arrays
//             // if (settings.array === true && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
//             //     const newArray = __unique([...firstObj[key], ...secondObj[key]]);
//             //     newObj[key] = newArray;
//             //     continue;
//             // }
//             // merging objects
//             if (settings.object === true && __isPlainObject(firstObj[key]) && __isPlainObject(secondObj[key])) {
//                 const descriptor = Object.getOwnPropertyDescriptor(secondObj, key);
//                 if (descriptor.get || descriptor.set) {
//                 } else {
//                     newObj[key] = merge(firstObj[key], secondObj[key]);
//                     continue;
//                 }
//             }
//             __copyTo(secondObj).withAccess().pick(key).toCover(newObj);
//         }
//         return newObj;
//     }
//     const potentialSettingsObj = args[args.length - 1] || {};
//     if (
//         (potentialSettingsObj.array && typeof potentialSettingsObj.array === 'boolean') ||
//         (potentialSettingsObj.object && typeof potentialSettingsObj.object === 'boolean')
//     ) {
//         if (potentialSettingsObj.array !== undefined) settings.array = potentialSettingsObj.array;
//         if (potentialSettingsObj.object !== undefined) settings.object = potentialSettingsObj.object;
//         args.pop();
//     }
//     let currentObj = {};
//     for (let i = 0; i < args.length; i++) {
//         const toMergeObj = args[i];
//         currentObj = merge(currentObj, toMergeObj);
//     }
//     return currentObj;
// }
function __deepMerge (...args) {
    function merge(firstObj, secondObj) {
        const newObj = {};
        if (!firstObj && secondObj)
            return secondObj;
        if (!secondObj && firstObj)
            return firstObj;
        if (!firstObj && !secondObj)
            return {};
        const firstProps = Object.getOwnPropertyNames(firstObj);
        firstProps.forEach((key) => {
            const desc = Object.getOwnPropertyDescriptor(firstObj, key);
            if (desc.set || desc.get) {
                Object.defineProperty(newObj, key, desc);
            }
            else {
                newObj[key] = firstObj[key];
            }
        });
        const secondProps = Object.getOwnPropertyNames(secondObj);
        secondProps.forEach((key) => {
            const desc = Object.getOwnPropertyDescriptor(secondObj, key);
            if (desc.set || desc.get) {
                Object.defineProperty(newObj, key, desc);
            }
            else if (plainObject(newObj[key]) &&
                plainObject(secondObj[key])) {
                newObj[key] = merge(newObj[key], secondObj[key]);
            }
            else {
                newObj[key] = secondObj[key];
            }
        });
        return newObj;
    }
    let currentObj = {};
    for (let i = 0; i < args.length; i++) {
        const toMergeObj = args[i];
        currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
}
// export default deepMerge;
var __baseCss = "/*! Pickr 1.8.2 MIT | https://github.com/Simonwep/pickr */\n.pickr{position:relative;overflow:visible;transform:translateY(0)}\n.pickr *{box-sizing:border-box;outline:none;border:none;-webkit-appearance:none}\n.pickr .pcr-button{position:relative;height:2em;width:2em;padding:0.5em;cursor:pointer;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",\"Roboto\",\"Helvetica Neue\",Arial,sans-serif;border-radius:.15em;background:url('data:image/svg+xml;utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\" stroke=\"%2342445A\" stroke-width=\"5px\" stroke-linecap=\"round\"><path d=\"M45,45L5,5\"></path><path d=\"M45,5L5,45\"></path></svg>') no-repeat center;background-size:0;transition:all 0.3s}\n.pickr .pcr-button::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 2 2\"><path fill=\"white\" d=\"M1,0H2V1H1V0ZM0,1H1V2H0V1Z\"/><path fill=\"gray\" d=\"M0,0H1V1H0V0ZM1,1H2V2H1V1Z\"/></svg>');background-size:.5em;border-radius:.15em;z-index:-1}\n.pickr .pcr-button::before{z-index:initial}\n.pickr .pcr-button::after{position:absolute;content:'';top:0;left:0;height:100%;width:100%;transition:background 0.3s;background:var(--pcr-color);border-radius:.15em}\n.pickr .pcr-button.clear{background-size:70%}\n.pickr .pcr-button.clear::before{opacity:0}\n.pickr .pcr-button.clear:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px var(--pcr-color)}\n.pickr .pcr-button.disabled{cursor:not-allowed}\n.pickr *,.pcr-app *{box-sizing:border-box;outline:none;border:none;-webkit-appearance:none}\n.pickr input:focus,.pickr input.pcr-active,.pickr button:focus,.pickr button.pcr-active,.pcr-app input:focus,.pcr-app input.pcr-active,.pcr-app button:focus,.pcr-app button.pcr-active{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px var(--pcr-color)}\n.pickr .pcr-palette,.pickr .pcr-slider,.pcr-app .pcr-palette,.pcr-app .pcr-slider{transition:box-shadow 0.3s}\n.pickr .pcr-palette:focus,.pickr .pcr-slider:focus,.pcr-app .pcr-palette:focus,.pcr-app .pcr-slider:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px rgba(0,0,0,0.25)}\n.pcr-app{position:fixed;display:flex;flex-direction:column;z-index:10000;border-radius:0.1em;background:#fff;opacity:0;visibility:hidden;transition:opacity 0.3s, visibility 0s 0.3s;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",\"Roboto\",\"Helvetica Neue\",Arial,sans-serif;box-shadow:0 0.15em 1.5em 0 rgba(0,0,0,0.1),0 0 1em 0 rgba(0,0,0,0.03);left:0;top:0}\n.pcr-app.visible{transition:opacity 0.3s;visibility:visible;opacity:1}\n.pcr-app .pcr-swatches{display:flex;flex-wrap:wrap;margin-top:0.75em}\n.pcr-app .pcr-swatches.pcr-last{margin:0}\n@supports (display: grid){.pcr-app .pcr-swatches{display:grid;align-items:center;grid-template-columns:repeat(auto-fit, 1.75em)}}\n.pcr-app .pcr-swatches>button{font-size:1em;position:relative;width:calc(1.75em - 5px);height:calc(1.75em - 5px);border-radius:0.15em;cursor:pointer;margin:2.5px;flex-shrink:0;justify-self:center;transition:all 0.15s;overflow:hidden;background:transparent;z-index:1}\n.pcr-app .pcr-swatches>button::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 2 2\"><path fill=\"white\" d=\"M1,0H2V1H1V0ZM0,1H1V2H0V1Z\"/><path fill=\"gray\" d=\"M0,0H1V1H0V0ZM1,1H2V2H1V1Z\"/></svg>');background-size:6px;border-radius:.15em;z-index:-1}\n.pcr-app .pcr-swatches>button::after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:var(--pcr-color);border:1px solid rgba(0,0,0,0.05);border-radius:0.15em;box-sizing:border-box}\n.pcr-app .pcr-swatches>button:hover{filter:brightness(1.05)}\n.pcr-app .pcr-swatches>button:not(.pcr-active){box-shadow:none}\n.pcr-app .pcr-interaction{display:flex;flex-wrap:wrap;align-items:center;margin:0 -0.2em 0 -0.2em}\n.pcr-app .pcr-interaction>*{margin:0 0.2em}\n.pcr-app .pcr-interaction input{letter-spacing:0.07em;font-size:0.75em;text-align:center;cursor:pointer;color:#75797e;background:#f1f3f4;border-radius:.15em;transition:all 0.15s;padding:0.45em 0.5em;margin-top:0.75em}\n.pcr-app .pcr-interaction input:hover{filter:brightness(0.975)}\n.pcr-app .pcr-interaction input:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px rgba(66,133,244,0.75)}\n.pcr-app .pcr-interaction .pcr-result{color:#75797e;text-align:left;flex:1 1 8em;min-width:8em;transition:all 0.2s;border-radius:.15em;background:#f1f3f4;cursor:text}\n.pcr-app .pcr-interaction .pcr-result::-moz-selection{background:#4285f4;color:#fff}\n.pcr-app .pcr-interaction .pcr-result::selection{background:#4285f4;color:#fff}\n.pcr-app .pcr-interaction .pcr-type.active{color:#fff;background:#4285f4}\n.pcr-app .pcr-interaction .pcr-save,.pcr-app .pcr-interaction .pcr-cancel,.pcr-app .pcr-interaction .pcr-clear{color:#fff;width:auto}\n.pcr-app .pcr-interaction .pcr-save,.pcr-app .pcr-interaction .pcr-cancel,.pcr-app .pcr-interaction .pcr-clear{color:#fff}\n.pcr-app .pcr-interaction .pcr-save:hover,.pcr-app .pcr-interaction .pcr-cancel:hover,.pcr-app .pcr-interaction .pcr-clear:hover{filter:brightness(0.925)}\n.pcr-app .pcr-interaction .pcr-save{background:#4285f4}\n.pcr-app .pcr-interaction .pcr-clear,.pcr-app .pcr-interaction .pcr-cancel{background:#f44250}\n.pcr-app .pcr-interaction .pcr-clear:focus,.pcr-app .pcr-interaction .pcr-cancel:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px rgba(244,66,80,0.75)}\n.pcr-app .pcr-selection .pcr-picker{position:absolute;height:18px;width:18px;border:2px solid #fff;border-radius:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}\n.pcr-app .pcr-selection .pcr-color-palette,.pcr-app .pcr-selection .pcr-color-chooser,.pcr-app .pcr-selection .pcr-color-opacity{position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;flex-direction:column;cursor:grab;cursor:-webkit-grab}\n.pcr-app .pcr-selection .pcr-color-palette:active,.pcr-app .pcr-selection .pcr-color-chooser:active,.pcr-app .pcr-selection .pcr-color-opacity:active{cursor:grabbing;cursor:-webkit-grabbing}\n.pcr-app[data-theme='nano']{width:14.25em;max-width:95vw}\n.pcr-app[data-theme='nano'] .pcr-swatches{margin-top:.6em;padding:0 .6em}\n.pcr-app[data-theme='nano'] .pcr-interaction{padding:0 .6em .6em .6em}\n.pcr-app[data-theme='nano'] .pcr-selection{display:grid;grid-gap:.6em;grid-template-columns:1fr 4fr;grid-template-rows:5fr auto auto;align-items:center;height:10.5em;width:100%;align-self:flex-start}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview{grid-area:2 / 1 / 4 / 1;height:100%;width:100%;display:flex;flex-direction:row;justify-content:center;margin-left:.6em}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview .pcr-last-color{display:none}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview .pcr-current-color{position:relative;background:var(--pcr-color);width:2em;height:2em;border-radius:50em;overflow:hidden}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview .pcr-current-color::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 2 2\"><path fill=\"white\" d=\"M1,0H2V1H1V0ZM0,1H1V2H0V1Z\"/><path fill=\"gray\" d=\"M0,0H1V1H0V0ZM1,1H2V2H1V1Z\"/></svg>');background-size:.5em;border-radius:.15em;z-index:-1}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-palette{grid-area:1 / 1 / 2 / 3;width:100%;height:100%;z-index:1}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-palette .pcr-palette{border-radius:.15em;width:100%;height:100%}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-palette .pcr-palette::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 2 2\"><path fill=\"white\" d=\"M1,0H2V1H1V0ZM0,1H1V2H0V1Z\"/><path fill=\"gray\" d=\"M0,0H1V1H0V0ZM1,1H2V2H1V1Z\"/></svg>');background-size:.5em;border-radius:.15em;z-index:-1}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser{grid-area:2 / 2 / 2 / 2}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity{grid-area:3 / 2 / 3 / 2}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser,.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity{height:0.5em;margin:0 .6em}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser .pcr-picker,.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity .pcr-picker{top:50%;transform:translateY(-50%)}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser .pcr-slider,.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity .pcr-slider{flex-grow:1;border-radius:50em}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser .pcr-slider{background:linear-gradient(to right, red, #ff0, lime, cyan, blue, #f0f, red)}\n.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity .pcr-slider{background:linear-gradient(to right, transparent, black),url('data:image/svg+xml;utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 2 2\"><path fill=\"white\" d=\"M1,0H2V1H1V0ZM0,1H1V2H0V1Z\"/><path fill=\"gray\" d=\"M0,0H1V1H0V0ZM1,1H2V2H1V1Z\"/></svg>');background-size:100%, 0.25em}\n\n";
var __css = "s-color-picker:not([mounted]) > * {\n        display: none;\n    }\n    s-color-picker .s-color-picker {\n        display: flex;\n        position: relative;\n        align-items: center;\n    }\n    s-color-picker .s-color-picker--top .s-color-picker__picker {\n        position: absolute !important;\n        top: auto !important;\n        right: 0 !important;\n        left: auto !important;\n        bottom: 100% !important;\n        pointer-events: all !important;\n    }\n    s-color-picker .s-color-picker--bottom .s-color-picker__picker {\n        position: absolute !important;\n        top: 100% !important;\n        right: 0 !important;\n        left: auto !important;\n        pointer-events: all !important;\n    }\n    s-color-picker[no-preview] .s-color-picker__picker-wrapper,\n    s-color-picker[no-preview] .s-color-picker__preview {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        pointer-events: none;\n    }\n    s-color-picker[no-preview] .s-color-picker__picker-wrapper button, s-color-picker[no-preview] .s-color-picker__preview button {\n            width: 100%;\n            height: 100%;\n            position: absolute;\n            top: 0;\n            left: 0;\n            background: none !important;\n            pointer-events: none;\n        }\n    s-color-picker[no-preview] .s-color-picker__picker-wrapper button:before,\n            s-color-picker[no-preview] .s-color-picker__picker-wrapper button:after,\n            s-color-picker[no-preview] .s-color-picker__preview button:before,\n            s-color-picker[no-preview] .s-color-picker__preview button:after {\n                content: initial;\n            }\n\n.s-color-picker__input {\n    /* border-top-right-radius: 0 !important;\n    border-bottom-right-radius: 0 !important; */\n\n    /* :not([bare]) & ~ .s-color-picker__preview {\n        display: block;\n        aspect-ratio: 1;\n        height: 100%;\n\n        button {\n            width: 100% !important;\n            height: 100% !important;\n\n            &,\n            &:before,\n            &:after {\n                border-top-left-radius: 0 !important;\n                border-bottom-left-radius: 0 !important;\n            }\n        }\n    } */\n}\n\n.s-color-picker__picker {\n    position: absolute !important;\n    top: 100% !important;\n    right: 0 !important;\n    left: auto !important;\n    z-index: 10;\n}\n\n:not([bare]) .s-color-picker__picker {\n        background: hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-surface-spin ,0)),calc((var(--s-theme-color-current-s, 0) + var(--s-theme-color-current-surface-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-current-l, 0) + var(--s-theme-color-current-surface-lightness-offset, 0)) * 1%),var(--s-theme-color-current-surface-a, 1));\n        overflow: hidden;box-shadow: var(--s-theme-ui-colorPicker-depth, 0);\n        border-radius: var(--s-theme-ui-colorPicker-borderRadius, 10px);\n        padding-inline: var(--s-theme-ui-colorPicker-paddingInline, 0.75em);\n        padding-block: var(--s-theme-ui-colorPicker-paddingBlock, 0.375em);\n    }\n\n.pickr.s-color-picker__preview {\n    display: inline-block;\n    outline: none;\n}\n\n:not([bare]) .pickr.s-color-picker__preview {\n        transition: var(--s-theme-transition-fast, all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995));\n    }\n\n/* button:focus {\n        display: none;\n    } */\n\n.pickr.s-color-picker__preview button {\n        width: 1em;\n        height: 1em;\n        border-radius: var(--s-theme-border-radius-default) ;\n    }\n\n.pickr.s-color-picker__preview button:before,\n        .pickr.s-color-picker__preview button:after {\n            border-radius: var(--s-theme-border-radius-default) ;\n        }\n";class SColorPickerComponentInterface extends __SInterface {
    static get _definition() {
        return {
            value: {
                description: 'Specify the initial value for your picker',
                type: 'String',
                default: '#ff0000',
            },
            theme: {
                description: 'Specify the theme you want to use for this picker',
                type: 'String',
                values: ['nano', 'monolith'],
                default: 'nano',
            },
            noPreview: {
                description: 'Specify if you want to hide the preview',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            position: {
                description: 'Specify the position of the picker. Can be "top" or "bottom"',
                type: 'String',
                values: ['top', 'bottom'],
                default: 'bottom',
            },
            swatches: {
                description: 'Specify some colors you want in your swatches',
                type: 'Array<String>',
                default: [],
            },
        };
    }
}// @ts-nocheck
/**
 * @name            wait
 * @namespace            js.time
 * @type            Function
 * @async
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function is a simple "setTimeout" wrapper inside a promise.
 *
 * @param         {Number}        timeout       The timeout to wait in ms
 * @return        {Promise}                     A simple promise resolved once the timeout is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import wait from '@coffeekraken/sugar/js/time/wait';
 * await wait(2000);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function wait(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}// @ts-nocheck
var __awaiter = (globalThis && globalThis.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @name                Color Picker
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SColorPickerComponentInterface.js
 * @menu                Styleguide / Forms              /styleguide/forms/s-color-picker
 * @install             npm i @coffeekraken/s-color-picker-component
 * @platform            html
 * @status              beta
 *
 * This component specify a color picker. It uses under the hood the **AMAZING Pickr library** with some additional features like
 * sugar theming support as well as some events and more.
 * Almost all the Pickr options are available through properties. Check out the api documentation for more details...
 *
 * @feature           All the Pickr features are supported
 * @feature           Full support for sugar theming system for easy integration
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @event           change              Emitted when the color is changing inside the picker
 * @event           show                Emitted when the color picker is shown
 * @event           hide                Emitted when the color picker is hided
 *
 * @example         html
 * <label class="s-label s-mb--30">
 *      Simply color picker
 *      <s-color-picker></s-color-picker>
 * </label>
 *
 * @example         js
 * import { define } from '@coffeekraken/s-color-picker-component';
 * define();
 *
 * @see             https://www.npmjs.com/package/@simonwep/pickr
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SColorPicker extends __SLitComponent {
    static get properties() {
        return __SLitComponent.properties({}, SColorPickerComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
            ${__baseCss}
            ${__css}
        `)}
        `;
    }
    constructor() {
        super(__deepMerge({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: SColorPickerComponentInterface,
            },
        }));
    }
    firstUpdated() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield wait(100);
            const $input = this.querySelector('input');
            const value = (_b = (_a = this.props.value) !== null && _a !== void 0 ? _a : $input === null || $input === void 0 ? void 0 : $input.value) !== null && _b !== void 0 ? _b : '#ff0000';
            const $container = this.querySelector(`.${this.componentUtils.className('')}`);
            if ($input) {
                $container.prepend($input);
                $input.classList.add(this.componentUtils.className('__input'));
            }
            const pickr = __Pickr.create({
                el: this.querySelector('.s-color-picker__preview'),
                theme: 'nano',
                container: this.querySelector('.s-color-picker__picker-wrapper'),
                default: value,
                inline: true,
                // autoReposition: false,
                comparison: false,
                swatches: [],
                components: {
                    preview: true,
                    opacity: true,
                    hue: true,
                    interaction: {
                        hex: true,
                        rgba: true,
                        hsla: true,
                        // hsva: true,
                        // cmyk: true,
                        input: true,
                        clear: true,
                        // save: true
                    },
                },
            });
            setTimeout(() => {
                pickr.setColor(value);
            });
            function getPickrState() {
                const color = pickr.getColor();
                const hsla = color.toHSLA(), hsva = color.toHSVA(), rgba = color.toRGBA(), hex = color.toHEXA(), cmyk = color.toCMYK();
                return {
                    isOpened: pickr.isOpen(),
                    hsla: {
                        h: hsla[0],
                        s: hsla[1],
                        l: hsla[2],
                        a: hsla[3],
                        string: `hsla(${hsla[0]},${hsla[1]},${hsla[2]},${hsla[3]})`,
                    },
                    hsva: {
                        h: hsva[0],
                        s: hsva[1],
                        v: hsva[2],
                        a: hsva[3],
                        string: `hsva(${hsva[0]},${hsva[1]},${hsva[2]},${hsva[3]})`,
                    },
                    rgba: {
                        r: rgba[0],
                        g: rgba[1],
                        b: rgba[2],
                        a: rgba[3],
                        string: `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`,
                    },
                    hex: hex.toString(),
                    cmyk: {
                        c: cmyk[0],
                        m: cmyk[1],
                        y: cmyk[2],
                        k: cmyk[3],
                        string: `cmyk(${cmyk[0]},${cmyk[1]},${cmyk[2]},${cmyk[3]})`,
                    },
                };
            }
            pickr.on('change', () => {
                pickr.applyColor();
                const detail = getPickrState();
                const change = new CustomEvent('change', {
                    detail,
                });
                if ($input) {
                    $input.value = detail.hex;
                }
                this.dispatchEvent(change);
            });
            pickr.on('show', () => {
                const detail = getPickrState();
                const change = new CustomEvent('show', {
                    detail,
                });
                this.dispatchEvent(change);
            });
            pickr.on('hide', () => {
                const detail = getPickrState();
                const change = new CustomEvent('hide', {
                    detail,
                });
                this.dispatchEvent(change);
            });
            pickr.on('cancel', () => {
                const detail = getPickrState();
                const change = new CustomEvent('cancel', {
                    detail,
                });
                this.dispatchEvent(change);
            });
            if ($input) {
                $input.addEventListener('focus', () => {
                    pickr.show();
                });
                $input.addEventListener('change', () => {
                    pickr.setColor($input.value);
                });
            }
            const $app = this.querySelector('.pcr-app');
            $app === null || $app === void 0 ? void 0 : $app.classList.add(this.componentUtils.className('__picker'));
            const $preview = this.querySelector('.pickr');
            $preview === null || $preview === void 0 ? void 0 : $preview.classList.add(this.componentUtils.className('__preview'));
        });
    }
    render() {
        return html `
            <div
                class="${this.componentUtils.className('')} ${this.componentUtils.className('')}--${this.props.position}"
            >
                <div
                    class="${this.componentUtils.className('__picker-wrapper')}"
                ></div>
                <div
                    class="${this.componentUtils.className('__preview')}"
                ></div>
            </div>
        `;
    }
}
function define(props = {}, tagName = 's-color-picker') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SColorPicker);
}export{SColorPicker as default,define};