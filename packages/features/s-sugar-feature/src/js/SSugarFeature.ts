import __SFeature, { ISFeature } from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSugarFeatureInterface from './interface/SSugarFeatureInterface';
import __clearTransmations from '@coffeekraken/sugar/js/dom/transmation/clearTransmations';

export interface ISSugarFeatureProps {
    scrolled: boolean;
    scrolledDelta: number;
    vhvar: boolean;
}

/**
 * @name            SSugarFeature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SSugarFeatureInterface.js
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
 * @feature        `scrolled` class applied on the body when the user has scrolled the page
 * @feature         Access to a `--vh` css variable that represent the exact viewport innerHeight and avoid having issues with mobile different viewport height values
 * @feature         Clear all transitions and animations on all the page during a window resize. Helps for performances and cleaner for user
 * 
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html        Simple usage        Simply add the `s-sugar` property on your body tag
 * <bodyTag s-sugar>
 * 
 * </bodyTag>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarFeature extends __SFeature implements ISFeature {
    _matrix;
    _originalTransform;

    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    componentUtils: {
                        interface: __SSugarFeatureInterface,
                    },
                    feature: {},
                },
                settings ?? {},
            ),
        );
    }
    mount() {
        // scrolled
        if (this.componentUtils.props.scrolled) this._scrolled();
        // vhvar
        if (this.componentUtils.props.vhvar) this._vhvar();
        // resizeTransmations
        if (this.componentUtils.props.resizeTransmations) this._clearTransmationsOnResize();
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
    _scrolled() {
        document.addEventListener('scroll', (e) => {
            if (window.scrollY >= this.componentUtils.props.scrolledDelta) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
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
}

export function define(
    props: Partial<ISSugarFeatureProps> = {},
    name = 's-sugar',
) {
    __SFeature.defineFeature(name, SSugarFeature, props);
}
