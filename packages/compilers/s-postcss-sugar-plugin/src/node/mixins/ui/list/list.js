import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiListInterface extends __SInterface {
}
postcssSugarPluginUiListInterface.definition = {
    style: {
        type: 'String',
        values: ['ul', 'ol', 'icon'],
        default: __theme().config('ui.list.defaultStyle'),
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf'],
        default: ['bare', 'lnf'],
    },
};
export { postcssSugarPluginUiListInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: 'ul', scope: ['bare', 'lnf'] }, params);
    const vars = [];
    let bulletSelector = '&:before';
    if (finalParams.style === 'icon') {
        bulletSelector = '& > i:first-child';
    }
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        position: relative;
        font-size: sugar.scalable(1rem);

        ${finalParams.style === 'ol' ? 'counter-reset: s-ol-list;' : ''}

        & > * {
            display: block !important;
            padding-inline-start: 1em;
            margin-bottom: 0.5em;
            
            & > * {
                margin-top: 0.5em;
            }  
        }

        @sugar.rhythm.vertical {
            ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
        } 
        `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            & > * {
                ${bulletSelector} {
                    display: inline-block;
                    position: absolute;
                    left: 0.5em;
                    transform: translateX(-50%);
                    color: sugar.color(ui);
                }

                & > *:not(i) {
                    @sugar.color.remap(ui, main);
                }
            }

            [dir="rtl"] & > *,
            &[dir="rtl"] > * {
                ${bulletSelector} {
                    left: auto;
                    right: 0;
                    transform: none;
                }
            }

        `);
        switch (finalParams.style) {
            case 'ol':
                vars.push(`
                    & > * {
                        counter-increment: s-ol-list;

                        ${bulletSelector} {
                            content: counter(s-ol-list);
                            margin-top: 0.25em;
                            font-size: 0.7em;
                        }
                    }
                    `);
                break;
            case 'icon':
                vars.push(`
                    & > * {
                        padding-inline-start: 1.5em;
                        &:before {
                            content: ' ' !important;
                        }

                        ${bulletSelector} {
                            margin-top: 0.25em;
                            font-size: 0.8em;
                        }
                    }

                `);
                break;
            case 'ul':
            default:
                vars.push(`
                    & > * {
                        ${bulletSelector} {
                            content: "${__theme().config('ui.list.bulletChar')}";
                            margin-top: 0.25em;
                            font-size: 0.7em;
                        }
                    }
                `);
                break;
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyx5QkFBeUIsTUFBTSx3Q0FBd0MsQ0FBQztBQUUvRSxNQUFNLGlDQUFrQyxTQUFRLFlBQVk7O0FBQ2pELDRDQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztRQUM1QixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDO0tBQ3BEO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0tBQzNCO0NBQ0osQ0FBQztBQVFOLE9BQU8sRUFBRSxpQ0FBaUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUxRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxJQUFJLEVBQ1gsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLGNBQWMsR0FBRyxVQUFVLENBQUM7SUFDaEMsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLE1BQU0sRUFBRTtRQUM5QixjQUFjLEdBQUcsbUJBQW1CLENBQUM7S0FDeEM7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7VUFJUixXQUFXLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7Ozs7Ozs7Ozs7Y0FhekQseUJBQXlCLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUM7O1NBRTNFLENBQUMsQ0FBQztLQUNOO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOztrQkFFQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7a0JBZWQsY0FBYzs7Ozs7OztTQU92QixDQUFDLENBQUM7UUFFSCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxJQUFJO2dCQUNMLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7MEJBSUEsY0FBYzs7Ozs7O3FCQU1uQixDQUFDLENBQUM7Z0JBQ1AsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7OzBCQU9BLGNBQWM7Ozs7OztpQkFNdkIsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLElBQUksQ0FBQztZQUNWO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7OzBCQUVBLGNBQWM7d0NBQ0EsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDOzs7OztpQkFLN0QsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==