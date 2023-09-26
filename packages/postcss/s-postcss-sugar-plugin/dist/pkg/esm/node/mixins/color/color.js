import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginColorMixinInterface extends __SInterface {
    static get _definition() {
        return {
            current: {
                type: 'String',
                required: true,
            },
            accent: {
                type: 'String',
            },
            complementary: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginColorMixinInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ current: '', accent: undefined, complementary: undefined }, params);
    // if (finalParams.current === 'current')
    //     throw new Error(
    //         `You cannot remap the "<yellow>current</yellow>" color to "<cyan>current</cyan>"...`,
    //     );
    // if (finalParams.accent === 'accent')
    //     throw new Error(
    //         `You cannot remap the "<yellow>accent</yellow>" color to "<cyan>accent</cyan>"...`,
    //     );
    // if (finalParams.complementary === 'complementary')
    //     throw new Error(
    //         `You cannot remap the "<yellow>complementary</yellow>" color to "<cyan>complementary</cyan>"...`,
    //     );
    const vars = new CssVars();
    vars.code(`@s.color.remap(current, ${finalParams.current})`);
    if (finalParams.accent) {
        vars.code(`@s.color.remap(accent, ${finalParams.accent});`);
    }
    if (finalParams.complementary) {
        vars.code(`@s.color.remap(complementary, ${finalParams.complementary});`);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0scUNBQXNDLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQW1DOUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsT0FBTyxFQUFFLEVBQUUsRUFDWCxNQUFNLEVBQUUsU0FBUyxFQUNqQixhQUFhLEVBQUUsU0FBUyxJQUNyQixNQUFNLENBQ1osQ0FBQztJQUVGLHlDQUF5QztJQUN6Qyx1QkFBdUI7SUFDdkIsZ0dBQWdHO0lBQ2hHLFNBQVM7SUFDVCx1Q0FBdUM7SUFDdkMsdUJBQXVCO0lBQ3ZCLDhGQUE4RjtJQUM5RixTQUFTO0lBQ1QscURBQXFEO0lBQ3JELHVCQUF1QjtJQUN2Qiw0R0FBNEc7SUFDNUcsU0FBUztJQUVULE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLElBQUksQ0FBQywyQkFBMkIsV0FBVyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFN0QsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQ0wsaUNBQWlDLFdBQVcsQ0FBQyxhQUFhLElBQUksQ0FDakUsQ0FBQztLQUNMO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9