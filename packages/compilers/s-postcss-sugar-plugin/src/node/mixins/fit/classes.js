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
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ defaultFitSize: 'fill' }, params);
    const vars = new CssVars();
    const fitSizes = ['fill', 'cover', 'contain', 'none'];
    vars.comment(() => `
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
        vars.comment(() => `/**
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
            `).code(`
                .s-fit--${fitSizeName} {
                    @sugar.fit(${fitSizeName});
                }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILGNBQWMsRUFBRTtnQkFDWixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTTthQUNsQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUscUNBQXFDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFOUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsY0FBYyxFQUFFLE1BQU0sSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQzNCLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFdEQsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBa0JKLFFBQVE7U0FDTCxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUNqQixPQUFPLDBCQUEwQixXQUFXLG9CQUFvQixXQUFXLFdBQVcsQ0FBQztJQUMzRixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7VUFHYixRQUFRO1NBQ0wsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDakIsT0FBTyxXQUFXLFdBQVc7OzZEQUVnQixXQUFXOzt5Q0FFL0IsV0FBVzs7O2VBR3JDLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUNBLENBQUM7SUFFRixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt5Q0FDdUIsV0FBVzs7Ozs7OzhEQU1VLFdBQVc7Ozs7NkNBSTVCLFdBQVc7Ozs7OzthQU0zQyxDQUNKLENBQUMsSUFBSSxDQUFDOzBCQUNXLFdBQVc7aUNBQ0osV0FBVztrQkFDMUIsQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9