// @ts-nocheck

/**
 * @name        isCreditCard
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a valid credit card number
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isCreditCard from '@coffeekraken/sugar/shared/is/creditCard';
 * isCreditCard('john.doe@gmail.com') => true
 * isCreditCard('plop@yop.com') => true
 * isCreditCard('hello') => false
 * isCreditCard('378282246310006') => true
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isCreditCard(value: string): boolean {
    const re = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    return re.test(value);
}
export default isCreditCard;
