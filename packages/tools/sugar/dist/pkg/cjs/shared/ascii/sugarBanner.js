"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
function __sugarBanner(settings = {}) {
    settings = (0, deepMerge_1.default)({
        version: '',
        borders: true,
        marginLeft: 2,
        paddingTop: 0,
        paddingBottom: 0,
    }, settings);
    let version = '';
    if (settings.version)
        version = `<white>${settings.version}</white>`;
    const value = [
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}  ____                           </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}/ ____|</yellow><white>Coffee<magenta>kraken</magenta></white><yellow> __ _ _ __   </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}\\___ \\| | | |/ _\` |/ _\` | \`__|  </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)} ___) | |_| | (_| | (_| | |       </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}|____/ \\__,_|\\__, |\\__,_|_|</yellow> ${version}    `,
        `<yellow>${settings.borders ? '█' : ''}</yellow><white>${' '.repeat(settings.marginLeft)}             </white><yellow>|___/</yellow>`,
    ].map((line) => {
        return line;
    });
    if (settings.paddingTop) {
        for (let i = 0; i < settings.paddingTop; i++) {
            value.unshift(`<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}</yellow>`);
        }
    }
    if (settings.paddingBottom) {
        for (let i = 0; i < settings.paddingBottom; i++) {
            value.push(`<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}</yellow>`);
        }
    }
    return value.join('\n');
}
exports.default = __sugarBanner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQW9DOUMsU0FBd0IsYUFBYSxDQUNqQyxXQUEwQyxFQUFFO0lBRTVDLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksT0FBTyxFQUFFLEVBQUU7UUFDWCxPQUFPLEVBQUUsSUFBSTtRQUNiLFVBQVUsRUFBRSxDQUFDO1FBQ2IsVUFBVSxFQUFFLENBQUM7UUFDYixhQUFhLEVBQUUsQ0FBQztLQUNuQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBQ0YsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLElBQUksUUFBUSxDQUFDLE9BQU87UUFBRSxPQUFPLEdBQUcsVUFBVSxRQUFRLENBQUMsT0FBTyxVQUFVLENBQUM7SUFDckUsTUFBTSxLQUFLLEdBQUc7UUFDVixXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQy9DLFFBQVEsQ0FBQyxVQUFVLENBQ3RCLDRDQUE0QztRQUM3QyxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQy9DLFFBQVEsQ0FBQyxVQUFVLENBQ3RCLDhGQUE4RjtRQUMvRixXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQy9DLFFBQVEsQ0FBQyxVQUFVLENBQ3RCLGdEQUFnRDtRQUNqRCxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQy9DLFFBQVEsQ0FBQyxVQUFVLENBQ3RCLDZDQUE2QztRQUM5QyxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQy9DLFFBQVEsQ0FBQyxVQUFVLENBQ3RCLDJDQUEyQyxPQUFPLE1BQU07UUFDekQsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLEdBQUcsQ0FBQyxNQUFNLENBQy9ELFFBQVEsQ0FBQyxVQUFVLENBQ3RCLDZDQUE2QztLQUNqRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsS0FBSyxDQUFDLE9BQU8sQ0FDVCxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQy9DLFFBQVEsQ0FBQyxVQUFVLENBQ3RCLFdBQVcsQ0FDZixDQUFDO1NBQ0w7S0FDSjtJQUNELElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRTtRQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxLQUFLLENBQUMsSUFBSSxDQUNOLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDL0MsUUFBUSxDQUFDLFVBQVUsQ0FDdEIsV0FBVyxDQUNmLENBQUM7U0FDTDtLQUNKO0lBRUQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUF6REQsZ0NBeURDIn0=