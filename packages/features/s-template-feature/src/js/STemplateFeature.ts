import type { ISFeature } from '@coffeekraken/s-feature';
import __SFeature from '@coffeekraken/s-feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __STemplateFeatureInterface from './interface/STemplateFeatureInterface';

import __define from './define';

export interface ISTemplateFeatureProps {}

/**
 * @name            STemplateFeature
 * @as              Template features
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/STemplateFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-sugar-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to scope your sections, etc... inside a "template" tag to avoid rendering it directly. It will then be rendered
 * as soon as your section comes near the viewport.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html        Simple usage        Simply add the `s-sugar` property on your body tag
 * <template s-template>
 *      <!-- my normal code... -->
 * </template>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class STemplateFeature extends __SFeature implements ISFeature {
    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    name: 's-template',
                    interface: __STemplateFeatureInterface,
                },
                settings ?? {},
            ),
        );
    }
    async mount() {
        const $content = this.node.content;
        const $container = $content.children[0];
        this.componentUtils.fastdom.mutate(() => {
            this.node.parentNode.insertBefore($content, this.node);
            $container?.classList.add('s-template');
            $container?.classList.add('ready');
            $container?.setAttribute('ready', 'true');
            this.node.remove();
        });
    }
}

export { __define as define };
