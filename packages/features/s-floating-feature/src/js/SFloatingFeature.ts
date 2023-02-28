import __SFeature from '@coffeekraken/s-feature';
import { __makeFloat } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SFloatingFeatureInterface from './interface/SFloatingFeatureInterface';

import __define from './define';

// @ts-ignore
import __css from '../../../../src/css/s-floating-feature.css'; // relative to /dist/pkg/esm/js

/**
 * @name            SFloatingFeature
 * @as              Floating elements
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SFloatingFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-floating-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to put your floating UI elements like tooltips, etc, under steroid using the
 * AMAZING [Floating UI](https://floating-ui.com) package.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @import          import { define as __SFloatingFeatureDefine } from '@coffeekraken/s-activate-feature';
 * 
 * @snippet         __SFloatingFeatureDefine($1)
 * 
 * @install         js
 * import { define as __SFloatingFeatureDefine } from '@coffeekraken/s-floating-feature';
 * __SFloatingFeatureDefine();
 * 
 * @install             bash
 * npm i @coffeekraken/s-floating-feature
 * 
 * @example         html            Email field
 * <div class="s-ratio:16-9 s-width:50 s-bg:main-surface s-p:30">
 *   Floating element preview. Try to scroll...
 *   <div class="s-ratio:16-9 s-bg:accent s-color:accent s-radius s-p:30" s-floating>
 *      I'm the floating element
 *  </div>
 * </div>
 * <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
 *
 * @see         https://www.npmjs.com/package/@floating-ui/dom
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISFloatingFeatureProps {}

export default class SFloatingFeature extends __SFeature {
    _$ref;

    // @ts-ignore
    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    name: 's-floating',
                    interface: __SFloatingFeatureInterface,
                    style: __css,
                },
                settings ?? {},
            ),
        );

        // handle ref
        if (!this.props.ref) {
            this._$ref = this.node.parentElement;
        } else {
            this._$ref = document.querySelector(this.props.ref);
        }
    }

    mount() {
        // handling offset when an arrow is wanted and no offset specified
        if (this.props.offset === undefined && this.props.arrow) {
            this.props.offset = this.props.arrowSize;
        }
        __makeFloat(this.node, this._$ref, this.props);
    }
}

export { __define as define };
