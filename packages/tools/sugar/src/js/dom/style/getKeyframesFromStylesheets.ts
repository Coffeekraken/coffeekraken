import __getCssRulesFromStylesheet from './getCssRulesFromStylesheet.js';

import __getKeyframesDeclarations from './getKeyframesDeclarations.js';
import __transformKeyframeDeclaration, {
    ITransformedKeyframeDeclaration,
} from './transformKeyframesDeclarations.js';

export interface IKeyframe {
    delay?: number;
    direction:
        | 'normal'
        | 'reverse'
        | 'alternate'
        | 'alternate-reverse'
        | 'inherit'
        | 'initial'
        | 'revert'
        | 'revert-layer'
        | 'unset';
    duration: number;
    fillMode:
        | 'none'
        | 'forwards'
        | 'backwards'
        | 'both'
        | 'inherit'
        | 'initial'
        | 'revert'
        | 'revert-layer'
        | 'unset';
    iterationCount:
        | 'infinite'
        | 'inherit'
        | 'initial'
        | 'revert'
        | 'revert-layer'
        | 'unset'
        | number;
    keyframes: ITransformedKeyframeDeclaration[];
    name: string;
    playState:
        | 'paused'
        | 'running'
        | 'inherit'
        | 'initial'
        | 'revert'
        | 'revert-layer'
        | 'unset';
    timingFunction: string;
}

export default function getKeyframesFromStylesheets(
    animationName,
    styleSheets,
): IKeyframe[] {
    // Collect CSSRules present in the document
    const CSSRules = [].slice
        .call(styleSheets)
        .reduce(
            (results, styleSheet) => [
                ...results,
                ...__getCssRulesFromStylesheet(styleSheet),
            ],
            [],
        );

    // Filter CSSRules for KeyFrameRules
    // @ts-ignore
    return (
        __getKeyframesDeclarations(animationName, CSSRules)
            // Transform KeyFrameRules to web animation compatible format
            .map(__transformKeyframeDeclaration)
            // Flatten mulitdimensional array of transformed keyframes
            .reduce((results, declaration) => {
                const amend = Array.isArray(declaration)
                    ? declaration
                    : [declaration];
                return [...results, ...amend];
            }, [])
    );
}
