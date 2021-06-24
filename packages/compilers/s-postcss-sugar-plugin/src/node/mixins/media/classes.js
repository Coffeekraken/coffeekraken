import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginMediaClassesMixinInterface extends __SInterface {
}
postcssSugarPluginMediaClassesMixinInterface.definition = {
    query: {
        type: 'String',
        required: true
    },
    name: {
        type: 'String',
        required: true
    }
};
export { postcssSugarPluginMediaClassesMixinInterface as interface };
export default function ({ params, atRule, postcssApi, replaceWith }) {
    const finalParams = Object.assign({}, params);
    atRule.nodes.forEach(node => {
        if (!node.selector)
            return;
        const selectorParts = node.selector.split(' ');
        selectorParts[0] = `${selectorParts[0]}@${finalParams.name}`;
        node.selectors[0] = selectorParts[0];
        node.selector = selectorParts.join(' ');
    });
    const mediaRule = new postcssApi.AtRule({
        name: 'sugar.media',
        params: `(${finalParams.query})`
    });
    //   console.log('NO', atRule);
    // @ts-ignore
    atRule.nodes.forEach(node => {
        //   node.parent = AST.nodes[0];
        mediaRule.append(node);
    });
    //   console.log(AST.nodes);
    //   console.log(mediaRule.nodes);
    atRule.replaceWith(mediaRule);
    mediaRule.before(new postcssApi.Comment({
        text: `@sugar-media-classes-${finalParams.name}`
    }));
    //   console.log(atRule.nodes);
    //   const vars: string[] = [`
    //     @sugar.media(${finalParams.query}) {
    //     }
    //   `];
    //   replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFLckQsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM5RCx1REFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQVFKLE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVyRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFNWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDM0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxFQUFFLGFBQWE7UUFDbkIsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLEtBQUssR0FBRztLQUNuQyxDQUFDLENBQUM7SUFFTCwrQkFBK0I7SUFFN0IsYUFBYTtJQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLGdDQUFnQztRQUNoQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBRUwsNEJBQTRCO0lBRTVCLGtDQUFrQztJQUU5QixNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTlCLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksRUFBRSx3QkFBd0IsV0FBVyxDQUFDLElBQUksRUFBRTtLQUNuRCxDQUFDLENBQUMsQ0FBQztJQUVSLCtCQUErQjtJQUUvQiw4QkFBOEI7SUFDOUIsMkNBQTJDO0lBRTNDLFFBQVE7SUFDUixRQUFRO0lBRVIsdUJBQXVCO0FBQ3ZCLENBQUMifQ==