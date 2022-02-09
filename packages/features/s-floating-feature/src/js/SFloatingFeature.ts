import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
// @ts-ignore
import __css from '../css/s-floating-feature.css';
import __SFloatingFeatureInterface from './interface/SFloatingFeatureInterface';

import {computePosition,flip,shift,offset,arrow,getScrollParents,autoPlacement,inline} from '@floating-ui/dom';


/**
 * @name            SFloatingFeature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SFloatingFeatureInterface.js
 * @menu            Styleguide / Features               /styleguide/features/s-floating-feature
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISFloatingFeatureProps {
}

export default class SFloatingFeature extends __SFeature {

    _$ref;

    // @ts-ignore
    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    componentUtils: {
                        interface: __SFloatingFeatureInterface,
                        style: __css,
                    },
                },
                settings ?? {},
            ),
        );

        // adding the s-floating class to the node
        this.node.classList.add('s-floating');

        // handle ref
        if (!this.props.ref) {
            this._$ref = this.node.previousElementSibling;
        } else {
            this._$ref = document.querySelector(this.props.ref);
        }
    }

    mount() {
        
        // handling offset when an arrow is wanted and no offset specified
        if (this.props.offset === undefined && this.props.arrow) {
                this.props.offset = this.props.arrowSize;
        }

        // preparing middlewares
        const middlewares = [offset(this.props.offset), shift({
            padding: this.props.shift
        }), inline()];

        // check the placement
        if (this.props.placement !== 'auto') {
            middlewares.push(flip());
        } else {
            middlewares.push(autoPlacement());
        }

        // handling arrow injection
        let $arrow;
        if (this.props.arrow) {
            $arrow = document.createElement('div');
            $arrow.classList.add('s-floating__arrow');
            this.node.append($arrow);
            middlewares.push(arrow({
                element: $arrow,
                padding: this.props.arrowPadding
            }));
        }

        // setting the arrow size through a css property
        if (this.props.arrowSize) {
            this.node.style.setProperty(`--arrow-size`, `${this.props.arrowSize}px`);
        }

        // updating routine
        const update = async () => {
            const {x, y, placement, middlewareData} = await computePosition(this._$ref, this.node, {
                placement: this.props.placement,
                middleware: middlewares,
            });
            Object.assign(this.node.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
            
            // handle arrow position
            if ($arrow) {
            
                // Accessing the data
                const {x: arrowX, y: arrowY} = middlewareData.arrow;
                
                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                }[placement.split('-')[0]];
                
                Object.assign($arrow.style, {
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    right: '',
                    bottom: '',
                    [staticSide]: `${this.props.arrowSize * .5 * -1}px`,
                });
            }
        }

        update();

        [
            ...getScrollParents(this._$ref),
            ...getScrollParents(this.node),
        ].forEach((el) => {
            console.log(el);
            el.addEventListener('scroll', update);
            el.addEventListener('resize', update);
        });

    }
}

export function define(
    props: Partial<ISFloatingFeatureProps> = {},
    name = 's-floating',
) {
    __SFeature.defineFeature(name, SFloatingFeature, props);
}
