// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __themeVar from '../../utils/themeVar';
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
            return `sugar.scalable(${__themeVar(finalParams.dotPath, finalParams.fallback)})`;
        }
        else {
            return __themeVar(finalParams.dotPath, finalParams.fallback);
        }
    }
    else {
        if (finalParams.scalable) {
            return `sugar.scalable(${__theme().config(finalParams.dotPath)})`;
        }
        else {
            return __theme().config(finalParams.dotPath);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsT0FBTyxVQUFVLE1BQU0sc0JBQXNCLENBQUM7QUFFOUMsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNoRCwyQ0FBVSxHQUFHO0lBQ2hCLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDO1FBQ3hCLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtLQUNoQjtDQUNKLENBQUM7QUFFTixPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFTekQsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsRUFDMUIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBQ0YsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtRQUM5QixJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDdEIsT0FBTyxrQkFBa0IsVUFBVSxDQUMvQixXQUFXLENBQUMsT0FBTyxFQUNuQixXQUFXLENBQUMsUUFBUSxDQUN2QixHQUFHLENBQUM7U0FDUjthQUFNO1lBQ0gsT0FBTyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEU7S0FDSjtTQUFNO1FBQ0gsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3RCLE9BQU8sa0JBQWtCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztTQUNyRTthQUFNO1lBQ0gsT0FBTyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hEO0tBQ0o7QUFDTCxDQUFDIn0=