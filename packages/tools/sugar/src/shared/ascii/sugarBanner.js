// @ts-nocheck
import __deepMerge from '../object/deepMerge';
function sugarBanner(settings = {}) {
    settings = __deepMerge({
        version: '',
        borders: true,
        marginLeft: 2,
        paddingTop: 0,
        paddingBottom: 0
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
        `<yellow>${settings.borders ? '█' : ''}</yellow><white>${' '.repeat(settings.marginLeft)}             </white><yellow>|___/</yellow>`
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
export default sugarBanner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJCYW5uZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhckJhbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFpQzlDLFNBQVMsV0FBVyxDQUFDLFdBQTBDLEVBQUU7SUFDL0QsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7UUFDRSxPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxJQUFJO1FBQ2IsVUFBVSxFQUFFLENBQUM7UUFDYixVQUFVLEVBQUUsQ0FBQztRQUNiLGFBQWEsRUFBRSxDQUFDO0tBQ2pCLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFDRixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxVQUFVLFFBQVEsQ0FBQyxPQUFPLFVBQVUsQ0FBQztJQUNyRSxNQUFNLEtBQUssR0FBRztRQUNaLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDakQsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsNENBQTRDO1FBQzdDLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDakQsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsOEZBQThGO1FBQy9GLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDakQsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsZ0RBQWdEO1FBQ2pELFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDakQsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsNkNBQTZDO1FBQzlDLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDakQsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsMkNBQTJDLE9BQU8sTUFBTTtRQUN6RCxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxtQkFBbUIsR0FBRyxDQUFDLE1BQU0sQ0FDakUsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsNkNBQTZDO0tBQy9DLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDYixPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO1FBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLEtBQUssQ0FBQyxPQUFPLENBQ1gsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUNqRCxRQUFRLENBQUMsVUFBVSxDQUNwQixXQUFXLENBQ2IsQ0FBQztTQUNIO0tBQ0Y7SUFDRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsS0FBSyxDQUFDLElBQUksQ0FDUixXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQ2pELFFBQVEsQ0FBQyxVQUFVLENBQ3BCLFdBQVcsQ0FDYixDQUFDO1NBQ0g7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsZUFBZSxXQUFXLENBQUMifQ==