// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginColorSchemaInterface extends __SInterface {
}
postcssSugarPluginColorSchemaInterface.definition = {
    primary: {
        type: 'String',
        required: true,
        alias: 'p'
    },
    secondary: {
        type: 'String',
        alias: 's'
    }
};
export { postcssSugarPluginColorSchemaInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ primary: '', secondary: '' }, params);
    const vars = [
        `--s-theme-color-schema-primary: var(--s-theme-color-${finalParams.primary}-default);`,
        `--s-theme-color-schema-primary-h: var(--s-theme-color-${finalParams.primary}-default-h);`,
        `--s-theme-color-schema-primary-s: var(--s-theme-color-${finalParams.primary}-default-s);`,
        `--s-theme-color-schema-primary-l: var(--s-theme-color-${finalParams.primary}-default-l);`
        // `--s-theme-color-schema-primary-r: var(--s-theme-color-${finalParams.primary}-default-r);`,
        // `--s-theme-color-schema-primary-g: var(--s-theme-color-${finalParams.primary}-default-g);`,
        // `--s-theme-color-schema-primary-b: var(--s-theme-color-${finalParams.primary}-default-b);`,
        // `--s-theme-color-schema-primary-a: var(--s-theme-color-${finalParams.primary}-default-a);`
    ];
    // if (finalParams.secondary) {
    //   const vars: string[] = [
    //     `--s-theme-color-schema-secondary: var(--s-theme-color-${finalParams.secondary}-default);`,
    //     `--s-theme-color-schema-secondary-h: var(--s-theme-color-${finalParams.secondary}-default-h);`,
    //     `--s-theme-color-schema-secondary-s: var(--s-theme-color-${finalParams.secondary}-default-s);`,
    //     `--s-theme-color-schema-secondary-l: var(--s-theme-color-${finalParams.secondary}-default-l);`,
    //     `--s-theme-color-schema-secondary-r: var(--s-theme-color-${finalParams.secondary}-default-r);`,
    //     `--s-theme-color-schema-secondary-g: var(--s-theme-color-${finalParams.secondary}-default-g);`,
    //     `--s-theme-color-schema-secondary-b: var(--s-theme-color-${finalParams.secondary}-default-b);`,
    //     `--s-theme-color-schema-secondary-a: var(--s-theme-color-${finalParams.secondary}-default-a);`
    //   ];
    // }
    if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push('}');
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7O0FBQ3hELGlEQUFVLEdBQUc7SUFDbEIsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7Q0FDRixDQUFDO0FBRUosT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTy9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsT0FBTyxFQUFFLEVBQUUsRUFDWCxTQUFTLEVBQUUsRUFBRSxJQUNWLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDckIsdURBQXVELFdBQVcsQ0FBQyxPQUFPLFlBQVk7UUFDdEYseURBQXlELFdBQVcsQ0FBQyxPQUFPLGNBQWM7UUFDMUYseURBQXlELFdBQVcsQ0FBQyxPQUFPLGNBQWM7UUFDMUYseURBQXlELFdBQVcsQ0FBQyxPQUFPLGNBQWM7UUFDMUYsOEZBQThGO1FBQzlGLDhGQUE4RjtRQUM5Riw4RkFBOEY7UUFDOUYsNkZBQTZGO0tBQzlGLENBQUM7SUFFRiwrQkFBK0I7SUFDL0IsNkJBQTZCO0lBQzdCLGtHQUFrRztJQUNsRyxzR0FBc0c7SUFDdEcsc0dBQXNHO0lBQ3RHLHNHQUFzRztJQUN0RyxzR0FBc0c7SUFDdEcsc0dBQXNHO0lBQ3RHLHNHQUFzRztJQUN0RyxxR0FBcUc7SUFDckcsT0FBTztJQUNQLElBQUk7SUFFSixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDaEI7SUFFRCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9