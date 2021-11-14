// @ts-nocheck
import __deepMerge from '../object/deepMerge';
function sugarBanner(settings = {}) {
    settings = __deepMerge({
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
export default sugarBanner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJCYW5uZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhckJhbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFtQzlDLFNBQVMsV0FBVyxDQUFDLFdBQTBDLEVBQUU7SUFDN0QsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxJQUFJO1FBQ2IsVUFBVSxFQUFFLENBQUM7UUFDYixVQUFVLEVBQUUsQ0FBQztRQUNiLGFBQWEsRUFBRSxDQUFDO0tBQ25CLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFDRixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxVQUFVLFFBQVEsQ0FBQyxPQUFPLFVBQVUsQ0FBQztJQUNyRSxNQUFNLEtBQUssR0FBRztRQUNWLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDL0MsUUFBUSxDQUFDLFVBQVUsQ0FDdEIsNENBQTRDO1FBQzdDLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDL0MsUUFBUSxDQUFDLFVBQVUsQ0FDdEIsOEZBQThGO1FBQy9GLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDL0MsUUFBUSxDQUFDLFVBQVUsQ0FDdEIsZ0RBQWdEO1FBQ2pELFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDL0MsUUFBUSxDQUFDLFVBQVUsQ0FDdEIsNkNBQTZDO1FBQzlDLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDL0MsUUFBUSxDQUFDLFVBQVUsQ0FDdEIsMkNBQTJDLE9BQU8sTUFBTTtRQUN6RCxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxtQkFBbUIsR0FBRyxDQUFDLE1BQU0sQ0FDL0QsUUFBUSxDQUFDLFVBQVUsQ0FDdEIsNkNBQTZDO0tBQ2pELENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUMsQ0FBQztJQUNILElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxLQUFLLENBQUMsT0FBTyxDQUNULFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDL0MsUUFBUSxDQUFDLFVBQVUsQ0FDdEIsV0FBVyxDQUNmLENBQUM7U0FDTDtLQUNKO0lBQ0QsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLEtBQUssQ0FBQyxJQUFJLENBQ04sV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUMvQyxRQUFRLENBQUMsVUFBVSxDQUN0QixXQUFXLENBQ2YsQ0FBQztTQUNMO0tBQ0o7SUFFRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUVELGVBQWUsV0FBVyxDQUFDIn0=