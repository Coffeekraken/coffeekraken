import __sPostcssSugarPlugin from '@coffeekraken/s-postcss-sugar-plugin';
import __autoprefixer from 'autoprefixer';
import __atRoot from 'postcss-atroot';
import __extendRule from 'postcss-extend-rule';
// @ts-ignore
import __nested from 'postcss-nested';
import __propertyLookup from 'postcss-property-lookup';
export default {
    input: '[config.storage.srcCssDir]/index.css',
    output: '[config.storage.distCssDir]/index.css',
    plugins: [
        __sPostcssSugarPlugin(),
        __nested(),
        __atRoot(),
        __extendRule(),
        __propertyLookup(),
        __autoprefixer()
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3N0Y3NzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHFCQUFxQixNQUFNLHNDQUFzQyxDQUFDO0FBQ3pFLE9BQU8sY0FBYyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLFlBQVksTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxhQUFhO0FBQ2IsT0FBTyxRQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxnQkFBZ0IsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxlQUFlO0lBRWIsS0FBSyxFQUFFLHNDQUFzQztJQUM3QyxNQUFNLEVBQUUsdUNBQXVDO0lBRS9DLE9BQU8sRUFBRTtRQUNQLHFCQUFxQixFQUFFO1FBQ3ZCLFFBQVEsRUFBRTtRQUNWLFFBQVEsRUFBRTtRQUNWLFlBQVksRUFBRTtRQUNkLGdCQUFnQixFQUFFO1FBQ2xCLGNBQWMsRUFBRTtLQUNqQjtDQUNGLENBQUMifQ==