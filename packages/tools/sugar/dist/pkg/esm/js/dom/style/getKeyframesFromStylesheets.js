import { __getCssRulesFromStylesheet } from '@coffeekraken/sugar/dom';
import __getKeyframesDeclarations from './getKeyframesDeclarations';
import __transformKeyframeDeclaration from './transformKeyframesDeclarations';
export default function getKeyframesFromStylesheets(animationName, styleSheets) {
    // Collect CSSRules present in the document
    const CSSRules = [].slice
        .call(styleSheets)
        .reduce((results, styleSheet) => [
        ...results,
        ...__getCssRulesFromStylesheet(styleSheet),
    ], []);
    // Filter CSSRules for KeyFrameRules
    // @ts-ignore
    return (__getKeyframesDeclarations(animationName, CSSRules)
        // Transform KeyFrameRules to web animation compatible format
        .map(__transformKeyframeDeclaration)
        // Flatten mulitdimensional array of transformed keyframes
        .reduce((results, declaration) => {
        const amend = Array.isArray(declaration)
            ? declaration
            : [declaration];
        return [...results, ...amend];
    }, []));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RFLE9BQU8sMEJBQTBCLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyw4QkFFTixNQUFNLGtDQUFrQyxDQUFDO0FBOEMxQyxNQUFNLENBQUMsT0FBTyxVQUFVLDJCQUEyQixDQUMvQyxhQUFhLEVBQ2IsV0FBVztJQUVYLDJDQUEyQztJQUMzQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSztTQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ2pCLE1BQU0sQ0FDSCxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsT0FBTztRQUNWLEdBQUcsMkJBQTJCLENBQUMsVUFBVSxDQUFDO0tBQzdDLEVBQ0QsRUFBRSxDQUNMLENBQUM7SUFFTixvQ0FBb0M7SUFDcEMsYUFBYTtJQUNiLE9BQU8sQ0FDSCwwQkFBMEIsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO1FBQy9DLDZEQUE2RDtTQUM1RCxHQUFHLENBQUMsOEJBQThCLENBQUM7UUFDcEMsMERBQTBEO1NBQ3pELE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsRUFBRTtRQUM3QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUNwQyxDQUFDLENBQUMsV0FBVztZQUNiLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDYixDQUFDO0FBQ04sQ0FBQyJ9