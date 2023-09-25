<?php

namespace Sugar\html;

/**
 * @name        expandPleasantCssClassnames
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
 * @snippet             \Sugar\html\expandPleasantCssClassnames($1);
 *
 * @example      php
 * Sugar\html\expandPleasantCssClassnames('...html');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function get_tag($tag, $xml)
{
    $tag = preg_quote($tag);

    preg_match_all(
        // '{<' . $tag . '[^>]*>(.*?)</' . $tag . '>' . '}',
        '/<' .
            preg_quote($tag, '/') .
            '(?:[^"\'>]*|"[^"]*"|\'[^\']*\')*>.*?<\/' .
            preg_quote($tag, '/') .
            '>/s',
        $xml,
        $matches,
        PREG_PATTERN_ORDER
    );

    return $matches;
}

function expandPleasantCssClassnames($html)
{
    $plainTags = [];

    // grab do not touch tags
    $tags = ['code', 'template'];
    $tags = [];
    foreach ($tags as $tag) {
        $tagsHtmls = get_tag($tag, $html);

        // print '<pre>';
        // print_r($tagsHtmls);

        foreach ($tagsHtmls[0] as $tagHtml) {
            $id = uniqid();

            $plainTags['[expandPleasantCssClassnames:' . $id . ']'] = $tagHtml;
            $html = str_replace(
                $tagHtml,
                '[expandPleasantCssClassnames:' . $id . ']',
                $html
            );
        }
    }

    $reg = '/class="[a-zA-Z0-9_\-:@\s]+"/';
    $parts = [];
    $matches = preg_match_all($reg, $html, $parts);

    foreach ($parts[0] as $class) {
        $classes = str_replace(['class="', '"'], '', $class);

        $classNames = explode(' ', $classes);

        $classesArray = [];

        $currentMedia = '';

        foreach ($classNames as $className) {
            if (substr($className, 0, 1) == '@') {
                $currentMedia = str_replace('@', '_', $className);
                continue;
            }

            $parts = explode(':', $className);
            if (count($parts) === 1) {
                $name = $className;
                if ($currentMedia !== '') {
                    $name = $className . $currentMedia;
                }
                array_push($classesArray, $name);
            } else {
                $firstClass = $parts[0];

                $name = $firstClass;
                if ($currentMedia !== '') {
                    $name = $firstClass . $currentMedia;
                }

                array_push($classesArray, $name);

                foreach ($parts as $index => $part) {
                    if ($index > 0) {
                        $name = $firstClass . '-' . $part;
                        if ($currentMedia !== '') {
                            $name = $name . $currentMedia;
                        }

                        array_push($classesArray, $name);
                    }
                }
            }
        }

        $html = str_replace(
            $class,
            'class="' . implode(' ', $classesArray) . '"',
            $html
        );
    }

    // $escapedParts = [];
    // $escapedReg = '/class=".*\\\:.*"/';
    // $escapedMatches = preg_match_all($escapedReg, $html, $escapedParts);

    // if (count($escapedParts)) {
    //     foreach ($escapedParts[0] as $class) {
    //         $newClass = str_replace('\:', ':', $class);
    //         $html = str_replace($class, $newClass, $html);
    //     }
    // }

    // print '<pre>';
    // print_r($plainTags);

    // restore protected tags
    foreach ($plainTags as $id => $rawHtml) {
        $html = str_replace($id, $rawHtml, $html);
    }

    // restore do not touch tags
    // preg_match_all(
    //     '/\[sExpandColonClassesTagCode:[0-9]{1,999}\]/ms',
    //     $html,
    //     $restoreTagCode
    // );
    // preg_match_all(
    //     '/\[sExpandColonClassesTagTemplate\:[0-9]{1,999}\]/ms',
    //     $html,
    //     $restoreTagTemplate
    // );

    // foreach ($restoreTagCode[0] as $idx => $tag) {
    //     $html = str_replace($tag, $doNotTouchTagCode[0][$idx], $html);
    // }
    // foreach ($restoreTagTemplate[0] as $idx => $tag) {
    //     $html = str_replace($tag, $doNotTouchTagTemplate[0][$idx], $html);
    // }

    return $html;
}
