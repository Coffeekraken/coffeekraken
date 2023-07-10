import type { ISFeature } from '@coffeekraken/s-feature';
import __SFeature from '@coffeekraken/s-feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SLazyFeatureInterface from './interface/SLazyFeatureInterface';

// @ts-ignore
import __css from '../../../../src/css/s-lazy-feature.css'; // relative to /dist/pkg/esm/js

export interface ISLazyFeatureProps {}

/**
 * @name            SLazyFeature
 * @as              Template features
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SLazyFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-sugar-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to lazy load things like images, template, etc...
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @import          import { define as __SLazyFeatureDefine } from '@coffeekraken/s-lazy-feature';
 *
 * @snippet         __SLazyFeatureDefine($1)
 *
 * @install         js
 * import { define as __SLazyFeatureDefine } from '@coffeekraken/s-lazy-feature';
 * __SLazyFeatureDefine();
 *
 * @install         bash
 * npm i @coffeekraken/s-form-validate-feature
 *
 * @example         html        Template        Simply add the "s-lazy" on your template tag and template content will be appended right after when it comes in the viewport
 * <template s-lazy>
 *      <!-- my normal code... -->
 * </template>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SLazyFeature extends __SFeature implements ISFeature {
    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    name: 's-lazy',
                    interface: __SLazyFeatureInterface,
                    style: __css,
                },
                settings ?? {},
            ),
        );
    }
    async mount() {
        let $container, $content;

        if (this.node.tagName === 'TEXTAREA') {
            const parser = new DOMParser();
            const html = this.node.value;
            const $dom = parser.parseFromString(html, 'text/html');
            $content = $dom.body.children[0];
            $container = $dom.body.children[0];
        } else {
            $content = this.node.content;
            $container = $content.children[0];
        }

        if (this.node.id) {
            $content.children[0]?.setAttribute?.('id', this.node.id);
        }

        this.node.parentNode.insertBefore($content, this.node);
        this.node.remove();
    }
}
