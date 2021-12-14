import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.fit
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate all the clearfix helper classes like s-clearfix:micro, etc...
 *
 * @return        {Css}        The generated css
 *
 * @example         postcss
 * \@sugar.clearfix.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginFixClassesInterface extends __SInterface {
    static get _definition() {
        return {
            defaultFitSize: {
                type: 'String',
                default: 'fill',
            },
        };
    }
}
export { postcssSugarPluginFixClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ defaultFitSize: 'fill' }, params);
    const vars = [];
    const fitSizes = ['fill', 'cover', 'contain', 'none'];
    vars.push(`
      /**
        * @name          Fit Sizes
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/fit-sizes
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a fit size on any HTMLElement.
        * On image and video, uses \`object-fit\` property, on all others,
        * simply fill the element using an absolute position, top: 0, left: 0 and width/height: 100%.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${fitSizes
        .map((fitSizeName) => {
        return ` * @cssClass     s-fit:${fitSizeName}       Apply the ${fitSizeName} fit size`;
    })
        .join('\n')}
        * 
        * @example        html
        ${fitSizes
        .map((fitSizeName) => {
        return ` * <!-- ${fitSizeName} style -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${fitSizeName} fit size</h3>
            *   <div class="s-ratio\:16-9 s-bg:ui">
            *       <img class="s-fit\:${fitSizeName}" src="https://picsum.photos/1000/1000" />
            *   </div>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    fitSizes.forEach((fitSizeName) => {
        vars.push(`/**
                * @name          s-fit:${fitSizeName}
                * @namespace          sugar.css.fit
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${fitSizeName}</yellow>" fit size to any HTMLElement. Work best on images and videos
                * 
                * @example        html
                * <div class="s-ratio\:16-9 s-bg:ui">
                *       <img class="s-fit\:${fitSizeName} src="https://picsum.photos/200/200" />
                *   </div>
                * 
                * @since        2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                */
                .s-fit--${fitSizeName} {
                    @sugar.fit(${fitSizeName});
                }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILGNBQWMsRUFBRTtnQkFDWixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTTthQUNsQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUscUNBQXFDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFOUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixjQUFjLEVBQUUsTUFBTSxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUMxQixNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXRELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQWtCSixRQUFRO1NBQ0wsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDakIsT0FBTywwQkFBMEIsV0FBVyxvQkFBb0IsV0FBVyxXQUFXLENBQUM7SUFDM0YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7O1VBR2IsUUFBUTtTQUNMLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQ2pCLE9BQU8sV0FBVyxXQUFXOzs2REFFZ0IsV0FBVzs7eUNBRS9CLFdBQVc7OztlQUdyQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLbEIsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUM7eUNBQ3VCLFdBQVc7Ozs7Ozs4REFNVSxXQUFXOzs7OzZDQUk1QixXQUFXOzs7Ozs7MEJBTTlCLFdBQVc7aUNBQ0osV0FBVztrQkFDMUIsQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9