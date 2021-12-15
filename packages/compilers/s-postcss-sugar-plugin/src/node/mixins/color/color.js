import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginColorMixinInterface extends __SInterface {
    static get _definition() {
        return {
            current: {
                type: 'String',
                required: true,
            },
            primary: {
                type: 'String',
            },
            secondary: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginColorMixinInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ current: '', primary: undefined, secondary: undefined }, params);
    // if (finalParams.current === 'current')
    //     throw new Error(
    //         `You cannot remap the "<yellow>current</yellow>" color to "<cyan>current</cyan>"...`,
    //     );
    // if (finalParams.primary === 'primary')
    //     throw new Error(
    //         `You cannot remap the "<yellow>primary</yellow>" color to "<cyan>primary</cyan>"...`,
    //     );
    // if (finalParams.secondary === 'secondary')
    //     throw new Error(
    //         `You cannot remap the "<yellow>secondary</yellow>" color to "<cyan>secondary</cyan>"...`,
    //     );
    const vars = new CssVars(`
        @sugar.color.remap(current, ${finalParams.current});`);
    if (finalParams.primary) {
        vars.code(`@sugar.color.remap(primary, ${finalParams.primary});`);
    }
    else {
        vars.code(`@sugar.color.remap(primary, ${finalParams.current});`);
    }
    if (finalParams.secondary) {
        vars.code(`@sugar.color.remap(secondary, ${finalParams.secondary});`);
    }
    else {
        vars.code(`@sugar.color.remap(secondary, ${finalParams.current});`);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUscUNBQXFDLElBQUksU0FBUyxFQUFFLENBQUM7QUFnQzlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE9BQU8sRUFBRSxFQUFFLEVBQ1gsT0FBTyxFQUFFLFNBQVMsRUFDbEIsU0FBUyxFQUFFLFNBQVMsSUFDakIsTUFBTSxDQUNaLENBQUM7SUFFRix5Q0FBeUM7SUFDekMsdUJBQXVCO0lBQ3ZCLGdHQUFnRztJQUNoRyxTQUFTO0lBQ1QseUNBQXlDO0lBQ3pDLHVCQUF1QjtJQUN2QixnR0FBZ0c7SUFDaEcsU0FBUztJQUNULDZDQUE2QztJQUM3Qyx1QkFBdUI7SUFDdkIsb0dBQW9HO0lBQ3BHLFNBQVM7SUFFVCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQztzQ0FDUyxXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztJQUUzRCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQywrQkFBK0IsV0FBVyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7S0FDckU7U0FBTTtRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsK0JBQStCLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO0tBQ3JFO0lBQ0QsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsaUNBQWlDLFdBQVcsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO0tBQ3pFO1NBQU07UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztLQUN2RTtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==