import __SFile from '@coffeekraken/s-file';
import __fs from 'fs';
import __micromatch from 'micromatch';
export default function __pickOneSync(filesNames, settings) {
    const finalSettings = Object.assign({ cwd: process.cwd(), SFile: true }, (settings !== null && settings !== void 0 ? settings : {}));
    // check if we have a file
    const files = __fs.readdirSync(finalSettings.cwd);
    for (const fileName of files) {
        if (__micromatch.isMatch(fileName, filesNames)) {
            if (finalSettings.SFile) {
                return new __SFile(fileName, {
                    cwd: finalSettings.cwd,
                });
            }
            else {
                return `${finalSettings.cwd}/${fileName}`;
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFlBQVksTUFBTSxZQUFZLENBQUM7QUFpQ3RDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUNqQyxVQUFvQixFQUNwQixRQUF3QztJQUV4QyxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDbEIsS0FBSyxFQUFFLElBQUksSUFDUixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBQ0YsMEJBQTBCO0lBQzFCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELEtBQUssTUFBTSxRQUFRLElBQUksS0FBSyxFQUFFO1FBQzFCLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEVBQUU7WUFDNUMsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUNyQixPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtvQkFDekIsR0FBRyxFQUFFLGFBQWEsQ0FBQyxHQUFHO2lCQUN6QixDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxPQUFPLEdBQUcsYUFBYSxDQUFDLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQzthQUM3QztTQUNKO0tBQ0o7QUFDTCxDQUFDIn0=