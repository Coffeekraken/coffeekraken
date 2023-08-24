/**
 * @name            expandPleasantCssClassname
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
 * to comprehensive classnames for css like "s-something s-something-cool something_desktop", etc...
 *
 * @param     {String}          classesStr          The classes string to convert like "s-typo:h1 s-font:40", etc...
 * @return    {String}                      The processed string with converted classnames
 *
 * @snippet         __expandPleasantCssClassname($1)
 *
 * @feature         Support the classmap feature throught the SClassmap class inited from the SFront class
 *
 * @example         js
 * import { __expandPleasantCssClassname } from '@coffeekraken/sugar/html';
 * __expandPleasantCssClassname('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __expandPleasantCssClassname(
    classesStr: string,
): string {
    let classesArray: string[] = [];

    const classNames = classesStr.split(/\s+/);

    let currentMedia = '';

    classNames.forEach((className) => {
        if (className.slice(0, 1) == '@') {
            currentMedia = className.replace('@', '_');
            return;
        }

        const parts = className.split(':');

        if (parts.length === 1) {
            let name = className;
            if (currentMedia !== '') name = className + currentMedia;
            classesArray.push(name);
        } else {
            const firstClass = parts[0];
            let name = firstClass;
            if (currentMedia !== '') name = firstClass + currentMedia;
            classesArray.push(name);

            parts.forEach((part, i) => {
                if (i > 0) {
                    name = firstClass + '-' + part;
                    if (currentMedia !== '') name = name + currentMedia;
                    classesArray.push(name);
                }
            });
        }
    });

    // classmap
    if (document.env?.SUGAR?.classmap) {
        classesArray = classesArray.map((cls) =>
            document.env.SUGAR.classmap.resolve(cls),
        );
    }

    return classesArray.join(' ');
}
