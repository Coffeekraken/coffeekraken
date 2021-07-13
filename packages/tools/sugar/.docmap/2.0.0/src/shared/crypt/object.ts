/**
*
* @name            object
* @namespace            js.crypt
* @type            Object
* @platform          js
* @platform          ts
* @platform          node
* @status              wip
*
* Expose two function named "encrypt" and "decrypt" that you can use to process your content using the object algorithm
*
* @todo        interface
* @todo        doc
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name        encrypt
* @type        Function
*
* Encrypt
*
* @param       {Object}       object         The object to encrypt
* @param       {String}       [salt="coffeekraken.sugar.crypt.object"]   The salt to encode the object. Needed to decode correctly the object
* @return      {String}                       The encrypted object
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name        decrypt
* @type        Function
*
* Decrypt
*
* @param       {String}      encodedObject          The object to decrypt
* @param       {String}      [salt='coffeekraken.sugar.crypt.object']        The salt to decode the object
* @return      {Object}                      The decrypted object
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/