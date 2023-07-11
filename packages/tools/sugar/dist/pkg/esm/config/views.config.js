import __path from 'path';
import __packageRootDir from '../node/path/packageRootDir.js';
export default function ({ env, config }) {
    if (env.platform !== 'node')
        return;
    return {
        layouts: {
            main: {
                name: 'Default (main)',
                viewDotPath: 'layouts.main',
            },
        },
        rootDirs: [
            `./${__path.relative(__packageRootDir(), config.storage.src.viewsDir)}`,
            `./node_modules/@coffeekraken/sugar/src/views`,
        ],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBRTlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO0lBQ3BDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLFdBQVcsRUFBRSxjQUFjO2FBQzlCO1NBQ0o7UUFDRCxRQUFRLEVBQUU7WUFDTixLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQ2hCLGdCQUFnQixFQUFFLEVBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDOUIsRUFBRTtZQUNILDhDQUE4QztTQUNqRDtLQUNKLENBQUM7QUFDTixDQUFDIn0=