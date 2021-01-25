"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = sugarHeading;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJIZWFkaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXJIZWFkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLG9FQUE4QztBQUM5QyxxRUFBK0M7QUE2Qi9DLFNBQVMsWUFBWSxDQUFDLFdBQWtDLEVBQUU7SUFDeEQsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLElBQUk7S0FDZCxFQUNELFFBQVEsQ0FDVCxDQUFDO0lBQ0YsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLElBQUksUUFBUSxDQUFDLE9BQU87UUFBRSxPQUFPLEdBQUcsVUFBVSxRQUFRLENBQUMsT0FBTyxVQUFVLENBQUM7SUFDckUsTUFBTSxLQUFLLEdBQUc7UUFDWixXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXO1FBQ2pELFdBQ0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUMzQiwrQ0FBK0M7UUFDL0MsV0FDRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQzNCLDJGQUEyRjtRQUMzRixXQUNFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDM0IsbURBQW1EO1FBQ25ELFdBQ0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUMzQixnREFBZ0Q7UUFDaEQsV0FDRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQzNCLDhDQUE4QyxPQUFPLE1BQU07UUFDM0QsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0NBQWdDO1FBQ3RFLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVc7S0FDbEQ7U0FDRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNaLE9BQU8sbUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFZCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxpQkFBUyxZQUFZLENBQUMifQ==