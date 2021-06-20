import __SugarConfig from '@coffeekraken/s-sugar-config';
import { typescript, postcss } from '@coffeekraken/s-svelte-preprocess';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
export default {
    compilerOptions: {
        customElement: true,
        format: 'esm'
    },
    preprocess: [
        typescript({
            tsconfigFile: `${__dirname}/tsconfig.json`,
            tsconfigDirectory: __packageRootDir()
        }),
        postcss(__SugarConfig.get('svelte'))
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZlbHRlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN2ZWx0ZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBR1IsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBSzVFLGVBQWU7SUFDYixlQUFlLEVBQUU7UUFDZixhQUFhLEVBQUUsSUFBSTtRQUNuQixNQUFNLEVBQUUsS0FBSztLQUNkO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsVUFBVSxDQUFDO1lBQ1QsWUFBWSxFQUFFLEdBQUcsU0FBUyxnQkFBZ0I7WUFDMUMsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUU7U0FDdEMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3JDO0NBQ0YsQ0FBQyJ9