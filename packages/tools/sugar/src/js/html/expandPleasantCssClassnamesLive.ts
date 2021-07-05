import __querySelectorLive from '../dom/query/querySelectorLive';
import __expandPleasantCssClassname from '../../shared/html/expandPleasantCssClassname';

/**
 * @name            expandPleasantCssClassnamesLive
 * @namespace       ks.html
 * @type            Function
 * @platform        js
 * @platform        ts
 * @status          beta
 * 
 * This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
 * to comprehensive classnames for css like "s-something s-something--cool something___desktop", etc...
 * This function do this live when detecting a new node in the page, etc...
 * 
 * @example         js
 * import expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
 * expandPleasantCssClassnamesLive();
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function expandPleasantCssClassnamesLive() {
    __querySelectorLive('[class*=":"],[class*="@"]', ($elm) => {
        const classesStr = $elm.getAttribute('class');
        const newClassesStr = __expandPleasantCssClassname(classesStr);
        $elm.setAttribute('class', newClassesStr);
    }, {
        once: false
    });
}