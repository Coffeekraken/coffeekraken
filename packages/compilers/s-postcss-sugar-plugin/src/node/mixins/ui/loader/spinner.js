import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginUiLoaderSpinnerMixinInterface extends __SInterface {
}
postcssSugarPluginUiLoaderSpinnerMixinInterface.definition = {
    name: {
        type: 'String',
        default: 's-loader-spinner',
    },
    duration: {
        type: 'String',
        default: __STheme.config('ui.loaderSpinner.duration'),
    },
    easing: {
        type: 'String',
        default: __STheme.config('ui.loaderSpinner.easing'),
    },
};
export { postcssSugarPluginUiLoaderSpinnerMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: '', duration: '', easing: '' }, params);
    const vars = [];
    vars.push(`
    display: inline-block;
    text-indent: -9999em;
    border-top: 0.3em solid sugar.color(current, --alpha 0.8);
    border-right: 0.3em solid sugar.color(current, --alpha 0.8);
    border-bottom: 0.3em solid sugar.color(current, --alpha 0.8);
    border-left: 0.3em solid rgba(0,0,0,0);
    border-radius: 50%;
    width: 1em;
    height: 1em;
    animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} infinite;
    
    @keyframes ${finalParams.name} {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSwrQ0FBZ0QsU0FBUSxZQUFZOztBQUMvRCwwREFBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGtCQUFrQjtLQUM5QjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUM7S0FDeEQ7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDO0tBQ3REO0NBQ0osQ0FBQztBQVNOLE9BQU8sRUFBRSwrQ0FBK0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV4RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsUUFBUSxFQUFFLEVBQUUsRUFDWixNQUFNLEVBQUUsRUFBRSxJQUNQLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7aUJBVUcsV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxNQUFNOztpQkFFOUQsV0FBVyxDQUFDLElBQUk7Ozs7Ozs7O0dBUTlCLENBQUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=