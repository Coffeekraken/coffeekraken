/**
 * A cool demo class to be parsed by the docblock parser and transformed with the docblock json to markdown package.
 *
 * @property  {String}  property1   My cool property #1
 * @property  {String}  [property2="hello world"]   My cool property #2
 *
 * @example   js
 * const myCoolClass = new MyCoolClass()
 * myCoolClass.myCoolPublicMethod()
 *
 * @category  My cool category
 * @copyright   (C) 2018 Olivier Bossel
 * @package   My cool package
 * @see   http://google.com   Google
 * @todo  Maintain this class as best as I could
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class MyCoolClass extends MyCoolExtends {
  /**
   * @name  my.cool.event
   * My cool event
   * @event
   */

  /**
   * My cool attribute
   * @attribute
   * @type  {String}
   */
  myCoolAttribute: "Hello World";

  /**
   * Construct the object
   * @constructor
   * @param   {String}  param1  My cool parameter #1
   * @param   {String}  [param2="hello world"]  My cool parameter #2
   * @return  {String}    Return something cool
   */
  constructor(param1, param2 = "hello world") {
    return "Something cool";
  }

  /**
   * A cool public method
   * @deprecated
   * @final
   */
  myCoolPublicMethod() {}

  /**
   * A cool overrided method
   * @override
   */
  myCoolOverridedMethod() {}

  /**
   * My cool private method
   */
  _myCoolPrivateMethod() {}

  /**
   * My other cool private method
   * @private
   */
  myOtherCoolPrivateMethod() {}

  /**
   * My cool protected method
   * @protected
   */
  myCoolProtectedMethod() {}
}
