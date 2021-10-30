import __SInterface from '@coffeekraken/s-interface';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
class postcssSugarPluginFontFamilyInterface extends __SInterface {
}
postcssSugarPluginFontFamilyInterface.definition = {
    name: {
        type: 'String',
        required: true,
        alias: 'n',
    },
};
export { postcssSugarPluginFontFamilyInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ name: '' }, params);
    const name = finalParams.name;
    if (__isValidUnitValue(name)) {
        return name;
    }
    return `sugar.theme(font.family.${name}.font-family)`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFtaWx5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFtaWx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sa0JBQWtCLE1BQU0saURBQWlELENBQUM7QUFHakYsTUFBTSxxQ0FBc0MsU0FBUSxZQUFZOztBQUNyRCxnREFBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNiO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU05RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxJQUNMLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUU5QixJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxPQUFPLDJCQUEyQixJQUFJLGVBQWUsQ0FBQztBQUMxRCxDQUFDIn0=