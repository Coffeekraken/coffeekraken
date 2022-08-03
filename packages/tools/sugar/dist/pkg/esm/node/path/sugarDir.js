// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const sugarRootDir = __SSugarConfig.get('storage.sugar.rootDir');
    if (sugarRootDir !== undefined) {
        // __fs.ensureDirSync(sugarRootDir);
        return sugarRootDir;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQWdDMUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUFrQyxFQUFFO0lBQ3pELFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFDRixNQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDakUsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1FBQzVCLG9DQUFvQztRQUNwQyxPQUFPLFlBQVksQ0FBQztLQUN2QjtBQUNMLENBQUMifQ==