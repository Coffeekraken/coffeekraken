import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginColorSecondaryMixinInterface extends __SInterface {
}
postcssSugarPluginColorSecondaryMixinInterface.definition = {
    color: {
        type: 'String',
        required: true,
    },
};
export { postcssSugarPluginColorSecondaryMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ color: '' }, params);
    const cssArray = [
        `
        @sugar.color.remap(secondary, ${finalParams.color});
    `,
    ];
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vjb25kYXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Vjb25kYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sOENBQStDLFNBQVEsWUFBWTs7QUFDOUQseURBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSw4Q0FBOEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQTJCdkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQWE7UUFDdkI7d0NBQ2dDLFdBQVcsQ0FBQyxLQUFLO0tBQ3BEO0tBQ0EsQ0FBQztJQUVGLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=