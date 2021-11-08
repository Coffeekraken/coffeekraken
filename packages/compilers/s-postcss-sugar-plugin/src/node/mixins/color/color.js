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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUscUNBQXFDLElBQUksU0FBUyxFQUFFLENBQUM7QUFnQzlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsT0FBTyxFQUFFLEVBQUUsRUFDWCxPQUFPLEVBQUUsU0FBUyxFQUNsQixTQUFTLEVBQUUsU0FBUyxJQUNqQixNQUFNLENBQ1osQ0FBQztJQUVGLHlDQUF5QztJQUN6Qyx1QkFBdUI7SUFDdkIsZ0dBQWdHO0lBQ2hHLFNBQVM7SUFDVCx5Q0FBeUM7SUFDekMsdUJBQXVCO0lBQ3ZCLGdHQUFnRztJQUNoRyxTQUFTO0lBQ1QsNkNBQTZDO0lBQzdDLHVCQUF1QjtJQUN2QixvR0FBb0c7SUFDcEcsU0FBUztJQUVULE1BQU0sUUFBUSxHQUFhO1FBQ3ZCLCtCQUErQixXQUFXLENBQUMsT0FBTyxJQUFJO0tBQ3pELENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7UUFDckIsUUFBUSxDQUFDLElBQUksQ0FBQywrQkFBK0IsV0FBVyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7S0FDekU7U0FBTTtRQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsK0JBQStCLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO0tBQ3pFO0lBQ0QsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFO1FBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQ1QsaUNBQWlDLFdBQVcsQ0FBQyxTQUFTLElBQUksQ0FDN0QsQ0FBQztLQUNMO1NBQU07UUFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztLQUMzRTtJQUVELFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=