<?php

/**
 * A cool php class documented using the docblock parser and docblock json to markdown packages
 * @example   php
 * var $myCoolObject = new MyCoolClass('hello world');
 * $myCoolObject->myCoolPublicMethod();
 *
 * @author   Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class MyCoolClass extends MyCoolExtends implements MyCoolImplement1, MyCoolImplement2 {

  /**
   * My cool property #1
   * @type  {String}
   */
  public var $myCoolProperty1 = 'Hello';

  /**
   * My cool property #2
   * @type  {String}
   */
  public var $myCoolProperty2 = 'World';

  /**
   * Construct the object
   * @param   {String}  $param1   My cool param #1
   */
  public function __construct($param1) {

  }

  /**
   * My cool static method
   */
  public static function myCoolStaticMethod() {

  }

  /**
   * My cool public method
   */
  public function myCoolPublicMethod() {

  }

  /**
   * My cool protected method
   */
  protected function myCoolProtectedMethod() {

  }

  /**
   * My cool private method
   */
  private function myCoolPrivateMethod() {

  }

}
