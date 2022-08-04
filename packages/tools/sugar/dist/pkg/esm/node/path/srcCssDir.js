// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const srcCssDir = __SSugarConfig.get('storage.src.cssDir');
    if (srcCssDir !== undefined) {
        // __fs.ensureDirSync(srcCssDir);
        return srcCssDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQStCMUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUErQixFQUFFO0lBQ3RELFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFDRixNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDM0QsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQ3pCLGlDQUFpQztRQUNqQyxPQUFPLFNBQVMsQ0FBQztLQUNwQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUMifQ==