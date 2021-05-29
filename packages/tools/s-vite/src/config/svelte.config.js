import __SugarConfig from '@coffeekraken/s-sugar-config';
import { typescript, postcss } from '@coffeekraken/s-svelte-preprocess';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default {
    compilerOptions: {
        customElement: true,
        format: 'esm'
    },
    preprocess: [
        typescript({
            tsconfigFile: `${__dirname}/tsconfig.json`,
            tsconfigDirectory: __packageRoot()
        }),
        postcss(__SugarConfig.get('svelte'))
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZlbHRlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN2ZWx0ZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBR1IsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUt0RSxlQUFlO0lBQ2IsZUFBZSxFQUFFO1FBQ2YsYUFBYSxFQUFFLElBQUk7UUFDbkIsTUFBTSxFQUFFLEtBQUs7S0FDZDtJQUNELFVBQVUsRUFBRTtRQUNWLFVBQVUsQ0FBQztZQUNULFlBQVksRUFBRSxHQUFHLFNBQVMsZ0JBQWdCO1lBQzFDLGlCQUFpQixFQUFFLGFBQWEsRUFBRTtTQUNuQyxDQUFDO1FBQ0YsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDckM7Q0FDRixDQUFDIn0=