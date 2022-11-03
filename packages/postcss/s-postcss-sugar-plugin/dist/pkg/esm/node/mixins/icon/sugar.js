import __SInterface from '@coffeekraken/s-interface';
import { __fileName } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
class postcssSugarPluginIconSugarMixinInterface extends __SInterface {
    static get _definition() {
        return {
            path: {
                type: 'String',
                required: true,
            },
            as: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginIconSugarMixinInterface as interface };
export default function ({ params, atRule, replaceWith, sourcePath, sharedData, }) {
    const finalParams = Object.assign({ path: '', as: '' }, params);
    if (!sharedData.icons) {
        sharedData.icons = [];
    }
    let as = finalParams.as;
    if (!as) {
        as = __fileName(iconPath.split('.').slice(0, -1).join('.'));
    }
    // reading the icon file
    const iconFilePath = finalParams.path;
    if (__fs.existsSync(iconFilePath)) {
        sharedData.icons.push({
            path: iconFilePath,
            as,
        });
    }
    else {
        throw new Error(`<red>[sugar.css.mixins.icon.sugar]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists in the sugar library`);
    }
    replaceWith([]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxFQUFFLEVBQUU7Z0JBQ0EsSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWxFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQUNWLFVBQVUsR0FPYjtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLEVBQUUsRUFBRSxFQUFFLElBQ0gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtRQUNuQixVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUN6QjtJQUVELElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNMLEVBQUUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7SUFFRCx3QkFBd0I7SUFDeEIsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDL0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDbEIsSUFBSSxFQUFFLFlBQVk7WUFDbEIsRUFBRTtTQUNMLENBQUMsQ0FBQztLQUNOO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUNYLDhGQUE4RixXQUFXLENBQUMsSUFBSSwrQ0FBK0MsQ0FDaEssQ0FBQztLQUNMO0lBRUQsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==