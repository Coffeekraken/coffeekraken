/**
 * @name            visualFocus
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all focusable elements have a visual state setted
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

function getCssPropertyForRule(rule, prop) {
    var sheets = document.styleSheets;
    var slen = sheets.length;
    for (var i = 0; i < slen; i++) {
        var rules = document.styleSheets[i].cssRules;
        var rlen = rules.length;
        for (var j = 0; j < rlen; j++) {
            if (rules[j].selectorText == rule) {
                return rules[j].style[prop];
            }
        }
    }
}

export default function (__SFrontendChecker) {
    return {
        id: 'visualFocus',
        name: 'Visual focus',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'Check that all focusable elements have a visual state setted',
        level: 1,
        check({ $context }) {
            const $focusables = Array.from(
                $context.querySelectorAll(
                    ':is([tabindex], button, input, select, a):not([tabindex="-1"])',
                ) ?? [],
            );

            // @ts-ignore
            for (let [idx, $focusable] of $focusables.entries()) {
                const style = window.getComputedStyle($focusable),
                    focusStyle = window.getComputedStyle($focusable, 'hover'),
                    focusWithinStyle = window.parent.getComputedStyle(
                        $focusable,
                        ':focus-within',
                    );

                _console.log('FOF', $focusable);

                _console.log(getCssPropertyForRule());

                if (JSON.stringify(focusStyle) === JSON.stringify(style)) {
                    // _console.log(
                    //     $focusable,
                    //     style.backgroundColor,
                    //     focusStyle.backgroundColor,
                    // );
                    // return {
                    //     status: 'warning',
                    //     message: `The \`${$focusable.outerHTML}\` does not have any focused visual display`,
                    //     example: null,
                    //     moreLink:
                    //         'https://developer.chrome.com/docs/lighthouse/accessibility/interactive-element-affordance/',
                    //     action: {
                    //         label: () => `Log it`,
                    //         handler: () => console.log($focusable),
                    //     },
                    // };
                }
            }

            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$focusables.length})`,
                    handler: () => console.log($focusables),
                },
            };
        },
    };
}
