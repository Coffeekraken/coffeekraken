<?php

namespace Sugar\frontspec;

/**
 * @name            metas
 * @namespace       php.frontspec
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * Print the passed "metas" from the frontspec
 *
 * @param     {Object}      $frontspec                  The frontspec object containing the "metas" property
 * @param     {Object}      [$env='development']        The "env" string that can be "development" or "production"
 * @return    {String}    The HTML code of the metas
 *
 * @example    php
 * \Sugar\frontspec\metas($frontspec->metas, 'production');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function metas($frontspec, $env = 'development')
{
    $metas = [];
    if (isset($frontspec->metas)) {
        $metas = $frontspec->metas;
    }

    $defaultMetas = [
        'charset' => 'UTF-8',
        'http-equiv' => 'X-UA-Compatible',
        'robots' => $env == 'production' ? 'all' : 'noindex,nofollow',
        'viewport' =>
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
    ];

    $finalMetas = array_merge($defaultMetas, (array) $metas);

    $metasStr = [];

    foreach (array_keys($finalMetas) as $name) {
        if ($name == 'title') {
            array_push($metasStr, '<title>' . $finalMetas[$name] . '</title>');
        } elseif ($name == 'charset') {
            array_push(
                $metasStr,
                '<meta charset="' . $finalMetas[$name] . '" />'
            );
        } elseif ($name == 'http-equiv') {
            array_push(
                $metasStr,
                '<meta http-equiv="' .
                    $finalMetas[$name] .
                    '" content="chrome=1" />'
            );
        } elseif ($name == 'author') {
            if (is_string($finalMetas[$name])) {
                array_push(
                    $metasStr,
                    '<meta name="' .
                        $name .
                        '" content="' .
                        $finalMetas[$name] .
                        '" />'
                );
            } else {
                $authorName = $finalMetas[$name]->name;
                $authorEmail = $finalMetas[$name]->email;
                $authorUrl = $finalMetas[$name]->url;
                $authorStr = $authorName;
                if ($authorEmail) {
                    $authorStr .= ' <' . $authorEmail . '>';
                }
                if ($authorUrl) {
                    $authorStr .= ' (' . $authorUrl . ')';
                }

                array_push(
                    $metasStr,
                    '<meta name="author" content="' . $authorStr . '' . '" />'
                );
            }
        } elseif (is_string($finalMetas[$name])) {
            array_push(
                $metasStr,
                '<meta name="' .
                    $name .
                    '" content="' .
                    $finalMetas[$name] .
                    '" />'
            );
        }
    }

    return implode(PHP_EOL, $metasStr);
}
