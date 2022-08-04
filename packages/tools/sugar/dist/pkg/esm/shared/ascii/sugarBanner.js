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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQWtDOUMsU0FBUyxXQUFXLENBQUMsV0FBMEMsRUFBRTtJQUM3RCxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLElBQUk7UUFDYixVQUFVLEVBQUUsQ0FBQztRQUNiLFVBQVUsRUFBRSxDQUFDO1FBQ2IsYUFBYSxFQUFFLENBQUM7S0FDbkIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUNGLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixJQUFJLFFBQVEsQ0FBQyxPQUFPO1FBQUUsT0FBTyxHQUFHLFVBQVUsUUFBUSxDQUFDLE9BQU8sVUFBVSxDQUFDO0lBQ3JFLE1BQU0sS0FBSyxHQUFHO1FBQ1YsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUMvQyxRQUFRLENBQUMsVUFBVSxDQUN0Qiw0Q0FBNEM7UUFDN0MsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUMvQyxRQUFRLENBQUMsVUFBVSxDQUN0Qiw4RkFBOEY7UUFDL0YsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUMvQyxRQUFRLENBQUMsVUFBVSxDQUN0QixnREFBZ0Q7UUFDakQsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUMvQyxRQUFRLENBQUMsVUFBVSxDQUN0Qiw2Q0FBNkM7UUFDOUMsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUMvQyxRQUFRLENBQUMsVUFBVSxDQUN0QiwyQ0FBMkMsT0FBTyxNQUFNO1FBQ3pELFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLG1CQUFtQixHQUFHLENBQUMsTUFBTSxDQUMvRCxRQUFRLENBQUMsVUFBVSxDQUN0Qiw2Q0FBNkM7S0FDakQsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLEtBQUssQ0FBQyxPQUFPLENBQ1QsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUMvQyxRQUFRLENBQUMsVUFBVSxDQUN0QixXQUFXLENBQ2YsQ0FBQztTQUNMO0tBQ0o7SUFDRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsS0FBSyxDQUFDLElBQUksQ0FDTixXQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQy9DLFFBQVEsQ0FBQyxVQUFVLENBQ3RCLFdBQVcsQ0FDZixDQUFDO1NBQ0w7S0FDSjtJQUVELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQsZUFBZSxXQUFXLENBQUMifQ==