import __SFeature from '@coffeekraken/s-feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __html2canvas from 'html2canvas';
import __SGlitchFeatureInterface from './interface/SGlitchFeatureInterface.js';
import __Glitch from './lib/Glitch.js';

// @ts-ignore
import __css from '../../../../src/css/s-glitch-feature.css'; // relative to /dist/pkg/esm/js

/**
 * @name            SGlitchFeature
 * @as              Glitch
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SGlitchFeatureInterface.ts
 * @menu            Styleguide / Effects               /styleguide/effect/s-glitch-feature
 * @platform        js
 * @status          wip
 *
 * This feature allows you to apply some nice glitch effects on any HTMLElement.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @import          import { define as __SGlitchFeatureDefine } from '@coffeekraken/s-glitch-feature';
 *
 * @snippet         __SGlitchFeatureDefine($1)
 *
 * @install         js
 * import { define as __SGlitchFeatureDefine } from '@coffeekraken/s-glitch-feature';
 * __SGlitchFeatureDefine();
 *
 * @install         bash
 * npm i @coffeekraken/s-form-validate-feature
 *
 * @example         html            Highlight
 * <div class="s-radius s-bc:main s-depth s-mbe:30" style="height:100px" s-highlight>
 * </div>
 * <div class="s-radius s-bc:accent s-depth s-mbe:30" style="height:100px" s-highlight opacity="1">
 * </div>
 * <div class="s-radius s-bc:complementary s-depth s-mbe:30" style="height:100px" s-highlight opacity="1">
 * </div>
 * <div class="s-radius s-bc:error s-depth" style="height:100px" s-highlight opacity="1">
 * </div>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISGlitchFeatureProps {
    fps: number;
    minTimeout: number;
    maxTimeout: number;
    minDuration: number;
    maxDuration: number;
}

export default class SGlitchFeature extends __SFeature {
    // @ts-ignore
    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    name: 's-glitch',
                    interface: __SGlitchFeatureInterface,
                    style: __css,
                },
                settings ?? {},
            ),
        );
    }

    async mount() {
        const $canvas = document.createElement('div');
        $canvas.style.position = 'absolute';
        $canvas.style.top = 0;
        $canvas.style.left = 0;
        // $canvas.style.userSelect = 'none';
        // $canvas.style.pointerEvents = 'none';
        // $canvas.style.display = 'none';

        if (!['absolute', 'relative'].includes(this.node.style.position)) {
            this.node.style.position = 'relative';
        }

        this.node.appendChild($canvas);

        const res = await __html2canvas(this.node, {
            backgroundColor: '#000000',
        });

        let image = new Image();
        image.src = res.toDataURL('image/jpeg');
        const glitch = new __Glitch(image, $canvas);
        glitch.on('start', () => {
            // $canvas.style.display = 'block';
        });
        glitch.on('stop', () => {
            // $canvas.style.display = 'none';
        });
        glitch.start();
    }
}
