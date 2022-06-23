import type { ISFeature } from '@coffeekraken/s-feature';
import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SInlineFeatureInterface from './interface/SInlineFeatureInterface';

export interface IInlineFeatureProps {}

/**
 * @name            SInlineFeature
 * @as              Inline features
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SInlineFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-sugar-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to inline things like svg, and maybe more to come.
 *
 * @feature         Inline svg images
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html        Inline svg image
 * <img s-inline src="/dist/img/illustrations/stack.svg" />
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SInlineFeature extends __SFeature implements ISFeature {
    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    interface: __SInlineFeatureInterface,
                },
                settings ?? {},
            ),
        );
    }
    mount() {
        // determine what is it to inline
        if (this.node.tagName === 'IMG') {
            const src = this.node.src;
            this._inlineImg(src);
        } else {
            console.log(this.node);
            throw new Error(
                `Sorry but your s-inline marked Element cannot be inlined. At least for now...`,
            );
        }
    }

    /**
     * Inline image like SVG
     */
    async _inlineImg(src) {
        const r = await fetch(src);
        const text = await r.text();

        const parser = new DOMParser();
        const $svg = <HTMLElement>(
            parser.parseFromString(text, 'text/html').body.firstChild
        );

        // copy classes
        $svg.setAttribute('class', this.node.getAttribute('class'));

        this.node.after($svg);
        this.node.remove();
    }
}

export function define(
    props: Partial<IInlineFeatureProps> = {},
    name = 's-inline',
) {
    __SFeature.defineFeature(name, SInlineFeature, props);
}
