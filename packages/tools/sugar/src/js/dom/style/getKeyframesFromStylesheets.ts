import __getCssRulesFromStylesheet from './getCssRulesFromStylesheet';
import __getKeyframesDeclarations from './getKeyframesDeclarations';
import __transformKeyframeDeclaration from './transformKeyframesDeclarations';

export default function getKeyframesFromStylesheets(
    animationName,
    styleSheets,
) {
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
