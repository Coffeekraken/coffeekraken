import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginUiListInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['ul', 'ol', 'icon'],
                default: __STheme.config('ui.list.defaultStyle'),
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
    }
}
export { postcssSugarPluginUiListInterface as interface };
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
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
                            content: "${__STheme.config('ui.list.bulletChar')}";
                            margin-top: 0.25em;
                            font-size: 0.7em;
                        }
                    }
                `);
                break;
        }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZO0lBQ3hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDO2FBQ25EO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPRCxPQUFPLEVBQUUsaUNBQWlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFDYixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLElBQUksRUFDWCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBQ0YsV0FBVyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLGNBQWMsR0FBRyxVQUFVLENBQUM7SUFDaEMsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLE1BQU0sRUFBRTtRQUM5QixjQUFjLEdBQUcsbUJBQW1CLENBQUM7S0FDeEM7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7VUFJUixXQUFXLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7Ozs7O1NBUTlELENBQUMsQ0FBQztLQUNOO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOztrQkFFQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7a0JBZWQsY0FBYzs7Ozs7OztTQU92QixDQUFDLENBQUM7UUFFSCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxJQUFJO2dCQUNMLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7MEJBSUEsY0FBYzs7Ozs7O3FCQU1uQixDQUFDLENBQUM7Z0JBQ1AsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7OzBCQU9BLGNBQWM7Ozs7OztpQkFNdkIsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLElBQUksQ0FBQztZQUNWO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7OzBCQUVBLGNBQWM7d0NBQ0EsUUFBUSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQzs7Ozs7aUJBSzVELENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==