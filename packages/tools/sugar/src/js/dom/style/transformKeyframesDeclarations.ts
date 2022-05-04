import __camelCase from '../../../shared/string/camelCase';

import __parseKeyframeKey from './parseKeyframeKey';
import __getDefinedStyles from './getDefinedStyles';
import __removeVendorPrefix from './removeVendorPrefix';

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
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

function normalizePropertyName(propertyName) {
    return __camelCase(__removeVendorPrefix(propertyName));
}

export default function transformKeyframeDeclaration(keyFrameRule) {
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
            // Convert percentage to fraction of 1 for webanimation compat
            offset: percentage / 100,
            // Mixin with extracted keyframe styling
            rules: normalizedStyles,
        };
    });
}
