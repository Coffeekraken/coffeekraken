// @ts-nocheck

import { prefix } from 'inline-style-prefixer';
import css from 'css';
import __set from '../object/set';
import __get from '../object/get';

import { parse, stringify } from 'scss-parser';

/**
 * @name                autoPrefix
 * @namespace           js.css
 * @type                Function
 *
 * Prefix your passed css style
 *
 * @param         {String}            style             The style you want to prefix in string format
 * @param         {String}            [return=null]     You can tell what you want back between "string" and "object". By default it will return the same style type that you have passed
 * @return        {String}                              The prefixed style
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function autoPrefix(style) {
    let styleObj = typeof style === 'object' ? style : {};
    let prefixedStyleObj = {};

    // check the passed param
    if (typeof style === 'string') {
        // styleObj = css.parse(style);
        // styleObj = parse(style);
    }

    parseCss(style);

    // __set(styleObj, 'stylesheet.rules.0.selectors.0', 'yououououou');

    // deepMap(styleObj, (value, name, path) => {

    //   if (name === 'value') {

    //     // __set(styleObj, path, 'hello');

    //     // __set(styleObj, path, css.parse(value));

    //     // __set(styleObj, path, css.parse(`
    //     // .sel { ${value} } `));
    //   }

    //
    // });

    // // prefixing the object
    // prefixedStyleObj = prefix(styleObj);

    return '';
}

function parseCss(css) {
    // const reg = /[\s\S]+\{[\s\S]+\}$/gm;
    const reg = /(\/\*\@-.*?)(?=\/\*\@-|\z)/gm;
    console.log(reg.exec(css));
}

function deepMap(object, handler, path = '') {
    if (Array.isArray(object)) {
        object.forEach((item, i) => {
            const newPath = path === '' ? `${i}` : `${path}.${i}`;
            deepMap(item, handler, newPath);
        });
    } else if (typeof object === 'object') {
        Object.keys(object).forEach((itemName) => {
            const itemValue = object[itemName];
            const newPath = path === '' ? `${itemName}` : `${path}.${itemName}`;
            deepMap(itemValue, handler, newPath);
        });
    } else {
        handler(object, path.split('.').pop(), path);
    }
}
