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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJCYW5uZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhckJhbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUE4QjlDLFNBQVMsV0FBVyxDQUFDLFdBQWlDLEVBQUU7SUFDdEQsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7UUFDRSxPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxJQUFJO1FBQ2IsVUFBVSxFQUFFLENBQUM7S0FDZCxFQUNELFFBQVEsQ0FDVCxDQUFDO0lBQ0YsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLElBQUksUUFBUSxDQUFDLE9BQU87UUFBRSxPQUFPLEdBQUcsVUFBVSxRQUFRLENBQUMsT0FBTyxVQUFVLENBQUM7SUFDckUsTUFBTSxLQUFLLEdBQUc7UUFDWixXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQ2pELFFBQVEsQ0FBQyxVQUFVLENBQ3BCLDRDQUE0QztRQUM3QyxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQ2pELFFBQVEsQ0FBQyxVQUFVLENBQ3BCLHdGQUF3RjtRQUN6RixXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQ2pELFFBQVEsQ0FBQyxVQUFVLENBQ3BCLGdEQUFnRDtRQUNqRCxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQ2pELFFBQVEsQ0FBQyxVQUFVLENBQ3BCLDZDQUE2QztRQUM5QyxXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQ2pELFFBQVEsQ0FBQyxVQUFVLENBQ3BCLDJDQUEyQyxPQUFPLE1BQU07UUFDekQsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLEdBQUcsQ0FBQyxNQUFNLENBQ2pFLFFBQVEsQ0FBQyxVQUFVLENBQ3BCLDZDQUE2QztLQUMvQztTQUNFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1osT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFZCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxlQUFlLFdBQVcsQ0FBQyJ9