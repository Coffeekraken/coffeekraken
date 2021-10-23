// @ts-nocheck
import __require from '../esm/require';
// import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const srcJsDir = __SSugarConfig.get('storage.src.jsDir');
    if (srcJsDir !== undefined) {
        __fs.ensureDirSync(srcJsDir);
        return srcJsDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjSnNEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmNKc0Rpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxTQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsNkRBQTZEO0FBQzdELE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQWdDNUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUE4QixFQUFFO0lBQ3JELFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFDRixNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUNqRSxNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDekQsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsT0FBTyxRQUFRLENBQUM7S0FDbkI7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDIn0=
