// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const distIconsDir = __SSugarConfig.get('storage.dist.iconsDir');
    if (distIconsDir !== undefined) {
        // __fs.ensureDirSync(distIconsDir);
        return distIconsDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQStCMUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUFrQyxFQUFFO0lBQ3pELFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFDRixNQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDakUsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1FBQzVCLG9DQUFvQztRQUNwQyxPQUFPLFlBQVksQ0FBQztLQUN2QjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUMifQ==