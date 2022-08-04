// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const srcJsDir = __SSugarConfig.get('storage.src.jsDir');
    if (srcJsDir !== undefined) {
        // __fs.ensureDirSync(srcJsDir);
        return srcJsDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQStCMUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUE4QixFQUFFO0lBQ3JELFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDekQsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQ3hCLGdDQUFnQztRQUNoQyxPQUFPLFFBQVEsQ0FBQztLQUNuQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUMifQ==