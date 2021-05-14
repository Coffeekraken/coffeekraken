import { typescript, postcss } from '@coffeekraken/s-svelte-preprocess';
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
        // babel({}),
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
        })
        // globalStyle()
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZlbHRlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN2ZWx0ZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBR1IsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUV0RSxPQUFPLHFCQUFxQixNQUFNLHNDQUFzQyxDQUFDO0FBQ3pFLGdFQUFnRTtBQUNoRSxPQUFPLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFDOUIsdURBQXVEO0FBRXZELGVBQWU7SUFDYixlQUFlLEVBQUU7UUFDZixhQUFhLEVBQUUsSUFBSTtRQUNuQixNQUFNLEVBQUUsS0FBSztLQUNkO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsVUFBVSxDQUFDO1lBQ1QsWUFBWSxFQUFFLEdBQUcsU0FBUyxnQkFBZ0I7WUFDMUMsaUJBQWlCLEVBQUUsYUFBYSxFQUFFO1NBQ25DLENBQUM7UUFDRixhQUFhO1FBQ2IsT0FBTyxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNQLHFCQUFxQixDQUFDO29CQUNwQixNQUFNLEVBQUUsV0FBVztpQkFDcEIsQ0FBQztnQkFDRiw0QkFBNEI7Z0JBQzVCLFFBQVEsRUFBRTtnQkFDVix1QkFBdUI7Z0JBQ3ZCLG1CQUFtQjthQUNwQjtTQUNGLENBQUM7UUFDRixnQkFBZ0I7S0FDakI7Q0FDRixDQUFDIn0=