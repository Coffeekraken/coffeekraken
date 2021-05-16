import __sPostcssSugarPlugin from '@coffeekraken/s-postcss-sugar-plugin';
import __autoprefixer from 'autoprefixer';
import __atRoot from 'postcss-atroot';
import __extendRule from 'postcss-extend-rule';
// @ts-ignore
import __nested from 'postcss-nested';
import __propertyLookup from 'postcss-property-lookup';
export default {
    plugins: [
        // @ts-ignore
        __atRoot(),
        __extendRule(),
        __nested(),
        __propertyLookup(),
        __sPostcssSugarPlugin({
            target: 'component'
        }),
        __autoprefixer()
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3N0Y3NzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHFCQUFxQixNQUFNLHNDQUFzQyxDQUFDO0FBQ3pFLE9BQU8sY0FBYyxNQUFNLGNBQWMsQ0FBQztBQUcxQyxPQUFPLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLFlBQVksTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxhQUFhO0FBQ2IsT0FBTyxRQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxnQkFBZ0IsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxlQUFlO0lBQ2IsT0FBTyxFQUFFO1FBQ1AsYUFBYTtRQUNiLFFBQVEsRUFBRTtRQUNWLFlBQVksRUFBRTtRQUNkLFFBQVEsRUFBRTtRQUNWLGdCQUFnQixFQUFFO1FBQ2xCLHFCQUFxQixDQUFDO1lBQ3BCLE1BQU0sRUFBRSxXQUFXO1NBQ3BCLENBQUM7UUFDRixjQUFjLEVBQUU7S0FDakI7Q0FDRixDQUFDIn0=