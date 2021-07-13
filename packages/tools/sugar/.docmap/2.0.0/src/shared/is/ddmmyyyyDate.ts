/**
*
* @name        isDdmmyyyyDate
* @namespace            js.is
* @type      Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Check if is a valid dd.mm.yyyy date
* This will match : dd.mm.yyyy | dd/mm/yyyy | dd-mm-yyyy | dd mm yyyy
*
* @param    {String}    date    The date to check
* @return    {Boolean}    true if is valid, false if not
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example    js
* import isDdmmyyyyDate from '@coffeekraken/sugar/js/is/ddmmyyyyDate'
* if (isDdmmyyyyDate('20.12.2018')) {
*     // do something cool
* }
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/