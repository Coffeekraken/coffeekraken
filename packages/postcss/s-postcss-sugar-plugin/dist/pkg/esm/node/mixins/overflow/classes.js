import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixin.overflow
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the overflow helper classes like ```.s-overflow:hidden```, ```.s-overflow:auto```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.overflow.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginOverflowClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginOverflowClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `/**
    * @name          s-overflow:auto
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>auto</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
    `).code(`
    .s-overflow--auto {
        overflow: auto;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:hidden
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow hidden container</div>
    * </div>
    */
    `).code(`
    .s-overflow--hidden {
        overflow: hidden;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:inherit
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>inherit</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow inherit container</div>
    * </div>
    */
    `).code(`
    .s-overflow--inherit {
        overflow: inherit;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:initial
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>initial</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow initial container</div>
    * </div>
    */
    `).code(`
    .s-overflow--initial {
        overflow: initial;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:overlay
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>overlay</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow overlay container</div>
    * </div>
    */
    `).code(`
    .s-overflow--overlay {
        overflow: overlay;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:revert
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>revert</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow revert container</div>
    * </div>
    */
    `).code(`
    .s-overflow--revert {
        overflow: revert;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:scroll
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>scroll</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow scroll container</div>
    * </div>
    */
    `).code(`
    .s-overflow--scroll {
        overflow: scroll;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:visible
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>visible</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow visible container</div>
    * </div>
    */
    `).code(`
    .s-overflow--visible {
        overflow: visible;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:unset
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>unset</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow unset container</div>
    * </div>
    */
    `).code(`
    .s-overflow--unset {
        overflow: unset;
    }`, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=