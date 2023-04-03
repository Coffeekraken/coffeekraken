import type { ISFeature } from '@coffeekraken/s-feature';
import __SFeature from '@coffeekraken/s-feature';
import {
    __clearTransmations,
    __expandPleasantCssClassnamesLive,
    __preventScrollRestoration,
} from '@coffeekraken/sugar/dom';
import {
    __autoResize,
    __confirmButton,
    __inputAdditionalAttributes,
    __linksStateAttributes,
} from '@coffeekraken/sugar/feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SSugarFeatureInterface from './interface/SSugarFeatureInterface';

import __define from './define';

export interface ISSugarFeatureProps {
    scrolled: boolean;
    scrolledDelta: number;
    vhvar: boolean;
    inputAdditionalAttributes: boolean;
    autoResize: boolean;
    linksStateAttributes: boolean;
    preventScrollRestoration: boolean;
    containerQuery: boolean;
    pleasantCss: boolean;
    env: boolean;
}

/**
 * @name            SSugarFeature
 * @as              Sugar features
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SSugarFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-sugar-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to apply some "nice to have" features like having a "scrolled" class applied on the body
 * when the user has scroll in the page or having access to a `--vh` css variable that represent the exact
 * viewport innerHeight and avoid having issues with mobile different viewport height values. Note that if you use
 * the `sPostcssSugarPlugin` postcss plugin, you can use the `vh` unit as normal and if will automatically take the
 * value of the `--vh` variable if it exists.
 * More feature can be added in the future depending on the needs.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @install         bash
 * yarn add @coffeekraken/s-sugar-feature
 *
 * @install         js
 * import { define } from '@coffeekraken/s-sugar-feature';
 * define();
 *
 * @feature         Support for "pleasant css" syntax like "s-btn:outline"
 * @feature         Polyfill for container queries if needed
 * @feature        `scrolled` class applied on the body when the user has scrolled the page
 * @feature         Access to a `--vh` css variable that represent the exact viewport innerHeight and avoid having issues with mobile different viewport height values
 * @feature         Clear all transitions and animations on all the page during a window resize. Helps for performances and cleaner for user
 * @feature         Additional input attributes like `empty`, `dirty` and `has-value`
 * @feature         Add state attributes to links like `actual` and `actual-child` depending on the document location url
 * @feature         Prevent the scroll restoration behavior on chrome that can usually be anoying
 * @feature         Remove some classes at page loading end: "initial-loading", "loading"
 * @feature         Proxy the `history.pushState` method to make it dispatch an "pushstate" event with the actual state as detail
 *
 * @import          import { define as __SSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';
 *
 * @snippet         __SSugarFeatureDefine($1)
 *
 * @install         js
 * import { define as __SSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';
 * __SSugarFeatureDefine();
 *
 * @install         bash
 * npm i @coffeekraken/s-form-validate-feature
 *
 * @example         html        Simple usage        Simply add the `s-sugar` property on your body tag
 * <bodyTag s-sugar>
 *
 * </bodyTag>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

var _wr = function (type) {
    var orig = history[type];
    return function (...args) {
        var rv = orig.apply(this, arguments);
        var e = new CustomEvent(type.toLowerCase(), {
            bubbles: true,
            detail: args[0],
        });
        window.dispatchEvent(e);
        return rv;
    };
};
history.pushState = _wr('pushState');

export default class SSugarFeature extends __SFeature implements ISFeature {
    _matrix;
    _originalTransform;

    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    name: 's-sugar',
                    interface: __SSugarFeatureInterface,
                },
                settings ?? {},
            ),
        );
    }
    async mount() {
        // container query
        // if (
        //     this.props.containerQuery &&
        //     !('container' in document.documentElement.style)
        // ) {
        //     // @ts-ignore
        //     import('https://cdn.skypack.dev/container-query-polyfill');
        // }

        // pleasant css
        if (this.props.pleasantCss) this._pleasantCss();
        // scrolled
        if (this.props.scrolled) this._scrolled();
        // vhvar
        if (this.props.vhvar) this._vhvar();
        // auto resize
        if (this.props.autoResize) this._autoResize();
        // confirm button
        if (this.props.confirmBtn) this._confirmBtn();
        // resizeTransmations
        if (this.props.resizeTransmations) this._clearTransmationsOnResize();
        // inputAdditionalAttributes
        if (this.props.inputAdditionalAttributes) __inputAdditionalAttributes();
        // linksStateAttributes
        if (this.props.linksStateAttributes) __linksStateAttributes();
        // prevent scroll restoration
        if (this.props.preventScrollRestoration) __preventScrollRestoration();

        // remove some classes like "initial-loading", etc...
        if (document.readyState !== 'complete') {
            document.addEventListener('readystatechange', () => {
                if (document.readyState === 'complete') {
                    document.body.classList.remove('initial-loading');
                    document.body.classList.remove('loading');
                }
            });
        } else {
            document.body.classList.remove('initial-loading');
            document.body.classList.remove('loading');
        }
    }
    _clearTransmationsOnResizeTimeout;
    _isResizing = false;
    _clearTransmationsOnResize() {
        let resetFn;
        window.addEventListener('resize', () => {
            if (!this._isResizing) {
                resetFn = __clearTransmations();
            }
            this._isResizing = true;

            clearTimeout(this._clearTransmationsOnResizeTimeout);
            this._clearTransmationsOnResizeTimeout = setTimeout(() => {
                this._isResizing = false;
                resetFn?.();
            }, 100);
        });
    }
    _pleasantCss() {
        // layout related
        __expandPleasantCssClassnamesLive({
            afterFirst() {
                setTimeout(() => {
                    document.body.classList.remove('initial-loading');
                    document.body.classList.remove('loading');
                }, 500);
            },
        });
    }
    _scrolled() {
        document.addEventListener('scroll', (e) => {
            if (window.scrollY >= this.props.scrolledDelta) {
                if (!document.body.classList.contains('scrolled')) {
                    document.body.classList.add('scrolled');
                }
            } else {
                if (document.body.classList.contains('scrolled')) {
                    document.body.classList.remove('scrolled');
                }
            }
        });
    }
    _vhvar() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', () => {
            vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }
    _autoResize() {
        __autoResize();
    }
    _confirmBtn() {
        __confirmButton();
    }
}

export { __define as define };
