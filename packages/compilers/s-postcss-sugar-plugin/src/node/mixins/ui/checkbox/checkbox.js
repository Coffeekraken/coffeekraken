import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiCheckboxInterface extends __SInterface {
}
postcssSugarPluginUiCheckboxInterface.definition = {
    style: {
        type: 'String',
        values: ['solid'],
        default: __theme().config('ui.checkbox.defaultStyle'),
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
export { postcssSugarPluginUiCheckboxInterface as interface };
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', scope: ['bare', 'lnf'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [
        `
        
`,
    ];
    switch (finalParams.style) {
        case 'solid':
            // bare
            if (finalParams.scope.indexOf('bare') !== -1) {
                vars.push(`

                @sugar.visually.hidden;
                font-size: sugar.scalable(1rem);

                &:disabled + * {
                    @sugar.disabled;
                }

                & + *:after {
                    content: "";
                    opacity: 0;
                    display: block;
                    position: absolute;
                    --borderWidth: sugar.theme(ui.checkbox.borderWidth);
                    top: calc(var(--borderWidth) + 0.3em);
                    left: 0.3em;
                    width: 0.4em;
                    height: 0.4em;
                }
                label:hover > &:not(:disabled) + *:after,
                &:hover:not(:disabled) + *:after {
                    opacity: 0.2;
                }
                &:checked:not(:disabled) + *:after {
                    opacity: 1 !important;
                }

                & + * {
                    display: inline-block;
                    cursor: pointer;
                    position: relative;
                    --fs: sugar.scalable(1rem);
                    padding-inline-start: calc(var(--fs) * 1.6);
                    font-size: sugar.scalable(1rem);
                    
                    &:before {
                        content: "";  
                        display: block;
                        width: 1em;
                        height: 1em;
                        position: absolute;
                        top: sugar.theme(ui.checkbox.borderWidth);
                        left: 0;
                        opacity: 0.5;
                    }
                }

                [dir="rtl"] & {
                    & + *:before {
                        left: auto;
                        right: 0;
                    }
                    & + *:after {
                        left: auto;
                        right: 0.3em;
                    }
                }

            `);
            }
            // lnf
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
    
                & + *:after {
                    border-radius: 0;
                    background: sugar.color(ui);
                    transition: sugar.theme(ui.checkbox.transition);
                }

                & + * {
                    
                    &:before {
                        border: sugar.theme(ui.checkbox.borderWidth) solid sugar.color(ui);
                        background-color: transparent;
                        border-radius: sugar.theme(ui.checkbox.borderRadius);
                        transition: sugar.theme(ui.checkbox.transition);
                        box-shadow: 0 0 0 0 sugar.color(ui, --alpha 0.2);
                    }
                }

                &:focus:not(:hover):not(:active):not(:disabled) + *:before {
                    box-shadow: 0 0 0 sugar.theme(ui.focusOutline.borderWidth) sugar.color(ui, --alpha 0.3);
                }
 
        `);
            }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7O0FBQ3JELGdEQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDakIsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQztLQUN4RDtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDekI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7S0FDM0I7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxPQUFPLEVBQ2QsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUNGLFdBQVcsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVyRCxNQUFNLElBQUksR0FBYTtRQUNuQjs7Q0FFUDtLQUNJLENBQUM7SUFFRixRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDdkIsS0FBSyxPQUFPO1lBQ1IsT0FBTztZQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBMkRiLENBQUMsQ0FBQzthQUNGO1lBRUQsTUFBTTtZQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBdUJqQixDQUFDLENBQUM7YUFDRTtLQUNSO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==