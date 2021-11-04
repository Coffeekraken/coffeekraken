// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginThemeInterface extends __SInterface {
}
postcssSugarPluginThemeInterface.definition = {
    dotPath: {
        type: 'String',
        required: true,
    },
    scalable: {
        type: 'Boolean',
        default: false,
    },
    return: {
        type: 'String',
        values: ['var', 'value'],
        default: 'var',
    },
    fallback: {
        type: 'Boolean',
        default: true,
    },
};
export { postcssSugarPluginThemeInterface as interface };
export default function theme({ params, }) {
    const finalParams = Object.assign({}, params);
    if (finalParams.return === 'var') {
        if (finalParams.scalable) {
            return `sugar.scalable(${__STheme.cssVar(finalParams.dotPath, finalParams.fallback)})`;
        }
        else {
            return __STheme.cssVar(finalParams.dotPath, finalParams.fallback);
        }
    }
    else {
        if (finalParams.scalable) {
            return `sugar.scalable(${__STheme.config(finalParams.dotPath)})`;
        }
        else {
            return __STheme.config(finalParams.dotPath);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNoRCwyQ0FBVSxHQUFHO0lBQ2hCLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDO1FBQ3hCLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtLQUNoQjtDQUNKLENBQUM7QUFFTixPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFTekQsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsRUFDMUIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBQ0YsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtRQUM5QixJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDdEIsT0FBTyxrQkFBa0IsUUFBUSxDQUFDLE1BQU0sQ0FDcEMsV0FBVyxDQUFDLE9BQU8sRUFDbkIsV0FBVyxDQUFDLFFBQVEsQ0FDdkIsR0FBRyxDQUFDO1NBQ1I7YUFBTTtZQUNILE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyRTtLQUNKO1NBQU07UUFDSCxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDdEIsT0FBTyxrQkFBa0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztTQUNwRTthQUFNO1lBQ0gsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQztLQUNKO0FBQ0wsQ0FBQyJ9