import __getCssRulesFromStylesheet from './getCssRulesFromStylesheet';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sMkJBQTJCLE1BQU0sNkJBQTZCLENBQUM7QUFFdEUsT0FBTywwQkFBMEIsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLDhCQUVOLE1BQU0sa0NBQWtDLENBQUM7QUE4QzFDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsMkJBQTJCLENBQy9DLGFBQWEsRUFDYixXQUFXO0lBRVgsMkNBQTJDO0lBQzNDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLO1NBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDakIsTUFBTSxDQUNILENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUM7UUFDckIsR0FBRyxPQUFPO1FBQ1YsR0FBRywyQkFBMkIsQ0FBQyxVQUFVLENBQUM7S0FDN0MsRUFDRCxFQUFFLENBQ0wsQ0FBQztJQUVOLG9DQUFvQztJQUNwQyxhQUFhO0lBQ2IsT0FBTyxDQUNILDBCQUEwQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7UUFDL0MsNkRBQTZEO1NBQzVELEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQztRQUNwQywwREFBMEQ7U0FDekQsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxFQUFFO1FBQzdCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxXQUFXO1lBQ2IsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUNiLENBQUM7QUFDTixDQUFDIn0=