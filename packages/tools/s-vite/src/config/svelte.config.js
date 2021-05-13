import { typescript, postcss, globalStyle, babel } from 'svelte-preprocess';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __sPostcssSugarPlugin from '@coffeekraken/s-postcss-sugar-plugin';
// import __postcssImportExtGlob from 'postcss-import-ext-glob';
import __precss from 'precss';
// import __postcssPresetEnv from 'postcss-preset-env';
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
        babel({}),
        postcss({
            plugins: [
                __sPostcssSugarPlugin({
                    target: 'component'
                }),
                // __postcssImportExtGlob(),
                __precss()
                // __postcssPresetEnv()
                // __autoprefixer()
            ]
        }),
        globalStyle()
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZlbHRlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN2ZWx0ZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBRXRFLE9BQU8scUJBQXFCLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsZ0VBQWdFO0FBQ2hFLE9BQU8sUUFBUSxNQUFNLFFBQVEsQ0FBQztBQUM5Qix1REFBdUQ7QUFFdkQsZUFBZTtJQUNiLGVBQWUsRUFBRTtRQUNmLGFBQWEsRUFBRSxJQUFJO1FBQ25CLE1BQU0sRUFBRSxLQUFLO0tBQ2Q7SUFDRCxVQUFVLEVBQUU7UUFDVixVQUFVLENBQUM7WUFDVCxZQUFZLEVBQUUsR0FBRyxTQUFTLGdCQUFnQjtZQUMxQyxpQkFBaUIsRUFBRSxhQUFhLEVBQUU7U0FDbkMsQ0FBQztRQUNGLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDVCxPQUFPLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ1AscUJBQXFCLENBQUM7b0JBQ3BCLE1BQU0sRUFBRSxXQUFXO2lCQUNwQixDQUFDO2dCQUNGLDRCQUE0QjtnQkFDNUIsUUFBUSxFQUFFO2dCQUNWLHVCQUF1QjtnQkFDdkIsbUJBQW1CO2FBQ3BCO1NBQ0YsQ0FBQztRQUNGLFdBQVcsRUFBRTtLQUNkO0NBQ0YsQ0FBQyJ9