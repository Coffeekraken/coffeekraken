<?php

namespace Sugar\html;

/**
 * @name        Sugar\html\expandColonClasses
 * @namespace            php.html
 * @type        Function
 * @platform        php
 * @status          beta
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
function get_tag( $tag, $xml ) {
  $tag = preg_quote($tag);
  preg_match_all('{<'.$tag.'[^>]*>(.*?)</'.$tag.'>'.'}',
                   $xml,
                   $matches,
                   PREG_PATTERN_ORDER);

  return $matches;
}

function expandColonClasses($html) {

    // grab do not touch tags
    preg_match('/<code[^>]*>(.*?)<\/code>/s', $html, $doNotTouchTagCode);
    foreach($doNotTouchTagCode as $idx => $tag) {
        $html = str_replace($tag, '[sExpandColonClassesTagCode:'.$idx.']', $html);
    }
    preg_match('/<template[^>]*>(.*?)<\/template>/s', $html, $doNotTouchTagTemplate);
    foreach($doNotTouchTagTemplate as $idx => $tag) {
        $html = str_replace($tag, '[sExpandColonClassesTagTemplate:'.$idx.']', $html);
    }

    $reg = '/class="[a-zA-Z0-9_\-:@\s]+"/';
    $parts = [];
    $matches = preg_match_all($reg, $html, $parts);

    foreach ($parts[0] as $class) {
        $classes = str_replace(['class="','"'], '', $class);

        $classNames = explode(' ', $classes);

        $classesArray = [];

        $currentMedia = '';

        foreach($classNames as $className) {
            if (substr($className, 0, 1) == '@') {
                $currentMedia = str_replace('@', '___', $className);
                continue;
            }

            $parts = explode(':', $className);
            if (count($parts) === 1) {
                $name = $className;
                if ($currentMedia !== '') $name = $className . $currentMedia;
                array_push($classesArray, $name);
            } else {
                $firstClass = $parts[0];

                $name = $firstClass;
                if ($currentMedia !== '') $name = $firstClass . $currentMedia;

                array_push($classesArray, $name);

                foreach($parts as $index => $part) {
                    if ($index > 0) {

                        $name = $firstClass . '--' . $part;                       
                        if ($currentMedia !== '') $name = $name . $currentMedia;

                        array_push($classesArray, $name);
                    }
                }
            }
        }

        $html = str_replace($class, 'class="' . implode(' ', $classesArray) . '"', $html);

    }

    $escapedParts = [];
    $escapedReg = '/class=".*\\\:.*"/';
    $escapedMatches = preg_match_all($escapedReg, $html, $escapedParts);

    if (count($escapedParts)) {
        foreach($escapedParts[0] as $class) {
            $newClass = str_replace('\:', ':', $class);
            $html = str_replace($class, $newClass, $html);
        }
    }

    // restore do not touch tags
    preg_match('/\[sExpandColonClassesTagCode:[0-9]{1,999}\]/ms', $html, $restoreTagCode);
    preg_match('/\[sExpandColonClassesTagTemplate\:[0-9]{1,999}\]/ms', $html, $restoreTagTemplate);
    foreach($restoreTagCode as $idx => $tag) {
        $html = str_replace($tag, $doNotTouchTagCode[$idx], $html);
    }
    foreach($restoreTagTemplate as $idx => $tag) {
        $html = str_replace($tag, $doNotTouchTagTemplate[$idx], $html);
    }

    return $html;
}