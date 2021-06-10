<?php

namespace Sugar\html;

/**
 * @name        Sugar\html\expandColonClasses
 * @namespace            php.html
 * @type        Function
 * 
 * This method will look for classes like something:cool and transform it into
 * something like this: something something--cool
 * 
 * @param       {String}        $html           The html to process
 * @return      {String}                       The processed html
 * 
 * @example      php
 * Sugar\html\expandColonClasses('...html');
 * 
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function expandColonClasses($html) {

    $reg = '/class="[a-zA-Z0-9_\-:\s]+"/';

    $parts = [];
    $matches = preg_match_all($reg, $html, $parts);

    foreach ($parts[0] as $class) {
        $classes = str_replace(['class="','"'], '', $class);

        $classNames = explode(' ', $classes);

        $classesArray = [];

        foreach($classNames as $className) {

            $parts = explode(':', $className);
            if (count($parts) === 1) {
                array_push($classesArray, $className);
            } else {
                $firstClass = $parts[0];
                array_push($classesArray, $firstClass);

                foreach($parts as $index => $part) {
                    if ($index > 0) {
                        array_push($classesArray, $firstClass . '--' . $part);
                    }
                }
            }
        }

        $html = str_replace($class, 'class="' . implode(' ', $classesArray) . '"', $html);

    }

    return $html;
}