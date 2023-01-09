
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
}
export default function __parseTransformRule(transformStr: string): IParseTransformRuleResult;
