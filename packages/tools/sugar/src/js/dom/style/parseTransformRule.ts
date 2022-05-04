import __autoCast from '../../../shared/string/autoCast';

/**
 * @name      parseTransformRule
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status          wip
 *
 * Parse the transform rule of an element and returns a simple object with each properties separated.
 *
 * @param 		 {string}		 transformStr	            The transform string to parse
 * @return
 *
 * @todo      refactore
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import __parseTransformRule from '@coffeekraken/sugar/js/dom/style/parseTransformRule';
 * __parseTransformRule('translate(-100px, 200rem));
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-css-rules.js
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IParseTransformRuleResult {
    scale: string | number;
    scaleX: string | number;
    scaleY: string | number;
    scaleZ: string | number;
    translateX: string | number;
    translateY: string | number;
    translateZ: string | number;
    rotate: string | number;
    rotateX: string | number;
    rotateY: string | number;
    rotateZ: string | number;
    skew: string | number;
    skewX: string | number;
    skewY: string | number;
    skewZ: string | number;
}

export default function parseTransformRule(
    transformStr: string,
): IParseTransformRuleResult {
    const transforms = transformStr.trim().split(/\) |\)/);

    const result: IParseTransformRuleResult = {
        scale: 0,
        scaleX: 0,
        scaleY: 0,
        scaleZ: 0,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        skew: 0,
        skewX: 0,
        skewY: 0,
        skewZ: 0,
    };

    transforms.forEach((transStr) => {
        if (!transStr || !transStr.trim()) {
            return;
        }

        const parts = transStr.split('('),
            prop = parts[0].trim(),
            value = parts[1].trim();

        if (prop.match(/(X|Y|Z)$/)) {
            result[prop] = __autoCast(value);
        } else {
            const vals = value.split(',').map((v) => __autoCast(v.trim()));
            ['X', 'Y', 'Z'].forEach((axis, i) => {
                if (!vals[i]) {
                    return;
                }
                result[`${prop}${axis}`] = vals[i];
            });
        }
    });

    return result;
}
