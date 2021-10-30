import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiListInterface extends __SInterface {
}
postcssSugarPluginUiListInterface.definition = {
    style: {
        type: 'String',
        values: ['ul', 'ol', 'icon'],
        default: __theme().config('ui.list.defaultStyle'),
    },
    scope: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf'],
        default: ['bare', 'lnf'],
    },
};
export { postcssSugarPluginUiListInterface as interface };
export default function ({ params, atRule, applyNoScopes, jsObjectToCssProperties, replaceWith, }) {
    const finalParams = Object.assign({ style: 'ul', scope: ['bare', 'lnf'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
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
            margin-bottom: 1em;
            margin-top: 1em;
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
                    color: sugar.color(current);
                }

                & > *:not(i) {
                    @sugar.color(main);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFHM0MsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNqRCw0Q0FBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7UUFDNUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztLQUNwRDtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDekI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7S0FDM0I7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsdUJBQXVCLEVBQ3ZCLFdBQVcsR0FPZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsSUFBSSxFQUNYLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFDRixXQUFXLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFckQsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQztJQUNoQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssTUFBTSxFQUFFO1FBQzlCLGNBQWMsR0FBRyxtQkFBbUIsQ0FBQztLQUN4QztJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztVQUlSLFdBQVcsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7U0FROUQsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7O2tCQUVBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztrQkFlZCxjQUFjOzs7Ozs7O1NBT3ZCLENBQUMsQ0FBQztRQUVILFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLElBQUk7Z0JBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzswQkFJQSxjQUFjOzs7Ozs7cUJBTW5CLENBQUMsQ0FBQztnQkFDUCxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7MEJBT0EsY0FBYzs7Ozs7O2lCQU12QixDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDO1lBQ1Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7MEJBRUEsY0FBYzt3Q0FDQSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQ3hCLG9CQUFvQixDQUN2Qjs7Ozs7aUJBS1osQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==