import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.media
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to automatically generate the requested media query as well
 * as updating all the direct child classnames so you will have classes that applies
 * only for these media queries.
 *
 * Take this as an example:
 *
 * ```css
 * .my-cool-element {
 *    color: red;
 * }
 * \@sugar.media.classes(max-width: 1200px, myQuery) {
 *    .my-cool-element {
 *      color: green;
 *    }
 * }
 * ```
 *
 * This wil generate these two classes:
 * - .my-cool-element: Always available
 * - .my-cool-element___myQuery: Available only in the myQuery media query context
 *
 * Note that you can use the @sugar.media mixin parameters syntax here in the first argument.
 *
 * @param         {String}      query
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.media.classes(tablet, myQuery) {
 *    // any classes you want to "duplicate" and generate
 *    // only for this media context...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
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
    const finalParams = Object.assign({ query: '', name: '' }, params);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFLckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM5RCx1REFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQVFKLE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVyRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFNWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsRUFBRSxFQUNULElBQUksRUFBRSxFQUFFLElBQ0wsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBQzNCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksRUFBRSxhQUFhO1FBQ25CLE1BQU0sRUFBRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLEdBQUc7S0FDbkMsQ0FBQyxDQUFDO0lBRUwsK0JBQStCO0lBRTdCLGFBQWE7SUFDYixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixnQ0FBZ0M7UUFDaEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUVMLDRCQUE0QjtJQUU1QixrQ0FBa0M7SUFFOUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUU5QixTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLEVBQUUsd0JBQXdCLFdBQVcsQ0FBQyxJQUFJLEVBQUU7S0FDbkQsQ0FBQyxDQUFDLENBQUM7SUFFUiwrQkFBK0I7SUFFL0IsOEJBQThCO0lBQzlCLDJDQUEyQztJQUUzQyxRQUFRO0lBQ1IsUUFBUTtJQUVSLHVCQUF1QjtBQUN2QixDQUFDIn0=