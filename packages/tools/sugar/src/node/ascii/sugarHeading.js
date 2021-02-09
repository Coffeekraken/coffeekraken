"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
function sugarHeading(settings = {}) {
    settings = deepMerge_1.default({
        version: '2.0.0',
        borders: true
    }, settings);
    let version = '';
    if (settings.version)
        version = `<white>${settings.version}</white>`;
    const value = [
        `<yellow>${settings.borders ? '█' : ''}</yellow>`,
        `<yellow>${settings.borders ? '█' : ''}     ____                           </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}   / ____|</yellow><white>Coffee<cyan>kraken</cyan></white><yellow> __ _ _ __   </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}   \\___ \\| | | |/ _\` |/ _\` | \`__|  </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}    ___) | |_| | (_| | (_| | |       </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}   |____/ \\__,_|\\__, |\\__,_|_|</yellow> ${version}    `,
        `<yellow>${settings.borders ? '█' : ''}                |___/</yellow>`,
        `<yellow>${settings.borders ? '█' : ''}</yellow>`
    ]
        .map((line) => {
        return parseHtml_1.default(line).trim();
    })
        .join('\n');
    return value;
}
exports.default = sugarHeading;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJIZWFkaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXJIZWFkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVixvRUFBOEM7QUFDOUMscUVBQStDO0FBNkIvQyxTQUFTLFlBQVksQ0FBQyxXQUFrQyxFQUFFO0lBQ3hELFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxJQUFJO0tBQ2QsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUNGLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixJQUFJLFFBQVEsQ0FBQyxPQUFPO1FBQUUsT0FBTyxHQUFHLFVBQVUsUUFBUSxDQUFDLE9BQU8sVUFBVSxDQUFDO0lBQ3JFLE1BQU0sS0FBSyxHQUFHO1FBQ1osV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVztRQUNqRCxXQUNFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDM0IsK0NBQStDO1FBQy9DLFdBQ0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUMzQiwyRkFBMkY7UUFDM0YsV0FDRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQzNCLG1EQUFtRDtRQUNuRCxXQUNFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDM0IsZ0RBQWdEO1FBQ2hELFdBQ0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUMzQiw4Q0FBOEMsT0FBTyxNQUFNO1FBQzNELFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdDQUFnQztRQUN0RSxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXO0tBQ2xEO1NBQ0UsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDWixPQUFPLG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEMsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQsa0JBQWUsWUFBWSxDQUFDIn0=