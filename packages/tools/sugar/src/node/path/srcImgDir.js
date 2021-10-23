// @ts-nocheck
import __require from '../esm/require';
// import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const srcImgDir = __SSugarConfig.get('storage.src.imgDir');
    if (srcImgDir !== undefined) {
        __fs.ensureDirSync(srcImgDir);
        return srcImgDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjSW1nRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjSW1nRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFNBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2Qyw2REFBNkQ7QUFDN0QsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBZ0M1QixNQUFNLENBQUMsT0FBTyxXQUFXLFdBQStCLEVBQUU7SUFDdEQsUUFBUSxxQkFDRCxRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN6RSxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDM0QsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsT0FBTyxTQUFTLENBQUM7S0FDcEI7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDIn0=