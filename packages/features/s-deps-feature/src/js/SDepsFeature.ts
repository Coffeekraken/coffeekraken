import __SFeature from '@coffeekraken/s-feature';
import {
    __querySelectorLive,
    __readCssDataFrom,
    __whenNearViewport,
    __whenStylesheetsReady,
} from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDepsFeatureInterface from './interface/SDepsFeatureInterface';

// @ts-ignore
// import __css from '../../../../src/css/s-appear-feature.css'; // relative to /dist/pkg/esm/js

/**
 * @name            SDepsFeature
 * @as              Dependencies feature
 * @__namespace       js
 * @type            Feature
 * @interface       ./interface/SDepsFeatureInterface.ts
 * @__menu            Styleguide / Features               /styleguide/feature/s-deps-feature
 * @platform        js
 * @status          wip
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
    cssChunksBasePath: string;
}

export interface ISDepsFeatureRegisterDepsObj {
    css: string;
}

export default class SDepsFeature extends __SFeature {
    static _cssFrontData = __readCssDataFrom(document.body);
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
        $elm: HTMLElement,
        props: Partial<ISDepsFeatureProps> = {},
    ): void {
        // css
        // @ts-ignore
        if (props.css && !$elm._sDepsCssStack) {
            return;
        }

        // @ts-ignore
        if ($elm._sDepsCssStack.length) {
            return;
        }

        // apply class and attribute
        $elm.setAttribute('resolved', 'true');
        $elm.classList.add('resolved');
    }

    /**
     * Handle css dependencies for the passed element
     */
    static async _handleCssDepsForElement(
        $elm: HTMLElement,
        props: Partial<ISDepsFeatureProps> = {},
    ): Promise<void> {
        // create a new link to add in the head
        let finalDepsPath = props.css.split(',').map((l) => l.trim());

        // store in the element hte css deps to load as an array.
        // each deps when loaded will be removed from the array
        // @ts-ignore
        $elm._sDepsCssStack = finalDepsPath;

        // loop on all the css deps specified
        // @ts-ignore
        for (let [i, finalDepPath] of finalDepsPath.entries()) {
            // check if we have some "chunks" in the cssFrontData
            // that is coming from the postcssSugarPlugin.
            // if not, accept all chunks. if some, check if the requested chunk is in the list
            if (
                finalDepPath.match(/[a-zA-Z0-9_-]+/) &&
                SDepsFeature._cssFrontData.chunks
            ) {
                if (
                    !SDepsFeature._cssFrontData.chunks.includes?.(finalDepPath)
                ) {
                    continue;
                }
            }

            // check if a partial already exists for this
            const $existing = document.querySelector(
                `link[s-deps-css="${finalDepPath}"]`,
            );
            if ($existing) {
                // mark the element css as loaded
                // @ts-ignore
                $elm._sDepsCssStack?.splice?.(
                    // @ts-ignore
                    $elm._sDepsCssStack.indexOf(finalDepPath),
                    1,
                );

                // check and apply ready state
                this._checkAndApplyReadyStateForElement($elm, props);

                // continue to next
                continue;
            }

            // @ts-ignore
            if (!finalDepPath.match(/\.css$/)) {
                finalDepPath += '.css';
            }
            const $link = document.createElement('link');
            $link.setAttribute('rel', 'stylesheet');
            // @ts-ignore
            $link.setAttribute('s-deps-css', props.css);
            $link.setAttribute('rel', 'preload');
            $link.setAttribute('as', 'style');
            $link.setAttribute(
                'href',
                `${props.cssChunksBasePath}/${finalDepPath}`,
            );

            // add the link in the head section
            document.head.appendChild($link);

            // wait for stylesheet to be ready
            const promise = __whenStylesheetsReady($link);

            // when loaded
            promise.then(() => {
                // put link in stylesheet again
                $link.setAttribute('rel', 'stylesheet');

                // mark the element css as loaded
                // @ts-ignore
                $elm._sDepsCssStack?.splice?.(
                    // @ts-ignore
                    $elm._sDepsCssStack.indexOf(finalDepPath),
                    1,
                );

                // check and apply ready state
                this._checkAndApplyReadyStateForElement($elm, props);
            });
        }
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
