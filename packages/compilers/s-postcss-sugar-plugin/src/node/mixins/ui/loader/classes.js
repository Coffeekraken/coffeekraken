import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiLoaderClassesClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginUiLoaderClassesClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const loaders = ['spinner', 'round', 'drop'];
    vars.comment(() => `
      /**
        * @name          Loaders
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/loaders
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply loader styles like "spinner", and more to come...
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${loaders.map(loaderName => `
            * @cssClass         s-loader:${loaderName}            Display a ${loaderName} loader
        `).join('\n')}
        * 
        ${loaders.map(loaderName => `
            * @example        html      ${loaderName} loader
            *   <div class="s-grid:5">
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:accent"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:complementary"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:info"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:error"></div>
            *       </div>
            *   </div>
        `).join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    loaders.forEach(loaderName => {
        vars.comment(() => `/**
            * @name           s-loader:${loaderName}
            * @namespace      sugar.css.ui.range
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${loaderName}</s-color>" loader
            * 
            * @example        html
            * <div class="s-loader:${loaderName}"></div>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
        `).code(`
            .s-loader--${loaderName} {
                @sugar.ui.loader.${loaderName}();
            }
            `);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxpREFBa0QsU0FBUSxZQUFZO0lBQ3hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLGlEQUFpRCxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMzQixNQUFNLE9BQU8sR0FBRyxDQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFFM0MsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztVQWdCSixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7MkNBQ08sVUFBVSx5QkFBeUIsVUFBVTtTQUMvRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7VUFFWCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7MENBQ00sVUFBVTs7OytDQUdMLFVBQVU7OzsrQ0FHVixVQUFVOzs7K0NBR1YsVUFBVTs7OytDQUdWLFVBQVU7OzsrQ0FHVixVQUFVOzs7U0FHaEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2hCLENBQ0EsQ0FBQztJQUdGLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt5Q0FDdUIsVUFBVTs7Ozs2REFJVSxVQUFVOzs7cUNBR2xDLFVBQVU7Ozs7O1NBS3RDLENBQ0EsQ0FBQyxJQUFJLENBQUM7eUJBQ1UsVUFBVTttQ0FDQSxVQUFVOzthQUVoQyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==