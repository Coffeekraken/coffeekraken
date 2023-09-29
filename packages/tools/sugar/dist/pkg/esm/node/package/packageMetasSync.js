// @ts-nocheck
import __fs from 'fs';
export default function __packageMetasSync(path = process.cwd(), settings) {
    const finalSettings = Object.assign({ sources: ['package.json', 'composer.json'], fields: ['name', 'description', 'version', 'author', 'license'] }, (settings !== null && settings !== void 0 ? settings : {}));
    let foundFieldsCount = 0;
    const finalMetas = {};
    for (let source of finalSettings.sources) {
        // if we have already found everything
        // stop here
        if (foundFieldsCount >= finalSettings.fields.length) {
            break;
        }
        // if the file exist, read it and handle fields
        if (__fs.existsSync(`${path}/${source}`)) {
            const json = JSON.parse(__fs.readFileSync(`${path}/${source}`).toString());
            // check every fields to grab info from
            for (let field of finalSettings.fields) {
                if (!finalMetas[field] && json[field] !== undefined) {
                    finalMetas[field] = json[field];
                    foundFieldsCount++;
                }
            }
            // handle the "type" field
            if (source === 'composer.json') {
                finalMetas.type = 'composer';
            }
            else if (source === 'package.json') {
                finalMetas.type = 'npm';
            }
            else {
                finalMetas.type = 'unknown';
            }
        }
    }
    // return the metas
    return finalMetas;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUE0Q3RCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsa0JBQWtCLENBQ3RDLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ3BCLFFBQXlDO0lBRXpDLE1BQU0sYUFBYSxtQkFDZixPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLEVBQzFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsSUFDNUQsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBRXpCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUV0QixLQUFLLElBQUksTUFBTSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUU7UUFDdEMsc0NBQXNDO1FBQ3RDLFlBQVk7UUFDWixJQUFJLGdCQUFnQixJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pELE1BQU07U0FDVDtRQUVELCtDQUErQztRQUMvQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUksTUFBTSxFQUFFLENBQUMsRUFBRTtZQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQ3BELENBQUM7WUFFRix1Q0FBdUM7WUFDdkMsS0FBSyxJQUFJLEtBQUssSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLEVBQUU7b0JBQ2pELFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hDLGdCQUFnQixFQUFFLENBQUM7aUJBQ3RCO2FBQ0o7WUFFRCwwQkFBMEI7WUFDMUIsSUFBSSxNQUFNLEtBQUssZUFBZSxFQUFFO2dCQUM1QixVQUFVLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQzthQUNoQztpQkFBTSxJQUFJLE1BQU0sS0FBSyxjQUFjLEVBQUU7Z0JBQ2xDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNILFVBQVUsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO2FBQy9CO1NBQ0o7S0FDSjtJQUVELG1CQUFtQjtJQUNuQixPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDIn0=