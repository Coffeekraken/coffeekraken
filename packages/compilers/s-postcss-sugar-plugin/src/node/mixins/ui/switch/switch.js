import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiSwitchMixinInterface extends __SInterface {
}
postcssSugarPluginUiSwitchMixinInterface.definition = {
    style: {
        type: 'String',
        values: ['default', 'gradient', 'outline'],
        default: 'default'
    },
    scope: {
        type: 'String',
        values: ['bare', 'lnf', 'style'],
        default: ['bare', 'lnf', 'style']
    }
};
export { postcssSugarPluginUiSwitchMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        display: inline-block;
        position: relative;            

        & input[type="checkbox"] {
            visibility: hidden;
            position: absolute;
        } 

        & input[type="checkbox"]:checked + *:after {
            left: 1em;
        }

        & input[type="checkbox"] + * {
            height: 1em;
            width: 2em;
            top: 0.1em;
            display: inline-block;
        }

        & input[type="checkbox"] + *:before {
            content: '';
            display: block;
            position: absolute;
            top: 0; left: 0;
            height: 1em;
            width: 2em;
        }
        & input[type="checkbox"] + *:after {
            content: '';
            display: block;
            position: absolute;
            top: 0; left: 0;
            height: 1em;
            width: 1em;
            transform: scale(0.7);
        }
        `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1 && finalParams.scope.indexOf('style') !== -1) {
        switch (finalParams.style) {
            case 'gradient':
                break;
            case 'outline':
                break;
            case 'default':
            default:
                vars.push(`

                & input[type="checkbox"]:checked + *:before {
                    background-color: sugar.color(ui);
                }

                & input[type="checkbox"] + *:before {
                    background: sugar.color(ui, --lighten 40 --desaturate 100);
                    transition: sugar.theme(ui.switch.transition);
                    border-radius: sugar.theme(ui.switch.borderRadius);
                }
                & input[type="checkbox"] + *:after {
                    background: sugar.color(ui, foreground);
                    transition: sugar.theme(ui.switch.transition);
                    border-radius: sugar.theme(ui.switch.borderRadius);
                }
            `);
                break;
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3dpdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBS3JELE1BQU0sd0NBQXlDLFNBQVEsWUFBWTs7QUFDMUQsbURBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsU0FBUyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxTQUFTO0tBQ3JCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQztRQUM5QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQztLQUNsQztDQUNKLENBQUM7QUFRSixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBcUNMLENBQUMsQ0FBQztLQUNSO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUV4RixRQUFPLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdEIsS0FBSyxVQUFVO2dCQUVmLE1BQU07WUFDTixLQUFLLFNBQVM7Z0JBRWQsTUFBTTtZQUNOLEtBQUssU0FBUyxDQUFDO1lBQ2Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OzthQWdCVCxDQUFDLENBQUE7Z0JBRU4sTUFBTTtTQUNUO0tBRUY7SUFJRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9