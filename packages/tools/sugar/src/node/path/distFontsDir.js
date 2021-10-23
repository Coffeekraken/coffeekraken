// @ts-nocheck
import __require from '../esm/require';
// import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const distFontsDir = __SSugarConfig.get('storage.dist.fontsDir');
    if (distFontsDir !== undefined) {
        __fs.ensureDirSync(distFontsDir);
        return distFontsDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdEZvbnRzRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlzdEZvbnRzRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2Qyw0REFBNEQ7QUFDNUQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBZ0M1QixNQUFNLENBQUMsT0FBTyxXQUFXLFdBQWtDLEVBQUU7SUFDekQsUUFBUSxxQkFDRCxRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN6RSxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDakUsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMsT0FBTyxZQUFZLENBQUM7S0FDdkI7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDIn0=