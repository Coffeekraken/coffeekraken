import __SFeature from '@coffeekraken/s-feature';
import __makeFloat from '@coffeekraken/sugar/js/dom/ui/makeFloat';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SFloatingFeatureInterface from './interface/SFloatingFeatureInterface';

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
 * @example         html            Email field
 * <label class="s-label" s-form-validate email>
 *    <input type="text" class="s-input s-width:60" placeholder="olivier.bossel@coffeekraken.io" />
 *    Email address
 * </label>
 *
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
                    interface: __SFloatingFeatureInterface,
                    style: __css,
                },
                settings ?? {},
            ),
        );

        // adding the s-floating class to the node
        this.node.classList.add('s-floating');

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

        console.log(this.node, this.props);
        __makeFloat(this.node, this._$ref, this.props);
    }
}

export function define(
    props: Partial<ISFloatingFeatureProps> = {},
    name = 's-floating',
) {
    __SFeature.defineFeature(name, SFloatingFeature, props);
}
