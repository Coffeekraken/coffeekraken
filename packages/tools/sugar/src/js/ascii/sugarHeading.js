// @ts-nocheck
// @shared
import __deepMerge from '../object/deepMerge';
import __parseHtml from '../console/parseHtml';
function sugarHeading(settings = {}) {
    settings = __deepMerge({
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
        return __parseHtml(line).trim();
    })
        .join('\n');
    return value;
}
export default sugarHeading;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJIZWFkaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXJIZWFkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxXQUFXLE1BQU0sc0JBQXNCLENBQUM7QUE2Qi9DLFNBQVMsWUFBWSxDQUFDLFdBQWtDLEVBQUU7SUFDeEQsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7UUFDRSxPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsSUFBSTtLQUNkLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFDRixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxVQUFVLFFBQVEsQ0FBQyxPQUFPLFVBQVUsQ0FBQztJQUNyRSxNQUFNLEtBQUssR0FBRztRQUNaLFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVc7UUFDakQsV0FDRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQzNCLCtDQUErQztRQUMvQyxXQUNFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDM0IsMkZBQTJGO1FBQzNGLFdBQ0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUMzQixtREFBbUQ7UUFDbkQsV0FDRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQzNCLGdEQUFnRDtRQUNoRCxXQUNFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDM0IsOENBQThDLE9BQU8sTUFBTTtRQUMzRCxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxnQ0FBZ0M7UUFDdEUsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVztLQUNsRDtTQUNFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1osT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEMsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQsZUFBZSxZQUFZLENBQUMifQ==