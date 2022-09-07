import __SFeature from '@coffeekraken/s-feature';
import __whenNearViewport from '@coffeekraken/sugar/js/dom/detect/whenNearViewport';
import { __whenStylesheetsReady } from '@coffeekraken/sugar/dom';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDepsFeatureInterface from './interface/SDepsFeatureInterface';

// @ts-ignore
// import __css from '../../../../src/css/s-appear-feature.css'; // relative to /dist/pkg/esm/js

/**
 * @name            SDepsFeature
 * @as              Dependencies feature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SDepsFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-deps-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to load a partial css or js files linked to a section/component only when it
 * will enters the viewport. This is good for your site performance as well as for SEO purposes.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html            Simple partial
 * <section s-deps css="welcome">
 *      <!-- something here... -->
 * </section>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISDepsFeatureProps {
    css: string;
    cssPartialsPath: string;
}

export interface ISDepsFeatureRegisterDepsObj {
    css: string;
}

export default class SDepsFeature extends __SFeature {
    static resolvedSelectors: string[] = [];
    static registerDeps(
        selector: string,
        props: Partial<ISDepsFeatureProps> = {},
    ): void {
        __querySelectorLive(selector, async ($elm, { cancel }) => {
            // wait for element to be near the viewport
            const whenNearViewportPromise = __whenNearViewport($elm);

            // listen when an element has come near the viewport
            document.addEventListener('s-deps.resolved', (e) => {
                // @ts-ignore
                if (e.detail.selector === selector) {
                    whenNearViewportPromise.cancel();
                }
            });

            // wait for the node to comes near the viewport
            await whenNearViewportPromise;

            // check if the selector has already been resolved
            // to avoid handling same selector multiple times
            if (this.resolvedSelectors.includes(selector)) {
                return;
            }

            // add the selector in the resolved stack to track them
            this.resolvedSelectors.push(selector);

            // when the first item is in the viewport, emit an event through the document
            // to let the others to stop listening
            document.dispatchEvent(
                new CustomEvent('s-deps.resolved', {
                    detail: {
                        selector,
                        $elm,
                    },
                }),
            );

            // stop listening this selector
            cancel();

            // process passed props
            props = __SDepsFeatureInterface.apply(props ?? {});

            // handle dependencies
            this._handleDepsForElement($elm, props);
        });
    }

    /**
     * Check if all is loaded and add the "ready" class and attribute
     */
    static _checkAndApplyReadyStateForElement(
        $elm,
        props: Partial<ISDepsFeatureProps> = {},
    ) {
        // css
        if (props.css && !$elm._sDepsCssLoaded) {
            return;
        }

        // apply class and attribute
        $elm.setAttribute('ready', 'true');
        $elm.classList.add('ready');
    }

    /**
     * Handle css dependencies for the passed element
     */
    static async _handleCssDepsForElement(
        $elm: HTMLElement,
        props: Partial<ISDepsFeatureProps> = {},
    ): void {
        // check if a partial already exists for this
        const $existing = document.querySelector(
            `link[s-deps-css="${props.css}"]`,
        );
        if ($existing) {
            // mark the element css as loaded
            $elm._sDepsCssLoaded = true;

            // check and apply ready state
            this._checkAndApplyReadyStateForElement($elm, props);
        }

        // create a new link to add in the head
        let finalPartialPath = props.css;
        // @ts-ignore
        if (!finalPartialPath.match(/\.css$/)) {
            finalPartialPath += '.css';
        }
        const $link = document.createElement('link');
        $link.setAttribute('rel', 'stylesheet');
        // @ts-ignore
        $link.setAttribute('s-deps-css', props.css);
        $link.setAttribute('rel', 'preload');
        $link.setAttribute('as', 'style');
        $link.setAttribute(
            'href',
            `${props.cssPartialsPath}/${finalPartialPath}`,
        );

        // add the link in the head section
        document.head.appendChild($link);

        // wait for stylesheet to be ready
        await __whenStylesheetsReady($link);

        // put link in stylesheet again
        $link.setAttribute('rel', 'stylesheet');

        // mark the element css as loaded
        $elm._sDepsCssLoaded = true;

        // check and apply ready state
        this._checkAndApplyReadyStateForElement($elm, props);
    }

    /**
     * Load a partial if needed
     */
    static _handleDepsForElement(
        $elm: HTMLElement,
        props: Partial<ISDepsFeatureProps> = {},
    ): void {
        if (props.css) {
            this._handleCssDepsForElement($elm, props);
        }
    }

    // @ts-ignore
    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    name: 's-deps',
                    interface: __SDepsFeatureInterface,
                    // style: __css,
                },
                settings ?? {},
            ),
        );
    }

    async mount() {
        // handle partial stylesheet loading
        // @ts-ignore
        SDepsFeature._handleDepsForElement(this.node, this.props);
    }
}

export function define(
    props: Partial<ISDepsFeatureProps> = {},
    name = 's-deps',
) {
    __SFeature.defineFeature(name, SDepsFeature, {
        mountWhen: 'nearViewport',
        ...props,
    });
}
