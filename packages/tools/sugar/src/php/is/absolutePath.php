<?php

namespace Sugar\is;

/**
 * @name        Sugar\is\absolutePath
 * @namespace            php.is
 * @type        Function
 * @platform        php
 * @status          beta
 * 
 * This method simply check if the passed path is absolute or not
 * 
 * @param       {String}        $path           The path to check
 * @return      {Boolean}                       true if absolute, false if not
 * 
 * @example      php
 * Sugar\is\absolutePath('my/cool/path'); // => false
 * Sugar\is\absolutePath('http://something.com/my/cool/path'); // => true
 * Sugar\is\absolutePath('/my/cool/path'); // => true
 * 
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function absolutePath($path) {
    if (!is_string($path)) {
        $mess = sprintf('String expected but was given %s', gettype($path));
        throw new \InvalidArgumentException($mess);
    }
    if (!ctype_print($path)) {
       $mess = 'Path can NOT have non-printable characters or be empty';
       throw new \DomainException($mess);
    }
    // Optional wrapper(s).
    $regExp = '%^(?<wrappers>(?:[[:print:]]{2,}://)*)';
    // Optional root prefix.
    $regExp .= '(?<root>(?:[[:alpha:]]:/|/)?)';
    // Actual path.
    $regExp .= '(?<path>(?:[[:print:]]*))$%';
    $parts = [];
    if (!preg_match($regExp, $path, $parts)) {
        $mess = sprintf('Path is NOT valid, was given %s', $path);
        throw new \DomainException($mess);
    }
    if ('' !== $parts['root']) {
        return true;
    }
    return false;
}