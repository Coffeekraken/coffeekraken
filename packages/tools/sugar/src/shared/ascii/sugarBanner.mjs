// @ts-nocheck
import __deepMerge from '../object/deepMerge';
function sugarBanner(settings = {}) {
    settings = __deepMerge({
        version: '',
        borders: true,
        marginLeft: 2
    }, settings);
    let version = '';
    if (settings.version)
        version = `<white>${settings.version}</white>`;
    const value = [
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}  ____                           </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}/ ____|</yellow><white>Coffee<cyan>kraken</cyan></white><yellow> __ _ _ __   </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}\\___ \\| | | |/ _\` |/ _\` | \`__|  </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)} ___) | |_| | (_| | (_| | |       </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}|____/ \\__,_|\\__, |\\__,_|_|</yellow> ${version}    `,
        `<yellow>${settings.borders ? '█' : ''}</yellow><white>${' '.repeat(settings.marginLeft)}             </white><yellow>|___/</yellow>`
    ]
        .map((line) => {
        return line;
    })
        .join('\n');
    return value;
}
export default sugarBanner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJCYW5uZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2FzY2lpL3N1Z2FyQmFubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQThCOUMsU0FBUyxXQUFXLENBQUMsV0FBaUMsRUFBRTtJQUN0RCxRQUFRLEdBQUcsV0FBVyxDQUNwQjtRQUNFLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLElBQUk7UUFDYixVQUFVLEVBQUUsQ0FBQztLQUNkLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFDRixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxVQUFVLFFBQVEsQ0FBQyxPQUFPLFVBQVUsQ0FBQztJQUNyRSxNQUFNLEtBQUssR0FBRztRQUNaLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDakQsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsNENBQTRDO1FBQzdDLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDakQsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsd0ZBQXdGO1FBQ3pGLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDakQsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsZ0RBQWdEO1FBQ2pELFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDakQsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsNkNBQTZDO1FBQzlDLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDakQsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsMkNBQTJDLE9BQU8sTUFBTTtRQUN6RCxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxtQkFBbUIsR0FBRyxDQUFDLE1BQU0sQ0FDakUsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsNkNBQTZDO0tBQy9DO1NBQ0UsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDWixPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVkLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELGVBQWUsV0FBVyxDQUFDIn0=