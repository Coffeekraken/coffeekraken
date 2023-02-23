import {
    __parseKeyframeKey,
    __removeVendorPrefix,
} from '@coffeekraken/sugar/css';
import { __getDefinedStyles } from '@coffeekraken/sugar/dom';
import __camelCase from '../../../shared/string/camelCase';

/**
 * @name      transformKeyframesDeclarations
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status          wip
 *
 * Transforms KeyFrameRule to array of web animation compatible keyframes
 *
 * @param               {Object}            keyFrameRule                 KeyFrameRule to transform
 * @return              {Array}               Array of webanimation keyframes
 *
 * @todo      refactore
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import __transformKeyframesDeclarations from '@coffeekraken/sugar/js/dom/style/transformKeyframesDeclarations';
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/transform-keyframe-declaration.js
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ITransformedKeyframeDeclaration {
    percentage: number;
    offset: number;
    rules: Record<string, any>;
}

function normalizePropertyName(propertyName) {
    return __camelCase(__removeVendorPrefix(propertyName));
}

export default function transformKeyframeDeclaration(
    keyFrameRule,
): ITransformedKeyframeDeclaration[] {
    // Convert keyFrame.keyText to integers holding percentage of keyframe
    const percentages = __parseKeyframeKey(keyFrameRule.keyText);
    const style = __getDefinedStyles(keyFrameRule.style);

    // Normalize to unprefixed styles
    const normalizedStyles = Object.keys(style).reduce(
        (result, propertyName) => {
            const name = normalizePropertyName(propertyName);
            result[name] = style[propertyName];
            return result;
        },
        {},
    );

    return percentages.map((percentage) => {
        return {
            percentage,
            // Convert percentage to fraction of 1 for webanimation compat
            offset: percentage / 100,
            // Mixin with extracted keyframe styling
            rules: normalizedStyles,
        };
    });
}
