import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginColorMixinInterface extends __SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
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
        }));
    }
}
export { postcssSugarPluginColorMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
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
    const cssArray = [
        `@sugar.color.remap(current, ${finalParams.current});`,
    ];
    if (finalParams.primary) {
        cssArray.push(`@sugar.color.remap(primary, ${finalParams.primary});`);
    }
    else {
        cssArray.push(`@sugar.color.remap(primary, ${finalParams.current});`);
    }
    if (finalParams.secondary) {
        cssArray.push(`@sugar.color.remap(secondary, ${finalParams.secondary});`);
    }
    else {
        cssArray.push(`@sugar.color.remap(secondary, ${finalParams.current});`);
    }
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFVBQVU7O1FBQ2pCLE9BQU8sQ0FDSCxNQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsbUNBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBZ0M5RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE9BQU8sRUFBRSxFQUFFLEVBQ1gsT0FBTyxFQUFFLFNBQVMsRUFDbEIsU0FBUyxFQUFFLFNBQVMsSUFDakIsTUFBTSxDQUNaLENBQUM7SUFFRix5Q0FBeUM7SUFDekMsdUJBQXVCO0lBQ3ZCLGdHQUFnRztJQUNoRyxTQUFTO0lBQ1QseUNBQXlDO0lBQ3pDLHVCQUF1QjtJQUN2QixnR0FBZ0c7SUFDaEcsU0FBUztJQUNULDZDQUE2QztJQUM3Qyx1QkFBdUI7SUFDdkIsb0dBQW9HO0lBQ3BHLFNBQVM7SUFFVCxNQUFNLFFBQVEsR0FBYTtRQUN2QiwrQkFBK0IsV0FBVyxDQUFDLE9BQU8sSUFBSTtLQUN6RCxDQUFDO0lBRUYsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1FBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsK0JBQStCLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO0tBQ3pFO1NBQU07UUFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLCtCQUErQixXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztLQUN6RTtJQUNELElBQUksV0FBVyxDQUFDLFNBQVMsRUFBRTtRQUN2QixRQUFRLENBQUMsSUFBSSxDQUNULGlDQUFpQyxXQUFXLENBQUMsU0FBUyxJQUFJLENBQzdELENBQUM7S0FDTDtTQUFNO1FBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsV0FBVyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7S0FDM0U7SUFFRCxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9