"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const getKeyframesDeclarations_1 = __importDefault(require("./getKeyframesDeclarations"));
const transformKeyframesDeclarations_1 = __importDefault(require("./transformKeyframesDeclarations"));
function getKeyframesFromStylesheets(animationName, styleSheets) {
    // Collect CSSRules present in the document
    const CSSRules = [].slice
        .call(styleSheets)
        .reduce((results, styleSheet) => [
        ...results,
        ...(0, dom_1.__getCssRulesFromStylesheet)(styleSheet),
    ], []);
    // Filter CSSRules for KeyFrameRules
    // @ts-ignore
    return ((0, getKeyframesDeclarations_1.default)(animationName, CSSRules)
        // Transform KeyFrameRules to web animation compatible format
        .map(transformKeyframesDeclarations_1.default)
        // Flatten mulitdimensional array of transformed keyframes
        .reduce((results, declaration) => {
        const amend = Array.isArray(declaration)
            ? declaration
            : [declaration];
        return [...results, ...amend];
    }, []));
}
exports.default = getKeyframesFromStylesheets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQXNFO0FBQ3RFLDBGQUFvRTtBQUNwRSxzR0FFMEM7QUE4QzFDLFNBQXdCLDJCQUEyQixDQUMvQyxhQUFhLEVBQ2IsV0FBVztJQUVYLDJDQUEyQztJQUMzQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSztTQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ2pCLE1BQU0sQ0FDSCxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsT0FBTztRQUNWLEdBQUcsSUFBQSxpQ0FBMkIsRUFBQyxVQUFVLENBQUM7S0FDN0MsRUFDRCxFQUFFLENBQ0wsQ0FBQztJQUVOLG9DQUFvQztJQUNwQyxhQUFhO0lBQ2IsT0FBTyxDQUNILElBQUEsa0NBQTBCLEVBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztRQUMvQyw2REFBNkQ7U0FDNUQsR0FBRyxDQUFDLHdDQUE4QixDQUFDO1FBQ3BDLDBEQUEwRDtTQUN6RCxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUU7UUFDN0IsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDcEMsQ0FBQyxDQUFDLFdBQVc7WUFDYixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsR0FBRyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ2IsQ0FBQztBQUNOLENBQUM7QUE3QkQsOENBNkJDIn0=