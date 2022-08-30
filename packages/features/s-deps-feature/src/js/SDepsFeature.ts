import __SFeature from '@coffeekraken/s-feature';
import __when from '@coffeekraken/sugar/js/dom/detect/when';
import __whenNearViewport from '@coffeekraken/sugar/js/dom/detect/whenNearViewport';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
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
    static registerDeps(
        selector: string,
        props: Partial<ISDepsFeatureProps> = {},
    ): void {
        __querySelectorLive(selector, async ($elm) => {
            // wait for element to be near the viewport
            await __whenNearViewport($elm);

            // process passed props
            props = __SDepsFeatureInterface.apply(props ?? {});

            // handle dependencies
            this._handleDepsForElement($elm, props);
        });
    }

    /**
     * Handle css dependencies for the passed element
     */
    static _handleCssDepsForElement(
        $elm: HTMLElement,
        props: Partial<ISDepsFeatureProps> = {},
    ): void {
        // check if a partial already exists for this
        const $existing = document.querySelector(
            `link[s-deps-css="${props.css}"]`,
        );
        if ($existing) {
            return;
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
        $link.setAttribute(
            'href',
            `${props.cssPartialsPath}/${finalPartialPath}`,
        );

        // add the link in the head section
        document.head.appendChild($link);
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
        // wait until visible
        await __when(this.node, ['visible', 'nearViewport']);

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
