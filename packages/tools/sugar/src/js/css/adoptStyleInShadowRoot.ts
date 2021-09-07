import __uniqid from '../../shared/string/uniqid';

/**
 * @name            adoptStyleInShadowRoot
 * @namespace       js.css
 * @type            Function
 * @platform        js
 * @platform        ts
 * @status          beta
 *
 * This function allows you to make a shadowRoot element adopt his host context styles
 *
 * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
 * @param      {HTMLElement}                   [$context=document]     The context from which you want to adopt the styles
 * @return      {Promise}                                               Return a promise fullfilled when the styles have been adopted
 *
 * @todo        tests
 *
 * @example         js
 * import __adoptStyleInShadowRoot from '@coffeekraken/sugar/js/css/adoptStyleInShadowRoot';
 * const myShadowRoot = $myElement.shadowRoot;
 * await __adoptStyleInShadowRoot(myShadowRoot);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const _links = {},
    _stylesheets = {};

export default async function adoptStyleInShadowRoot(
    $shadowRoot: HTMLElement,
    $context: HTMLElement | typeof document = document,
): Promise<any> {
    const _styleNodes = [];

    const $links = $context.querySelectorAll('link[rel="stylesheet"]');

    if ($links && $shadowRoot) {
        Array.from($links).forEach(async ($link) => {
            if (!$link.id) $link.id = `link-${__uniqid()}`;
            const stylesheetId = $link.id;

            // prevent to much repetitive work
            if (_links[stylesheetId]) {
                // @ts-ignore
                $shadowRoot.adoptedStyleSheets = [
                    // @ts-ignore
                    ...$shadowRoot.adoptedStyleSheets,
                    // @ts-ignore
                    _links[stylesheetId].stylesheet,
                ];
                return;
            }

            // 2$shadowRoot?.appendChild($link.cloneNode());

            // avoid processing multiple time same stylesheet
            // @ts-ignore
            if (_styleNodes.indexOf($link) !== -1) return;
            // @ts-ignore
            _styleNodes.push($link);

            // request stylesheet to store it in a unique CSSStylesheet instance
            // @ts-ignore
            const res = await fetch($link.href, {
                headers: {
                    Accept: 'text/css,*/*;q=0.1',
                },
            });

            let cssStr = await res.text();
            const stylesheet = new CSSStyleSheet();
            // @ts-ignore
            stylesheet.replace(cssStr);
            // @ts-ignore
            _links[stylesheetId] = {
                stylesheet,
            };
        });
    }

    const $styles = $context.querySelectorAll('style');
    if ($styles && $shadowRoot) {
        Array.from($styles).forEach(($style) => {
            if (!$style.id) $style.id = `stylesheet-${__uniqid()}`;
            const stylesheetId = $style.id;

            if (_stylesheets[stylesheetId]) {
                // @ts-ignore
                $shadowRoot.adoptedStyleSheets = [
                    // @ts-ignore
                    ...$shadowRoot.adoptedStyleSheets,
                    _stylesheets[stylesheetId].stylesheet,
                ];
                return;
            }

            // avoid processing multiple time same stylesheet
            // @ts-ignore
            if (_styleNodes.indexOf($style) !== -1) return;
            // @ts-ignore
            _styleNodes.push($style);

            const stylesheet = new CSSStyleSheet();
            // @ts-ignore
            stylesheet.replace($style.innerHTML);
            // @ts-ignore
            _stylesheets[stylesheetId] = {
                stylesheet,
            };

            // @TODO            avoid these ts-ignore
            // @ts-ignore
            $shadowRoot.adoptedStyleSheets = [
                // @ts-ignore
                ...$shadowRoot.adoptedStyleSheets,
                // @ts-ignore
                _stylesheets[stylesheetId].stylesheet,
            ];
        });
    }

    return true;
}
